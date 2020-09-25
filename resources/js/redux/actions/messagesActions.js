export const FETCH_DIALOGS = 'FETCH_DIALOGS';

const getDialogs = () => ({
  type: FETCH_DIALOGS,
  request: {
    url: `/messages`,
    method: 'get',
  }
});

export default {
  getDialogs,
};
