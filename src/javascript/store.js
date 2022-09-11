import {rootReducer} from './rootReducer';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';

const middlewares = [thunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export function generateNewStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
const store = generateNewStore();
export default store;
