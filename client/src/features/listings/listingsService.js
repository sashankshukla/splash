import axios from 'axios';

const API_URL = 'http://localhost:5001/listings/';

const fetchListings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addListing = async (listingData, token) => {
  const formData = new FormData();

  //template literals require backticks like `` instead of regular apostrophes like ''
  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data'
    },
  };

  for (const key in listingData) {
    if (key === 'images') {
      listingData[key].forEach((image, index) => {
        formData.append(`images`, image);
      });
    } else if (key === 'address' || key === 'details') {
      formData.append(key, JSON.stringify(listingData[key]))
    } else {
      formData.append(key, listingData[key]);
    }
  }

  const response = await axios.post(API_URL, formData, config);

  console.log(response.data);
  return response.data;
};

const updateListing = async (listingData, listingId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${listingId}`, listingData, config);
  console.log(response.data);
  return response.data;
};

//updateListing

const deleteListing = async (id, token) => {
  // console.log(token);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const listingsService = {
  fetchListings,
  addListing,
  deleteListing,
  updateListing,
};

export default listingsService;
