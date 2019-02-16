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

class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { register } = this.props;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    register(firstName, lastName, email, password);
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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" name="firstName" autoComplete="firstName" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" name="lastName" autoComplete="lastName" autoFocus />
        </FormControl>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            Registration failed.
          </Typography>
        )}
        {success && (
          <Typography className={classes.success} variant="subtitle2" gutterBottom>
            Registration successful. Verification email sent.
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
          Register
        </Button>
        <Link className={classes.linkButton} to="/login">
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </Link>
        <Link className={classes.linkButton} to="/forgot-password">
          <Typography className={classes.link} variant="overline" align="center" gutterBottom>
            Forgot your password?
          </Typography>
        </Link>
        <Link className={classes.linkButton} to="/email-verification">
          <Typography className={classes.link} variant="overline" align="center" gutterBottom>
            Resend verification email?
          </Typography>
        </Link>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default withStyles(styles)(RegisterForm);
