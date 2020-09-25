export const FETCH_DIALOGS = 'FETCH_DIALOGS';
export const FETCH_DIALOG_MESSAGES = 'FETCH_DIALOG_MESSAGES';

const getDialogs = () => ({
  type: FETCH_DIALOGS,
  request: {
    url: `/messages`,
    method: 'get',
  }
});

const getDialogMessages = (id, page) => ({
  type: FETCH_DIALOG_MESSAGES,
  request: {
    url: `/messages/${id}?page=${page}`,
    method: 'get',
  }
});

export default {
  getDialogs,
  getDialogMessages
};
