import apis from "../../api";
import {
  ADD_FEED_POSTS,
  SET_FEED_LOADING,
  SET_FEED_CURRENT_PAGE,
  SET_FEED_TOTAL_PAGES
} from '../constants';

const setFeedPosts = (posts) => ({
  type: ADD_FEED_POSTS,
  posts,
});

const setFeedLoading = (status) => ({
  type: SET_FEED_LOADING,
  status,
});

const setCurrentPage = (page) => ({
  type: SET_FEED_CURRENT_PAGE,
  page,
});

const setTotalPages = (pages) => ({
  type: SET_FEED_TOTAL_PAGES,
  pages,
});

const getFeed = () => {
  return async (dispatch, getState) => {
    const state = getState()

    if (!state.feed.feedLoading) {
      try {
        dispatch(setFeedLoading(true))
        const response = await apis.getFeed(state.feed.feedCurrentPage);
        dispatch(setTotalPages(response.data.last_page));
        dispatch(setFeedPosts(response.data.data));
      } finally {
        dispatch(setFeedLoading(false))
      }
    }
  }
}

const nextPage = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const currentPage = state.feed.feedCurrentPage;

    if (!state.feed.feedLoading && !(currentPage + 1 > state.feed.feedTotalPages)) {
      dispatch(setCurrentPage(state.feed.feedCurrentPage + 1))
      dispatch(getFeed())
    }
  }
}

export default {
  getFeed,
  setFeedLoading,
  nextPage,
};
