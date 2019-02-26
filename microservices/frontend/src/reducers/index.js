import { combineReducers } from 'redux';
import emailVerificationProcessingReducer from './emailVerificationProcessingReducer';
import emailVerificationReducer from './emailVerificationReducer';
import forgotPasswordProcessingReducer from './forgotPasswordProcessingReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import reservationReducer from './reservationReducer';

const reducers = combineReducers({
  emailVerificationProcessing: emailVerificationProcessingReducer,
  emailVerification: emailVerificationReducer,
  forgotPasswordProcessing: forgotPasswordProcessingReducer,
  forgotPassword: forgotPasswordReducer,
  login: loginReducer,
  register: registerReducer,
  reservation: reservationReducer,
});

export default reducers;
