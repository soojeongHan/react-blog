import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { PostReqType, PostResType } from 'src/types';
import BlogService from 'src/service/BlogService';
import { push, replace } from 'connected-react-router';
import { AnyAction } from 'redux';

export type BlogStateType = {
  post: PostResType | null;
  posts: PostResType[] | null;
  lastpage: number | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BlogStateType = {
  post: null,
  posts: null,
  lastpage: null,
  loading: false,
  error: null,
}

const options = {
  prefix: 'blog/posts'
}

export const { successPost, successList, pending, fail } = createActions(
  {
    SUCCESS_POST: (post) => ({ post }),
    SUCCESS_LIST: (posts, lastpage) => ({ posts, lastpage }),
  },
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
    SUCCESS_POST: (state, action) => ({
      ...state,
      post: action.payload.post,
      loading: false,
      error: null,
    }),
    SUCCESS_LIST: (state, action) => ({
      ...state,
      lastpage: action.payload.lastpage,
      posts: action.payload.posts,
      loading: false,
      error: null,
    }),
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
    GET_POST: (postId: number, isEditing: boolean) => ({ postId, isEditing }),
    GET_LIST: (page: number, tag: string) => ({ page, tag }),
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
    page: number,
    tag: string,
  }
}

function* getListSaga(action: GetListActionType) {
  try {
    yield put(pending());
    const response = yield call(BlogService.getList, action.payload.page, action.payload.tag);
    const posts: PostResType[] = Array.from(response.data).map(v => {
      const value = Object(v);
      const post = {
        postId: value._id,
        title: value.title,
        body: value.body,
        tags: value.tags,
        publishedDate: value.publishedDate,
      }
      return post;
    })
    const lastpage = response.headers.lastpage;
    yield put(successList(posts, lastpage));
    yield put(action.payload.tag
      ? replace(`${action.payload.tag}`)
      : action.payload.page !== 1
        ? replace(`${action.payload.page}`)
        : replace("/"));
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface GetPostActionType extends AnyAction {
  payload: {
    postId: number,
    isEditing: boolean,
  }
}

function* getPostSaga(action: GetPostActionType) {
  try {
    yield put(pending());
    const data = yield call(BlogService.getPost, action.payload.postId);
    const post: PostResType = {
      postId: data._id,
      title: data.title,
      body: data.body,
      tags: data.tags,
      publishedDate: data.publishedDate
    }
    yield put(successPost(post));
    yield put(replace(action.payload.isEditing ? `/editor?id=${action.payload.postId}` : `/post/${action.payload.postId}`));
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
    yield put(push("/"));
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
    yield put(push("/"));
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
    yield put(push(`/post/${action.payload.postId}`));
  }
  catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}