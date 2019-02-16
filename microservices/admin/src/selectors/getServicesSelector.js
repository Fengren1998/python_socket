const baseSelector = state => state.getServices;
const errorSelector = state => baseSelector(state).error;
const servicesSelector = state => baseSelector(state).servicesById;
const serviceByIdSelector = (state, id) => {
  if (servicesSelector(state)) {
    return baseSelector(state).servicesById[id];
  }
  return null;
};

export default {
  baseSelector,
  errorSelector,
  servicesSelector,
  serviceByIdSelector,
};
