import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import userReducer from '../features/post/store/postSlice';
import postRducer from '../features/user/store/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postRducer,
  },
});

store.subscribe(() => console.log(store.getState()));

export default store;
