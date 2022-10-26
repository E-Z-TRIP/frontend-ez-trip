import { createSlice } from '@reduxjs/toolkit';

const IPAddress = createSlice({
  name: 'IPAddress',
  initialState: {
    value: null,
  },
  reducers: {
    addIP: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addIP } = IPAddress.actions;
export default IPAddress.reducer;
