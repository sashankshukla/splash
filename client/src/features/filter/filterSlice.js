import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusVis: 'All', //can be one of "All", "Available", or "Sold",
  priceRange: [], //will either be empty (meaning no range), or have two values [lowerfloat, upperfloat]
  keywords: '', //will have any number of strings (for now ui will only allow one)
  sort: 'recent', //this is the default, should make enum later
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    applyFilters: (state, action) => {
      console.log(action.payload);
      state.keywords = action.payload.keywords;
    },
    clearFilters: (state, action) => {
      return initialState;
    },
  },
});

export const { applyFilters, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
