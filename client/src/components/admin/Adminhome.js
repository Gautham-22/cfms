import React, {useEffect, useState} from 'react';
import Post from './Verification';
import { Box, Typography, Button } from '@mui/material';
import Adminview from './Adminview';

const Adminhome = ({setAppnav}) => {
  setAppnav(true);

  const [isView, setIsView] = useState(false);
  const [viewPost, setViewPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {

        try {
            let res = await fetch("http://localhost:5000/cfms/admin/posts", {
                credentials: 'include',
                method: 'GET'
            });
            let response = await res.json();
            console.log(await response.posts);
            if(!res.ok) {
                // error
                return console.log(response);
            }
            setPosts(response.posts);
        } catch(err) {
            console.log(err);
        }
    }
    fetchPosts();

  }, []);

  return (
    <div>
        {isView &&                 
        <Button style={{position:'absolute', left: '7%'}} variant='contained' color="secondary" 
            onClick={() => {
                if(isView) {
                    setIsView(false);
                }
            }}
        ><pre>&lt;- Back</pre>
        </Button>
      }
      <Box sx={{ width: '100%', margin: '35px auto', display: 'flex', maxWidth: '1600px', 
        alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        {!isView && posts && posts.length!=0 && posts.map((post, index) => {
          return <Post id={post.post_id} key={index} post={post} setIsView={setIsView} setViewPost={setViewPost} />
        })}
        {(!isView && !posts || posts.length === 0) && <Typography variant='button' style={{marginTop: '10%'}}>
            No post to display
        </Typography>}
        {isView && <Adminview viewPost={viewPost} />}
      </Box>
    </div>
  );
};

export default Adminhome;
