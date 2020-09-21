export const FETCH_FEED = 'FETCH_FEED';

const getFeed = (page) => ({
  type: FETCH_FEED,
  request: {
    url: `/feed?page=${page}`,
    method: 'get',
  },
  meta: {
    mutations: {
      [FETCH_FEED]: {
        updateData: (currentData, mutationData) => {
          console.log(currentData, mutationData);
          return ({
            ...currentData,
            data: [currentData.data, ...mutationData.data],
            ...mutationData
          })
        }
      },
    },
  },
});

export default {
  getFeed
};
