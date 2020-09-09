import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.user);

  const updateProfile = () => {
    console.log("Update profile func")
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