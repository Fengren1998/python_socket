import { connect } from 'react-redux';
import servicesActions from '../../actions/servicesActions';
import servicesSelector from '../../selectors/servicesSelector';
import BookingForm from '../../components/Forms/BookingForm';

const { getServicesRoutine } = servicesActions;
const {
  servicesSelector: getAllServicesSelector,
  errorSelector,
} = servicesSelector;

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  services: getAllServicesSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = (dispach) => {
  const dispatch = dispach;

  return {
    getServices: () => dispatch(
      getServicesRoutine.trigger(),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
