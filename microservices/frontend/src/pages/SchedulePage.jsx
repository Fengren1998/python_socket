import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import BookingForm from '../components/Forms/BookingForm';
import BookingTable from '../components/Tables/BookingTable';

const styles = () => ({
  header: {
    margin: '20px 0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: {
    height: '85vh',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

const SchedulePage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.layout}>
      <div className={classes.container}>
        <Typography className={classes.header} variant="h4">
          Book Your Space Now!
        </Typography>
        <BookingForm />
      </div>
      <div className={classes.container}>
        <Typography className={classes.header} variant="h4">
          Available Times
        </Typography>
        <BookingTable />
      </div>
    </div>
  );
};

SchedulePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchedulePage);
