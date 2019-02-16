import { createRoutine } from 'redux-saga-routines';
import CustomersConstants from '../constants/customersConstants';

const getCustomersRoutine = createRoutine(CustomersConstants.GET_CUSTOMERS);
const addCustomerRoutine = createRoutine(CustomersConstants.ADD_CUSTOMER);
const updateCustomerRoutine = createRoutine(CustomersConstants.UPDATE_CUSTOMER);

export default {
  getCustomersRoutine,
  addCustomerRoutine,
  updateCustomerRoutine,
};
