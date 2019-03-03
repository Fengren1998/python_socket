import { connect } from 'react-redux';
import reservationsActions from '../../actions/reservationActions';
import reservationsSelector from '../../selectors/reservationSelector';
import BookingTable from '../../components/Tables/BookingTable';

const { getReservationsRoutine } = reservationsActions;
const { getReservationsSelector } = reservationsSelector;

const mapStateToProps = (state, ownProps) => ({
  reservations: getReservationsSelector(state).data,
  loading: getReservationsSelector(state).loading,
  error: getReservationsSelector(state).error,
  currentDate: ownProps.date,
  selectedServiceId: ownProps.selectedServiceId,
});

const mapDispatchToProps = (dispach) => {
  const dispatch = dispach;

  return {
    getReservations: () => dispatch(
      getReservationsRoutine.trigger(),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
