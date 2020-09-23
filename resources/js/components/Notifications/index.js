import React from "react";
import Pusher from "pusher-js";
import Echo from 'laravel-echo';

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
    console.log('notification');
  });

  return true;
}

export default Notifications;
