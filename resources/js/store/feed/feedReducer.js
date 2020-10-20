import {Map, List} from "immutable";
import StoreItem from "../../helpers/StoreItem";
import skeletonArr from "../../helpers/skeletonArr";
import {
  FETCH_FEED,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_ERROR,
  RESET_FEED
} from './feedActions';

const initialState = Map({
  feed: new StoreItem(List(skeletonArr.slice(0, 5)), null, false, true),
});

const feed = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED: {
      return state.update('feed', (current) => ({
        ...current,
        loading: true,
        pristine: false
      }));
    }
    case FETCH_FEED_SUCCESS: {
      return state.update('feed', (current) => ({
        ...current,
        // data: [action.payload.data , ...current.data],
        data: current.data.concat(action.payload.data),
        loading: false
      }));
    }
    case FETCH_FEED_ERROR: {
      return state.set('feed', {error: action.payload.error, loading: false});
    }
    case RESET_FEED: {
      return state = initialState;
    }
    default: {
      return state;
    }
  }
}

export default feed;
