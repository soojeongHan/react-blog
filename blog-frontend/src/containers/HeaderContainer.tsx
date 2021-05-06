import React, { Dispatch } from 'react';
import Header from 'src/components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'src/hooks/debounce';
import { searchContent as searchContentSaga, SearchType, hideSearchModal, showSearchModal, SearchDataType } from 'src/redux/modules/search';
import { push } from 'connected-react-router';
import { RouteComponentProps, withRouter } from 'react-router';
import { history } from 'src/redux/create';
import { hideModal, initializeLoginModal, reqLogout, showModal } from 'src/redux/modules/base';
import { RootState } from 'src/redux/modules/rootReducer';

const HandleSearchFunction = (dispatch: Dispatch<any>, url: string, goPage: (content: string) => void) => {
  const isPostPage = url !== "/" && url.includes('post');
  const postId = isPostPage ? url.split("post/").pop() : "";

  const search = useSelector<RootState, SearchType>(state => state.search);
  const { searchData, searchView }: { searchData: SearchDataType[] | null, searchView: boolean } = search;
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchViewRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const hide = () => {
      if (searchView) dispatch(hideSearchModal());
    }
    document.addEventListener('click', hide);
    // Component unmounted => 해당 클릭 이벤트를 없애주고, 다른 페이지로 넘어가면 사라지게 한다.
    return () => {
      hide();
      document.removeEventListener('click', hide);
    }
  }, [dispatch, searchView]);

  const handleSearchInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      dispatch(searchContentSaga(e.target.value));
      dispatch(showSearchModal());
    }
    else dispatch(hideSearchModal());
  }, 200);
  const handleSearchAndFocus = React.useCallback(() => {
    searchInputRef?.current?.value === ""
      ? searchInputRef.current.focus()
      : goPage(`/search/${searchInputRef?.current?.value}`);
  }, [goPage, searchInputRef]);
  const handleSearchKeyPress = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goPage(`/search/${Object(e.target).value}`);
      dispatch(hideSearchModal());
    }
  }, [dispatch, goPage]);

  return {
    searchInputRef, searchViewRef, isPostPage, postId, searchData, searchView,
    goPage, handleSearchInput, handleSearchAndFocus, handleSearchKeyPress
  };
}

const HandleCategoryFunction = () => {
  const [isDisplayCategory, setDisplayCategory] = React.useState<boolean>(false);

  const toggleMenuDisplay = React.useCallback((bool?: boolean | undefined) => {
    typeof bool === "boolean" ? setDisplayCategory(() => bool) : setDisplayCategory(() => !isDisplayCategory);
  }, [isDisplayCategory]);
  return {
    isDisplayCategory,
    toggleMenuDisplay
  }
}

const HandlePostDataFunction = (dispatch: Dispatch<any>, goPage: (content: string) => void) => {
  const goEditorPage = (postId?: string | undefined) => {
    goPage(`/editor${(postId ? `?id=${postId}` : "")}`);
  }
  const showRemoveModal = React.useCallback(() => {
    dispatch(showModal('remove'));
  }, [dispatch]);

  return {
    goEditorPage, showRemoveModal
  }
}

const AuthenticationFunction = (dispatch: Dispatch<any>) => {
  const logged = useSelector<RootState, boolean>(state => state.base.logged);
  const handleLoginClick = async (e: any) => {
    e.stopPropagation();
    // login 상태일 때, logout 처리
    if (logged) {
      try {
        await dispatch(reqLogout());
        document.documentElement.scrollTop = 0;
        localStorage.removeItem('logged');
        window.location.reload();
      }
      catch (e) {
        console.error(e);
      }
    }
    // logout 상태일 때, login modal을 띄운다.
    else {
      // 로그인 창을 제외한 화면을 마우스로 누르면 modal을 제거한다.
      document.body.addEventListener('mousedown', (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
        const closestElement = target.closest('.modal-wrapper');
        if (!closestElement) {
          dispatch(hideModal('login'));
        }
      }, {
        once: true // 이벤트가 한번만 발생하고, 이벤트를 제거한다.
      });
      dispatch(showModal('login'));
      dispatch(initializeLoginModal());
    }
  }
  return {
    logged,
    handleLoginClick
  }
}

type HeaderContainerProps = {
  search: string | undefined,
}

const HeaderContainer: React.FC<RouteComponentProps<HeaderContainerProps>> = ({ match }) => {
  const dispatch = useDispatch();

  // 인자로 받은 URL 주소의 값으로 페이지를 이동한다.
  const goPage = React.useCallback((content: string) => {
    dispatch(push(content));
  }, [dispatch]);
  // Brand Icon을 누르면, 홈페이지로 돌아가거나, 홈페이지면 새로고침을 하는 함수.
  const goHomepage = React.useCallback(() => {
    match.url === "/"
      ? window.location.reload()
      : history.push('/');
  }, [match.url]);

  // 검색 관련 기능을 수행하는 함수.
  const { searchInputRef, searchViewRef, isPostPage, postId, searchData, searchView,
    handleSearchInput, handleSearchAndFocus, handleSearchKeyPress
  } = HandleSearchFunction(dispatch, match.url, goPage);

  // 카테고리 관련 기능을 수행하는 함수.
  const { isDisplayCategory, toggleMenuDisplay } = HandleCategoryFunction();

  // 포스트를 작성, 수정하는 페이지로 이동하거나, 포스트를 삭제하는 모달을 다루는 기능을 수행하는 함수.
  const { goEditorPage, showRemoveModal } = HandlePostDataFunction(dispatch, goPage);

  // 유저의 인증을 관리하는 함수.
  const { logged, handleLoginClick } = AuthenticationFunction(dispatch);

  return (
    <Header
      isDisplayCategory={isDisplayCategory} searchInputRef={searchInputRef} searchViewRef={searchViewRef} isPostPage={isPostPage}
      postId={postId} logged={logged} searchData={searchData} searchPath={match.params.search}
      searchView={searchView}
      goHomepage={goHomepage} goEditorPage={goEditorPage} showRemoveModal={showRemoveModal} handleSearchInput={handleSearchInput}
      handleSearchAndFocus={handleSearchAndFocus} handleSearchKeyPress={handleSearchKeyPress}
      goPage={goPage} toggleMenuDisplay={toggleMenuDisplay} handleLoginClick={handleLoginClick}
    />
  );
}

export default withRouter(HeaderContainer);
