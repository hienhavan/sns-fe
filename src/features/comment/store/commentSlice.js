import { createSlice } from '@reduxjs/toolkit';
import { fetchComments, addComment, deleteComment, updateComment } from '../services/comment'; // Nhập đúng tên các hàm

const initialState = {
  isLoading: false,
  error: '',
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = '';
    },
    resetComment: (state) => {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    // Lấy tất cả bình luận
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload; // Gán bình luận nhận được vào state
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload; // Lưu lỗi
      })
      // Thêm bình luận
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload); // Thêm bình luận mới vào danh sách
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload; // Lưu lỗi
      })
      // Xóa bình luận
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload); // Xóa bình luận
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload; // Lưu lỗi
      })
      // Cập nhật bình luận
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload; // Cập nhật bình luận
        }
      })
      .addCase(updateComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload; // Lưu lỗi
      });
  }
});

export const { clearMessage,resetComment } = commentSlice.actions;
export default commentSlice.reducer;
