import React, {useState, useEffect, useRef} from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Input from "../../../components/Input";
import InputFile from "../../../components/inputFile";
import Button from "../../../components/Button";
import './editProfileForm.scss';
import Skeleton from "react-loading-skeleton";


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

const EditProfileForm = ({userData, updateFunc}) => {
  const {email, name, avatar} = userData;
  const isDefaultAvatar = /.+default.+/.test(avatar)
  const photoRef = useRef(null);
  const [updatedAvatar, setUpdatedAvatar] = useState('');

  const handleImageError = (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  const handleFileUpload = (event, setFieldValue) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    setFieldValue('avatar', file);
    reader.onloadend = () => {
      setUpdatedAvatar(reader.result);
    }
    reader.readAsDataURL(file);
  }


  console.log(avatar)
  // const isDefaultAvatar = avatarFile.test(/.+default\.jpg/)


  return (
    <div className="edit-profile-form">
      <div>bla:{isDefaultAvatar} </div>
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
              updateFunc(values);
            }}
          >
            {({errors, touched, setFieldValue, isValid}) => (

              <Form noValidate>
                {isValid}
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
                  {/*{updatedAvatar}*/}
                  <div className="current-avatar-div">
                    {
                      !avatar ? <Skeleton width={150} height={150}/> :
                        <img onClick={() => photoRef.current.click()}
                             src={updatedAvatar ? updatedAvatar : avatar}
                             onError={handleImageError}
                        />
                    }
                  </div>
                </div>
                <Button type="submit" style="primary" disabled={!isValid}>
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
