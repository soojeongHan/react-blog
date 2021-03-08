import React from 'react';
import Header from 'src/components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'src/redux/create';
import { showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';
import { debounce } from 'src/hooks/debounce';
import { searchContent as searchContentSaga, SearchType, hideSearchModal } from 'src/redux/modules/search';
import { push } from 'connected-react-router';

type HeaderContainerProps = {

}

const HeaderContainer: React.FC<HeaderContainerProps> = () => {

  const dispatch = useDispatch();

  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const isEditing = history.location.pathname !== "/" && history.location.pathname.includes('post');
  const postId = isEditing ? history.location.pathname.split("post/").pop() : "";

  const search = useSelector<RootState, SearchType>(state => state.search);
  const { searchData, searchView }: { searchData: string[] | null, searchView: boolean } = search;

  const searchInputRef = React.createRef<any>();
  const searchViewRef = React.createRef<any>();

  const handleResize = React.useCallback(() => {
    const top = searchInputRef.current.parentElement.offsetHeight + searchInputRef.current.parentElement.offsetTop;
    const left = searchInputRef.current.offsetLeft + 0.5;
    const height = searchInputRef.current.parentElement.offsetHeight * (searchData ? searchData.length : 1);

    searchViewRef.current.style.top = `${top}px`;
    searchViewRef.current.style.left = `${left}px`;
    searchViewRef.current.style.height = `${height}px`;
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

    document.body.addEventListener('click', hide);
    return () => {
      document.body.removeEventListener('click', hide);
    }
  }, [dispatch])


  const goHomepage = React.useCallback(() => {
    history.location.pathname === "/"
      ? window.location.reload()
      : history.push('/');
  }, []);
  const handleRemove = React.useCallback(() => {
    dispatch(showModal('remove'));
  }, [dispatch]);
  const handleSearchInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") dispatch(searchContentSaga(e.target.value));
    else dispatch(hideSearchModal())
  }, 250);
  const handleFocus = () => {
    searchInputRef.current.focus();
  }
  const goSearchPage = (content: string) => {
    dispatch(push(`/search/${content}`));
    dispatch(hideSearchModal());
  }

  return (
    <React.Fragment>
      <Header
        goHomepage={goHomepage}
        handleRemove={handleRemove}
        handleSearchInput={handleSearchInput}
        handleFocus={handleFocus}
        goSearchPage={goSearchPage}
        searchInputRef={searchInputRef}
        searchViewRef={searchViewRef}
        isEditing={isEditing}
        postId={postId}
        logged={logged}
        searchData={searchData} />
    </React.Fragment>
  );
}

export default HeaderContainer;
