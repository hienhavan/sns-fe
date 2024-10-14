import axios from '../../../utils/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Lấy tất cả bình luận
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId, { rejectWithValue }) => {
    if (!postId) {
      return rejectWithValue('postId không được xác định.'); // Kiểm tra nếu postId không hợp lệ
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/apihost/api/v1/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data || []; // Trả về tất cả bình luận cho bài viết
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Tạo bình luận
export const addComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, content }, { rejectWithValue }) => {
    // if (!postId) {
    //   return rejectWithValue('postId không được xác định.'); // Kiểm tra nếu postId không hợp lệ
    // }
    console.log('postId:', postId)
    if (!content) {
      return rejectWithValue('Nội dung bình luận không được để trống.');
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/apihost/api/v1/posts/${postId}/comments`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Trả về bình luận vừa tạo
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Cập nhật bình luận
export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    if (!commentId) {
      return rejectWithValue('commentId không được xác định.'); // Kiểm tra nếu commentId không hợp lệ
    }

    if (!content) {
      return rejectWithValue('Nội dung bình luận không được để trống.');
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/apihost/api/v1/comments/${commentId}`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Trả về bình luận đã cập nhật
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Xóa bình luận
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, { rejectWithValue }) => {
    if (!commentId) {
      return rejectWithValue('commentId không được xác định.'); // Kiểm tra nếu commentId không hợp lệ
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/apihost/api/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return commentId; // Trả về ID bình luận đã xóa
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Đếm số lượng bình luận
export const countComments = createAsyncThunk(
  'comment/countComments',
  async (postId, { rejectWithValue }) => {
    if (!postId) {
      return rejectWithValue('postId không được xác định.'); // Kiểm tra nếu postId không hợp lệ
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/apihost/api/v1/posts/${postId}/comments/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Giả sử backend trả về số lượng bình luận
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
