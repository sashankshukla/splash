import axios from 'axios';

const API_URL = 'http://localhost:5001/listings';
//Where should the localhost portion be applied dynamically?

const fetchListings = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const addListing = async (listingData, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ${token}'
        }
    }

    const response = await axios.get(API_URL, listingData, config);

    return response.data;
}

const deleteListing = async (listingId, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ${token}'
        }
    }

    const response = await axios.get(API_URL + listingId, config);

    return response.data;
}

const listingsService = {
    fetchListings,
    addListing,
    deleteListing
}

export default listingsService;