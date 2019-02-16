import { call, put, takeLatest } from 'redux-saga/effects';
import auth from '../api/auth';
import authActions from '../actions/authActions';

const {
  checkRoutine,
  emailVerificationProcessingRoutine,
  emailVerificationRoutine,
  forgotPasswordProcessingRoutine,
  forgotPasswordRoutine,
  loginRoutine,
  registerRoutine,
} = authActions;

function* check() {
  try {
    const result = yield call(auth.check);
    if (!result.isLoggedIn || !result.type === 'user') {
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
    yield call(auth.startEmailVerification, email);
    yield put(emailVerificationRoutine.success({ message: 'Verification email sent.' }));
  } catch (error) {
    yield put(emailVerificationRoutine.failure({ message: 'Verification email sending failed.' }));
  }
}

function* emailVerificationProcessing(action) {
  try {
    const { email, hash } = action.payload;
    yield call(auth.performEmailVerification, email, hash);
    yield put(emailVerificationProcessingRoutine.success());
  } catch (error) {
    yield put(emailVerificationProcessingRoutine.failure());
  }
}

function* forgotPassword(action) {
  try {
    const { email } = action.payload;
    yield call(auth.startForgotPassword, email);
    yield put(forgotPasswordRoutine.success({ message: 'Password reset email sent.' }));
  } catch (error) {
    yield put(forgotPasswordRoutine.failure({ message: 'Password reset email sending failed.' }));
  }
}

function* forgotPasswordProcessing(action) {
  try {
    const {
      email, newPassword, confirmPassword, hash,
    } = action.payload;
    if (newPassword === confirmPassword) {
      yield call(auth.performForgotPassword, email, newPassword, hash);
      yield put(forgotPasswordProcessingRoutine.success({ message: 'Password reset successful.' }));
    } else {
      yield put(forgotPasswordProcessingRoutine.failure({ message: 'Passwords do not match.' }));
    }
  } catch (error) {
    yield put(forgotPasswordProcessingRoutine.failure({ message: 'Password reset failed.' }));
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
    } = action.payload;
    yield call(auth.register, firstName, lastName, email, password);
    yield put(registerRoutine.success());
  } catch (error) {
    yield put(registerRoutine.failure());
  }
}

function* authSaga() {
  yield takeLatest(checkRoutine.TRIGGER, check);
  yield takeLatest(emailVerificationProcessingRoutine.TRIGGER, emailVerificationProcessing);
  yield takeLatest(emailVerificationRoutine.TRIGGER, emailVerification);
  yield takeLatest(forgotPasswordProcessingRoutine.TRIGGER, forgotPasswordProcessing);
  yield takeLatest(forgotPasswordRoutine.TRIGGER, forgotPassword);
  yield takeLatest(loginRoutine.TRIGGER, login);
  yield takeLatest(registerRoutine.TRIGGER, register);
}

export default authSaga;
