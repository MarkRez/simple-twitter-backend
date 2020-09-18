import {
  deleteReactionFromPostRequest,
  reactionToPostRequest
} from "./reactionActions";

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
const DELETE_USER_POST = 'DELETE_USER_POST';
const ADD_USER_POST = 'ADD_USER_POST';
const UPDATE_USER_POST = 'UPDATE_USER_POST';
const ADD_REACTION_TO_USER_POST = 'ADD_REACTION_TO_USER_POST';
const DELETE_REACTION_FROM_USER_POST = 'DELETE_REACTION_FROM_POST';
const FOLLOW_USER = 'FOLLOW_USER';
const UN_FOLLOW_USER = 'UN_FOLLOW_USER';

const updateUserPostMeta = (id) => ({
  mutations: {
    [FETCH_USER_POSTS]: {
      updateData: (currentData, mutationData) => ({
        ...currentData,
        data: currentData.data.map(post => post.id === id ? mutationData : post)
      })
    },
  },
});

const updateUserMeta = (id) => ({
  mutations: {
    [FETCH_USER]: {
      updateData: (currentData, mutationData) => (mutationData)
    },
  },
});

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

const deleteUserPost = (deletedPostId) => ({
  type: DELETE_USER_POST,
  request: {
    url: `posts/${deletedPostId}`,
    method: 'delete',
  },
  meta: {
    requestKey: deletedPostId,
    mutations: {
      [FETCH_USER_POSTS]: {
        updateData: currentData => ({
          ...currentData,
          data: currentData.data.filter(post => post.id !== deletedPostId)
        })
      },
    },
  }
});

const addUserPost = (payload) => ({
  type: ADD_USER_POST,
  request: {
    url: `/posts`,
    method: 'post',
    data: payload
  },
  meta: {
    mutations: {
      [FETCH_USER_POSTS]: {
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

const updateUserPost = (id, payload) => ({
  type: UPDATE_USER_POST,
  request: {
    url: `/posts/${id}`,
    method: 'put',
    data: payload
  },
  meta: updateUserPostMeta(id)
});

const reactionToUserPost = (id, payload) => ({
  type: ADD_REACTION_TO_USER_POST,
  request: reactionToPostRequest(id, payload),
  meta: updateUserPostMeta(id)
});

const deleteReactionFromUserPost = (id) => ({
  type: DELETE_REACTION_FROM_USER_POST,
  request: deleteReactionFromPostRequest(id),
  meta: updateUserPostMeta(id)
});

const followUser = (id) => ({
  type: FOLLOW_USER,
  request: {
    url: `/users/${id}/follow`,
    method: 'post',
  },
  meta: updateUserMeta(id)
})

const unFollowUser = (id) => ({
  type: UN_FOLLOW_USER,
  request: {
    url: `/users/${id}/follow`,
    method: 'delete',
  },
  meta: updateUserMeta(id)
})


export default {
  getUser,
  getUserPosts,
  deleteUserPost,
  addUserPost,
  updateUserPost,
  reactionToUserPost,
  deleteReactionFromUserPost,
  followUser,
  unFollowUser
};
