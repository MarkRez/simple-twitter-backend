import {deleteReactionFromPostRequest, reactionToPostRequest} from "./reactionActions";

export const FETCH_FEED = 'FETCH_FEED';
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
