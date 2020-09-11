import apis from "../../api";
import {
  FETCH_CURRENT_POST,
  FETCH_CURRENT_POST_COMMENTS
} from '../constants';

const getPost = (id) => ({
  type: FETCH_CURRENT_POST,
  request: {
    url: `/posts/${id}`,
    method: 'get',
  }
});

const getPostComments = (id) => ({
  type: FETCH_CURRENT_POST_COMMENTS,
  request: {
    url: `/posts/${id}/comments`,
    method: 'get',
  }
});

export default {
  getPost,
  getPostComments
};
