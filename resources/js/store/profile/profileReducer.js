import {

} from './profileActions';

const initialState = {
  data: [],
  error: {},
  loading: false
};

const profile = (state = initialState, action) => {
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

export default profile;
