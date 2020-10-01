import React, {useEffect, useRef} from "react";
import {useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom'
import Pusher from "pusher-js";
import Echo from 'laravel-echo';
import {store} from 'react-notifications-component';
import 'animate.css/animate.compat.css'
import 'react-notifications-component/dist/theme.css'
import allActions from "../../store/actions";

const Notifications = ({token, userId}) => {
  const dispatch = useDispatch();
  const currentPath = useRef('');
  const location = useLocation();
  currentPath.current = location.pathname;

  const options = {
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  };

  useEffect(()=>{
    const echo = new Echo(options);

    echo.private(`App.User.${userId}`)
      .listen('.user.mentioned', (data) => {
        store.addNotification({
          title: `You was mentioned in ${data.source.toLowerCase()}!`,
          message: data.text,
          type: "default",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
          }
        });
      });

    echo.private(`App.User.${userId}`)
      .listen('.message.received',(data) => {
        if (currentPath.current !== `/messages/${data.message.sender_id}`) {
          store.addNotification({
            title: `You received a new message!`,
            message: data.message.text,
            type: "default",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
            }
          });
        } else {
          dispatch(allActions.messagesActions.addReceivedMessage(data.message))
        }
      });
  }, [])


  return true;
}

export default Notifications;
