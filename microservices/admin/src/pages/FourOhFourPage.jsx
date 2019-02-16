import React from 'react';
import PropTypes from 'prop-types';
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
});

const shittyQuotes = [
  <p>
    Two routes diverged in a yellow wood, and I—
    <br />
    I took the one less travelled by.
  </p>,
  <p>
    These are not the routes you are looking for.
    <br />
    *Jedi mind tricks*
  </p>,
  <p>
    Dread it. Run from it. Destiny still arrives.
    <br />
    <small>***Destiny = Some person accessing a missing page***</small>
  </p>,
  <p>
    What do we say to the Lord of
    {' '}
    <del>Death</del>
    {' '}
    Non-existent Pages?
    <br />
    <br />
        Not today.
  </p>,
];

const getShittyQuote = () => (
  shittyQuotes[Math.floor(
    Math.random() * shittyQuotes.length,
  )]
);

const FourOhFourPage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Typography variant="h3">
        404: Page not found
      </Typography>
      <Typography variant="h5">
        { getShittyQuote() }
      </Typography>
      <Typography variant="h5" align="right">— Sir Ver</Typography>
    </div>
  );
};

FourOhFourPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FourOhFourPage);
