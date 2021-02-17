import { all } from 'redux-saga/effects';
import { sagas as BlogSagas } from './blog';

export default function* rootSaga() {
  yield all([BlogSagas()]);
}