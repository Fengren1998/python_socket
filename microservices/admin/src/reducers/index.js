import { combineReducers } from 'redux';
import emailVerificationReducer from './emailVerificationReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import addServiceReducer from './addServiceReducer';
import updateServiceReducer from './updateServiceReducer';
import getServicesReducer from './getServicesReducer';
import addCustomerReducer from './addCustomerReducer';
import updateCustomerReducer from './updateCustomerReducer';
import getCustomersReducer from './getCustomersReducer';

const reducers = combineReducers({
  emailVerification: emailVerificationReducer,
  login: loginReducer,
  register: registerReducer,
  getServices: getServicesReducer,
  addService: addServiceReducer,
  updateService: updateServiceReducer,
  getCustomers: getCustomersReducer,
  addCustomer: addCustomerReducer,
  updateCustomer: updateCustomerReducer,
});

export default reducers;
