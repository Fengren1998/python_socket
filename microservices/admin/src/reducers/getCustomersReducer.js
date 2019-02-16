import customersActions from '../actions/customersActions';

const { getCustomersRoutine } = customersActions;
const initialState = {
  customersById: null,
  error: null,
};

const getCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case getCustomersRoutine.TRIGGER:
      return {
        ...state,
        customersById: null,
        error: null,
      };
    case getCustomersRoutine.SUCCESS:
      return {
        ...state,
        customersById: action.payload.customersById,
        error: null,
      };
    case getCustomersRoutine.FAILURE:
      return {
        ...state,
        customersById: null,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default getCustomersReducer;
