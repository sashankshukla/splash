import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        listingId: "0123456789", //_id in listingModel
        title: "Pokemon startup", //name in listingModel
        location: "Pallet Town", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "Kachow",
        price: 25648.99, //needs to be a float bc money
        images: [
            "https://archives.bulbagarden.net/media/upload/f/fb/0001Bulbasaur.png",
            "https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png",
            "https://archives.bulbagarden.net/media/upload/5/54/0007Squirtle.png"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "antwerpsmerlepigeon@gmail.com", //createdBy in listingModel (would probably use id or email to reference user instance and grab name)
        status: "Available"
    },
    {
        listingId: "8675309", //_id in listingModel
        title: "Brock's Gym", //name in listingModel
        location: "Pewter City", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "TEST",
        price: 12345.65, //needs to be a float bc money
        images: [
            "https://archives.bulbagarden.net/media/upload/8/8a/Pewter_Gym_anime.png",
            "https://archives.bulbagarden.net/media/upload/f/f6/Pewter_Gym_FRLG.png"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "brock@pewtergym.com", //createdBy in listingModel (would probably use id to reference user instance and grab name)
        status: "Available"
    },
    {
        listingId: "9342784", //_id in listingModel
        title: "World's Largest Dinosaur", //name in listingModel
        location: "Drumheller, Alberta", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "Way better than that yarn ball",
        price: 65000000.00, //needs to be a float bc money
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/7/7a/Drumheller_%26_the_Tyrell_Museum_%287897901734%29.jpg"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "ayaz.shukla@gmail.com", //createdBy in listingModel (would probably use id to reference user instance and grab name)
        status: "Available"
    },
    {
        listingId: "3586422", //_id in listingModel
        title: "Rubber Duck", //name in listingModel
        location: "Hong Kong", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "He chill",
        price: 1999.88, //needs to be a float bc money
        images: [
            "https://skift.com/wp-content/uploads/2013/05/cD03MGVkNTVmYWU4MzZjZjg0MjhjOWE0ODNhYzY3MmU4NSZnPTdmMGExNDc2MzkzZWYwMzIxNTA1MzQ4MmUwMWI1MjRl.jpeg",
            "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/5/15/1368623790454/Hong-Kongs-Rubber-Duck-010.jpg?width=620&quality=45&dpr=2&s=nones"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "antwerpsmerlepigeon@gmail.com", //createdBy in listingModel (would probably use id to reference user instance and grab name)
        status: "Available"
    },
    {
        listingId: "800", //_id in listingModel
        title: "Laundromat", //name in listingModel
        location: "Victoria, British Columbia", //concat of all parts of address obj in listingModel (can be split into more if needed)
        description: "Very clean",
        price: 185432.25, //needs to be a float bc money
        images: [
            "https://www.thespruce.com/thmb/v20lszdfiBUJIWCzOCRpcmKXYLs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tips-for-easier-laundromat-trips-2145703-hero-7284dc0c51e647dab28aae46fdc6428e.jpg"
        ], //would this mean spread operation, map, filter, etc are mutating state bc no deep copy for nested?
        seller: "ayaz.shukla@gmail.com", //createdBy in listingModel (would probably use id to reference user instance and grab name)
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
      return state.filter((listing) => parseInt(listing.listingId) !== action.payload);
    },
    editListing: (state, action) => {
      return state; //placeholder
    },
  },
});

export const { addListing, deleteListing, editListing } = listingsSlice.actions;

export default listingsSlice.reducer;
