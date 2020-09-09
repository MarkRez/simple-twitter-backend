import {
  SET_USER,
  SET_USER_POSTS,
  SET_USER_NOT_FOUND
} from '../constants';

export const initialState = {
  user: {},
  userPosts: [{id: 'skeleton 1'}, {id: 'skeleton 2'}, {id: 'skeleton 3'}, {id: 'skeleton 4'}],
  userNotFound: false
};

export const Users = (store = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...store,
        user: action.userData,
      };
    case SET_USER_POSTS:
      return {
        ...store,
        userPosts: action.posts,
      };
    case SET_USER_NOT_FOUND:
      return {
        ...store,
        userNotFound: action.status,
      };
    default:
      return store;
  }
};