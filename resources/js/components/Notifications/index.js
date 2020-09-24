import React from "react";
import Pusher from "pusher-js";
import Echo from 'laravel-echo';
import { store } from 'react-notifications-component';
import 'animate.css/animate.compat.css'
import 'react-notifications-component/dist/theme.css'

const Notifications = ({ token, userId }) => {

  const options = {
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS:true,
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  };

  const echo = new Echo(options);

  echo.private(`App.User.${userId}`).notification((data) => {
    store.addNotification({
      title: `You was mentioned in ${data.mention_source.toLowerCase()}!`,
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

  return true;
}

export default Notifications;
