import { call, put, takeLatest } from 'redux-saga/effects';
import ReservationAPI from '../api/reservation';
import reservationActions from '../actions/reservationActions';

const { getReservationsRoutine, addReservationRoutine } = reservationActions;

function* getReservations() {
  try {
    const reservations = yield call(ReservationAPI.getReservations);
    yield put(getReservationsRoutine.success(reservations));
  } catch (error) {
    yield put(getReservationsRoutine.failure(error.message));
  }
}


function* addReservation(action) {
  try {
    const { serviceId, duration, dateReserved } = action.payload;
    yield call(
      ReservationAPI.addReservation,
      serviceId,
      duration,
      dateReserved,
    );
    yield put(addReservationRoutine.success());
  } catch (error) {
    yield put(addReservationRoutine.failure(error.message));
  }
}


function* reservationSaga() {
  yield takeLatest(getReservationsRoutine.TRIGGER, getReservations);
  yield takeLatest(addReservationRoutine.TRIGGER, addReservation);
}

export default reservationSaga;
