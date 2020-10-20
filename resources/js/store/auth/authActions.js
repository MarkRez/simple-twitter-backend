import {logOut} from "../../api";
import profileActions from "../profile/profileActions";

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

const logOutUser = () => {
  return async (dispatch) => {
    dispatch(setLoggedIn(false));
    try {
      await logOut();
    } finally {
      await localStorage.removeItem('_token');
    }
  }
};

export default {
  logIn,
  logOutUser,
  setLoggedIn,
}
