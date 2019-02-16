import React, { PureComponent } from 'react';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
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

class ForgotPasswordProcessingForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { submit } = this.props;
    const { email, hash } = QueryString.parse(window.location.search);
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    submit(email, newPassword, confirmPassword, hash);
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
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <Input id="newPassword" name="newPassword" type="password" autoComplete="newPassword" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="confirmPassword">New Password</InputLabel>
          <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="confirmPassword" autoFocus />
        </FormControl>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            { error }
          </Typography>
        )}
        {success && (
          <Typography className={classes.success} variant="subtitle2" gutterBottom>
            { success }
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
          Submit
        </Button>
      </form>
    );
  }
}

ForgotPasswordProcessingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  success: PropTypes.string.isRequired,
};

export default withStyles(styles)(ForgotPasswordProcessingForm);
