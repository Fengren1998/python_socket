const emailVerificationProcessingSelector = state => state.emailVerificationProcessing;
const emailVerificationSelector = state => state.emailVerification;
const forgotPasswordSelector = state => state.forgotPassword;
const loginSelector = state => state.login;
const registerSelector = state => state.register;

export default {
  emailVerificationProcessingSelector,
  emailVerificationSelector,
  forgotPasswordSelector,
  loginSelector,
  registerSelector,
};
