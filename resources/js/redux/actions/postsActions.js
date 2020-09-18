export const FETCH_CURRENT_POST = 'FETCH_CURRENT_POST';
export const FETCH_CURRENT_POST_COMMENTS = 'FETCH_CURRENT_POST_COMMENTS';
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT';

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

export default {
  getPost,
  getPostComments,
  addPostComments
};
