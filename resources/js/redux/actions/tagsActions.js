import {
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
