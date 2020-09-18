import {
  ADD_FEED_POSTS,
  SET_FEED_LOADING,
  SET_FEED_CURRENT_PAGE,
  SET_FEED_TOTAL_PAGES
} from '../actions/feedActions';

export const initialState = {
  feedPosts: [],
  feedLoading: false,
  feedCurrentPage: 1,
  feedTotalPages: undefined,
};

export const Feed = (store = initialState, action) => {
  switch (action.type) {
    case ADD_FEED_POSTS:
      return {
        ...store,
        feedPosts: [...store.feedPosts, ...action.posts],
      };
    case SET_FEED_LOADING:
      return {
        ...store,
        feedLoading: action.status,
      };
    case SET_FEED_CURRENT_PAGE:
      return {
        ...store,
        feedCurrentPage: action.page,
      };
    case SET_FEED_TOTAL_PAGES:
      return {
        ...store,
        feedTotalPages: action.pages,
      };
    default:
      return store;
  }
};
