import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(sessionStorage.getItem('token')) || {},
  auth_token : JSON.parse(sessionStorage.getItem('authToken')) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      sessionStorage.setItem('authToken', JSON.stringify(action.payload.auth_token));
      state.token = action.payload.token;
      state.auth_token = action.payload.auth_token;
      console.log(state);
    },
    clearUser: (state) => {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('token');
      state.token = {};
      state.auth_token = {};
    },
  },
});

export const { addUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
