import React from 'react';
import {prettyDate} from "../../../../helpers/dateConverter";
import './dialogMessagesList.scss';

const DialogMessagesList = ({messages, currentUserId, loading, pristine}) => {
  if (!currentUserId) {
    return <div className="w-100 mt-3 text-center">
      <h5>Loading...</h5>
    </div>
  }

  if (!pristine && !loading && !messages.length) {
    return <div className="w-100 mt-3 text-center">
      <h5>No messages.</h5>
    </div>
  }

  return (
    <div className="dialog-messages-list row">
      {messages.map(message => (
          <div
            key={message.id}
            className={"col-lg-12 message d-flex " + (currentUserId === message.sender_id ? "message-from-me" : "message-from-another")}
          >
            <div className="message-inner">
              <div className="message-text">
                {message.text}
              </div>
              <div className="message-time">
                {prettyDate(message.created_at, true)}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default DialogMessagesList;
