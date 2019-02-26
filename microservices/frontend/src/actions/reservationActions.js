import { createRoutine } from 'redux-saga-routines';
import ReservationConstants from '../constants/reservationConstants';

const getReservationsRoutine = createRoutine(ReservationConstants.GET);
const addReservationRoutine = createRoutine(ReservationConstants.ADD);

export default {
  getReservationsRoutine,
  addReservationRoutine,
};
