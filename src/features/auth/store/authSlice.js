import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: window.localStorage.getItem('sns_user'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSignOut: (state) => {
      window.localStorage.removeItem('sns_user');
      state.user = {};
    },
  },
});

export default authSlice.reducer;
