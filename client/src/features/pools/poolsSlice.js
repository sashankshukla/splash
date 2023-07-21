import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import poolServices from './poolsService';

var initialState = [];

export const fetchPoolsForUser = createAsyncThunk(
  'pools/fetchPoolsForUser',
  async (user, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.auth_token;
      console.log(token);
      return await poolServices.fetchPoolsForUser(token);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchPools = createAsyncThunk('pools/fetchPools', async (thunkAPI) => {
  try {
    // let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.fetchPools();
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPrivatePool = createAsyncThunk('pools/fetchPrivatePool', async (id, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.fetchPrivatePool(id, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addPoolsAsync = createAsyncThunk('pools/addPool', async (pool, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.addPool(pool, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const poolsSlice = createSlice({
  name: 'pools',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoolsForUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchPools.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addPoolsAsync.fulfilled, (state, action) => {
        console.log(state.pools);
        state.push(action.payload);
      });
  },
});

export const { addPool, deletePool, editPool } = poolsSlice.actions;

export default poolsSlice.reducer;
