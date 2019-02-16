import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  appBar: {
    position: 'relative',
  },
  linkButton: {
    color: 'inherit',
    textDecoration: 'none',
  },
  toolbarTitle: {
    flex: 1,
  },
});

const Navbar = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link className={classes.linkButton} to="/">
              PaperWorkPH
            </Link>
          </Typography>
          <Button>Services</Button>
          <Link className={classes.linkButton} to="/reservation">
            <Button>Reservations</Button>
          </Link>
          <Link className={classes.linkButton} to="/login">
            <Button color="primary" variant="outlined">
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};


Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
