import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // TODO: user reducers go here
  },
});

export default userSlice.reducer;
