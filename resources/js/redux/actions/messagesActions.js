export const FETCH_DIALOGS = 'FETCH_DIALOGS';
export const FETCH_DIALOG_MESSAGES = 'FETCH_DIALOG_MESSAGES';
const SEND_MESSAGE = 'SEND_MESSAGE';
const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';

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

const sendMessage = (id, message) => ({
  type: SEND_MESSAGE,
  request: {
    url: `/messages/${id}`,
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
