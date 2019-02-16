import axios from './axios';

const check = async () => {
  try {
    const result = await axios.get('/user/login');

    return result.data;
  } catch (err) {
    return false;
  }
};

const login = async (email, password) => {
  const result = await axios.post('/user/login', {
    email,
    password,
  });

  return result.data;
};

const logout = async () => {
  const result = await axios.post('/user/logout');
  return result.data;
};

const register = async (firstName, lastName, email, password) => {
  const result = await axios.post('/user/register', {
    firstName,
    lastName,
    email,
    password,
  });

  return result.data;
};

const startEmailVerification = async (email) => {
  const result = await axios.post('/user/email-verification', { email });

  return result.data;
};

const performEmailVerification = async (email, hash) => {
  const result = await axios.post('/user/email-verification/verify', { email, hash });

  return result.data;
};

const startForgotPassword = async (email) => {
  const result = await axios.post('/user/forgot-password', { email });

  return result.data;
};

const performForgotPassword = async (email, newPassword, hash) => {
  const result = await axios.post('/user/forgot-password/reset', { email, newPassword, hash });

  return result.data;
};

export default {
  check,
  login,
  logout,
  register,
  startEmailVerification,
  performEmailVerification,
  startForgotPassword,
  performForgotPassword,
};
