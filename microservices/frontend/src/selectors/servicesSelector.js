const baseSelector = state => state.services;
const errorSelector = state => baseSelector(state).error;
const servicesSelector = state => baseSelector(state).services;

export default {
  baseSelector,
  errorSelector,
  servicesSelector,
};
