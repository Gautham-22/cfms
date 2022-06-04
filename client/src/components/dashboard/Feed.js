import React from 'react';
import Post from "./Post";
import { Box, Typography } from '@mui/material';

const Feed = ({openDonate, posts, setIsView, setPostId, value, setDonateTo}) => {
  const tabs = ["feed", "created", "donated"];
  return (
    <Box sx={{ width: '100%', margin: '35px auto', display: 'flex', maxWidth: '1600px', 
    alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      {posts && posts.length!=0 && posts.map((post, index) => {
        return <Post 
          id={post.post_id} setIsView={setIsView} setPostId={setPostId} tab={tabs[value]}
          openDonate={openDonate} key={index} post={post} setDonateTo={setDonateTo}
        />
      })}
      {(!posts || posts.length === 0) && <Typography variant='button' style={{marginTop: '10%'}}>
          No post to display
        </Typography>}
    </Box>
  );
};

export default Feed;