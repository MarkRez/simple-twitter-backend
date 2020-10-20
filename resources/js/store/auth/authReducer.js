import { SET_LOGGED_IN } from "./authActions";

export const initialState = {
  loggedIn: null,
};

const Auth = (store = initialState, action) => {
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

export default Auth;
