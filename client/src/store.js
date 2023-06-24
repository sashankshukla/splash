import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';
import poolsReducer from './features/pools/poolsSlice';
import LoginData from './reducers/LoginData';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    pools: poolsReducer,
    auth: LoginData,
  },
});
export default store;
