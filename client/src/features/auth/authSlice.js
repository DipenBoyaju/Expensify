import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    removeCredentials: (state) => {
      state.currentUser = null;
      state.isAuthenticated = null;
    },
  },
});

export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;
