import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from '../features/auth/store/authSlice';
import postReducer from '../features/post/store/postSlice';
import userReducer from '../features/user/store/userSlice';
import commentReducer from '../features/comment/store/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    comment: commentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});
export default store;
