import servicesActions from '../actions/servicesActions';

const { getServicesRoutine } = servicesActions;
const initialState = {
  servicesById: null,
  error: null,
};

const getServicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case getServicesRoutine.TRIGGER:
      return {
        ...state,
        servicesById: null,
        error: null,
      };
    case getServicesRoutine.SUCCESS:
      return {
        ...state,
        servicesById: action.payload.servicesById,
        error: null,
      };
    case getServicesRoutine.FAILURE:
      return {
        ...state,
        servicesById: null,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default getServicesReducer;
