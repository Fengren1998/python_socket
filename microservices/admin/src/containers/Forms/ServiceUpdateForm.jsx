import { connect } from 'react-redux';
import servicesActions from '../../actions/servicesActions';
import updateServiceSelector from '../../selectors/updateServiceSelector';
import ServiceUpdateForm from '../../components/Forms/ServiceUpdateForm';

const { updateServiceRoutine } = servicesActions;
const {
  errorSelector,
  loadingSelector,
  successSelector,
} = updateServiceSelector;

const mapStateToProps = state => ({
  error: errorSelector(state),
  loading: loadingSelector(state),
  success: successSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;

  return {
    updateService: (name, description, cost, duration) => dispatch(
      updateServiceRoutine.trigger({
        id,
        name,
        description,
        cost,
        duration,
      }),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceUpdateForm);
