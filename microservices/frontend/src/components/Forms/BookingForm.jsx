import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
});

class BookingForm extends Component {
  constructor() {
    super();

    this.state = {
      selectedService: 10,
    };
  }

  handleSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes, handleDateChange } = this.props;
    const { selectedService } = this.state;
    return (
      <form
        className={classes.form}
        onSubmit={
          (e) => {
            e.preventDefault();
          }
        }
      >
        <FormControl className={classes.selectField}>
          <InputLabel shrink htmlFor="age-label-placeholder">
            Service
          </InputLabel>
          <Select
            value={selectedService}
            onChange={this.handleSelect}
            inputProps={{
              name: 'selectedService',
              id: 'service-id',
            }}
            fullWidth
          >
            <MenuItem value={10}>Service A</MenuItem>
            <MenuItem value={20}>Service B</MenuItem>
            <MenuItem value={30}>Service C</MenuItem>
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
          disabled={false}
        >
          Book
        </Button>
      </form>
    );
  }
}

BookingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookingForm);
