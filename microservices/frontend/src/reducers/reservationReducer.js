import reservationActions from '../actions/reservationActions';

const { getReservationsRoutine, addReservationRoutine } = reservationActions;
const initialState = {
  add: {
    error: false,
    loading: false,
    success: false,
  },
  fetch: {
    error: null,
    loading: false,
    data: null,
  },
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case getReservationsRoutine.TRIGGER:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: true,
        },
      };
    case getReservationsRoutine.SUCCESS:
      return {
        ...state,
        fetch: {
          loading: false,
          error: false,
          data: action.payload,
        },
      };
    case getReservationsRoutine.FAILURE:
      return {
        ...state,
        fetch: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case addReservationRoutine.TRIGGER:
      return {
        ...state,
        add: {
          ...state.add,
          loading: true,
          success: false,
        },
      };
    case addReservationRoutine.SUCCESS:
      return {
        ...state,
        add: {
          loading: false,
          error: false,
          success: true,
        },
      };
    case addReservationRoutine.FAILURE:
      return {
        ...state,
        add: {
          loading: false,
          error: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};

export default reservationsReducer;
