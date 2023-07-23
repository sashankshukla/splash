import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  token: JSON.parse(sessionStorage.getItem('token')) || {},
  auth_token: JSON.parse(sessionStorage.getItem('authToken')) || {},
  user: null,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (user, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    console.log('result of fetchuser let token');
    console.log(token);
    return await authService.fetchUser(token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const increaseUserFunds = createAsyncThunk(
  'auth/increaseUserFunds',
  async (data, thunkAPI) => {
    try {
      console.log('in updateUserThunk');
      let token = thunkAPI.getState().auth.auth_token;
      console.log('result of increaseuserFunds let token');
      console.log(token);
      return await authService.increaseUserFunds(data, token);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addAccount = createAsyncThunk('auth/addAccount', async (data, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await authService.addAccount(data, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
      sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      sessionStorage.setItem('authToken', JSON.stringify(action.payload.auth_token));
      state.token = action.payload.token;
      state.auth_token = action.payload.auth_token;
    },
    clearUser: (state) => {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('token');
      state.token = {};
      state.auth_token = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log('in the extra reducer we get');
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(increaseUserFunds.fulfilled, (state, action) => {
        console.log('increase user funds extra reducer');
        console.log(action.payload);
        const ownerships = state.user.ownerships;
        state.user = action.payload;
        state.user.ownerships = ownerships;
      })
      .addCase(increaseUserFunds.rejected, (state, action) => {
        //TODO error catching not working does not display modal.
        throw Error(action.payload);
      });
  },
});

export const { addUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
