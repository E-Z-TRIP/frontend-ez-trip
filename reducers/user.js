import { createSlice } from '@reduxjs/toolkit';

// This reducer is just a template, it can be modified
const user = createSlice({
  name: 'user',
  initialState: {
    value: false,
  },
  reducers: {
    mountUser: (state, action) => {
      state.value = action.payload;
    },
    dismountUser: () => {
      state.value = false;
    },
  },
});

export const { mountUser, dismountUser } = user.actions;
export const selectUser = (state) => state.user.value;
export default user.reducer;
