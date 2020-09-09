import apis from "../../api";
import {
  SET_USER,
  SET_USER_POSTS,
  SET_USER_NOT_FOUND
} from '../constants';

const setUser = (userData) => ({
  type: SET_USER,
  userData,
});

const setUserPosts = (posts) => ({
  type: SET_USER_POSTS,
  posts,
});

const setUserNotFound = (status) => ({
  type: SET_USER_NOT_FOUND,
  status,
});

const getUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await apis.getUser(id);
      if (response.status === 200) {
        dispatch(setUser(response.data));
        dispatch(setUserNotFound(false));
      }
    } catch (error) {
      const responseStatus = error.response.status;
      if (responseStatus === 404) {
        dispatch(setUserNotFound(true));
      } else {
        console.log("Error");
      }
    }
  }
}

const getUserPosts = (id) => {
  return async (dispatch) => {
    try {
      const response = await apis.getUserPosts(id);
      if (response.status === 200) {
        dispatch(setUserPosts(response.data));
      }
    } catch (error) {
      //
    }
  }
}

export default {
  getUser,
  getUserPosts
};
