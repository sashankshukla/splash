import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';
import poolsReducer from './features/pools/poolsSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    pools: poolsReducer,
    auth: authReducer,
  },
});
export default store;
