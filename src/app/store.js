import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import postRducer from '../features/post/store/postSlice';
import userReducer from '../features/user/store/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postRducer,
  },
});

// store.subscribe(() => console.log(store.getState()));

export default store;
