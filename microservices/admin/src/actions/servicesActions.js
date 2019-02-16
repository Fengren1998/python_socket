import { createRoutine } from 'redux-saga-routines';
import ServicesConstants from '../constants/servicesConstants';

const getServicesRoutine = createRoutine(ServicesConstants.GET_SERVICES);
const addServiceRoutine = createRoutine(ServicesConstants.ADD_SERVICE);
const updateServiceRoutine = createRoutine(ServicesConstants.UPDATE_SERVICE);

export default {
  getServicesRoutine,
  addServiceRoutine,
  updateServiceRoutine,
};
