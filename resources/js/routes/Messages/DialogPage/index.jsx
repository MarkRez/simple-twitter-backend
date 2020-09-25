import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../../redux/actions";
import {dialogMessagesSelector, dialogMessagesReset} from "../../../helpers/selectors";
import DialogMessagesList from "./DialogMessagesList";
import DialogInfo from "./DialogInfo";

const DialogPage = ({ currentUserId,...props}) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;

  const {data:{data: {data: messages, user: user}}, loading} = useSelector(dialogMessagesSelector);

  useEffect(() => {
    dispatch(allActions.messagesActions.getDialogMessages(userId));
    return () => {
      dispatch(dialogMessagesReset);
    }
  }, []);

  return (
    <div className="dialog-page">
      <DialogInfo
        user={user}
      />
      {/*<SendMessage />*/}
      <DialogMessagesList
        currentUserId={currentUserId}
        messages={messages}
      />
    </div>
  );
}

export default DialogPage;
