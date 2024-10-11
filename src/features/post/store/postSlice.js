import { createSlice } from '@reduxjs/toolkit';
import { getAllPosts, createPost } from '../services/post';

const initialState = {
  isLoading: false,
  error: '',
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all post
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // create post
      .addCase(createPost.pending, () => {
        (state) => (state.isLoading = true);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearMessage } = postSlice.actions;
export default postSlice.reducer;
