import authActions from '../actions/authActions';

const { forgotPasswordProcessingRoutine } = authActions;
const initialState = {
  error: false,
  loading: false,
  success: false,
};

const forgotPasswordProcessingReducer = (state = initialState, action) => {
  switch (action.type) {
    case forgotPasswordProcessingRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case forgotPasswordProcessingRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case forgotPasswordProcessingRoutine.FAILURE:
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

export default forgotPasswordProcessingReducer;
