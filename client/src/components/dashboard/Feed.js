import React from 'react';
import Post from "./Post";
import { Box } from '@mui/material';

const Feed = ({openDonate}) => {
  return (
    <Box sx={{ width: '100%', margin: '35px auto', display: 'flex', maxWidth: '1600px', 
    alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Post openDonate={openDonate} />
        <Post openDonate={openDonate} />
        <Post openDonate={openDonate} />
        <Post openDonate={openDonate} />
        <Post openDonate={openDonate} />
        <Post openDonate={openDonate} />
    </Box>
  );
};

export default Feed;