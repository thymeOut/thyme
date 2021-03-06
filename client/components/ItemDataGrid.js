import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item' },
  {
    id: 'quantityUsed',
    numeric: true,
    disablePadding: false,
    label: 'Quantity Used',
  },
  {
    id: 'quantityWasted',
    numeric: true,
    disablePadding: false,
    label: 'Quantity Wasted',
  },
  {
    id: 'dollarsUsed',
    numeric: true,
    disablePadding: false,
    label: '$ Used',
  },
  {
    id: 'dollarsWasted',
    numeric: true,
    disablePadding: false,
    label: '$ Wasted',
  },
  {
    id: 'netDollars',
    numeric: true,
    disablePadding: false,
    label: '$ Net',
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('quantityUsed');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [itemRows, setItemRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  useEffect(() => {
    let newData = {};

    props.items.forEach((item) => {
      const itemName = item.item.name;

      if (newData[itemName]) {
        if (item.itemStatus.includes('EXPIRED')) {
          newData[itemName].quantityWasted =
            newData[itemName].quantityWasted +
            item.originalQuantity -
            item.quantityUsed;

          newData[itemName].dollarsWasted =
            newData[itemName].dollarsWasted +
            ((item.originalQuantity - item.quantityUsed) /
              item.originalQuantity) *
              (item.price / 100);
          newData[itemName].quantityUsed =
            newData[itemName].quantityUsed + item.quantityUsed;
          newData[itemName].dollarsUsed =
            newData[itemName].dollarsUsed +
            (item.quantityUsed / item.originalQuantity) * (item.price / 100);
          newData[itemName].netDollars =
            newData[itemName].dollarsUsed +
            (item.quantityUsed / item.originalQuantity) * (item.price / 100) -
            newData[itemName].dollarsWasted +
            ((item.originalQuantity - item.quantityUsed) /
              item.originalQuantity) *
              (item.price / 100);
        }
      } else {
        if (item.itemStatus.includes('EXPIRED')) {
          newData[itemName] = {
            ...item,

            dollarsWasted:
              ((item.originalQuantity - item.quantityUsed) /
                item.originalQuantity) *
              (item.price / 100),
            quantityWasted: item.originalQuantity - item.quantityUsed,
            dollarsUsed:
              (item.quantityUsed / item.originalQuantity) * (item.price / 100),
            netDollars:
              (item.quantityUsed / item.originalQuantity) * (item.price / 100) -
              ((item.originalQuantity - item.quantityUsed) /
                item.originalQuantity) *
                (item.price / 100),
          };
        } else {
          newData[itemName] = {
            ...item,
            dollarsWasted: 0,
            quantityWasted: 0,
            dollarsUsed:
              (item.quantityUsed / item.originalQuantity) * (item.price / 100),
            netDollars:
              (item.quantityUsed / item.originalQuantity) * (item.price / 100),
          };
        }
      }
    });

    let tableData = [];
    for (const [key, value] of Object.entries(newData)) {
      tableData.push(value);
    }

    setItemRows(tableData);
  }, [order, props.items]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.items.length - page * rowsPerPage);
  return (
    <div className={classes.root} id='item-data-table'>
      <Paper className={classes.paper}>
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Items
        </Typography>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.items.length}
            />
            <TableBody>
              {stableSort(itemRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align='left'>{row.item.name}</TableCell>
                      <TableCell align='right'>{row.quantityUsed}</TableCell>
                      <TableCell align='right'>{row.quantityWasted}</TableCell>
                      <TableCell align='right'>
                        ${Number.parseFloat(row.dollarsUsed).toFixed(2)}
                      </TableCell>
                      <TableCell align='right'>
                        ${Number.parseFloat(row.dollarsWasted).toFixed(2)}
                      </TableCell>
                      <TableCell align='right'>
                        ${Number.parseFloat(row.netDollars).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={itemRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </div>
  );
}
