import {
  SET_LOGGED_IN,
  SET_USER_DATA,
} from '../constants';
import apis from "../../api";

const setLoggedIn = (loggedIn) => ({
  type: SET_LOGGED_IN,
  loggedIn,
});

const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData,
});

const logIn = () => {
  return (dispatch) => {
    dispatch(setLoggedIn(true));
    dispatch(getProfileData());
  }
};

const logOut = () => {
  return (dispatch) => {
    dispatch(setLoggedIn(false));
    try {
      apis.logOut();
    } finally {
      localStorage.removeItem('_token');
    }
  }
};

const getProfileData = () => {
  return async (dispatch) => {
    try {
      const response = await apis.getProfile();
      if (response.status === 200) {
        dispatch(setUserData(response.data))
      }
    } catch (error) {
      // console.log(error);
    }
  }
};

export default {
  logIn,
  logOut,
  getProfileData,
  setLoggedIn
}
