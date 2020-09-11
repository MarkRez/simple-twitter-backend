import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import allActions from "../../redux/actions";

const EditProfile = ({ currentUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const updateProfile = (values) => {
    dispatch(allActions.userActions.updateProfileData(values))
      .then((res) => {
        history.push(`/users/${currentUser.id}`)
      })
  }

  return (
    <div className="edit-profile-page">
      <div className="text-center">
        <h1>Edit profile</h1>
      </div>
      <EditProfileForm
        userData={currentUser}
        updateFunc={updateProfile}
      />
    </div>
  )
}

export default EditProfile;
