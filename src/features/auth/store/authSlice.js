import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // trạng thái xác thực
  user: null, // thông tin người dùng
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
