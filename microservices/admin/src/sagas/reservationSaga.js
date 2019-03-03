import { call, put, takeLatest } from 'redux-saga/effects';
import ReservationAPI from '../api/reservations';
import reservationActions from '../actions/reservationActions';
import errorConstants from '../constants/errorConstants';

const {
  getReservationsRoutine,
  addReservationRoutine,
  updateReservationRoutine,
} = reservationActions;

function* getReservations() {
  try {
    const reservations = yield call(ReservationAPI.getReservations);
    const reservationsById = {};
    if (reservations) {
      reservations.map((reservation) => {
        reservationsById[reservation.id] = reservation;
        return reservation;
      });
      yield put(getReservationsRoutine.success(reservationsById));
    } else {
      throw new Error(errorConstants.RESERVATIONS_EMPTY);
    }
  } catch (error) {
    yield put(getReservationsRoutine.failure(error.message));
  }
}


function* addReservation(action) {
  try {
    const {
      userId,
      serviceId,
      duration,
      dateReserved,
    } = action.payload;
    yield call(
      ReservationAPI.addReservation,
      userId,
      serviceId,
      duration,
      dateReserved,
    );
    yield put(addReservationRoutine.success());
  } catch (error) {
    yield put(addReservationRoutine.failure(error.message));
  }
}


function* updateReservation(action) {
  try {
    const {
      userId,
      serviceId,
      duration,
      dateReserved,
      isFinished,
      isConfirmed,
    } = action.payload;
    yield call(
      ReservationAPI.updateReservation,
      userId,
      serviceId,
      duration,
      dateReserved,
      isFinished,
      isConfirmed,
    );
    yield put(updateReservationRoutine.success());
  } catch (error) {
    yield put(updateReservationRoutine.failure(error.message));
  }
}


function* reservationSaga() {
  yield takeLatest(getReservationsRoutine.TRIGGER, getReservations);
  yield takeLatest(addReservationRoutine.TRIGGER, addReservation);
  yield takeLatest(updateReservationRoutine.TRIGGER, updateReservation);
}

export default reservationSaga;
