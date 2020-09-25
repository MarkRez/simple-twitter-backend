import React from 'react';
import './dialogMessagesList.scss';
import {Link} from "react-router-dom";
import {prettyDate} from "../../../../helpers/dateConverter";

const DialogMessagesList = ({ messages, currentUserId }) => {
  return (
    <div className="dialog-messages-list row">
      {messages.map(message => (
          <div key={message.id} className={"col-lg-12 message d-flex " + (currentUserId === message.sender_id ? "message-from-me" : "message-from-another")}>
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
