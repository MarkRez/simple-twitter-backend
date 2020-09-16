import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import client from "../helpers/axios";
import thunk from 'redux-thunk';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import {User} from "../redux/reducers/userReducer";
import {Posts} from "../redux/reducers/postsReducer";
import {Users} from "../redux/reducers/usersReducer";
import {Feed} from "../redux/reducers/feedReducer";
import {Tags} from "../redux/reducers/tagsReducer";


export const configureStore = () => {
  const {requestsReducer, requestsMiddleware} = handleRequests({
    driver: createDriver(client),
  });

  const reducers = combineReducers({
    requests: requestsReducer,
    user: User,
    feed: Feed,
    tags: Tags
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
