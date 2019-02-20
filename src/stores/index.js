import { combineReducers, createStore } from 'redux';

import document from './document';
import config from './config';
export default createStore(
  combineReducers({
    document,
    config
  })
);
