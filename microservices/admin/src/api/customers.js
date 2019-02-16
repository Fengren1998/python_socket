import axios from './axios';

const getCustomers = async () => {
  const result = await axios.get('/admin/users');

  return result.data;
};

const deleteCustomers = async (ids) => {
  const result = await axios.delete('/admin/users', {
    data: {
      ids,
    },
  });

  return result.data;
};

const addCustomer = async (firstName, lastName, email, password) => {
  const result = await axios.post('/admin/users', {
    firstName,
    lastName,
    email,
    password,
  });

  return result.data;
};

const updateCustomer = async (id, firstName, lastName, email, password) => {
  const result = await axios.patch('/admin/users', {
    id,
    firstName,
    lastName,
    email,
    password,
  });

  return result.data;
};

export default {
  getCustomers,
  deleteCustomers,
  addCustomer,
  updateCustomer,
};
