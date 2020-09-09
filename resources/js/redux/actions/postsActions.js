import apis from "../../api";
import {
  SET_CURRENT_POST,
  SET_POST_COMMENTS,
  SET_POST_NOT_FOUND
} from '../constants';

const setCurrentPost = (post) => ({
  type: SET_CURRENT_POST,
  post,
});

const setPostComments = (comments) => ({
  type: SET_POST_COMMENTS,
  comments,
});

const setPostNotFound = (status) => ({
  type: SET_POST_NOT_FOUND,
  status,
});

const getPost = (id) => {
  return async (dispatch) => {
    try {
      const response = await apis.getPost(id);
      if (response.status === 200) {
        dispatch(setCurrentPost(response.data));
      }
    } catch (error) {
      const responseStatus = error.response.status;
      if (responseStatus === 404) {
        dispatch(setPostNotFound(true));
      } else {
        console.log("Error");
      }
    }
  }
}

const getPostComments = (id) => {
  return async (dispatch) => {
    try {
      const response = await apis.getPostComments(id);
      if (response.status === 200) {
        dispatch(setPostComments(response.data));
      }
    } catch (error) {
      console.log("Error");
    }
  }
}

export default {
  getPost,
  getPostComments
};
