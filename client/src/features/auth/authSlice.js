import { createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  token: JSON.parse(localStorage.getItem('token')) || {},
  auth_token: JSON.parse(localStorage.getItem('authToken')) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload.token.email, action.payload.token.name);
      const user = authService.register({
        email: action.payload.token.email,
        name: action.payload.token.name,
      });
      if (!user) {
        console.log('User not found');
        return;
      }
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('authToken', JSON.stringify(action.payload.auth_token));
      state.token = action.payload.token;
      state.auth_token = action.payload.auth_token;
      console.log(state);
    },
    clearUser: (state) => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      state.token = {};
      state.auth_token = {};
    },
  },
});

export const { addUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
