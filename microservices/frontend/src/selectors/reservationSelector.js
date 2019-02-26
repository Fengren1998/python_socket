const baseSelector = state => state.reservation;
const getReservationsSelector = state => (baseSelector(state) ? baseSelector(state).fetch : null);
const addReservationSelector = state => (baseSelector(state) ? baseSelector(state).add : null);

export default {
  baseSelector,
  getReservationsSelector,
  addReservationSelector,
};
