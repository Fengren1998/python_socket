import axios from './axios';

const getServices = async () => {
  const result = await axios.get('/admin/services');

  return result.data;
};

const deleteServices = async (ids) => {
  const result = await axios.delete('/admin/services', {
    data: {
      ids,
    },
  });

  return result.data;
};

const addService = async (name, description, cost, duration) => {
  const result = await axios.post('/admin/services', {
    name,
    description,
    cost,
    duration,
  });

  return result.data;
};

const updateService = async (id, name, description, cost, duration) => {
  const result = await axios.patch('/admin/services', {
    id,
    name,
    description,
    cost,
    duration,
  });

  return result.data;
};

export default {
  getServices,
  deleteServices,
  addService,
  updateService,
};
