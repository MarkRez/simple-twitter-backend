import { Map } from 'immutable';
import StoreItem from "../../helpers/StoreItem";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  RESET_USER
} from './userActions';

const initialState = Map({
  user: new StoreItem([], null, false, true),
});

const User = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return state.update('user', (current) => ({
        ...current,
        loading: true,
        pristine: false
      }));
    }
    case FETCH_USER_SUCCESS: {
      return state.update('user', (current) => ({
        ...current,
        data: action.payload.data,
        loading: false
      }));
    }
    case FETCH_USER_ERROR: {
      return state.update('user', (current) => ({
        ...current,
        error: action.payload.error,
        loading: false
      }));
    }
    case RESET_USER: {
      return state = initialState;
    }
    default: {
      return state;
    }
  }
}

export default User;
