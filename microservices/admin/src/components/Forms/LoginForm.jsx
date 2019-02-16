import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
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
});

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { login } = this.props;
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password);
  }

  render() {
    const { classes, error, loading } = this.props;
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
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            Login failed. Check your username and password, or if you have verified your account.
          </Typography>
        )}
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Log In
        </Button>
        <Link className={classes.linkButton} to="/register">
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginForm);
