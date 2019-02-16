import servicesActions from '../actions/servicesActions';

const { addServiceRoutine } = servicesActions;
const initialState = {
  error: null,
  success: false,
  loading: false,
};

const addServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case addServiceRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case addServiceRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case addServiceRoutine.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        success: false,
      };
    default:
      return state;
  }
};

export default addServiceReducer;
