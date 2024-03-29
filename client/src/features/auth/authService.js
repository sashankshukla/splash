import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://splash-server.onrender.com/users/'
    : 'http://localhost:5001/users/';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const fetchUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const fetchAllUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/admin`, config);

  return response.data;
};

const updateUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${data.user.email}`, data, config);

  return response.data;
};

const updateBank = async (data, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  if (data.status) {
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
    return response.data;
  } catch (error) {
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
  updateBank,
};

export default authService;
