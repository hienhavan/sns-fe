// postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPosts as fetchPosts } from '../services/post';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await fetchPosts();
      console.log("Fetched posts:", posts); // Thêm dòng này để kiểm tra giá trị
      return posts;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: '',
  posts: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = '';  // Clear any error messages
    },
    createPost: (state) => {
      state.error = '';  // Clear any error messages
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload; // Cập nhật đúng trường posts
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  }

});


export const { clearMessages, createPost } = postSlice.actions;
export default postSlice.reducer;
