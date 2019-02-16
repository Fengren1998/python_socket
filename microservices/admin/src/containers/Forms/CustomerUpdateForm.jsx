import { connect } from 'react-redux';
import customersActions from '../../actions/customersActions';
import updateCustomerSelector from '../../selectors/updateCustomerSelector';
import CustomerUpdateForm from '../../components/Forms/CustomerUpdateForm';

const { updateCustomerRoutine } = customersActions;
const {
  errorSelector,
  loadingSelector,
  successSelector,
} = updateCustomerSelector;

const mapStateToProps = state => ({
  error: errorSelector(state),
  loading: loadingSelector(state),
  success: successSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;

  return {
    updateCustomer: (firstName, lastName, email, password) => dispatch(
      updateCustomerRoutine.trigger({
        id,
        firstName,
        lastName,
        email,
        password,
      }),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdateForm);
