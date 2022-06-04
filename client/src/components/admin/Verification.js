import React, { useState } from 'react';
import {
  Card, CardContent,CardHeader,
  Chip, Stack, Typography, Button, CardActionArea, Divider, Snackbar, Alert
} from '@mui/material';

const Verification = ({id, post, setIsView, setViewPost}) => {

  const [verifyStatus, setVerifyStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setVerifyStatus(false);
    const verify = async () => {
      try {
          let res = await fetch(`${process.env.REACT_APP_SECRET_ROUTE}/verify/${id}`, {
              credentials: 'include',
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
          });
          
          if(!res.ok) {
              setOpen(true);
              return setVerifyStatus(false);
          }
          
      } catch(err) {
        setOpen(true);
        return setVerifyStatus(false);
      }

      setOpen(true);
      return setVerifyStatus(true);
    }
    verify();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card
      sx={{ maxWidth: 325 }}
      style={{ boxShadow: '5px 5px 15px', margin: '30px' }}
    >
      <CardHeader title={post.title} subheader='Sep 24, 2020' />
      <CardActionArea onClick={() => { setViewPost(id); setIsView(true);}}>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {post.description.substring(0, 100) + '...'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardContent>
        <Stack direction='row' spacing={1} style={{ marginBottom: '10px' }}>
          <Chip label={post.category ? post.category : 'other'} />
        </Stack>
      </CardContent>
      {post.verified === 'no' && (
        <Button
          color='primary'
          size='small'
          style={{ margin: '15px' }}
          onClick={handleClick}
        >
          Verify
        </Button>
      )}
      {post.verified === 'yes'  && (
        <Button
          variant='text'
          color='primary'
          size='small'
          style={{ margin: '15px', color: '#2e7d32' }}
        >
          Verified
        </Button>
      )}
      <Button size="small" color="secondary" onClick={() => { setViewPost(id); setIsView(true);}}>
        More
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
          <Alert onClose={handleClose} severity={verifyStatus ? "success" : "error"} sx={{ width: '100%' }}>
              Verification {verifyStatus ? "success\n" : "failed"}
              {verifyStatus && "! Refresh to see the updates"}
          </Alert>
      </Snackbar>
    </Card>
  );
};

export default Verification;
