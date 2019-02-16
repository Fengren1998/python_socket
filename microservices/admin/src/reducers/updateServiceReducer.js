import servicesActions from '../actions/servicesActions';

const { updateServiceRoutine } = servicesActions;
const initialState = {
  error: null,
  success: false,
  loading: false,
};

const updateServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case updateServiceRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case updateServiceRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case updateServiceRoutine.FAILURE:
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

export default updateServiceReducer;
