import { combineReducers, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import blog, { BlogStateType } from 'src/redux/modules/blog';
import base, { BaseType } from './base';
import search, { SearchType } from './search';

export interface RootState {
  blog: BlogStateType;
  base: BaseType;
  search: SearchType;
  router: Reducer<RouterState, AnyAction>;
}

const rootReducer = (history: History) =>
  combineReducers({
    blog,
    base,
    search,
    router: connectRouter(history),
  });

export default rootReducer;