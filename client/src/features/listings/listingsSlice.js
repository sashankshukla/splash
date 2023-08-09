import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import listingsService from './listingsService';

const initialState = {
  listings: [],
  listingFilter: {
    keywordSearch: '',
    sortTime: 'None',
    sortPrice: 'None',
    price: {
      lower: 0,
      upper: 1000000000,
    },
    distance: {
      check: false,
      range: 0,
    },
    status: {
      available: true,
      sold: false,
    },
    pools: {
      open: true,
      closed: true,
      none: true,
    },
    investmentType: {
      residence: true,
      franchise: true,
      gasStation: true,
      stockPortfolio: true,
    },
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchListings = createAsyncThunk('listings/fetchListings', async (_, thunkAPI) => {
  try {
    return await listingsService.fetchListings();
  } catch (error) {
    let message =
      (error.response & error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchFilteredListings = createAsyncThunk(
  'listings/fetchFilteredListings',
  async (_, thunkAPI) => {
    try {
      const listingFilter = thunkAPI.getState().listings.listingFilter;
      return await listingsService.fetchFilteredListings(listingFilter);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchListingsForUser = createAsyncThunk(
  'listings/fetchListingsForUser',
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.auth_token;
      return await listingsService.fetchListingsForUser(token);
    } catch (error) {
      let message =
        (error.response & error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addListing = createAsyncThunk('listings/addListing', async (listingData, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await listingsService.addListing(listingData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
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

export const sellListing = createAsyncThunk(
  'listings/sellListing',
  async ({ listingId, poolId }, thunkAPI) => {
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
  },
);

const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
    updateFilter: (state, action) => {
      state.listingFilter = action.payload;
    },
    clearFilter: (state, action) => {
      state.listingFilter = initialState.listingFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(fetchFilteredListings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.listings = action.payload;
      })
      .addCase(fetchFilteredListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(fetchListingsForUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchListingsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.listings = action.payload;
      })
      .addCase(fetchListingsForUser.rejected, (state, action) => {
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
        state.listings.push(action.payload);
      })
      .addCase(addListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
        throw Error(action.payload);
      })
      .addCase(updateListing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
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

export const { reset, updateFilter, clearFilter } = listingsSlice.actions;

export default listingsSlice.reducer;
