import {
  FETCH_PROFILE,
  SET_LOGGED_IN,
  SET_PROFILE_DATA,
  SET_PROFILE_IS_LOADING,
} from '../constants';
import {success, error} from "@redux-requests/core";

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
    case success('FETCH_PROFILE'):
      return {
        ...store,
        user: action.response.data
      }
    default:
      return store;
  }
};
