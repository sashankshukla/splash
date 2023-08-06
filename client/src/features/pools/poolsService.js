import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://splash-server.onrender.com/pools/'
    : 'http://localhost:5001/pools/';

const fetchPoolsForUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.get(`${API_URL}user/joined/`, config);
  console.log('in fetch pools for user');
  console.log(response);

  return response.data;
};

const fetchPools = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const fetchPrivatePool = async (id, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.get(`${API_URL}private/${id}`, config);
  return response.data;
};

const addPool = async (pool, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(`${API_URL}`, pool, config);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deletePool = async (id, token) => {
  // console.log(token);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const joinPool = async (id, equity, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL + id + '/join', { equity }, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editPool = async (id, equity, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL + id + '/edit', { equity }, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const leavePool = async (id, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(API_URL + id + '/leave', {}, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchPoolsForListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(API_URL + 'listing/' + listingId, config);

  return response.data;
};

const fetchTotalPoolEquity = async (id, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(API_URL + 'totalEquity/' + id, config);

  return response.data;
};

const fetchPoolsCreatedByUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(API_URL + 'user/created', config);

  return response.data;
};

const denyPool = async (id, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  console.log(id);
  const response = await axios.delete(API_URL + id + '/deny', config);

  return response.data;
};

const poolsService = {
  fetchPools,
  addPool,
  deletePool,
  joinPool,
  editPool,
  leavePool,
  fetchPoolsForListing,
  fetchTotalPoolEquity,
  fetchPoolsCreatedByUser,
  fetchPoolsForUser,
  fetchPrivatePool,
  denyPool,
};

export default poolsService;
