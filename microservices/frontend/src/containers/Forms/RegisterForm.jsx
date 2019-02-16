import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import RegisterForm from '../../components/Forms/RegisterForm';

const { registerRoutine } = authActions;
const { registerSelector } = authSelector;

const mapStateToProps = state => ({
  error: registerSelector(state).error,
  loading: registerSelector(state).loading,
  success: registerSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  register: (firstName, lastName, email, password) => dispatch(
    registerRoutine.trigger({
      firstName,
      lastName,
      email,
      password,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
