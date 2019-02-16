import { call, put, takeLatest } from 'redux-saga/effects';
import CustomersAPI from '../api/customers';
import customersActions from '../actions/customersActions';
import errorConstants from '../constants/errorConstants';

const {
  getCustomersRoutine,
  addCustomerRoutine,
  updateCustomerRoutine,
} = customersActions;

function* getCustomersSaga(action) {
  try {
    const customers = yield call(CustomersAPI.getCustomers);

    const customersById = {};
    if (customers) {
      customers.map((customer) => {
        customersById[customer.id] = customer;
        return customer;
      });
      yield put(getCustomersRoutine.success({ customersById }));
    } else {
      throw new Error(errorConstants.SERVICES_EMPTY);
    }
  } catch (error) {
    yield put(getCustomersRoutine.failure({ message: error.message }));
  }
}

function* addCustomerSaga(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = action.payload;

    yield call(CustomersAPI.addCustomer, firstName, lastName, email, password);
    yield put(addCustomerRoutine.success());
  } catch (error) {
    yield put(addCustomerRoutine.failure({ message: 'Failed to add customer.' }));
  }
}

function* updateCustomerSaga(action) {
  try {
    const {
      id,
      name,
      description,
      cost,
      duration,
    } = action.payload;

    yield call(CustomersAPI.updateCustomer, id, name, description, cost, duration);
    yield put(updateCustomerRoutine.success());
  } catch (error) {
    yield put(updateCustomerRoutine.failure({ message: 'Failed to update customer.' }));
  }
}

function* customersSaga() {
  yield takeLatest(getCustomersRoutine.TRIGGER, getCustomersSaga);
  yield takeLatest(addCustomerRoutine.TRIGGER, addCustomerSaga);
  yield takeLatest(updateCustomerRoutine.TRIGGER, updateCustomerSaga);
}

export default customersSaga;
