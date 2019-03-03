import { connect } from 'react-redux';
import reservationActions from '../../actions/reservationActions';
import reservationSelector from '../../selectors/reservationSelector';
import ReservationsTable from '../../components/Tables/ReservationsTable';

const { getReservationsRoutine } = reservationActions;
const { getReservationsSelector } = reservationSelector;

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  reservations: getReservationsSelector(state).data,
  error: getReservationsSelector(state).error,
  loading: getReservationsSelector(state).loading,
});

const mapDispatchToProps = dispatch => ({
  getReservations: () => dispatch(
    getReservationsRoutine.trigger(),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsTable);
