import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import poolServices from './poolsService';

var initialState = [
];

export const fetchPoolsForUser = createAsyncThunk('auth/fetchPoolsForUser', async (user, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    console.log(token);
    return await poolServices.fetchPoolsForUser(user, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPools = createAsyncThunk('auth/fetchPools', async (pool, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.fetchPools(pool, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addPoolsAsync = createAsyncThunk('auth/addPoolsAsync', async (pool, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.addPoolsAsync(pool, token);
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
    addPool: (state, action) => {
      let id;
      do {
        id = Math.floor(Math.random() * 1000000000).toString(); // generates a random numeric string
      } while (state.find((pool) => pool.poolId === id));
      const { initialContribution, ...restOfPayload } = action.payload;
      state.push({ ...restOfPayload, poolId: id, contribution: initialContribution });
    },
    deletePool: (state, action) => {
      console.log('pool', action.payload);
      return state.filter((pool) => parseInt(pool.poolId) !== action.payload);
    },
    editPool: (state, action) => {
      return state; //placeholder
    },
    joinPool: (state, action) => {
      const poolId = action.payload.poolId;
      const contribution = parseFloat(action.payload.contribution);

      const pool = state.find((pool) => pool.poolId === poolId);

      if (pool) {
        pool.members.push(action.payload.email);
        pool.remaining -= contribution;
        pool.contribution += contribution;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoolsForUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchPools.fulfilled, (state, action) => {
        return action.payload;
      }).addCase(addPoolsAsync.fulfilled, (state, action) => {
        console.log(state.pools);
      state.push(action.payload);
      })
    },
});

export const { addPool, deletePool, editPool } = poolsSlice.actions;

export default poolsSlice.reducer;
