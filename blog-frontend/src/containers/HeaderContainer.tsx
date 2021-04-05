import React from 'react';
import Header from 'src/components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'src/redux/create';
import { showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';
import { debounce } from 'src/hooks/debounce';
import { searchContent as searchContentSaga, SearchType, hideSearchModal, showSearchModal, SearchDataType } from 'src/redux/modules/search';
import { push } from 'connected-react-router';
import { RouteComponentProps, withRouter } from 'react-router';

type HeaderContainerProps = {
  search: string | undefined;
}

const HeaderContainer: React.FC<RouteComponentProps<HeaderContainerProps>> = ({ match }) => {
  const searchPath = match.params.search;
  const dispatch = useDispatch();

  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const isPostPage = history.location.pathname !== "/" && history.location.pathname.includes('post');
  const postId = isPostPage ? history.location.pathname.split("post/").pop() : "";

  const search = useSelector<RootState, SearchType>(state => state.search);
  const { searchData, searchView }: { searchData: SearchDataType[] | null, searchView: boolean } = search;
  const [isMenuDisplay, setMenuDisplay] = React.useState<boolean>(false);

  const searchInputRef = React.createRef<any>();
  const searchViewRef = React.createRef<any>();

  const handleResize = React.useCallback(() => {
    const top = searchInputRef.current.parentElement.offsetHeight + searchInputRef.current.parentElement.offsetTop;
    const left = searchInputRef.current.offsetLeft;
    const height = 1.7 * (searchData ? searchData.length : 1);

    searchViewRef.current.style.top = `${top}px`;
    searchViewRef.current.style.left = `${left}px`;
    searchViewRef.current.style.height = `${height}rem`;
  }, [searchData, searchInputRef, searchViewRef]);

  React.useLayoutEffect(() => {
    if (searchView && searchData) {
      searchViewRef.current.style.display = "block";
      handleResize();
    }
    else {
      searchViewRef.current.style.display = "none"
    }
    window.onresize = handleResize;
  }, [searchData, searchViewRef, searchView, handleResize]);

  const toggleMenuDisplay = React.useCallback((bool?: boolean | undefined) => {
    typeof bool === "boolean" ? setMenuDisplay(bool) : setMenuDisplay(!isMenuDisplay);
  }, [isMenuDisplay]);

  React.useLayoutEffect(() => {
    const hide = () => {
      if (searchView) dispatch(hideSearchModal());
    }

    document.addEventListener('click', hide);
    // Component UnMounted 될 때 해당 클릭 이벤트를 없애준다.
    return () => {
      // 다른 페이지로 넘어가면 사라지게끔 처리한다.
      hide();
      document.removeEventListener('click', hide);
    }
  }, [dispatch, searchView]);

  const goHomepage = React.useCallback(() => {
    history.location.pathname === "/"
      ? window.location.reload()
      : history.push('/');
  }, []);
  const goPage = React.useCallback((content: string) => {
    dispatch(push(content));
  }, [dispatch]);
  const handleRemove = React.useCallback(() => {
    dispatch(showModal('remove'));
  }, [dispatch]);
  const handleSearchInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      dispatch(searchContentSaga(e.target.value));
      dispatch(showSearchModal());
    }
    else dispatch(hideSearchModal());
  }, 200);
  const handleSearchAndFocus = () => {
    searchInputRef.current.value === ""
      ? searchInputRef.current.focus()
      : goPage(`/search/${searchInputRef.current.value}`);
  }
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goPage(`/search/${Object(e.target).value}`);
      dispatch(hideSearchModal());
    }
  }

  return (
    <React.Fragment>
      <Header
        goHomepage={goHomepage}
        handleRemove={handleRemove}
        handleSearchInput={handleSearchInput}
        handleSearchAndFocus={handleSearchAndFocus}
        handleSearchKeyPress={handleSearchKeyPress}
        goPage={goPage}
        toggleMenuDisplay={toggleMenuDisplay}
        isMenuDisplay={isMenuDisplay}
        searchInputRef={searchInputRef}
        searchViewRef={searchViewRef}
        isPostPage={isPostPage}
        postId={postId}
        logged={logged}
        searchData={searchData}
        searchPath={searchPath} />
    </React.Fragment>
  );
}

export default withRouter(HeaderContainer);
