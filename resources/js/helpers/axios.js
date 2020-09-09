import axios from 'axios'

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

client.interceptors.request.use(function (config) {
  const _token = localStorage.getItem('_token');

  if (_token) {
    config.headers.Authorization = `Bearer ${_token}`;
  }
  return config;
});

export default client;
