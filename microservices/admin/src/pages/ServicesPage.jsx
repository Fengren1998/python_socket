import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ServicesTable from '../containers/Tables/ServicesTable';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1366 + theme.spacing.unit * 3 * 2)]: {
      width: 1366,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});

const ServicesPage = (props) => {
  const { classes } = props;

  return (
    <main className={classes.layout}>
      <ServicesTable />
    </main>
  );
};

ServicesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesPage);
