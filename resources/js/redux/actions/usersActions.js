import apis from "../../api";
import {
  FETCH_USER,
  FETCH_USER_POSTS,
} from '../constants';

const getUser = (id) => ({
  type: FETCH_USER,
  request: {
    url: `/users/${id}`,
    method: 'get',
  }
});

const getUserPosts = (id) => ({
  type: FETCH_USER_POSTS,
  request: {
    url: `users/${id}/posts`,
    method: 'get',
  }
});

export default {
  getUser,
  getUserPosts
};
