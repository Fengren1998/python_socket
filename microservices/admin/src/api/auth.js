import axios from './axios';

const check = async () => {
  try {
    const result = await axios.get('/admin/login');

    return result.data;
  } catch (err) {
    return false;
  }
};

const login = async (email, password) => {
  const result = await axios.post('/admin/login', {
    email,
    password,
  });

  return result.data;
};

const register = async (firstName, lastName, email, password, isReceptionist) => {
  const result = await axios.post('/admin/register', {
    firstName,
    lastName,
    email,
    password,
    isReceptionist,
  });

  return result.data;
};

const performEmailVerification = async (email) => {
  const result = await axios.post('/admin/email-verification', { email });

  return result.data;
};

export default {
  check,
  login,
  register,
  performEmailVerification,
};
