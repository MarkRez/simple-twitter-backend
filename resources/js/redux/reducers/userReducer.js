import {
  SET_LOGGED_IN,
  SET_USER_DATA,
} from '../constants';

export const initialState = {
  loggedIn: null,
  user: {}
};

export const User = (store = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...store,
        loggedIn: action.loggedIn,
      };
    case SET_USER_DATA:
      return {
        ...store,
        user: action.userData,
      };
    default:
      return store;
  }
};