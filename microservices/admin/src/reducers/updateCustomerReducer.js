import customersActions from '../actions/customersActions';

const { updateCustomerRoutine } = customersActions;
const initialState = {
  error: null,
  success: false,
  loading: false,
};

const updateCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case updateCustomerRoutine.TRIGGER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case updateCustomerRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case updateCustomerRoutine.FAILURE:
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

export default updateCustomerReducer;
