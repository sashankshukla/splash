import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import poolsService from './poolsService';

const initialState = {
  pools: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchPoolsForUser = createAsyncThunk(
  'pools/fetchPoolsForUser',
  async (user, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.auth_token;
      console.log(token);
      return await poolsService.fetchPoolsForUser(token);
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
    return await poolsService.fetchPools();
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
    return await poolsService.fetchPrivatePool(id, token);
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
    return await poolsService.addPool(pool, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deletePool = createAsyncThunk('pools/deletePool', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth_token;
    return await poolsService.deletePool(id, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const joinPool = createAsyncThunk('pools/joinPool', async ({ id, equity }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth_token;
    return await poolsService.joinPool(id, equity, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const editPool = createAsyncThunk('pools/editPool', async ({ id, equity }, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;

    if (equity) {
      return await poolsService.editPool(id, equity, token);
    }

    return await poolsService.leavePool(id, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPoolsForListing = createAsyncThunk(
  'pools/fetchPoolsForListing',
  async (listingId, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.auth_token;
      console.log(token);
      return await poolsService.fetchPoolsForListing(listingId, token);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const denyPool = createAsyncThunk('pools/denyPool', async (poolId, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    console.log(typeof poolId);
    return await poolsService.denyPool(poolId, token);
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
      .addCase(fetchPoolsForUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPoolsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //Add any fetched pools to the array
        state.pools = action.payload;
      })
      .addCase(fetchPoolsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(fetchPools.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //Add any fetched pools to the array
        state.pools = action.payload;
      })
      .addCase(fetchPools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(addPoolsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPoolsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (!action.payload.private) state.pools.push(action.payload);
      })
      .addCase(addPoolsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
        throw Error(action.payload);
      })
      .addCase(deletePool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.pools = state.pools.filter((pool) => pool._id !== action.payload.id);
      })
      .addCase(deletePool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(joinPool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(joinPool.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        const poolIndex = state.pools.findIndex((pool) => pool._id === action.payload._id);
        state.pools[poolIndex] = action.payload;
      })
      .addCase(joinPool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
        throw Error(action.payload);
      })
      .addCase(editPool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editPool.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        const poolIndex = state.pools.findIndex((pool) => pool._id === action.payload._id);
        state.pools[poolIndex] = action.payload;
      })
      .addCase(editPool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(fetchPoolsForListing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPoolsForListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //Add any fetched pools to the array
        state.pools = action.payload;
      })
      .addCase(fetchPoolsForListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(denyPool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(denyPool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // TODO: filter out the pool we just deleted
      })
      .addCase(denyPool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      });
  },
});

export const getPoolsData = (state) => state.pools;

export const { reset } = poolsSlice.actions;

export default poolsSlice.reducer;
