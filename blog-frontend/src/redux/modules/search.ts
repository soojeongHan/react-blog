import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import BlogService from "src/service/BlogService";

export type SearchDataType = {
  postId: string,
  title: string,
}

export type SearchType = {
  searchView: boolean,
  searchData: SearchDataType[] | null,
  loading: boolean,
  error: boolean,
}

const initialState: SearchType = {
  searchView: false,
  searchData: null,
  loading: false,
  error: false,
}

const options = {
  prefix: 'blog/search'
}

export const { showSearchModal, hideSearchModal, searchSuccess, pending, searchFail, error } = createActions(
  {
    SHOW_SEARCH_MODAL: () => ({}),
    HIDE_SEARCH_MODAL: () => ({}),
    SEARCH_SUCCESS: (data: string[] | null) => ({ data }),
    SEARCH_FENDING: () => ({}),
    SEARCH_FAIL: () => ({}),
    SEARCH_ERROR: () => ({}),
  },
  options,
);

const reducer = handleActions<SearchType, any>(
  {
    SHOW_SEARCH_MODAL: (state) => ({
      ...state,
      searchView: true,
    }),
    HIDE_SEARCH_MODAL: (state) => ({
      ...state,
      searchView: false,
    }),
    SEARCH_SUCCESS: (state, action) => ({
      ...state,
      loading: false,
      searchData: action.payload.data,
    }),
    SEARCH_PENDING: (state) => ({
      ...state,
      loading: true,
    }),
    SEARCH_FAIL: (state) => ({
      ...state,
      searchData: null,
    }),
    SEARCH_ERROR: (_, action) => ({
      ...initialState,
      error: action.payload.error,
    }),
  },
  initialState,
  options
);

export default reducer;

export const { searchContent } = createActions(
  {
    SEARCH_CONTENT: (content: string) => ({ content }),
  },
  options
)

export function* sagas() {
  yield takeEvery(`${options.prefix}/SEARCH_CONTENT`, searchContentSaga);
}

interface SearchActionType extends AnyAction {
  payload: {
    content: string,
  }
}

function* searchContentSaga(action: SearchActionType) {
  try {
    const { data } = yield call(BlogService.searchContent, action.payload.content);
    console.log(data);
    const searchData: SearchDataType[] = Array.from(data).map(v => {
      const obj = {
        postId: Object(v)._id,
        title: Object(v).title
      };
      return obj;
    });
    searchData.length
      ? yield put(searchSuccess(searchData))
      : yield put(searchFail());
  }
  catch (error) {
    console.error(error);
    yield put(push('/'));
  }
}