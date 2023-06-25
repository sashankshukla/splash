import { createSlice } from '@reduxjs/toolkit';

// Check for token in session storage and use it as the initial state if it exists.
const initialState = {
  token: JSON.parse(sessionStorage.getItem('authToken')) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // store the token in session storage
      sessionStorage.setItem('authToken', JSON.stringify(action.payload));
      state.token = action.payload;
      console.log('token', state.token);
    },
    clearUser: (state) => {
      // clear the token from session storage
      sessionStorage.removeItem('authToken');
      state.token = {};
    },
  },
});

export const { addUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
