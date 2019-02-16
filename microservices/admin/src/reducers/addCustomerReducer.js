import customersActions from '../actions/customersActions';

const { addCustomerRoutine } = customersActions;
const initialState = {
  error: null,
  success: false,
  loading: false,
};

const addCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case addCustomerRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case addCustomerRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case addCustomerRoutine.FAILURE:
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

export default addCustomerReducer;
