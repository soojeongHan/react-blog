import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import AuthService from "src/service/AuthService";

export type BaseType = {
  modal: {
    remove: boolean,
    login: boolean,
  },
  loginModal: {
    password: string,
    error: boolean,
  },
  logged: boolean,
}

const initialState: BaseType = {
  modal: {
    remove: false,
    login: false,
  },
  loginModal: {
    password: '',
    error: false,
  },
  logged: false,
}

const options = {
  prefix: 'blog/base'
}

export const { showModal, hideModal, loginSuccess, loginError, logout, checkLogin, changePasswordInput, initializeLoginModal, tempLogin } = createActions(
  {
    SHOW_MODAL: (modalName) => ({ modalName }),
    HIDE_MODAL: (modalName) => ({ modalName }),
    LOGIN_SUCCESS: () => ({}),
    LOGIN_ERROR: () => ({}),
    LOGOUT: () => ({}),
    CHECK_LOGIN: (logged: boolean) => ({ logged }),
    CHANGE_PASSWORD_INPUT: (password: string) => ({ password }),
    INITIALIZE_LOGIN_MODAL: () => ({}),
    TEMP_LOGIN: () => ({}),
  },
  options,
);

const reducer = handleActions<BaseType, any>(
  {
    SHOW_MODAL: (state, action) => ({
      ...state,
      modal: {
        ...state.modal,
        [action.payload.modalName]: true,
      }
    }),
    HIDE_MODAL: (state, action) => ({
      ...state,
      modal: {
        ...state.modal,
        [action.payload.modalName]: false,
      }
    }),
    LOGIN_SUCCESS: (state) => ({
      ...state,
      modal: {
        ...state.modal,
        login: false,
      },
      loginModal: {
        password: '',
        error: false,
      },
      logged: true,
    }),
    LOGIN_ERROR: (state) => ({
      ...state,
      loginModal: {
        password: '',
        error: true,
      },
      logged: false,
    }),
    LOGOUT: (state) => ({
      ...state,
      logged: false,
    }),
    CHECK_LOGIN: (state, action) => ({
      ...state,
      logged: action.payload.logged
    }),
    CHANGE_PASSWORD_INPUT: (state, action) => ({
      ...state,
      loginModal: {
        ...state.loginModal,
        password: action.payload.password,
      }
    }),
    INITIALIZE_LOGIN_MODAL: (state) => ({
      ...state,
      loginModal: initialState.loginModal
    }),
    TEMP_LOGIN: (state) => ({
      ...state,
      logged: true,
    })
  },
  initialState,
  options
);

export default reducer;

export const { reqLogin, reqLogout, reqCheckLogin } = createActions(
  {
    REQ_LOGIN: (password: string) => ({ password }),
  },
  'REQ_LOGOUT',
  'REQ_CHECK_LOGIN',
  options
)

export function* sagas() {
  yield takeEvery(`${options.prefix}/REQ_LOGIN`, reqLoginSaga);
  yield takeEvery(`${options.prefix}/REQ_LOGOUT`, reqLogoutSaga);
  yield takeEvery(`${options.prefix}/REQ_CHECK_LOGIN`, reqCheckLoginSaga);
}

interface LoginActionType extends AnyAction {
  payload: {
    password: string,
  }
}

function* reqLoginSaga(action: LoginActionType) {
  try {
    const { data } = yield call(AuthService.login, action.payload.password);
    localStorage.setItem('logged', 'true');
    yield data.success ? put(loginSuccess()) : put(loginError());
  }
  catch (error) {
    console.error(error);
    yield put(push('/'));
  }
}

function* reqLogoutSaga() {
  try {
    yield call(AuthService.logout);
    yield put(logout());
    yield put(push('/'));
  }
  catch (error) {
    throw new Error(error);
  }
}

function* reqCheckLoginSaga() {
  try {
    const { logged }: { logged: boolean } = yield call(AuthService.checkLogin);
    localStorage.setItem('logged', logged ? 'true' : 'false');
    yield put(checkLogin(logged));
  }
  catch (error) {
    throw new Error(error);
  }
}