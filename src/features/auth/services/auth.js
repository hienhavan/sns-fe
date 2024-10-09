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

      // Kiểm tra nếu mã trạng thái không phải là 200 (hoặc bất kỳ mã nào cho thành công)
      if (response.status !== 200) {
        alert('Đăng nhập thất bại, vui lòng kiểm tra thông tin xác thực của bạn.');
        return rejectWithValue('Đăng nhập thất bại');
      }

      // Lưu thông tin người dùng vào localStorage nếu đăng nhập thành công
      window.localStorage.setItem('sns-user', JSON.stringify(response.data));
      return response.data;
      
    } catch (error) {
      console.error('Error during login:', error);
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra khi đăng nhập');
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