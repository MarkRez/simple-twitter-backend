import axios from '../helpers/axios';

const api = axios;

export const logIn = payload => api.post('/login', payload);
export const logOut = () => api.post('/logout');
export const register = payload => api.post(`/registration`, payload);

export const getProfile = () => api.get('/profile');
export const updateProfile = payload => api.put('/profile', payload);

export const getUser = id => api.get(`/users/${id}`);
export const getUserPosts = id => api.get(`users/${id}/posts`);

export const getPost = id => api.get(`/posts/${id}`);
export const getPostComments = id => api.get(`/posts/${id}/comments`);

export const getFeed = page => api.get(`/feed?page=${page}`);

const apis = {
  logIn,
  logOut,
  register,
  getUser,
  getPost,
  getPostComments,
  getUserPosts,
  getProfile,
  updateProfile,
  getFeed
};

export default apis;
