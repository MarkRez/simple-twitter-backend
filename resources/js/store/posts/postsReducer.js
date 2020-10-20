import {

} from './postsActions';

const initialState = {
  data: [],
  error: {},
  loading: false
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case TEST: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default posts;
