import { all } from 'redux-saga/effects';
import { sagas as BlogSagas } from './blog';
import { sagas as AuthSagas } from './base';
import { sagas as SearchSagas } from './search';

export default function* rootSaga() {
  yield all([
    BlogSagas(),
    AuthSagas(),
    SearchSagas(),
  ]);
}