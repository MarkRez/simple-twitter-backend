import {
  ADD_USER_POST,
  DELETE_USER_POST,
  FETCH_USER,
  FETCH_USER_POSTS, UPDATE_USER_POST,
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
  meta: {
    mutations: {
      [FETCH_USER_POSTS]: {
        updateData: (currentData, mutationData) => ({
          ...current,
          data: currentData.data.map(post => post.id === id ? mutationData : post)
        })
      },
    },
  },
});

export default {
  getUser,
  getUserPosts,
  deleteUserPost,
  addUserPost,
  updateUserPost
};
