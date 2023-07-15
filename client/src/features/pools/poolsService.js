import axios from 'axios';

const API_URL = 'http://localhost:5001/pools/';

const fetchPoolsForUser = async (user,token) => {
    const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
    const response = await axios.get(`${API_URL}/user/joined/${user.email}`,config);
    console.log("in fetch pools for user");
    console.log(response);

  return response.data;
};

const fetchPools = async (user,token) => {
    const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
    const response = await axios.get(`${API_URL}`);
    console.log(response);

  return response.data;
};

const poolServices = {
  fetchPoolsForUser,
  fetchPools
};

export default poolServices;
