import { combineReducers, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import blog, { BlogStateType } from 'src/redux/modules/blog';
import base, { BaseType } from './base';

export interface RootState {
  blog: BlogStateType;
  base: BaseType;
  router: Reducer<RouterState, AnyAction>;
}

const rootReducer = (history: History) =>
  combineReducers({
    blog,
    base,
    router: connectRouter(history),
  });

export default rootReducer;