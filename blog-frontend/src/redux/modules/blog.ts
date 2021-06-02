import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { PostReqType, PostResType } from 'src/types';
import BlogService from 'src/service/BlogService';
import { push } from 'connected-react-router';
import { AnyAction } from 'redux';
import qs from 'query-string';
import { history } from "../create";

export type BlogStateType = {
  post: PostResType | null;
  posts: PostResType[] | null;
  lastpage: number | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BlogStateType = {
  post: null,
  posts: [],
  lastpage: null,
  loading: false,
  error: null,
}

const options = {
  prefix: 'blog/posts'
}

export const { successPost, successList, successMoreList, success, pending, fail } = createActions(
  {
    SUCCESS_POST: (post) => ({ post }),
    SUCCESS_LIST: (posts, lastpage) => ({ posts, lastpage }),
    SUCCESS_MORE_LIST: (posts, lastpage) => ({ posts, lastpage }),
  },
  'SUCCESS',
  'PENDING',
  'FAIL',
  options,
);

const reducer = handleActions<BlogStateType, any>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state) => ({
      ...state,
      loading: false,
    }),
    SUCCESS_POST: (state, action) => ({
      ...state,
      post: action.payload.post,
      loading: false,
      error: null,
    }),
    SUCCESS_LIST: (state, action) => {
      return {
        ...state,
        lastpage: action.payload.lastpage,
        posts: action.payload.posts,
        loading: false,
        error: null,
      }
    },
    SUCCESS_MORE_LIST: (state, action) => {
      return {
        ...state,
        lastpage: action.payload.lastpage,
        posts: state.posts?.concat(action.payload.posts) || null,
        loading: false,
        error: null,
      }
    },
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options
);

export default reducer;

export const { getPost, getList, addPost, updatePost, deletePost } = createActions(
  {
    GET_POST: (postId: number, mode: string) => ({ postId, mode }),
    GET_LIST: (query: any, page: number) => ({ query, page }),
    ADD_POST: (post: PostReqType) => ({ post }),
    UPDATE_POST: (postId: number, post: PostReqType) => ({ postId, post }),
    DELETE_POST: (postId: number) => ({ postId }),
  },
  options
)

export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_POST`, getPostSaga);
  yield takeEvery(`${options.prefix}/GET_LIST`, getListSaga);
  yield takeEvery(`${options.prefix}/ADD_POST`, addPostSaga);
  yield takeEvery(`${options.prefix}/DELETE_POST`, deletePostSaga);
  yield takeEvery(`${options.prefix}/UPDATE_POST`, updatePostSaga);
}

interface GetListActionType extends AnyAction {
  payload: {
    query: any,
    page?: number,
  }
}

function* getListSaga(action: GetListActionType) {
  try {
    yield put(pending());
    const { query, page = 1 } = action.payload;
    const queryStringify = qs.stringify(query);
    const { data, lastpage } = yield call(BlogService.getList, queryStringify, page);

    const posts: PostResType[] = Array.from(data).map(v => {
      const value = Object(v);
      const post: PostResType = {
        ...value,
        postId: value._id,
      }
      return post;
    })
    yield put(Number(page) > 1
      ? successMoreList(posts, lastpage)
      : successList(posts, lastpage));
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface GetPostActionType extends AnyAction {
  payload: {
    postId: string,
  }
}

function* getPostSaga(action: GetPostActionType) {
  try {
    yield put(pending());
    const { postId } = action.payload;
    const { data } = yield call(BlogService.getPost, postId);

    const post: PostResType = {
      postId: data._id,
      title: data.title,
      body: data.body,
      tags: data.tags,
      publishedDate: data.publishedDate,
      updatedDate: data.updatedDate,
      category: data.category,
    }
    yield put(successPost(post));
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface AddPostActionType extends AnyAction {
  payload: {
    post: PostReqType
  }
}

function* addPostSaga(action: AddPostActionType) {
  try {
    yield put(pending());
    yield call(BlogService.writePost, action.payload.post);
    yield put(success());
    yield put(push("/"));
    yield history.go(0);
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface DeletePostActionType extends AnyAction {
  payload: {
    postId: number
  }
}

function* deletePostSaga(action: DeletePostActionType) {
  try {
    yield put(pending());
    yield call(BlogService.deletePost, action.payload.postId);
    yield put(success());
    yield put(push("/"));
    yield history.go(0);
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface UpdatePostActionType extends AnyAction {
  payload: {
    postId: number,
    post: PostReqType,
  }
}

function* updatePostSaga(action: UpdatePostActionType) {
  try {
    yield put(pending());
    yield call(BlogService.updatePost, action.payload.postId, action.payload.post);
    yield put(success());
    yield put(push(`/post/${action.payload.postId}`));
    yield history.go(0);
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}