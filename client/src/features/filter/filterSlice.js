import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: "All", //can be one of "All", "Available", or "Sold",
    priceRange: [],  //will either be empty (meaning no range), or have two values [lowerfloat, upperfloat]
    keywords: [""], //will have any number of strings (for now ui will only allow one)
    sort: "recent" //this is the default, should make enum later
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        applyFilters: (state, action) => {
            return state;
        },
        clearFilters: (state, action) => {
            return state;
        }
    }
});

export const {applyFilters, clearFilters} = filterSlice.actions;

export default filterSlice.reducer;