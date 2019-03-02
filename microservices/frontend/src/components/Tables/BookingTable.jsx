import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
  cell: {
    textAlign: 'center',
    backgroundColor: green[100],
    borderColor: 'white',
  },
  cellTaken: {
    textAlign: 'center',
    backgroundColor: 'gray',
  },
});

let id = 0;
function createData(time) {
  id += 1;
  return {
    id,
    time,
  };
}

const rows = [
  createData('8:00 AM'),
  createData('9:00 AM'),
  createData('10:00 AM'),
  createData('11:00 AM'),
  createData('12:00 PM'),
  createData('1:00 PM'),
  createData('2:00 PM'),
  createData('3:00 PM'),
  createData('4:00 PM'),
  createData('5:00 PM'),
  createData('6:00 PM'),
];

class BookingTable extends Component {
  componentDidMount() {
    const { getReservations } = this.props;
    getReservations();
  }

  render() {
    const {
      classes,
      reservations,
      currentDate,
      error,
    } = this.props;

    const reservationsInCurrentDate = reservations ? (
      reservations.filter(reservation => moment(reservation.date_reserved).format('YYYY-MM-DD') === currentDate)
    ) : [];

    return (
      <Fragment>
        {error && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            Registration failed.
          </Typography>
        )}
        <Paper className={classes.root}>
          {reservations ? (
            <Table className={classes.table}>
              <TableBody>
                {rows.map((row) => {
                  const isTaken = reservationsInCurrentDate.find(r => moment(row.time) >= moment(r.date_reserved) && moment(row.time) < moment(r.date_reserved).add(30, 'm'));
                  return (
                    <TableRow key={row.id}>
                      <TableCell className={isTaken ? classes.cellTaken : classes.cell} component="th" scope="row">
                        {row.time}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : 'Loading...'}
        </Paper>
      </Fragment>
    );
  }
}

BookingTable.defaultProps = {
  reservations: null,
  error: null,
};

BookingTable.propTypes = {
  getReservations: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  currentDate: PropTypes.string.isRequired,
  reservations: PropTypes.array,
  error: PropTypes.string,
};

export default withStyles(styles)(BookingTable);
