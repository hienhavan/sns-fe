import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/apihost/api/v1/login', {
        email,
        password,
      });
      if (response.status === 200) {
        window.localStorage.setItem('sns_user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error('Thunk login:', error);
      alert(
        'Đăng nhập thất bại, vui lòng kiểm tra thông tin xác thực của bạn.',
      );
    }
  },
);


export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name, birthday, phone }, { rejectWithValue }) => {
    try {
      // TODO: un-comment these when api is done
      const response = await axios.post('/apihost/api/v1/register', {
        email,
        password,
        name,
        birthday,
        phone
      });
      alert('Registration successful!');
      window.localStorage.setItem('sns_user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
    }
  },
);

export default { login, register };