import {
  SET_LOGGED_IN
} from '../constants';

export const initialState = {
  loggedIn: null,
};

export const User = (store = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...store,
        loggedIn: action.loggedIn,
      };
    default:
      return store;
  }
};
