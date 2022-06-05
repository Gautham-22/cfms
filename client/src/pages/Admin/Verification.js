import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  Button,
  CardActionArea,
  Divider,
  Snackbar,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Verification = () => {
  const [verified, setVerified] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    setVerified(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  return (
    <Card
      sx={{ maxWidth: 325 }}
      style={{ boxShadow: '5px 5px 15px', margin: '30px' }}
    >
      <CardHeader title='Plant Monitoring System' subheader='Sep 24, 2020' />
      <CardActionArea>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {content.substring(0, 100) + '...'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardContent>
        <Stack direction='row' spacing={1} style={{ marginBottom: '10px' }}>
          <Chip label='Agriculture' />
          {/* <Chip label='Education' variant='outlined' /> */}
          {/* <Chip label='Medicine' variant='outlined' /> */}
        </Stack>
      </CardContent>
      {!verified && (
        <Button
          color='primary'
          size='small'
          style={{ margin: '15px' }}
          onClick={handleClick}
        >
          Verify
        </Button>
      )}
      {verified && (
        <Button
          variant='text'
          color='primary'
          size='small'
          style={{ margin: '15px' }}
        >
          Verified
        </Button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message='Post Verified'
        action={action}
        style={{ left: '50%', bottom: '85%', transform: 'translate(-50%,0%)' }}
      />
    </Card>
  );
};

export default Verification;
