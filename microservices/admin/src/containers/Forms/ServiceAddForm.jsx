import { connect } from 'react-redux';
import servicesActions from '../../actions/servicesActions';
import addServiceSelector from '../../selectors/addServiceSelector';
import ServiceAddForm from '../../components/Forms/ServiceAddForm';

const { addServiceRoutine } = servicesActions;
const {
  errorSelector,
  loadingSelector,
  successSelector,
} = addServiceSelector;

const mapStateToProps = state => ({
  error: errorSelector(state),
  loading: loadingSelector(state),
  success: successSelector(state),
});

const mapDispatchToProps = dispatch => ({
  addService: (name, description, cost, duration) => dispatch(
    addServiceRoutine.trigger({
      name,
      description,
      cost,
      duration,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAddForm);
