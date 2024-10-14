import Axios from 'axios';
import { toast } from 'react-toastify';

const axios = Axios.create();

axios.interceptors.request.use(
  (config) => {
    const user = window.localStorage.getItem('sns-user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (parsedUser && parsedUser.token) {
      config.headers['Authorization'] = `Bearer ${parsedUser.token}`;
    }
  },
  (error) => {
    toast.error('something went wrong!', {
      position: 'top-center',
      autoClose: 3000,
    });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
);


export const getUserFromLocalStorage = () => {
  try {
    const user = window.localStorage.getItem('sns_user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};



export default axios;
