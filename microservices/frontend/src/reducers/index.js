import { combineReducers } from 'redux';
import emailVerificationProcessingReducer from './emailVerificationProcessingReducer';
import emailVerificationReducer from './emailVerificationReducer';
import forgotPasswordProcessingReducer from './forgotPasswordProcessingReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import reservationReducer from './reservationReducer';
import servicesReducer from './servicesReducer';

const reducers = combineReducers({
  emailVerificationProcessing: emailVerificationProcessingReducer,
  emailVerification: emailVerificationReducer,
  forgotPasswordProcessing: forgotPasswordProcessingReducer,
  forgotPassword: forgotPasswordReducer,
  login: loginReducer,
  register: registerReducer,
  reservation: reservationReducer,
  services: servicesReducer,
});

export default reducers;
