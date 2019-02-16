const baseSelector = state => state.getCustomers;
const errorSelector = state => baseSelector(state).error;
const customersSelector = state => baseSelector(state).customersById;
const customerByIdSelector = (state, id) => {
  if (customersSelector(state)) {
    return baseSelector(state).customersById[id];
  }
  return null;
};

export default {
  baseSelector,
  errorSelector,
  customersSelector,
  customerByIdSelector,
};
