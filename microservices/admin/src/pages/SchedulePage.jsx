import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Calendar from '../components/Calendar';

const styles = () => ({
  header: {
    margin: '50px 0',
  },
  container: {
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SchedulePage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant="h2">
        Book Your Space Now!
      </Typography>
      <Calendar />
    </div>
  );
};

SchedulePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchedulePage);
