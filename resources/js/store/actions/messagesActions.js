export const FETCH_DIALOGS = 'FETCH_DIALOGS';
export const FETCH_DIALOG_MESSAGES = 'FETCH_DIALOG_MESSAGES';
const SEND_MESSAGE = 'SEND_MESSAGE';
const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';

const getDialogs = () => ({
  type: FETCH_DIALOGS,
  request: {
    url: `/dialogs`,
    method: 'get',
  },
});

const getDialogMessages = (id, page) => ({
  type: FETCH_DIALOG_MESSAGES,
  request: {
    url: `/dialogs/${id}/messages?page=${page}`,
    method: 'get',
  },
  meta: {
    getData: (newData, currentData) => {
      return currentData
        ? {
          ...newData,
          data: {data: [...currentData.data.data, ...newData.data.data], user: currentData.data.user},
        }
        : {...newData}
    },
  }
});

const sendMessage = (id, message) => ({
  type: SEND_MESSAGE,
  request: {
    url: `/dialogs/${id}/messages`,
    method: 'post',
    data: message
  },
  meta: {
    mutations: {
      [FETCH_DIALOG_MESSAGES]: {
        updateData: (currentMessages, newMessage) => ({
          ...currentMessages,
          data: {data: [newMessage, ...currentMessages.data.data], user: currentMessages.data.user}
        })
      },
    },
  },
})

const addReceivedMessage = (message) => ({
  type: RECEIVED_MESSAGE,
  meta: {
    mutations: {
      [FETCH_DIALOG_MESSAGES]: {
        updateData: (currentMessages) => {
            return ({
              ...currentMessages,
              data: {data: [message, ...currentMessages.data.data], user: currentMessages.data.user}
            })
        },
        local: true,
      },
    },
  },
})

export default {
  getDialogs,
  getDialogMessages,
  sendMessage,
  addReceivedMessage
};
