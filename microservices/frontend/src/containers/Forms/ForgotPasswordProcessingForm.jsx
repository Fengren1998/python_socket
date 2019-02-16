import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import ForgotPasswordProcessingForm from '../../components/Forms/ForgotPasswordProcessingForm';

const { forgotPasswordProcessingRoutine } = authActions;
const { forgotPasswordProcessingSelector } = authSelector;

const mapStateToProps = state => ({
  error: forgotPasswordProcessingSelector(state).error,
  loading: forgotPasswordProcessingSelector(state).loading,
  success: forgotPasswordProcessingSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  submit: (email, newPassword, confirmPassword, hash) => dispatch(
    forgotPasswordProcessingRoutine.trigger({
      email,
      newPassword,
      confirmPassword,
      hash,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordProcessingForm);
