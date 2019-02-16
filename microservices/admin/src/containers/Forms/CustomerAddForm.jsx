import { connect } from 'react-redux';
import customersActions from '../../actions/customersActions';
import addCustomerSelector from '../../selectors/addCustomerSelector';
import CustomerAddForm from '../../components/Forms/CustomerAddForm';

const { addCustomerRoutine } = customersActions;
const {
  errorSelector,
  loadingSelector,
  successSelector,
} = addCustomerSelector;

const mapStateToProps = state => ({
  error: errorSelector(state),
  loading: loadingSelector(state),
  success: successSelector(state),
});

const mapDispatchToProps = dispatch => ({
  addCustomer: (firstName, lastName, email, password) => dispatch(
    addCustomerRoutine.trigger({
      firstName,
      lastName,
      email,
      password,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddForm);
