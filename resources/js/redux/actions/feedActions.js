export const FETCH_FEED = 'FETCH_FEED';

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

export default {
  getFeed
};
