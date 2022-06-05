import React from 'react';
import Post from './Verification';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: '35px auto',
        display: 'flex',
        maxWidth: '1600px',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default Home;
