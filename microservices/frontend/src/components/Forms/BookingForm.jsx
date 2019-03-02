import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '10px 0',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  selectField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 5,
  },
  success: {
    color: green[500],
  },
});

class BookingForm extends Component {
  constructor() {
    super();

    this.state = {
      selectedService: 10,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getServices } = this.props;
    getServices();
  }

  handleSelect = (event) => {
    this.setState({ selectedService: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addReservation } = this.props;

    addReservation(
      parseInt(event.target.service.value, 10),
      parseInt(event.target.duration.value, 10),
      moment(
        `${event.target.bookDate.value} ${event.target.startTime.value}`,
        'YYYY-MM-DD HH:mm',
      ),
    );
  }

  render() {
    const {
      classes,
      handleDateChange,
      services,
      error,
      success,
      loading,
    } = this.props;
    const { selectedService } = this.state;
    return (
      <Fragment>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            {'Chosen time unavailable'}
          </Typography>
        )}
        {success && (
          <Typography className={classes.success} variant="subtitle2" gutterBottom>
            Booking successfully requested.
          </Typography>
        )}
        {services ? (
          <form
            className={classes.form}
            onSubmit={e => this.handleSubmit(e)}
          >
            <FormControl className={classes.selectField}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Service
              </InputLabel>
              <Select
                value={selectedService}
                onChange={this.handleSelect}
                inputProps={{
                  name: 'service',
                  id: 'service-id',
                }}
                fullWidth
              >
                {services.map(service => <MenuItem key={`service-${service.id}`} value={service.id}>{service.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              name="bookDate"
              id="date"
              label="Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={e => handleDateChange(e.target.value)}
            />
            <TextField
              name="startTime"
              id="startTime"
              label="Start Time"
              type="time"
              defaultValue="09:00"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 3600, // 5 min
              }}
              fullWidth
            />
            <TextField
              name="duration"
              id="duration"
              label="Duration"
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={1}
              fullWidth
            />
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Book
            </Button>
          </form>
        ) : 'Loading...'}
      </Fragment>
    );
  }
}

BookingForm.defaultProps = {
  error: null,
  services: null,
};

BookingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array,
  error: PropTypes.string,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  addReservation: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookingForm);
