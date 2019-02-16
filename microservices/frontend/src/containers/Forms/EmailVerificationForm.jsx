import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import EmailForm from '../../components/Forms/EmailForm';

const { emailVerificationRoutine } = authActions;
const { emailVerificationSelector } = authSelector;

const mapStateToProps = state => ({
  error: emailVerificationSelector(state).error,
  loading: emailVerificationSelector(state).loading,
  success: emailVerificationSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  submit: email => dispatch(
    emailVerificationRoutine.trigger({ email }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
