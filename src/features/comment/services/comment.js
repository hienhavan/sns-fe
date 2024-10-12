import axios from '../../../utils/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Lấy tất cả bình luận theo ID bài viết
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage

      const response = await axios.get(`/apihost/api/v1/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
        },
      });
      return response.data; // Trả về dữ liệu bình luận
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  }
);

// Tạo một bình luận
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, userId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage

      const response = await axios.post(`/apihost/api/v1/posts/${postId}/comments`, {
        userId,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token vào header
        },
      });

      if (response.status === 201) {
        return response.data; // Trả về dữ liệu bình luận mới tạo
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  }
);
