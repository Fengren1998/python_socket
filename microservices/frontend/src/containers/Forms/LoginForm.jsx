import { connect } from 'react-redux';
import authActions from '../../actions/authActions';
import authSelector from '../../selectors/authSelector';
import LoginForm from '../../components/Forms/LoginForm';

const { loginRoutine } = authActions;
const { loginSelector } = authSelector;

const mapStateToProps = state => ({
  error: loginSelector(state).error,
  loading: loginSelector(state).loading,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(
    loginRoutine.trigger({
      email,
      password,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
