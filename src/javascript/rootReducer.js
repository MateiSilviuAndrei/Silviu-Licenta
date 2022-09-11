import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';

const createRootReducer = () =>
  combineReducers({
    user: userReducer,
  });

export const rootReducer = createRootReducer();
