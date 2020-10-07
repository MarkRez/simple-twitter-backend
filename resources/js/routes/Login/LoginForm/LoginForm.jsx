import React from 'react';
import { Formik, Form, Field } from 'formik';
import './loginForm.scss'
import { loginPasswordSchema } from "../../../helpers/schemas";
import {Button} from "../../../components/UI";
import { Input } from "../../../components/UI/Inputs";

const LoginForm = ({ message, onSubmitClick }) => {
  return (
    <div className="login-form container mb-6">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {message && <ul className="error-message py-3 px-4 rounded">{message}</ul>}
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            validationSchema={loginPasswordSchema}
            onSubmit={values => {
              onSubmitClick(values);
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
                <Button type="submit" btnClassName="primary">
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
