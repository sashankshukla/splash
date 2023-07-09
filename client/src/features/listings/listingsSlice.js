import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    listingId: '0123456789',
    title: 'Suburban House',
    location: 'Science World, Vancouver, BC',
    description: 'A nice suburban house',
    price: 25648.99,
    images: [
      'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
      'https://images.unsplash.com/photo-1501924497965-792fefaea3dc',
    ],
    seller: 'antwerpsmerlepigeon@gmail.com',
    status: 'Available',
  },
  {
    listingId: '8675309',
    title: "McDonald's Franchise",
    location: 'UBC, Vancouver',
    description: "A profitable McDonald's franchise",
    price: 12345.65,
    images: [
      'https://wolfoffranchises.com/wp-content/uploads/sites/2/2022/07/McDonalds-Franchise.jpeg',
    ],
    seller: 'brock@pewtergym.com',
    status: 'Available',
  },
  {
    listingId: '9342784',
    title: 'Shell Gas Station',
    location: 'Drumheller, Alberta',
    description: 'A Shell gas station with heavy traffic',
    price: 65000000.0,
    images: ['https://images.unsplash.com/photo-1569003339405-ea396a5a8a90'],
    seller: 'ayaz.shukla@gmail.com',
    status: 'Available',
  },
  {
    listingId: '3586422',
    title: 'Tech Stock Portfolio',
    location: 'Hong Kong',
    description: 'A diversified portfolio of tech stocks',
    price: 1999.88,
    images: [
      'https://www.marketoracle.co.uk/images/2022/Jan/AI-stocks-portfolio-22nd-jan-2022.jpg',
      'https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_3SDdAlD.jpg',
    ],
    seller: 'antwerpsmerlepigeon@gmail.com',
    status: 'Available',
  },
  {
    listingId: '800',
    title: 'City Condo',
    location: 'Victoria, British Columbia',
    description: 'A modern city condo with a view',
    price: 185432.25,
    images: ['https://images.unsplash.com/photo-1564069114553-7215e1ff1890'],
    seller: 'ayaz.shukla@gmail.com',
    status: 'Available',
  },
];

const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    addListing: (state, action) => {
      state.push(action.payload);
    },
    deleteListing: (state, action) => {
      console.log('deleteListing');
      return state.filter((listing) => parseInt(listing.listingId) !== action.payload);
    },
    editListing: (state, action) => {
      return state; //placeholder
    },
  },
});

export const { addListing, deleteListing, editListing } = listingsSlice.actions;

export default listingsSlice.reducer;
