import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('8:00 AM', 159, 6.0, 24, 4.0),
  createData('9:00 AM', 262, 16.0, 24, 6.0),
  createData('10:00 AM', 356, 16.0, 49, 3.9),
  createData('11:00 AM', 356, 16.0, 49, 3.9),
  createData('12:00 PM', 356, 16.0, 49, 3.9),
  createData('1:00 PM', 356, 16.0, 49, 3.9),
  createData('2:00 PM', 356, 16.0, 49, 3.9),
  createData('3:00 PM', 356, 16.0, 49, 3.9),
  createData('4:00 PM', 356, 16.0, 49, 3.9),
  createData('5:00 PM', 356, 16.0, 49, 3.9),
];

function BookingTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

BookingTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingTable);
