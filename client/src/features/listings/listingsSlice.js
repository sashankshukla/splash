import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    },
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    },
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    },
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    },
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    },
    {
        listingId: "0123456789",
        title: "A",
        description: "TEST",
        price: 12345,
        location: "Pallet Town",
        images: "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png", //What to do for this?
        seller: "Ash",
        status: true
    }
];

const listingsSlice = createSlice({
    name: 'listings',
    initialState: initialState,
    reducers: {
        addListing: (state, action) => {
            return {
                ...state,
                listings: [...state.listings, action.payload]
            }
        },
        deleteListing: (state, action) => {
            return {
                ...state,
                listings: state.listings.filter(listing => listing.id != action.payload)
            }
        },
        editListing: (state, action) => {
            return state; //placeholder
        }
    }
});

export const {addListing, deleteListing, editListing} = listingsSlice.actions;

export default listingsSlice.reducer;
