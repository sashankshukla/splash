import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';

const store = configureStore(
    {reducer: {
        listings: listingsReducer
    }}
);
export default store;