import servicesActions from '../actions/servicesActions';

const { getServicesRoutine } = servicesActions;
const initialState = {
  services: null,
  error: null,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case getServicesRoutine.TRIGGER:
      return {
        ...state,
        services: null,
        error: null,
      };
    case getServicesRoutine.SUCCESS:
      return {
        ...state,
        services: action.payload,
        error: null,
      };
    case getServicesRoutine.FAILURE:
      return {
        ...state,
        services: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default servicesReducer;
