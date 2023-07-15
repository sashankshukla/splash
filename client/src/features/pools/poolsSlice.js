import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import poolServices from './poolsService';

const initialState = [
  // {
  //   poolId: '234',
  //   createdBy: 'ayaz.shukla@gmail.com',
  //   title: 'Tech Stocks Pool',
  //   listingId: 'TSK389',
  //   members: ['ayaz.shukla@gmail.com', 'jain.doe@gmail.com', 'lol@gmail.com'],
  //   totalValue: 12150.37,
  //   remaining: 2573.52,
  //   contribution: 123.45,
  // },
  // {
  //   poolId: '80',
  //   createdBy: 'janedoe@gmail.com',
  //   title: 'Green Energy Bonds',
  //   listingId: 'GEB412',
  //   members: ['alex.johnson@gmail.com', 'mary.smith@gmail.com', 'karen.williams@gmail.com'],
  //   totalValue: 9000.0,
  //   remaining: 3245.27,
  //   contribution: 0,
  // },
  // {
  //   poolId: '906',
  //   createdBy: 'ayaz.shukla@gmail.com',
  //   title: 'Real Estate Investment Pool',
  //   listingId: 'REI723',
  //   members: ['alex.johnson@gmail.com', 'mary.smith@gmail.com', 'karen.williams@gmail.com'],
  //   totalValue: 45000.45,
  //   remaining: 15000.0,
  //   contribution: 0,
  // },
  // {
  //   poolId: '96',
  //   createdBy: 'ayaz.shukla@gmail.com',
  //   title: 'Crypto Assets Pool',
  //   listingId: 'CAP217',
  //   members: [
  //     'michael.anderson@gmail.com',
  //     'sarah.thomas@gmail.com',
  //     'david.jackson@gmail.com',
  //     'asdfa@gmail.com',
  //   ],
  //   totalValue: 25000.77,
  //   remaining: 8756.12,
  //   contribution: 0,
  // },
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

export const fetchPools = createAsyncThunk('auth/fetchPools', async (user, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await poolServices.fetchPools(user, token);
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
      })
      // .addCase(increaseUserFunds.rejected, (state, action) => {
      //   //TODO error catching not working does not display modal.
      //   throw Error(action.payload);
      // });
    },
});

export const { addPool, deletePool, editPool } = poolsSlice.actions;

export default poolsSlice.reducer;
