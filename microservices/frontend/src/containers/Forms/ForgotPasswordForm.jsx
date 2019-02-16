import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import EmailForm from '../../components/Forms/EmailForm';

const { forgotPasswordRoutine } = authActions;
const { forgotPasswordSelector } = authSelector;

const mapStateToProps = state => ({
  error: forgotPasswordSelector(state).error,
  loading: forgotPasswordSelector(state).loading,
  success: forgotPasswordSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  submit: email => dispatch(
    forgotPasswordRoutine.trigger({ email }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
