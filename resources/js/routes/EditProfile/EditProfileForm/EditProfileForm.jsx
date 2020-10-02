import React, {useState, useEffect, useRef} from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Skeleton from "react-loading-skeleton";
import {Input, InputFile} from "../../../components/UI/Inputs";
import {Button} from "../../../components/UI";
import './editProfileForm.scss';
import {handleImageError} from "../../../helpers/anotherMethods";

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

const EditProfileForm = ({userData, onUpdateClick}) => {
  const {email, name, avatar} = userData;
  const photoRef = useRef(null);
  const [updatedAvatar, setUpdatedAvatar] = useState('');

  const handleFileUpload = (event, setFieldValue) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    setFieldValue('avatar', file);
    reader.onloadend = () => {
      setUpdatedAvatar(reader.result);
    }
    reader.readAsDataURL(file);
  }

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
              password_confirmation: '',
              currentPassword: '',
              avatar: ''
            }}
            validationSchema={EditProfileSchema}
            onSubmit={values => {
              onUpdateClick(values);
            }}
          >
            {({errors, touched, setFieldValue}) => (

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
                    component={InputFile}
                    onChange={(e) => handleFileUpload(e, setFieldValue)}
                    name="avatar"
                    className="form-control"
                    id="avatar"
                    inputRef={photoRef}
                  />
                  <div className="current-avatar-div position-relative mt-3">
                    {
                      !avatar ? <Skeleton width={150} height={150}/> :
                        <img onClick={() => photoRef.current.click()}
                             src={updatedAvatar ? updatedAvatar : avatar}
                             onError={handleImageError}
                             className="rounded"
                        />
                    }
                  </div>
                </div>
                {userData && <Button type="submit" style="primary"> Save </Button>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm;
