import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../../redux/actions";
import {dialogMessagesSelector, dialogMessagesReset} from "../../../helpers/selectors";
import DialogMessagesList from "./DialogMessagesList";
import DialogInfo from "./DialogInfo";
import SendMessage from "./SendMessage";
import HandleScroll from "../../../components/HandleScroll";

const DialogPage = ({ currentUserId,...props}) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;
  const scrollPage = useRef(1);
  const totalPages = useRef(1);
  const messagesIsLoading = useRef(false);

  const {data:{data: {data: messages, user}, meta}, loading} = useSelector(dialogMessagesSelector);
  messagesIsLoading.current = loading;

  useEffect(() => {
    totalPages.current = meta.last_page
  }, [messages])

  useEffect(() => {
    dispatch(allActions.messagesActions.getDialogMessages(userId, scrollPage.current));
    return () => {
      dispatch(dialogMessagesReset);
    }
  }, []);

  const nextPage = async () => {
    if (!messagesIsLoading.current && !(scrollPage.current + 1 > totalPages.current)) {
      const r = await dispatch(allActions.messagesActions.getDialogMessages(userId ,scrollPage.current + 1));
      console.log({r});
      scrollPage.current += 1
    }
  }

  const sendMessage = (message) => {
    dispatch(allActions.messagesActions.sendMessage(userId, {text: message}));
  }

  return (
    <div className="dialog-page">
      <DialogInfo
        user={user}
      />
      <SendMessage
        sendMessageFunc={sendMessage}
      />
      <DialogMessagesList
        currentUserId={currentUserId}
        messages={messages}
      />
      <HandleScroll
        handleFunc={nextPage}
      />
    </div>
  );
}

export default DialogPage;
