import reservationActions from '../actions/reservationActions';

const {
  getReservationsRoutine,
  addReservationRoutine,
  updateReservationRoutine,
} = reservationActions;
const initialState = {
  add: {
    error: null,
    loading: false,
    success: false,
  },
  get: {
    error: null,
    loading: false,
    data: null,
  },
  update: {
    error: null,
    loading: false,
    success: false,
  },
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case getReservationsRoutine.TRIGGER:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case getReservationsRoutine.SUCCESS:
      return {
        ...state,
        get: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case getReservationsRoutine.FAILURE:
      return {
        ...state,
        get: {
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
          error: null,
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
    case updateReservationRoutine.TRIGGER:
      return {
        ...state,
        update: {
          ...state.update,
          loading: true,
          success: false,
        },
      };
    case updateReservationRoutine.SUCCESS:
      return {
        ...state,
        update: {
          loading: false,
          error: null,
          success: true,
        },
      };
    case updateReservationRoutine.FAILURE:
      return {
        ...state,
        update: {
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
