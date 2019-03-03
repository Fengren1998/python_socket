import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import ApproveIcon from '@material-ui/icons/Done';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import ReservationAPI from '../../api/reservations';

const createData = (reservationsById) => {
  if (reservationsById) {
    return Object.values(reservationsById);
  }
  return [];
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => (
  order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
);

const rows = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'reservation',
    numeric: false,
    disablePadding: true,
    label: 'Reservation',
  },
  {
    id: 'user',
    numeric: false,
    disablePadding: false,
    label: 'User',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date Reserved',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'isConfirmed',
    numeric: false,
    disablePadding: false,
    label: 'Approved?',
  },
  {
    id: 'isFinished',
    numeric: false,
    disablePadding: false,
    label: 'Finished?',
  },
];

class ReservationTableHead extends Component {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => (
            <TableCell
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

ReservationTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
  linkButton: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

let ReservationTableToolbar = (props) => {
  const {
    numSelected,
    classes,
    error,
    handleDelete,
    handleApprove,
  } = props;

  return (
    <Fragment>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {`${numSelected} selected`}
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Reservation
            </Typography>
          )}
          {error && (
            <Typography variant="caption" color="error" gutterBottom>
              {error}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
            <Fragment>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon onClick={handleDelete} />
                </IconButton>
              </Tooltip>
              {/* {numSelected === 1 && (
                <Tooltip title="Update">
                  <Link
                    className={classes.linkButton}
                    to={`/reservations/update?id=${selected[0]}`}
                  >
                    <IconButton aria-label="Update">
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              )} */}
              {numSelected === 1 && (
                <Tooltip title="Approve">
                  <IconButton aria-label="Approve">
                    <ApproveIcon onClick={handleApprove} />
                  </IconButton>
                </Tooltip>
              )}
            </Fragment>
          )}
        </div>
      </Toolbar>
    </Fragment>
  );
};

ReservationTableToolbar.defaultProps = {
  error: null,
};

ReservationTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  error: PropTypes.string,
  handleApprove: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  // selected: PropTypes.array.isRequired,
};

ReservationTableToolbar = withStyles(toolbarStyles)(ReservationTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ReservationTable extends Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    page: 0,
    rowsPerPage: 10,
    error: null,
  };

  componentDidMount = () => {
    const { getReservations } = this.props;
    getReservations();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    const { orderBy: previousOrderBy, order: previousOrder } = this.state;
    let order = 'desc';

    if (previousOrderBy === property && previousOrder === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    const { reservations } = this.props;
    if (event.target.checked) {
      this.setState({ selected: createData(reservations).map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDelete = async () => {
    const { selected: ids } = this.state;
    try {
      await ReservationAPI.deleteReservations(ids);
      window.location.reload();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleApprove = async () => {
    const { selected: ids } = this.state;
    try {
      await ReservationAPI.approveReservations(ids[0]);
      window.location.reload();
    } catch (error) {
      this.setState({ error: 'Time is already booked.' });
    }
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  }

  render() {
    const { classes, reservations, error } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      error: stateError,
    } = this.state;

    const data = createData(reservations);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <ReservationTableToolbar
          numSelected={selected.length}
          error={error || stateError}
          handleDelete={this.handleDelete}
          handleApprove={this.handleApprove}
          selected={selected}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ReservationTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.id}
                      </TableCell>
                      <TableCell align="right">{n.service.name}</TableCell>
                      <TableCell align="right">{`${n.user.last_name}, ${n.user.first_name}`}</TableCell>
                      <TableCell align="right">{moment(n.date_reserved).format('MM-DD-YYYY HH:mm A')}</TableCell>
                      <TableCell align="right">{n.duration}</TableCell>
                      <TableCell align="right">{n.is_confirmed ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="right">{n.is_finished ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
ReservationTable.defaultProps = {
  error: null,
  reservations: null,
};

ReservationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  reservations: PropTypes.object,
  getReservations: PropTypes.func.isRequired,
};

export default withStyles(styles)(ReservationTable);