import { createRoutine } from 'redux-saga-routines';
import AuthConstants from '../constants/authConstants';

const checkRoutine = createRoutine(AuthConstants.CHECK);
const emailVerificationRoutine = createRoutine(AuthConstants.EMAIL_VERIFICATION);
const loginRoutine = createRoutine(AuthConstants.LOGIN);
const logoutRoutine = createRoutine(AuthConstants.LOGOUT);
const registerRoutine = createRoutine(AuthConstants.REGISTER);

export default {
  checkRoutine,
  emailVerificationRoutine,
  loginRoutine,
  logoutRoutine,
  registerRoutine,
};
