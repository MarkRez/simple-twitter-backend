import {cleanObject} from "../../helpers/anotherMethods";
import {updateProfile} from "../../api";

export const FETCH_PROFILE = 'FETCH_PROFILE';

const getProfileData = () => ({
  type: FETCH_PROFILE,
  request: {
    url: '/profile',
    method: 'get',
  }
});

const updateProfileData = (data) => async (dispatch) => {
  let addEmptyAvatar = false;
  if (data.avatar === null) {
    addEmptyAvatar = true;
  }
  const clearData = cleanObject(data);
  const form = new FormData();
  Object.keys(clearData).forEach((key) => {
    clearData[key] && form.append(key, clearData[key]);
  })
  addEmptyAvatar && form.append('avatar', '');
  form.append('_method', 'put');

  try {
    return await updateProfile(form);
  } catch (error) {
    // throw new Error(error);
  } finally {
    await dispatch(getProfileData());
  }
};

export default {
  getProfileData,
  updateProfileData
};
