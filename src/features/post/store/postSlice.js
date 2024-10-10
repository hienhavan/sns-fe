// postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: null,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action) => {
      // Logic để thêm bài viết vào state
    },
    clearMessages: (state) => {
      state.success = null;
      state.error = null;
    },
    // Các reducers khác
  },
});

export const { createPost, clearMessages } = postSlice.actions;
export default postSlice.reducer;
