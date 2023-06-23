import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        listingId: "0123456789", //_id in listingModel
        title: "Pokemon startup", //name in listingModel
        location: "Pallet Town", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "TEST",
        price: 12345.65, //needs to be a float bc money
        images: [
            "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png",
            "https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png",
            "https://archives.bulbagarden.net/media/upload/5/54/0007Squirtle.png"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "Ash", //createdBy in listingModel (would probably use id to reference user instance and grab name)
        status: "Available"
    },
    {
        listingId: "8675309", //_id in listingModel
        title: "Pokemon startup", //name in listingModel
        location: "Pallet Town", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "TEST",
        price: 12345.65, //needs to be a float bc money
        images: [
            "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png",
            "https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png",
            "https://archives.bulbagarden.net/media/upload/5/54/0007Squirtle.png"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "Ash", //createdBy in listingModel (would probably use id to reference user instance and grab name)
        status: "Available"
    }
];

const listingsSlice = createSlice({
    name: 'listings',
    initialState: initialState,
    reducers: {
        addListing: (state, action) => {
            state.push(action.payload);
        },
        deleteListing: (state, action) => {
            return state.filter(listing => parseInt(listing.listingId) !== action.payload);
        },
        editListing: (state, action) => {
            return state; //placeholder
        }
    }
});

export const {addListing, deleteListing, editListing} = listingsSlice.actions;

export default listingsSlice.reducer;
