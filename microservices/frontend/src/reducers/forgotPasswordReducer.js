import authActions from '../actions/authActions';

const { forgotPasswordRoutine } = authActions;
const initialState = {
  error: null,
  loading: false,
  success: null,
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case forgotPasswordRoutine.TRIGGER:
      return {
        ...state,
        error: null,
        loading: true,
        success: null,
      };
    case forgotPasswordRoutine.SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: action.payload.message,
      };
    case forgotPasswordRoutine.FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        success: null,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
