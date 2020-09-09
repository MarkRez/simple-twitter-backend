import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import LoginForm from "./LoginForm";
import axios from '../../helpers/axios';
import allActions from "../../redux/actions";
import apis from "../../api";

const Login = (props) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const logIn = async (values) => {
    try {
      const response = await apis.logIn(values);
      if (response.status === 200) {
        setMessage('');
        localStorage.setItem('_token', response.data);
        dispatch (allActions.userActions.logIn());
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
        logInFunc={logIn}
        message={message}
      />
    </div>
  )
}

export default Login;