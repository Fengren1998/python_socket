import authActions from '../actions/authActions';

const { emailVerificationProcessingRoutine } = authActions;
const initialState = {
  error: false,
  loading: false,
  success: false,
};

const emailVerificationProcessingReducer = (state = initialState, action) => {
  switch (action.type) {
    case emailVerificationProcessingRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case emailVerificationProcessingRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case emailVerificationProcessingRoutine.FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
      };
    default:
      return state;
  }
};

export default emailVerificationProcessingReducer;
