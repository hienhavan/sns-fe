import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const { token } = window.localStorage.getItem('sns-user');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

const axiosClient = axios.create();

export default axiosClient;
