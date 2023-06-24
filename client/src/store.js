import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';
import poolsReducer from './features/pools/poolsSlice';
import LoginData from './reducers/LoginData';
import filterReducer from './features/filter/filterSlice';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
    pools: poolsReducer,
    filter: filterReducer,
    auth: LoginData,
  },
});
export default store;
