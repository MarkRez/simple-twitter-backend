import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../redux/actions";
import apis from "../../api";

const Messages = () => {

  useEffect(() => {
      apis.getDialogMessages(1);
      apis.getDialogs();
  }, []);

  return (
    <div className="messages-page">
      <h1>Messages</h1>
    </div>
  )
}

export default Messages;
