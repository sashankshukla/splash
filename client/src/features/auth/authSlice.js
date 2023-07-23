import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  token: JSON.parse(sessionStorage.getItem('token')) || {},
  auth_token: JSON.parse(sessionStorage.getItem('authToken')) || {},
  user: null,
  allUser: [],
  pendingFunds: []
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async (user, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    
    
    return await authService.fetchUser(user, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (_,thunkAPI) => {
  try {
    
    let token = thunkAPI.getState().auth.auth_token;
    return await authService.fetchAllUser(token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (data,thunkAPI) => {
  try {
    
    let token = thunkAPI.getState().auth.auth_token;
    return await authService.updateUser(data, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateBank = createAsyncThunk('auth/updateBank', async (data,thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await authService.updateBank(data, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPendingFunds = createAsyncThunk('auth/fetchPendingFunds', async (_,thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await authService.fetchPendingFunds(token);
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
      let token = thunkAPI.getState().auth.auth_token;
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
      
      const user = authService.register({
        email: action.payload.token.email,
        name: action.payload.token.name,
      });
      if (!user) {
        
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
        
        
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        
        
        state.allUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        
        
        state.allUser = action.payload;
      })
      .addCase(updateBank.fulfilled, (state, action) => {
        
        
        state.pendingFunds = action.payload;
      })
      .addCase(fetchPendingFunds.fulfilled, (state, action) => {
        
        
        state.pendingFunds = action.payload;
      })
      .addCase(increaseUserFunds.fulfilled, (state, action) => {
        
        
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
