import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import EmailVerificationProcessingForm from '../containers/Forms/EmailVerificationProcessingForm';

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
});

const EmailVerificationProcessingPage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <EmailVerificationProcessingForm />
    </div>
  );
};

EmailVerificationProcessingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailVerificationProcessingPage);
