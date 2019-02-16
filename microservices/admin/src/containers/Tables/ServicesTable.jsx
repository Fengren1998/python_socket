import { connect } from 'react-redux';
import servicesActions from '../../actions/servicesActions';
import getServicesSelector from '../../selectors/getServicesSelector';
import ServicesTable from '../../components/Tables/ServicesTable';

const { getServicesRoutine } = servicesActions;
const {
  servicesSelector: getAllServicesSelector,
  errorSelector,
} = getServicesSelector;

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);
