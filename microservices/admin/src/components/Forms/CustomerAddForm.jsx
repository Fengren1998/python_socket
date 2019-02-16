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

class CustomerAddForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { addCustomer } = this.props;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    addCustomer(firstName, lastName, email, password);
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
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" name="firstName" autoComplete="firstName" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" name="lastName" autoComplete="lastName" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" autoComplete="email" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </FormControl>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography className={classes.success} variant="subtitle2" gutterBottom>
            Customer successfully added.
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
          Add Customer
        </Button>
        <Link className={classes.linkButton} to="/customers">
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

CustomerAddForm.defaultProps = {
  error: null,
};

CustomerAddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  addCustomer: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CustomerAddForm);
