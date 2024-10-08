import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // TODO: post reducers go here
  },
});

export default postSlice.reducer;
