import { connect } from 'react-redux';
import customersActions from '../../actions/customersActions';
import getCustomersSelector from '../../selectors/getCustomersSelector';
import CustomersTable from '../../components/Tables/CustomersTable';

const { getCustomersRoutine } = customersActions;
const {
  customersSelector: getAllCustomersSelector,
  errorSelector,
} = getCustomersSelector;

const mapStateToProps = state => ({
  customers: getAllCustomersSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = (dispach) => {
  const dispatch = dispach;

  return {
    getCustomers: () => dispatch(
      getCustomersRoutine.trigger(),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersTable);
