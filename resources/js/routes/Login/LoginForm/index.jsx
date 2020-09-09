import React from 'react';
import { Formik, Form, Field } from 'formik';
import './loginForm.scss'
import { loginPasswordSchema } from "../../../helpers/schemas";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const LoginForm = ({ message, logInFunc }) => {
  return (
    <div className="login-form container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {message && <ul className="error-message">{message}</ul>}
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            validationSchema={loginPasswordSchema}
            onSubmit={values => {
              logInFunc(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
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
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    labelText="Password"
                  />
                </div>
                <Button type="submit" style="primary">
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>);
}

export default LoginForm;