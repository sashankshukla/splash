import axios from 'axios';

const API_URL = 'http://localhost:5001/pools/';

const fetchPoolsForUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user/joined/`, config);
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
  const response = await axios.post(`${API_URL}`, pool, config);
  console.log(response);
  return response.data;
};

const poolServices = {
  fetchPoolsForUser,
  fetchPools,
  fetchPrivatePool,
  addPool,
};

export default poolServices;
