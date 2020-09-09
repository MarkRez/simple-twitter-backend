import {
  SET_CURRENT_POST,
  SET_POST_COMMENTS,
  SET_POST_NOT_FOUND
} from '../constants';

export const initialState = {
  currentPost: {},
  posts: [],
  postNotFound: false,
  currentPostComments: [{id: "skeleton 1"}, {id: "skeleton 2"}, {id: "skeleton 3"}]
};

export const Posts = (store = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_POST:
      return {
        ...store,
        currentPost: action.post,
      };
    case SET_POST_COMMENTS:
      return {
        ...store,
        currentPostComments: action.comments,
      };
    case SET_POST_NOT_FOUND:
      return {
        ...store,
        postNotFound: action.status,
      };
    default:
      return store;
  }
};