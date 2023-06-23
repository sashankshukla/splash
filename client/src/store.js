import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './features/listings/listingsSlice';
import LoginData from './reducers/LoginData';

const store = configureStore(
    {reducer: {
        listings: listingsReducer,
        auth: LoginData
    }}
);
export default store;