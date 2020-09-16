import {
  FETCH_CURRENT_POST,
  FETCH_TAGS
} from '../constants';

const getTags = (name) => ({
  type: FETCH_TAGS,
  request: {
    url: `/tags?name=${name}`,
    method: 'get',
  }
});

export default {
  getTags
};
