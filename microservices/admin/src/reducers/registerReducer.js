import authActions from '../actions/authActions';

const { registerRoutine } = authActions;
const initialState = {
  error: false,
  loading: false,
  success: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerRoutine.TRIGGER:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case registerRoutine.SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        success: true,
      };
    case registerRoutine.FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default registerReducer;
