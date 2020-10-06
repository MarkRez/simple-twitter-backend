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
          data: {messages: [...currentData.data.messages, ...newData.data.messages], user: currentData.data.user},
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
          data: {messages: [newMessage, ...currentMessages.data.messages], user: currentMessages.data.user}
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
              data: {messages: [message, ...currentMessages.data.messages], user: currentMessages.data.user}
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
