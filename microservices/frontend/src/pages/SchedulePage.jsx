import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import BookingForm from '../components/Forms/BookingForm';
import BookingTable from '../containers/Tables/BookingTable';

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

class SchedulePage extends Component {
  constructor() {
    super();
    this.state = {
      date: moment().format('YYYY-MM-DD'),
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({ date: moment(date).format('YYYY-MM-DD') });
  }

  render() {
    const { classes } = this.props;
    const { date } = this.state;
    return (
      <div className={classes.layout}>
        <div className={classes.container}>
          <Typography className={classes.header} variant="h4">
            Book Your Space Now!
          </Typography>
          <BookingForm handleDateChange={this.handleDateChange} />
        </div>
        <div className={classes.container}>
          <Typography className={classes.header} variant="h4">
            Available Times
          </Typography>
          <BookingTable date={date} />
        </div>
      </div>
    );
  }
}

SchedulePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchedulePage);
