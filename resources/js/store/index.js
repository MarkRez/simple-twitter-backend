import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import client from "../helpers/axios";
import thunk from 'redux-thunk';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import Auth from "./auth/authReducer";
import User from './user/userReducer';

export const configureStore = () => {
  const {requestsReducer, requestsMiddleware} = handleRequests({
    driver: createDriver(client),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    auth: Auth,
    user: User
  });

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...requestsMiddleware, thunk)),
  );

  return store;
};
