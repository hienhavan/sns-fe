// import axios from 'axios';
import axios from '../../../utils/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('/apihost/api/v1/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const createPost = createAsyncThunk(
  'post/create',
  async ({ content, userId, visibility, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('userId', userId);
      formData.append('visibility', visibility);
      if (file) {
        formData.append('file', file);
      }

      const token = localStorage.getItem('token');

      const response = await axios.post('/apihost/api/v1/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const updatePost = createAsyncThunk(
  'post/update',
  async ({ postId, content, visibility, file }, { rejectWithValue }) => {
    try {
      if (!content || !visibility) {
        return rejectWithValue('Nội dung và tính năng hiển thị không được để trống.');
      }

      const formData = new FormData();
      formData.append('content', content);
      formData.append('visibility', visibility);
      if (file) {
        formData.append('file', file);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Bạn cần đăng nhập để thực hiện hành động này.');
      }

      const response = await axios.put(`/apihost/api/v1/posts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      // Nếu không có response từ server
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || 'Đã xảy ra lỗi không xác định.'
        );
      }
      return rejectWithValue('Đã xảy ra lỗi không xác định.');
    }
  },
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`/apihost/api/v1/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return postId;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
