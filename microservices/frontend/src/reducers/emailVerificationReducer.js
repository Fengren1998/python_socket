import authActions from '../actions/authActions';

const { emailVerificationRoutine } = authActions;
const initialState = {
  error: null,
  loading: false,
  success: null,
};

const emailVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case emailVerificationRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        success: null,
      };
    case emailVerificationRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.message,
      };
    case emailVerificationRoutine.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        success: null,
      };
    default:
      return state;
  }
};

export default emailVerificationReducer;
