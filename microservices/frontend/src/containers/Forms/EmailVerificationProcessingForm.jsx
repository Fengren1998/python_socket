import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import EmailVerificationProcessingForm from '../../components/Forms/EmailVerificationProcessingForm';

const { emailVerificationProcessingRoutine } = authActions;
const { emailVerificationProcessingSelector } = authSelector;

const mapStateToProps = state => ({
  error: emailVerificationProcessingSelector(state).error,
  loading: emailVerificationProcessingSelector(state).loading,
  success: emailVerificationProcessingSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  submit: (email, hash) => dispatch(
    emailVerificationProcessingRoutine.trigger({ email, hash }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationProcessingForm);
