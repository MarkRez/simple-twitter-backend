import {getFeed as fetchFeed} from "../../api";
import {deleteReactionFromPostRequest, reactionToPostRequest} from "../actions/reactionActions";

export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_ERROR = 'FETCH_FEED_ERROR';
export const RESET_FEED = 'RESET_FEED';

const fetchFeedCall = () => ({ type: FETCH_FEED });
const fetchFeedSuccess = (data) => ({ type: FETCH_FEED_SUCCESS, payload: { data } });
const fetchFeedError = (error) => ({ type: FETCH_FEED_ERROR, payload: { error } });
export const resetFeed = () => ({ type: RESET_FEED });

export const getFeed1 = (page) => async (dispatch) => {
  dispatch(fetchFeedCall());
  try {
    const response = await fetchFeed(page);
    dispatch(fetchFeedSuccess(response.data));
  } catch ({ error }) {
    dispatch(fetchFeedError(error));
  }
};

const ADD_REACTION_TO_FEED_POST = 'ADD_REACTION_TO_FEED_POST';
const DELETE_REACTION_FROM_FEED_POST = 'DELETE_REACTION_FROM_FEED_POST';

const getFeed = (page) => ({
  type: FETCH_FEED,
  request: {
    url: `/feed?page=${page}`,
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

const updatePostMeta = (id) => ({
  mutations: {
    [FETCH_FEED]: {
      updateData: (currentData, mutationData) => ({
        ...currentData,
        data: currentData.data.map(post => post.id === id ? mutationData : post)
      })
    },
  },
});

const reactionToFeedPost = (id, payload) => ({
  type: ADD_REACTION_TO_FEED_POST,
  request: reactionToPostRequest(id, payload),
  meta: updatePostMeta(id)
});

const deleteReactionFromFeedPost = (id) => ({
  type: DELETE_REACTION_FROM_FEED_POST,
  request: deleteReactionFromPostRequest(id),
  meta: updatePostMeta(id)
});

export default {
  getFeed,
  reactionToFeedPost,
  deleteReactionFromFeedPost
};
