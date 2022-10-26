import { createSlice } from '@reduxjs/toolkit';

// This reducer is just a template, it can be modified
const user = createSlice({
  name: 'user',
  initialState: {
    value: false,
    favorites: [],
  },
  reducers: {
    mountUser: (state, action) => {
      state.value = action.payload;
    },
    dismountUser: () => {
      state.value = false;
    },
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    }
  },
});

export const { mountUser, addFavorites, setFavorites } = user.actions;
export const selectUser = (state) => state.user.value;
export default user.reducer;
