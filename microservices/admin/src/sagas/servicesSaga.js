import { call, put, takeLatest } from 'redux-saga/effects';
import ServicesAPI from '../api/services';
import servicesActions from '../actions/servicesActions';
import errorConstants from '../constants/errorConstants';

const {
  getServicesRoutine,
  addServiceRoutine,
  updateServiceRoutine,
} = servicesActions;

function* getServicesSaga(action) {
  try {
    const services = yield call(ServicesAPI.getServices);

    const servicesById = {};
    if (services) {
      services.map((service) => {
        servicesById[service.id] = service;
        return service;
      });
      yield put(getServicesRoutine.success({ servicesById }));
    } else {
      throw new Error(errorConstants.SERVICES_EMPTY);
    }
  } catch (error) {
    yield put(getServicesRoutine.failure({ message: error.message }));
  }
}

function* addServiceSaga(action) {
  try {
    const {
      name,
      description,
      cost,
      duration,
    } = action.payload;

    yield call(ServicesAPI.addService, name, description, cost, duration);
    yield put(addServiceRoutine.success());
  } catch (error) {
    yield put(addServiceRoutine.failure({ message: 'Failed to add service.' }));
  }
}

function* updateServiceSaga(action) {
  try {
    const {
      id,
      name,
      description,
      cost,
      duration,
    } = action.payload;

    yield call(ServicesAPI.updateService, id, name, description, cost, duration);
    yield put(updateServiceRoutine.success());
  } catch (error) {
    yield put(updateServiceRoutine.failure({ message: 'Failed to update service.' }));
  }
}

function* servicesSaga() {
  yield takeLatest(getServicesRoutine.TRIGGER, getServicesSaga);
  yield takeLatest(addServiceRoutine.TRIGGER, addServiceSaga);
  yield takeLatest(updateServiceRoutine.TRIGGER, updateServiceSaga);
}

export default servicesSaga;
