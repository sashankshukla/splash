import axios from 'axios';

const API_URL = 'http://localhost:5001/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const fetchUser = async (userEmail, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.get(`${API_URL}${userEmail.email}`, config);
  return response.data;
};

const increaseUserFunds = async (form, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  try {
    const response = await axios.post(`${API_URL}addFunds`, form, config);
    // Check if the response status is 400 and throw an error if true
    if (response.status === 400) {
      console.log('error caught'); // TODO not being caught
      throw new Error('Bad request');
    }
    return response.data;
  } catch (error) {
    // Handle any errors during the request
    console.log('error caught');
    throw error;
  }
};

const authService = {
  register,
  logout,
  fetchUser,
  increaseUserFunds,
};

export default authService;
