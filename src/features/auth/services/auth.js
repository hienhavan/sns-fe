import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // TODO: un-comment these when api is done
      const response = await axios.post('/apihost/api/v1/login', {
        email,
        password,
      });
      window.localStorage.setItem('sns-user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // TODO: un-comment these when api is done
      const response = await axios.post('/apihost/api/v1/register', {
        email,
        password,
      });
      alert('Registration successful!');
      window.localStorage.setItem('sns-user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
    }
  },
);

// const register = async ({ email, password }) => {
//   try {
//       const response = await axios.post('/api/v1/register', {
//           email,
//           password
//       });
//       return response.data;
//   } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//   }
// };

export default { login, register };