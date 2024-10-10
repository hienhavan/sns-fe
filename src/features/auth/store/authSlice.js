import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth';

const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem('sns_user');
  return user;
}


const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: getUserFromLocalStorage() ? true : false,
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
      window.localStorage.removeItem('sns_user');
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        login.pending, (state) => {
          state.isAuthenticated = false;
        })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        console.log('state on login successful', action);
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;

        // console.log('state on login failed', state.user, state.isAuthenticated)
      })
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
