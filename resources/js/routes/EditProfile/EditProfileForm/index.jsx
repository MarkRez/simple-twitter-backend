import React from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {clearObject} from "../../../helpers/anotherMethods";

const EditProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(35, 'Too Long!'),
  password_confirmation: Yup.string()
    .when('password', {
      is: (password) => password && password.length > 0,
      then: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      otherwise: Yup.string()
        .min(4, 'Too Short!')
        .max(35, 'Too Long!')
    }),
  currentPassword: Yup.string()
    .when('password', {
      is: (password) => password && password.length > 0,
      then: Yup.string()
        .min(4, 'Too Short!')
        .max(35, 'Too Long!')
        .required('Required'),
      otherwise: Yup.string()
        .min(4, 'Too Short!')
        .max(35, 'Too Long!')
    })
});

const EditProfileForm = ({ userData, updateFunc }) => {
  const { email, name } = userData;
  const errorMessages = [];

  return (
    <div className="edit-profile-form">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: name || '',
              email: email || '',
              password: '',
              passwordConfirmation: '',
              currentPassword: ''
            }}
            validationSchema={EditProfileSchema}
            onSubmit={values => {
              clearObject(values);
              updateFunc(values)
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
                    labelText="New password"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="password_confirmation"
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    labelText="Confirm new password"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={Input}
                    name="currentPassword"
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    labelText="Current password"
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
