import authActions from '../actions/authActions';

const { checkRoutine, loginRoutine } = authActions;
const initialState = {
  isAuthenticated: false,
  isChecking: true,
  error: false,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginRoutine.TRIGGER:
      return {
        ...state,
        isAuthenticated: false,
        error: false,
        loading: true,
      };
    case loginRoutine.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        loading: false,
      };
    case loginRoutine.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: true,
        loading: false,
      };
    case checkRoutine.TRIGGER:
      return {
        ...state,
        isChecking: true,
      };
    case checkRoutine.SUCCESS:
      return {
        ...state,
        isChecking: false,
        isAuthenticated: true,
      };
    case checkRoutine.FAILURE:
      return {
        ...state,
        isChecking: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
