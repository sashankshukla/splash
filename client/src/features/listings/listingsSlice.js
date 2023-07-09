import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import listingsService from './listingsService'

const initialState = {
  listings: [
    // {
    //   id: '0123456789',
    //   name: 'Suburban House',
    //   address: {
    //     street: 'A',
    //     city: 'B',
    //     country: 'C',
    //     postalCode: 'D'
    //   },
    //   description: 'A nice suburban house',
    //   price: 25648.99,
    //   images: [
    //     'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec',
    //     'https://images.unsplash.com/photo-1494526585095-c41746248156',
    //     'https://images.unsplash.com/photo-1501924497965-792fefaea3dc',
    //   ],
    //   status: 'Available',
    //   createdBy: 'antwerpsmerlepigeon@gmail.com'
    // },
    // {
    //   id: '8675309',
    //   name: "McDonald's Franchise",
    //   address: {
    //     street: 'E',
    //     city: 'F',
    //     country: 'G',
    //     postalCode: 'H'
    //   },
    //   description: "A profitable McDonald's franchise",
    //   price: 12345.65,
    //   images: [
    //     'https://wolfoffranchises.com/wp-content/uploads/sites/2/2022/07/McDonalds-Franchise.jpeg',
    //   ],
    //   status: 'Available',
    //   createdBy: 'brock@pewtergym.com'
    // },
    // {
    //   id: '9342784',
    //   name: 'Shell Gas Station',
    //   address: {
    //     street: 'I',
    //     city: 'J',
    //     country: 'K',
    //     postalCode: 'L'
    //   },
    //   description: 'A Shell gas station with heavy traffic',
    //   price: 65000000.0,
    //   images: ['https://images.unsplash.com/photo-1569003339405-ea396a5a8a90'],
    //   status: 'Available',
    //   createdBy: 'ayaz.shukla@gmail.com'
    // },
    // {
    //   id: '3586422',
    //   name: 'Tech Stock Portfolio',
    //   address: {
    //     street: 'M',
    //     city: 'N',
    //     country: 'O',
    //     postalCode: 'P'
    //   },
    //   description: 'A diversified portfolio of tech stocks',
    //   price: 1999.88,
    //   images: [
    //     'https://www.marketoracle.co.uk/images/2022/Jan/AI-stocks-portfolio-22nd-jan-2022.jpg',
    //     'https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_3SDdAlD.jpg',
    //   ],
    //   status: 'Available',
    //   createdBy: 'antwerpsmerlepigeon@gmail.com'
    // },
    // {
    //   id: '800',
    //   name: 'City Condo',
    //   address: {
    //     street: 'Q',
    //     city: 'R',
    //     country: 'S',
    //     postalCode: 'T'
    //   },
    //   description: 'A modern city condo with a view',
    //   price: 185432.25,
    //   images: ['https://images.unsplash.com/photo-1564069114553-7215e1ff1890'],
    //   status: 'Available',
    //   createdBy: 'ayaz.shukla@gmail.com'
    // }
  ],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const fetchListings = createAsyncThunk('listings/fetchListings', async (_, thunkAPI) => {
  try {
    //const token  = thunkAPI.getState().auth.auth_token;
    return await listingsService.fetchListings();
  } catch(error) {
    let message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addListing = createAsyncThunk('listings/addListing', async (listingData, thunkAPI) => {
  try {
    let token = thunkAPI.getState().auth.auth_token;
    return await listingsService.addListing(listingData, token);
  } catch(error) {
    let message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateListing = createAsyncThunk('listings/updateListing', async () => {
  //
});

export const deleteListing = createAsyncThunk('listings/deleteListing', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth_token;
    return await listingsService.deleteListing(id, token);
  } catch(error) {
    let message = (error.response & error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState
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
        state.isLoading = false;
        state.isSuccess = true;
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
      })
  }
});

export const getListingsData = (state) => state.listings;
//export const getUserListings = (state) => state.

export const { reset } = listingsSlice.actions;

export default listingsSlice.reducer;
