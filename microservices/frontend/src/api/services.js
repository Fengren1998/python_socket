import axios from './axios';

const getServices = async () => {
  const result = await axios.get('/user/services');

  return result.data;
};

export default {
  getServices,
};
