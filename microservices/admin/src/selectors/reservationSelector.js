const baseSelector = state => state.reservation;
const getReservationsSelector = state => (baseSelector(state) ? baseSelector(state).get : null);
const addReservationSelector = state => (baseSelector(state) ? baseSelector(state).add : null);
const updateReservationSelector = state => (
  baseSelector(state) ? baseSelector(state).update : null
);

export default {
  baseSelector,
  getReservationsSelector,
  addReservationSelector,
  updateReservationSelector,
};
