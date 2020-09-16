import apis from "../../api";
import {
  FETCH_CURRENT_POST,
  FETCH_CURRENT_POST_COMMENTS,
  ADD_POST_COMMENT
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

const addPostComments = (id, payload) => ({
  type: ADD_POST_COMMENT,
  request: {
    url: `/posts/${id}/comments`,
    method: 'post',
    data: payload
  },
  meta: {
    mutations: {
      [FETCH_CURRENT_POST_COMMENTS]: {
        updateData: (data, mutationData) => {
          return ({
            ...data,
            data: [mutationData, ...data.data]
          })
        }
      },
    },
  },
});

export default {
  getPost,
  getPostComments,
  addPostComments
};
