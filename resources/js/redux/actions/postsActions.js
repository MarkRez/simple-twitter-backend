export const FETCH_CURRENT_POST = 'FETCH_CURRENT_POST';
export const FETCH_CURRENT_POST_COMMENTS = 'FETCH_CURRENT_POST_COMMENTS';
const ADD_POST_COMMENT = 'ADD_POST_COMMENT';
const ADD_REACTION_TO_POST = 'ADD_REACTION_TO_POST'
const DELETE_REACTION_FROM_POST = 'DELETE_REACTION_FROM_POST';

import {
  deleteReactionFromPostRequest,
  reactionToPostRequest
} from "./reactionActions";

const getPost = (id) => ({
  type: FETCH_CURRENT_POST,
  request: {
    url: `/posts/${id}`,
    method: 'get',
  }
});

const getPostComments = (id, page) => ({
  type: FETCH_CURRENT_POST_COMMENTS,
  request: {
    url: `/posts/${id}/comments?page=${page}`,
    method: 'get',
  },
  meta: {
    getData: (newData, currentData) => {
      return currentData
        ? {
          ...newData,
          data: [...currentData.data, ...newData.data],
        }
        : {...newData}
    }
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
        updateData: (currentData, mutationData) => {
          return ({
            ...currentData,
            data: [mutationData, ...currentData.data]
          })
        }
      },
    },
  },
});

const updatePostMeta = () => ({
  mutations: {
    [FETCH_CURRENT_POST]: {
      updateData: (currentData, mutationData) => (mutationData)
    },
  },
});

const reactionToPost = (id, payload) => ({
  type: ADD_REACTION_TO_POST,
  request: reactionToPostRequest(id, payload),
  meta: updatePostMeta()
});

const deleteReactionFromPost = (id) => ({
  type: DELETE_REACTION_FROM_POST,
  request: deleteReactionFromPostRequest(id),
  meta: updatePostMeta()
});

export default {
  getPost,
  getPostComments,
  addPostComments,
  reactionToPost,
  deleteReactionFromPost
};
