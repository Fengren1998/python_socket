import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  link: {
    marginTop: 25,
  },
  linkButton: {
    color: 'inherit',
    textDecoration: 'none',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  success: {
    color: green[500],
  },
});

class ServiceUpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { updateService } = this.props;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const cost = e.target.cost.value;
    const duration = e.target.duration.value;

    updateService(name, description, cost, duration);
  }

  render() {
    const {
      classes,
      error,
      loading,
      success,
    } = this.props;

    return (
      <form className={classes.form} onSubmit={e => this.handleSubmit(e)}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Service Name</InputLabel>
          <Input id="name" name="name" autoComplete="serviceName" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            name="description"
            id="description"
            autoComplete="serviceDescription"
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="cost">Cost (PHP)</InputLabel>
          <Input
            id="cost"
            type="number"
            name="cost"
            autoComplete="serviceCost"
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="duration">Duration (min)</InputLabel>
          <Input
            id="duration"
            type="number"
            name="duration"
            autoComplete="serviceDuration"
            autoFocus
          />
        </FormControl>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography className={classes.success} variant="subtitle2" gutterBottom>
            Service successfully updated.
          </Typography>
        )}
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          Update Service
        </Button>
        <Link className={classes.linkButton} to="/services">
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Link>
      </form>
    );
  }
}

ServiceUpdateForm.defaultProps = {
  error: null,
};

ServiceUpdateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  updateService: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ServiceUpdateForm);
