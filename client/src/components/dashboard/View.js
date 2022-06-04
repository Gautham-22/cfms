import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, 
    Toolbar, Typography, Paper, Divider, Button
} 
from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import dateFormat from "dateformat";

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

const View = ({openDonate, postId, isView, setDonateTo, setIsEdit, setIsView, setEditPost}) => {
  const [postDetails, setPostDetails] = useState(null);
  const [rows, setRows] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isDonated, setIsDonated] = useState(false);
  const [donatedAmt, setdonatedAmt] = useState(0);


  useEffect(() => {
    const fetchPost = async (postId) => {
    try {
      let res = await fetch(`http://localhost:5000/cfms/post/${postId}`, {
          credentials: 'include',
          method: 'GET'
      });
      let response = await res.json();
      if(!res.ok) {
          // error
          return console.log(response);
      }
      setPostDetails(await response.posts);
      setIsCreated(await response.created);
      console.log(await response.posts);

    } catch(err) {
      console.log(err);
    }
    }
    fetchPost(postId);

    const fetchDonators = async (postId) => {
      try {
        let res = await fetch(`http://localhost:5000/cfms/donators/${postId}`, {
            credentials: 'include',
            method: 'GET'
        });
        let response = await res.json();
        if(!res.ok) {
            // error
            return console.log(response);
        }
        setRows(await response.transactions);
        setIsDonated(await response.donated);
        setdonatedAmt(await response.donatedAmt);
      } catch(err) {
        console.log(err);
      }
    }
    fetchDonators(postId);
  }, [isView]);

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('donation');

  const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
  };

  const handleEdit = () => {
    setEditPost(postDetails[0]);
    setIsView(false);
    setIsEdit(true);
  }

  return (
      <Box sx={{ maxWidth: '1500px', margin: '0 auto 20px', padding: '20px 0px', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' }, justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {postDetails && postDetails.length &&           
            <Paper sx={{ maxWidth: '700px', margin: '40px 0px', padding: '25px', flex: { md: '0.45'} }} >
                <Typography style={{marginBottom: '20px'}} variant='h6'>
                    {postDetails[0].title}
                    <span style={{ display: 'inline-block', marginLeft: '20px' }}></span>
                    <Typography sx={{ display: { xs: 'block', sm: 'inline'}}} variant='caption'>Created by {postDetails[0].author}, {dateFormat(new Date(postDetails[0].date_created), "dddd, mmmm dS, yyyy")}</Typography>    
                </Typography>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px'}}>Description</Typography>
                <Typography variant="body" style={{display: 'block', marginBottom: '20px'}}>{postDetails[0].description}</Typography>
                <Divider />
                <Typography variant='button' style={{display: 'block', margin: '20px 0px'}}>
                  <b>Expected amount: </b>
                  ₹{postDetails[0].expected_fund}
                </Typography>
                <Typography variant='button' style={{display: 'block', margin: '20px 0px'}}>
                  <b>Fund raised: </b>
                  ₹{postDetails[0].post_fund}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button size="small" color="primary" onClick={() => {setDonateTo(postId); openDonate();}}>₹ Donate</Button>
                  {
                    isCreated && <Button size="small" color="secondary" onClick={handleEdit}>Edit</Button>
                  }
                  {
                    isDonated && <Button size="small" color="secondary">Donated ₹{donatedAmt}</Button>
                  }
                </div>
            </Paper>
          } 
          {rows && rows.length!=0 &&   
            <Paper sx={{ maxWidth: { xs: '500px'}, height: '480px', overflow: 'auto', margin: '40px 0px', padding: '15px', flex: { md: '0.32'} }}>
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
          }
      </Box>
  );
}

export default View;