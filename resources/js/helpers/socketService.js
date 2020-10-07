import Echo from "laravel-echo";
import Pusher from "pusher-js";
import 'animate.css/animate.compat.css';
import 'react-notifications-component/dist/theme.css';

const socketService = (channel, listeners) => {
  const token = localStorage.getItem('_token');

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

  const echo = new Echo(options);

  listeners.forEach(({ listen, callback }) => {
    echo.private(channel)
      .listen(listen, callback)
  })

  return echo;
}

export default socketService;
