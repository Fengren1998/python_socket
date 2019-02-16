import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import green from '@material-ui/core/colors/green';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  container: {
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderRow: {
    width: '100%',
    padding: '50px 35% 50px 35%',
  },
  success: {
    color: green[500],
  },
});

class EmailVerificationProcessingForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    const { submit } = this.props;
    const { email, hash } = QueryString.parse(window.location.search);

    submit(email, hash);
  }

  render() {
    const {
      classes,
      error,
      loading,
      success,
    } = this.props;
    return (
      <Fragment>
        {loading && (
          <Fragment>
            <Typography variant="h4">
              Verifying your account
            </Typography>
            <div className={classes.loaderRow}>
              <LinearProgress />
            </div>
          </Fragment>
        )}
        {error && (
          <Fragment>
            <Typography color="error" variant="h4">
              Verification Failed :(
            </Typography>
            <br />
            <Typography variant="h5">
              Please retry verification
              {' '}
              <Link to="/email-verification">here</Link>
            </Typography>
          </Fragment>
        )}
        {success && (
          <Fragment>
            <Typography className={classes.success} color="inherit" variant="h4">
              Verification Successful!
            </Typography>
            <br />
            <Typography variant="h5">
              Login
              {' '}
              <Link to="/login">here</Link>
            </Typography>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

EmailVerificationProcessingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EmailVerificationProcessingForm);
