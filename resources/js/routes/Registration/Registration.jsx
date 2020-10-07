import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from '../../helpers/axios';
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import {register} from "../../api";
import {ROUTES} from "../../helpers/routes";

const Registration = () => {
  const [messages, setMessages] = useState('');
  let history = useHistory();

  const registerUser = async (values) => {
    try {
      const response = await register(values);
      if (response.status === 200) {
        setMessages('');
        history.push(ROUTES.LOGIN)
      }
    } catch (error) {
      const responseStatus = error.response.status;
      if (responseStatus === 422)  {
        setMessages(error.response.data.errors);
      } else {
        setMessages(["Something went wrong."]);
      }
    }
  }

  return (
    <div className="registration-page">
      <RegistrationForm
        onSubmitClick={registerUser}
        messages={messages}
      />
    </div>
  )
}

export default Registration;
