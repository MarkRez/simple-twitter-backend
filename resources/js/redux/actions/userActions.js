import {cleanObject} from "../../helpers/anotherMethods";

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
        return dispatch(setUserData(response.data))
      }
    } catch (error) {
      // throw new Error(error);
    }
  }
};

const updateProfileData = (data) => async (dispatch) => {
  let addEmptyAvatar = false;
  if (data.avatar === null) {
    addEmptyAvatar = true;
  }
  const clearData = cleanObject(data);
  const form = new FormData();
  Object.keys(clearData).forEach((key) => {
    clearData[key] && form.append(key, clearData[key]);
  })
  addEmptyAvatar && form.append('avatar', '');
  form.append('_method', 'put');

  try {
    const response = await apis.updateProfile(form);
    await dispatch(getProfileData());
    return response;
  } catch (error) {
    // throw new Error(error);
  }
};

export default {
  logIn,
  logOut,
  getProfileData,
  setLoggedIn,
  updateProfileData
};
