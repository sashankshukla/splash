import axios from 'axios';

const API_URL = 'http://localhost:5001/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Logout user
const logout = () => {
  sessionStorage.removeItem('user');
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

const fetchAllUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  
  const response = await axios.get(`${API_URL}`, config);
  
  
  return response.data;
};

const updateUser = async (data,token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  
  const response = await axios.put(`${API_URL}${data.user.email}`, data, config);
  
  
  return response.data;
};

const updateBank = async (data,token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  
  if(data.status) {
    const response = await axios.put(`${API_URL}assets/${data.account._id}`, data, config);
    
    
    return response.data;
  } else {
    const response = await axios.delete(`${API_URL}assets/${data.account._id}`, config);
    return response.data;
  }
};

const fetchPendingFunds = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  
  const response = await axios.get(`${API_URL}admin/funds`, config);
  
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
      
      throw new Error('Bad request');
    }
    return response.data;
  } catch (error) {
    // Handle any errors during the request
    
    throw error;
  }
};

const addAccount = async (form, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    const response = await axios.post(`${API_URL}addAccount`, form, config);
    if (response.status === 400) {
      
      throw new Error('Bad request');
    }
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

const authService = {
  register,
  logout,
  fetchUser,
  increaseUserFunds,
  addAccount,
  fetchAllUser,
  fetchPendingFunds,
  updateUser,
  updateBank
};

export default authService;
