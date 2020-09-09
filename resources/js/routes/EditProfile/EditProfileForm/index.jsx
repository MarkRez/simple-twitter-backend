import React from "react";
import * as Yup from "yup";
import {loginPasswordSchema} from "../../../helpers/schemas";
import {Field, Form, Formik} from "formik";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const EditProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
}).concat(loginPasswordSchema);

const EditProfileForm = ({ userData, updateFunc }) => {
  const { login, email, name } = userData;
  const errorMessages = [];

  return (
    <div className="edit-profile-form">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: name || '',
              login: login || '',
              email: email || '',
              password: '',
            }}
            validationSchema={EditProfileSchema}
            onSubmit={values => {
              updateFunc();
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
                    name="avatar"
                    type="file"
                    className="form-control"
                    id="avatar"
                    labelText="Avatar"
                  />
                </div>
                <Button type="submit" style="primary">
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm;