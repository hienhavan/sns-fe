import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth'

const initialState = {
  auth: window.localStorage.getItem('sns_user'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSignOut: (state) => {
      window.localStorage.removeItem('sns_user');
      state.auth = {};
    },
  },
});

export default authSlice.reducer;
