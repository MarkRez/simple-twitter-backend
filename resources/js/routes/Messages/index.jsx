import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../store/actions";
import {dialogsSelector, dialogsReset} from "../../store/selectors";
import DialogsList from "./DialogsList";

const Messages = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(dialogsSelector);

  useEffect(() => {
    dispatch(allActions.messagesActions.getDialogs());
    return () => {
      dispatch(dialogsReset);
    }
  }, []);

  return (
    <div className="messages-page">
      <DialogsList
        dialogs={dialogs.data}
      />
    </div>
  )
}

export default Messages;
