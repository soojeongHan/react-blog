import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import BlogService from "src/service/BlogService";

export type SearchType = {
  searchView: boolean,
  searchData: string[] | null,
  loading: boolean,
  error: boolean,
}

const initialState: SearchType = {
  searchView: false,
  searchData: [],
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
    const response = yield call(BlogService.searchContent, action.payload.content);
    const data: string[] = Array.from(response).map(v => {
      return Object(v).title
    })
    response.length
      ? yield put(searchSuccess(data))
      : yield put(searchFail());
  }
  catch (error) {
    console.error(error);
    yield put(push('/'));
  }
}