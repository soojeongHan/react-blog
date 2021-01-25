import { combineReducers, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

export interface RootState {
  router: Reducer<RouterState, AnyAction>;
}

const rootReducer = (history: History) => 
  combineReducers({
    router: connectRouter(history),
  });

export default rootReducer;