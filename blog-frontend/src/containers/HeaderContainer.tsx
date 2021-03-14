import React from 'react';
import Header from 'src/components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'src/redux/create';
import { showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';
import { debounce } from 'src/hooks/debounce';
import { searchContent as searchContentSaga, SearchType, hideSearchModal, showSearchModal } from 'src/redux/modules/search';
import { push } from 'connected-react-router';

type HeaderContainerProps = {

}

const HeaderContainer: React.FC<HeaderContainerProps> = () => {

  const dispatch = useDispatch();

  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const isPostPage = history.location.pathname !== "/" && history.location.pathname.includes('post');
  const postId = isPostPage ? history.location.pathname.split("post/").pop() : "";

  const search = useSelector<RootState, SearchType>(state => state.search);
  const { searchData, searchView }: { searchData: string[] | null, searchView: boolean } = search;

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

  React.useLayoutEffect(() => {
    const hide = () => {
      dispatch(hideSearchModal());
    }

    document.addEventListener('click', hide);
    // Component UnMounted 될 때 해당 클릭 이벤트를 없애준다.
    return () => {
      // 다른 페이지로 넘어가면 사라지게끔 처리한다.
      hide();
      document.removeEventListener('click', hide);
    }
  }, [dispatch]);

  const goHomepage = React.useCallback(() => {
    history.location.pathname === "/"
      ? window.location.reload()
      : history.push('/');
  }, []);
  const goPage = (content: string) => {
    dispatch(push(content));
    dispatch(hideSearchModal());
  }
  const handleRemove = React.useCallback(() => {
    dispatch(showModal('remove'));
  }, [dispatch]);
  const handleChangeSearchInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      dispatch(searchContentSaga(e.target.value));
      dispatch(showSearchModal());
    }
    else dispatch(hideSearchModal());
  }, 250);
  const handleSearchAndFocus = () => {
    searchInputRef.current.value === ""
      ? searchInputRef.current.focus()
      : goPage(`/search/${searchInputRef.current.value}`);
  }
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goPage(`/search/${Object(e.target).value}`);
  }

  return (
    <React.Fragment>
      <Header
        goHomepage={goHomepage}
        handleRemove={handleRemove}
        handleChangeSearchInput={handleChangeSearchInput}
        handleSearchAndFocus={handleSearchAndFocus}
        handleSearchKeyPress={handleSearchKeyPress}
        goPage={goPage}
        searchInputRef={searchInputRef}
        searchViewRef={searchViewRef}
        isPostPage={isPostPage}
        postId={postId}
        logged={logged}
        searchData={searchData} />
    </React.Fragment>
  );
}

export default HeaderContainer;
