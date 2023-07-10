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

const authService = {
  register,
  logout,
};

export default authService;
