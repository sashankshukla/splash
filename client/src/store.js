import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';
import poolsReducer from './features/pools/poolsSlice';
import filterReducer from './features/filter/filterSlice';
import authSlice from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    pools: poolsReducer,
    filter: filterReducer,
    auth: authSlice,
  },
});
export default store;
