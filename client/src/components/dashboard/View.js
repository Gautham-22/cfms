import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, 
    Toolbar, Typography, Paper, Divider, Button
} 
from '@mui/material';
import { visuallyHidden } from '@mui/utils';

function createData(name, donation) {
  return {
    name,
    donation
  };
}

const rows = [
  createData('Cupcake', 305),
  createData('Donut', 452),
  createData('Eclair', 262),
  createData('Frozen yoghurt', 159),
  createData('Gingerbread', 356),
  createData('Honeycomb', 408),
  createData('Ice cream sandwich', 237),
  createData('Jelly Bean', 375),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318),
  createData('Nougat', 360),
  createData('Oreo', 437),
];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Username',
  },
  {
    id: 'donation',
    numeric: true,
    disablePadding: false,
    label: 'Donation',
  }
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } =  props;
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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            Donators
        </Typography>
    </Toolbar>
  );
};

const View = ({openDonate}) => {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('donation');

    const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum at tempor commodo ullamcorper a. Et leo duis ut diam quam nulla porttitor. Eget est lorem ipsum dolor. Aliquam ut porttitor leo a diam. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Nam at lectus urna duis convallis convallis. Lacinia quis vel eros donec ac. In eu mi bibendum neque egestas congue quisque. Massa sapien faucibus et molestie.Gravida neque convallis a cras semper. Imperdiet proin fermentum leo vel orci. Ut sem nulla pharetra diam sit amet. Eu volutpat odio facilisis mauris sit amet massa. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Magna fermentum iaculis eu non diam phasellus. Nibh praesent tristique magna sit amet purus. Accumsan in nisl nisi scelerisque. Nunc vel risus commodo viverra maecenas. Aliquam sem et tortor consequat id porta nibh. Sed velit dignissim sodales ut eu sem. Faucibus turpis in eu mi bibendum neque egestas. Non nisi est sit amet facilisis magna etiam. Varius sit amet mattis vulputate enim nulla aliquet. Velit euismod in pellentesque massa. Consequat semper viverra nam libero justo laoreet sit amet. Venenatis urna cursus eget nunc. Consectetur libero id faucibus nisl tincidunt eget nullam non.\
                  Pulvinar pellentesque habitant morbi tristique. Nunc lobortis mattis aliquam faucibus purus. Dolor sit amet consectetur adipiscing elit ut. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Posuere lorem ipsum dolor sit. Quam id leo in vitae turpis massa. Mattis pellentesque id nibh tortor id aliquet. Arcu cursus euismod quis viverra nibh. Id semper risus in hendrerit.";
    return (
        <Box sx={{ maxWidth: '1500px', margin: '0 auto 20px', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' }, justifyContent: 'space-around', flexWrap: 'wrap'}}>
            <Paper sx={{ maxWidth: '700px', margin: '40px 0px', padding: '25px', flex: { md: '0.45'} }} >
                <Typography style={{marginBottom: '20px'}} variant='h6'>
                    Plant Monitoring System 
                    <span style={{ display: 'inline-block', marginLeft: '20px' }}></span>
                    <Typography sx={{ display: { xs: 'block', sm: 'inline'}}} variant='caption'>Created by Gautham, 29/05/22</Typography>    
                </Typography>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px'}}>Description</Typography>
                <Typography variant="body" style={{display: 'block', marginBottom: '20px'}}>{desc}</Typography>
                <Divider />
                <Typography variant='button' style={{display: 'block', margin: '20px 0px'}}>
                  <b>Expected amount: </b>
                  ₹50000
                </Typography>
                <Typography variant='button' style={{display: 'block', margin: '20px 0px'}}>
                  <b>Fund raised: </b>
                  ₹20000
                </Typography>
                <Typography variant='button' style={{display: 'block', margin: '20px 0px'}}>
                  <b>Your contribution: </b>
                  ₹1000
                </Typography>
                <Button size="small" color="primary" onClick={() => openDonate()}>₹ Donate</Button>
                <Button size="small" color="secondary">Edit</Button>
            </Paper>
            <Paper sx={{ maxWidth: { xs: '500px'}, height: '480px', overflow: 'auto', margin: '20px 0px', padding: '15px', flex: { md: '0.32'} }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                    sx={{ maxWidth: 500 }}
                    aria-labelledby="tableTitle"
                    >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                        .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.name}
                            >
                                <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                >
                                {row.name}
                                </TableCell>
                                <TableCell align="right">{row.donation}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default View;