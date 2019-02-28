import { call, put, takeLatest } from 'redux-saga/effects';
import ServicesAPI from '../api/services';
import servicesActions from '../actions/servicesActions';

const { getServicesRoutine } = servicesActions;

function* getServicesSaga(action) {
  try {
    const services = yield call(ServicesAPI.getServices);
    yield put(getServicesRoutine.success(services));
  } catch (error) {
    yield put(getServicesRoutine.failure(error.message));
  }
}

function* servicesSaga() {
  yield takeLatest(getServicesRoutine.TRIGGER, getServicesSaga);
}

export default servicesSaga;
