import apis from "../../api";
import profileActions from "../actions/profileActions";

export const SET_LOGGED_IN = 'SET_LOGGED_IN';

const setLoggedIn = (loggedIn) => ({
  type: SET_LOGGED_IN,
  loggedIn,
});

const logIn = () => {
  return (dispatch) => {
    dispatch(profileActions.getProfileData());
    dispatch(setLoggedIn(true));
  }
};

const logOut = () => {
  return async (dispatch) => {
    dispatch(setLoggedIn(false));
    try {
      await apis.logOut();
    } finally {
      await localStorage.removeItem('_token');
    }
  }
};

export default {
  logIn,
  logOut,
  setLoggedIn,
}
