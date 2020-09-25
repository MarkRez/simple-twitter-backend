import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../../redux/actions";
import {dialogMessagesSelector, dialogMessagesReset} from "../../../helpers/selectors";
import DialogMessagesList from "./DialogMessagesList";

const DialogPage = ({ currentUserId,...props}) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;

  const messages = useSelector(dialogMessagesSelector);

  useEffect(() => {
    dispatch(allActions.messagesActions.getDialogMessages(userId));
    return () => {
      dispatch(dialogMessagesReset);
    }
  }, []);

  return (
    <div className="dialog-page">
      {/*<DialogInfo />*/}
      {/*<SendMessage />*/}
      <DialogMessagesList
        currentUserId={currentUserId}
        messages={messages.data.data}
      />
    </div>
  );
}

export default DialogPage;
