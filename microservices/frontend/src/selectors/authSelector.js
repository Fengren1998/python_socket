const emailVerificationProcessingSelector = state => state.emailVerificationProcessing;
const emailVerificationSelector = state => state.emailVerification;
const forgotPasswordProcessingSelector = state => state.forgotPasswordProcessing;
const forgotPasswordSelector = state => state.forgotPassword;
const loginSelector = state => state.login;
const registerSelector = state => state.register;

export default {
  emailVerificationProcessingSelector,
  emailVerificationSelector,
  forgotPasswordProcessingSelector,
  forgotPasswordSelector,
  loginSelector,
  registerSelector,
};
