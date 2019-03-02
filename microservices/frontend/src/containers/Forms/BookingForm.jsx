import { connect } from 'react-redux';
import servicesActions from '../../actions/servicesActions';
import servicesSelector from '../../selectors/servicesSelector';
import reservationActions from '../../actions/reservationActions';
import reservationSelector from '../../selectors/reservationSelector';
import BookingForm from '../../components/Forms/BookingForm';

const { getServicesRoutine } = servicesActions;
const {
  servicesSelector: getAllServicesSelector,
  errorSelector: servicesErrorSelector,
} = servicesSelector;

const { addReservationRoutine } = reservationActions;
const { addReservationSelector } = reservationSelector;

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  services: getAllServicesSelector(state),
  error: servicesErrorSelector(state) || addReservationSelector(state).error,
  loading: getAllServicesSelector(state) === null || addReservationSelector(state).loading,
  success: addReservationSelector(state).success,
});

const mapDispatchToProps = dispatch => ({
  getServices: () => dispatch(
    getServicesRoutine.trigger(),
  ),
  addReservation: (serviceId, duration, dateReserved) => dispatch(
    addReservationRoutine.trigger({
      serviceId,
      duration,
      dateReserved,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
