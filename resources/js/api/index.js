import axios from '../helpers/axios';

const api = axios;

export const logIn = payload => api.post('/login', payload);
export const logOut = () => api.post('/logout');
export const register = payload => api.post(`/registration`, payload);

// export const getProfile = () => api.get('/profile');
export const updateProfile = payload => api.post('/profile', payload, {headers: {'Content-Type': 'multipart/form-data'}});

// export const getUser = id => api.get(`/users/${id}`);
// export const getUserPosts = id => api.get(`users/${id}/posts`);

// export const getPost = id => api.get(`/posts/${id}`);
// export const getPostComments = id => api.get(`/posts/${id}/comments`);
// export const addPost = payload => api.post(`/posts`, payload);
// export const deletePost = id => api.delete(`/posts/${id}`);

export const getDialogMessages = id => api.get(`/messages/${id}`);
export const getDialogs = () => api.get('/messages');

// export const getFeed = page => api.get(`/feed?page=${page}`);
export const getTags = name => api.get(`/tags?name=${name}`);

const apis = {
  logIn,
  logOut,
  register,
  updateProfile,
  getTags,
  getDialogMessages,
  getDialogs
};

export default apis;
