import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem('sns_user');
  return user;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: getUserFromLocalStorage() ? true : false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem('sns_user');
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        toast.error(action.payload, {
          position: 'top-center',
          autoClose: 1000,
        });
      })

      // register
      .addCase(register.fulfilled, () => {
        toast.success('successfully signed up', {
          position: 'top-center',
          autoClose: 1000,
        });
      })
      .addCase(register.rejected, (_, action) => {
        toast.error(action.payload, {
          position: 'top-center',
          autoClose: 1000,
        });
      });
  },
});

export const { handleLoginFail, handleLoginSuccess, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
