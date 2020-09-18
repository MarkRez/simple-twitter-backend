import {cleanObject} from "../../helpers/anotherMethods";

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const FETCH_PROFILE = 'FETCH_PROFILE';

import apis from "../../api";

const setLoggedIn = (loggedIn) => ({
  type: SET_LOGGED_IN,
  loggedIn,
});


const logIn = () => {
  return (dispatch) => {
    dispatch(getProfileData())
    dispatch(setLoggedIn(true))
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

const getProfileData = () => ({
  type: FETCH_PROFILE,
  request: {
    url: '/profile',
    method: 'get',
  }
});


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
