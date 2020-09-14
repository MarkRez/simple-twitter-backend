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
        updateData: data => ({
          ...data,
          data: data.data.filter(post => post.id !== deletedPostId)
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
        updateData: (data, mutationData) => {
          let updatedPostIndex = data.data.findIndex(post => post.id === id);
          console.log(updatedPostIndex);
          data.data[updatedPostIndex] = mutationData;
          return ({
            ...data,
            data: data.data,
          })
        }
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
