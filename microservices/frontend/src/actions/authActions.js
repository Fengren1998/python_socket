import { createRoutine } from 'redux-saga-routines';
import AuthConstants from '../constants/authConstants';

const checkRoutine = createRoutine(AuthConstants.CHECK);
const emailVerificationProcessingRoutine = createRoutine(
  AuthConstants.EMAIL_VERIFICATION_PROCESSING,
);
const emailVerificationRoutine = createRoutine(AuthConstants.EMAIL_VERIFICATION);
const loginRoutine = createRoutine(AuthConstants.LOGIN);
const logoutRoutine = createRoutine(AuthConstants.LOGOUT);
const registerRoutine = createRoutine(AuthConstants.REGISTER);
const forgotPasswordRoutine = createRoutine(AuthConstants.FORGOT_PASSWORD);
const forgotPasswordProcessingRoutine = createRoutine(
  AuthConstants.FORGOT_PASSWORD_PROCESSING,
);

export default {
  checkRoutine,
  emailVerificationProcessingRoutine,
  emailVerificationRoutine,
  loginRoutine,
  logoutRoutine,
  registerRoutine,
  forgotPasswordRoutine,
  forgotPasswordProcessingRoutine,
};
