const baseSelector = state => state.addService;
const errorSelector = state => baseSelector(state).error;
const loadingSelector = state => baseSelector(state).loading;
const successSelector = state => baseSelector(state).success;

export default {
  baseSelector,
  errorSelector,
  loadingSelector,
  successSelector,
};
