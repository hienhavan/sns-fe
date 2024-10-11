// import axios from 'axios';
import axios from '../../../utils/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/apihost/api/v1/posts');
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

      const response = await axios.post('/apihost/api/v1/posts', formData);

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
