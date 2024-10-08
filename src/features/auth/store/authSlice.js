import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  try {
    const user = window.localStorage.getItem('sns_user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  user: getUserFromLocalStorage(),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      window.localStorage.setItem('sns_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      window.localStorage.removeItem('sns-user');
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
