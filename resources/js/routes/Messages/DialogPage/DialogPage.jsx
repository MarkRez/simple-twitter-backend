import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../../store/actions";
import {dialogMessagesSelector, dialogMessagesReset} from "../../../store/selectors";
import DialogMessagesList from "./DialogMessagesList/DialogMessagesList";
import DialogInfo from "./DialogInfo/DialogInfo";
import SendMessage from "./SendMessage/SendMessage";
import {HandleScroll} from "../../../components/HelperComponents";
import {ErrorComponent} from "../../../components/UI";

const DialogPage = ({currentUserId, ...props}) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;
  const scrollPage = useRef(1);
  const totalPages = useRef(1);
  const messagesIsLoading = useRef(false);

  const {data: {data: {data: messages, user}, meta}, loading, pristine, error} = useSelector(dialogMessagesSelector);
  messagesIsLoading.current = loading;

  useEffect(() => {
    totalPages.current = meta.last_page
  }, [messages])

  useEffect(() => {
    if (currentUserId) {
      (Number(currentUserId) !== Number(userId)) && dispatch(allActions.messagesActions.getDialogMessages(userId, scrollPage.current));
    }
    return () => {
      dispatch(dialogMessagesReset);
    }
  }, [currentUserId]);

  if (Number(currentUserId) === Number(userId)) {
    return (<ErrorComponent> You can't send messages to yourself!</ErrorComponent>);
  }

  const nextPage = async () => {
    if (!messagesIsLoading.current && !(scrollPage.current + 1 > totalPages.current)) {
      const r = await dispatch(allActions.messagesActions.getDialogMessages(userId, scrollPage.current + 1));
      scrollPage.current += 1
    }
  }

  const sendMessage = (message) => {
    dispatch(allActions.messagesActions.sendMessage(userId, {text: message}));
  }

  if (error) {
    let message = '';
    switch (error.response.status) {
      case 403:
        message = error.response.data;
        break;
      case 404:
        message = 'User not found!';
        break;
      default:
        message = 'Internal server error!'
    }
    return <ErrorComponent>{message}</ErrorComponent>
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
        loading={loading}
        pristine={pristine}
      />
      <HandleScroll
        handleFunc={nextPage}
      />
    </div>
  );
}

export default DialogPage;
