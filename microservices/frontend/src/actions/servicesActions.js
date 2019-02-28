import { createRoutine } from 'redux-saga-routines';
import ServicesConstants from '../constants/servicesConstants';

const getServicesRoutine = createRoutine(ServicesConstants.GET_SERVICES);

export default {
  getServicesRoutine,
};
