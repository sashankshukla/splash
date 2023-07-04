import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [
    {
      id: '0123456789',
      name: 'Suburban House',
      address: {
        street: 'A',
        city: 'B',
        country: 'C',
        postalCode: 'D'
      },
      description: 'A nice suburban house',
      price: 25648.99,
      images: [
        'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec',
        'https://images.unsplash.com/photo-1494526585095-c41746248156',
        'https://images.unsplash.com/photo-1501924497965-792fefaea3dc',
      ],
      status: 'Available',
      createdBy: 'antwerpsmerlepigeon@gmail.com'
    },
    {
      id: '8675309',
      name: "McDonald's Franchise",
      address: {
        street: 'E',
        city: 'F',
        country: 'G',
        postalCode: 'H'
      },
      description: "A profitable McDonald's franchise",
      price: 12345.65,
      images: [
        'https://wolfoffranchises.com/wp-content/uploads/sites/2/2022/07/McDonalds-Franchise.jpeg',
      ],
      status: 'Available',
      createdBy: 'brock@pewtergym.com'
    },
    {
      id: '9342784',
      name: 'Shell Gas Station',
      address: {
        street: 'I',
        city: 'J',
        country: 'K',
        postalCode: 'L'
      },
      description: 'A Shell gas station with heavy traffic',
      price: 65000000.0,
      images: ['https://images.unsplash.com/photo-1569003339405-ea396a5a8a90'],
      status: 'Available',
      createdBy: 'ayaz.shukla@gmail.com'
    },
    {
      id: '3586422',
      name: 'Tech Stock Portfolio',
      address: {
        street: 'M',
        city: 'N',
        country: 'O',
        postalCode: 'P'
      },
      description: 'A diversified portfolio of tech stocks',
      price: 1999.88,
      images: [
        'https://www.marketoracle.co.uk/images/2022/Jan/AI-stocks-portfolio-22nd-jan-2022.jpg',
        'https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_3SDdAlD.jpg',
      ],
      status: 'Available',
      createdBy: 'antwerpsmerlepigeon@gmail.com'
    },
    {
      id: '800',
      name: 'City Condo',
      address: {
        street: 'Q',
        city: 'R',
        country: 'S',
        postalCode: 'T'
      },
      description: 'A modern city condo with a view',
      price: 185432.25,
      images: ['https://images.unsplash.com/photo-1564069114553-7215e1ff1890'],
      status: 'Available',
      createdBy: 'ayaz.shukla@gmail.com'
    }
  ],
  status: 'idle',
  error: null
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    addListing: (state, action) => {
      console.log('addListing');
      action.payload.id = '42'; //temporarily setting id here
      state.listings.push(action.payload);
    },
    deleteListing: (state, action) => {
      console.log('deleteListing');
      return {
        ...state,
        listings: state.listings.filter((listing) => listing.id !== action.payload)
      };
      //state.listings = state.listings.filter((listing) => parseInt(listing.id) !== action.payload);
    },
    editListing: (state, action) => {
      console.log('editListing');
      return state.listings; //placeholder
    },
  },
});

export const getAllListings = (state) => state.listings.listings;

export const { addListing, deleteListing, editListing } = listingsSlice.actions;

export default listingsSlice.reducer;
