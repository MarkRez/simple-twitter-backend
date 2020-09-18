import React from 'react';
import './registrationForm.scss'
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import { loginPasswordSchema } from "../../../helpers/schemas";
import Button from "../../../components/Button";
import Input from "../../../components/Inputs/Input";

const SignUpSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
}).concat(loginPasswordSchema);

const RegistrationForm = ({ messages, registerFunc }) => {
  const errorMessages = [];

  if (messages) {
    for (let message in messages) {
      errorMessages.push(<li key={message}>{messages[message]}</li>)
    }
  }

  return (
    <div className="registration-form">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {messages && <p className="error-messages">{errorMessages}</p>}
          <Formik
            initialValues={{
              name: '',
              login: '',
              email: '',
              password: '',
              password_confirmation: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={values => {
              registerFunc(values);
            }}
          >
            {({ errors, touched }) => (
              <Form noValidate>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    labelText="Name"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="login"
                    type="text"
                    className="form-control"
                    id="login"
                    labelText="Login"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    labelText="Email"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    labelText="Password"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="password_confirmation"
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    labelText="Confirm password"
                  />
                </div>
                <Button type="submit" style="primary">
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>);
}

export default RegistrationForm;
