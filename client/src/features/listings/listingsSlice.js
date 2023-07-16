import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import listingsService from './listingsService';

const initialState = {
  listings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchListings = createAsyncThunk('listings/fetchListings', async (_, thunkAPI) => {
  try {
    //const token  = thunkAPI.getState().auth.auth_token;
    return await listingsService.fetchListings();
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addListing = createAsyncThunk('listings/addListing', async (listingData, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await listingsService.addListing(listingData, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateListing = createAsyncThunk(
  'listings/updateListing',
  async ({ formData, listingId }, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.auth_token;
      return await listingsService.updateListing(formData, listingId, token);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteListing = createAsyncThunk('listings/deleteListing', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth_token;
    return await listingsService.deleteListing(id, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const sellListing = createAsyncThunk('listings/sellListing', async ({ listingId, poolId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth_token;
    return await listingsService.sellListing(listingId, poolId, token);
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //Add any fetched listings to the array
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(addListing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //Add new listing directly to the listing array
        console.log(action.payload);
        state.listings.push(action.payload); //is this correct behavior? how to grab _id?
      })
      .addCase(addListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(updateListing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = state.listings.filter((listing) => listing._id !== action.payload._id);
        state.listings.push(action.payload);
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(deleteListing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.listings = state.listings.filter((listing) => listing._id !== action.payload.id);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      });
  },
});

export const getListingsData = (state) => state.listings;
//export const getUserListings = (state) => state.

export const { reset } = listingsSlice.actions;

export default listingsSlice.reducer;
