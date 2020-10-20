import {

} from './messagesActions';

const initialState = {
  data: [],
  error: {},
  loading: false
};

const messages = (state = initialState, action) => {
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

export default messages;
