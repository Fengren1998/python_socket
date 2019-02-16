import React, { PureComponent } from 'react';
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

class EmailForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { submit } = this.props;
    const email = e.target.email.value;

    submit(email);
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

EmailForm.defaultProps = {
  error: null,
  success: null,
};

EmailForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};

export default withStyles(styles)(EmailForm);
