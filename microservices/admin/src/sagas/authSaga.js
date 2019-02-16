import { call, put, takeLatest } from 'redux-saga/effects';
import auth from '../api/auth';
import authActions from '../actions/authActions';

const {
  checkRoutine,
  emailVerificationRoutine,
  loginRoutine,
  registerRoutine,
} = authActions;

function* check() {
  try {
    const result = yield call(auth.check);
    if (!result.isLoggedIn || !result.type === 'admin') {
      throw new Error('Unauthorized');
    }
    yield put(checkRoutine.success());
  } catch (error) {
    yield put(checkRoutine.failure());
  }
}

function* emailVerification(action) {
  try {
    const { email } = action.payload;
    yield call(auth.performEmailVerification, email);
    yield put(emailVerificationRoutine.success({ message: 'Verification email sent.' }));
  } catch (error) {
    yield put(emailVerificationRoutine.failure({ message: 'Verification email sending failed.' }));
  }
}

function* login(action) {
  try {
    const { email, password } = action.payload;
    yield call(auth.login, email, password);
    yield put(loginRoutine.success());
    yield put(checkRoutine.trigger());
  } catch (error) {
    yield put(loginRoutine.failure());
  }
}

function* register(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      isReceptionist,
    } = action.payload;
    yield call(auth.register, firstName, lastName, email, password, isReceptionist);
    yield put(registerRoutine.success());
  } catch (error) {
    yield put(registerRoutine.failure());
  }
}

function* authSaga() {
  yield takeLatest(checkRoutine.TRIGGER, check);
  yield takeLatest(emailVerificationRoutine.TRIGGER, emailVerification);
  yield takeLatest(loginRoutine.TRIGGER, login);
  yield takeLatest(registerRoutine.TRIGGER, register);
}

export default authSaga;
