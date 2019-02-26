import { call, put, takeLatest } from 'redux-saga/effects';
import ReservationAPI from '../api/reservation';
import reservationActions from '../actions/reservationActions';

const { getReservationsRoutine } = reservationActions;

function* getReservations() {
  try {
    const reservations = yield call(ReservationAPI.getReservations);
    yield put(getReservationsRoutine.success(reservations));
  } catch (error) {
    yield put(error.message);
  }
}

function* reservationSaga() {
  yield takeLatest(getReservationsRoutine.TRIGGER, getReservations);
}

export default reservationSaga;
