import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import LoginForm from "./LoginForm/LoginForm";
import allActions from "../../store/actions";
import {logIn} from "../../api";

const Login = (props) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const logInUser = async (values) => {
    try {
      const response = await logIn(values);
      if (response.status === 200) {
        setMessage('');
        localStorage.setItem('_token', response.data.token);
        dispatch (allActions.authActions.logIn());
        history.push('/')
      }
    } catch (error) {
      const responseStatus = error.response.status;
      if (responseStatus === 401)  {
        setMessage("Incorrect login or password.");
      } else {
        setMessage("Something went wrong.");
      }
    }
  }

  return (
    <div className="login-page">
      <LoginForm
        onSubmitClick={logInUser}
        message={message}
      />
    </div>
  )
}

export default Login;
