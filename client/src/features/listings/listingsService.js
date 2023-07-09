import axios from 'axios';

const API_URL = 'http://localhost:5001/listings/';

const fetchListings = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const addListing = async (listingData, token) => {
    //template literals require backticks like `` instead of regular apostrophes like ''
    const config = {
        headers: {
            Authorization : `${token}`
        }
    }

    const response = await axios.post(API_URL, listingData, config);
    
    console.log(response.data);
    return response.data;
}

//updateListing

const deleteListing = async (id, token) => {
    // console.log(token);
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config);

    return response.data;
}

const listingsService = {
    fetchListings,
    addListing,
    deleteListing
}

export default listingsService;