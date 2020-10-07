import axios from '../helpers/axios';
import {ROUTES} from "../helpers/routes";
const api = axios;

// Auth
export const logIn = payload => api.post(ROUTES.LOGIN, payload);
export const logOut = payload => api.post(ROUTES.LOGOUT, payload);
export const register = payload => api.post(ROUTES.REGISTRATION, payload);

// Profile
export const getProfile = () => api.get(ROUTES.PROFILE);
export const updateProfile = payload => api.post(ROUTES.PROFILE, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// User
export const getUser = id => api.get(`${ROUTES.USERS}/${id}`);
export const getUserPosts = (id, page) => api.get(`${ROUTES.USERS}/${id}/posts?page=${page}`);
export const followUser = id => api.post(`${ROUTES.USERS}/${id}/follow`);
export const unFollowUser = id => api.delete(`${ROUTES.USERS}/${id}/follow`);
export const blockUser = id => api.post(`${ROUTES.USERS}/${id}/follow`);
export const unBlockUser = id => api.delete(`${ROUTES.USERS}/${id}/follow`);

// Post
export const getPost = id => api.get(`${ROUTES.POSTS}/${id}`);
export const addPost = payload => api.post(`${ROUTES.POSTS}`, payload);
export const deletePost = id => api.delete(`${ROUTES.POSTS}/${id}`);
export const getPostComments = (id, page) => api.get(`${ROUTES.POSTS}/${id}/comments?page=${page}`);
export const addCommentToPost = id => api.post(`${ROUTES.POSTS}/${id}/comments`);
export const addReactionToPost = (id, payload) => api.post(`${ROUTES.POSTS}/${id}/like`, payload);
export const deleteReactionFromPost = (id) => api.delete(`${ROUTES.POSTS}/${id}/like`);

// Dialogs
export const getDialogId = id => api.get(`${ROUTES.USERS}/${id}/dialog`);
export const getDialogs = () => api.get(ROUTES.DIALOGS);
export const getDialogMessages = (id, page) => api.get(`${ROUTES.DIALOGS}/${id}/messages?page=${page}`);
export const sendMessage = id => api.post(`${ROUTES.DIALOGS}/${id}/messages`);

// Feed
export const getFeed = page => api.get(`${ROUTES.FEED}?page=${page}`);

// Tags
export const getTags = name => api.get(`${ROUTES.TAGS}?name=${name}`);
