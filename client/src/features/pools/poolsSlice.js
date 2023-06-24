import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
      poolId: "234",
      title: 'Tech Stocks Pool',
      listingId: 'TSK389',
      members: 18,
      totalValue: 12150.37,
      remaining: 2573.52,
      contribution: 0,
    },
    {
      poolId: "80",
      title: 'Green Energy Bonds',
      listingId: 'GEB412',
      members: 24,
      totalValue: 9000.0,
      remaining: 3245.27,
      contribution: 0,
    },
    {
      poolId: "906",
      title: 'Real Estate Investment Pool',
      listingId: 'REI723',
      members: 10,
      totalValue: 45000.45,
      remaining: 15000.0,
      contribution: 0,
    },
    {
      poolId: "96",
      title: 'Crypto Assets Pool',
      listingId: 'CAP217',
      members: 50,
      totalValue: 25000.77,
      remaining: 8756.12,
      contribution: 0,
    },
];

const poolsSlice = createSlice({
    name: 'pools',
    initialState: initialState,
    reducers: {
        addPool: (state, action) => {
            state.push(action.payload);
        },
        deletePool: (state, action) => {
            return state.filter(pool => parseInt(pool.poolId) !== action.payload);
        },
        editPool: (state, action) => {
            return state; //placeholder
        },
        joinPool: (state, action) => {
          const poolId = action.payload.poolId;
          const pool = state.filter(pool => pool.poolId === poolId)[0];
          const contribution = parseFloat(action.payload.contribution);
          
          pool.members += 1;
          pool.remaining -= contribution;
          pool.contribution += contribution;
        }
    }
});

export const {addPool, deletePool, editPool} = poolsSlice.actions;

export default poolsSlice.reducer;
