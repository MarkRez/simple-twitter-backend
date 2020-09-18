export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
export const DELETE_USER_POST = 'DELETE_USER_POST';
export const ADD_USER_POST = 'ADD_USER_POST';
export const UPDATE_USER_POST = 'UPDATE_USER_POST';
export const REACTION_TO_USER_POST = 'REACTION_TO_USER_POST';
export const DELETE_REACTION_FROM_USER_POST = 'DELETE_REACTION_FROM_USER_POST';

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
  type: REACTION_TO_USER_POST,
  request: {
    url: `/posts/${id}/like`,
    method: 'post',
    data: payload
  },
  meta: updateUserPostMeta(id)
});

const deleteReactionFromUserPost = (id) => ({
  type: DELETE_REACTION_FROM_USER_POST,
  request: {
    url: `/posts/${id}/like`,
    method: 'delete',
  },
  meta: updateUserPostMeta(id)
});

export default {
  getUser,
  getUserPosts,
  deleteUserPost,
  addUserPost,
  updateUserPost,
  reactionToUserPost,
  deleteReactionFromUserPost
};
