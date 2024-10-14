import { createSlice } from '@reduxjs/toolkit';
import { getAllPosts, createPost, deletePost, updatePost } from '../services/post';


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
    }
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
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })
      // delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // update post
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  }
});

export const { clearMessage } = postSlice.actions;
export default postSlice.reducer;
