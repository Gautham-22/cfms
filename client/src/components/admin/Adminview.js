import React, { useEffect, useState } from 'react';
import { Box,  Typography, Paper, Divider, Button, Snackbar, Alert } from '@mui/material';
import dateFormat from "dateformat";

const Adminview = ({ viewPost }) => {
    const [postDetails, setPostDetails] = useState(null);
    const [verifyStatus, setVerifyStatus] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fetchPost = async (postId) => {
            try {
                let res = await fetch(`http://localhost:5000/cfms/admin/post/${postId}`, {
                    credentials: 'include',
                    method: 'GET'
                });
                let response = await res.json();
                if(!res.ok) {
                    // error
                    return console.log(response);
                }
                setPostDetails(await response.posts);
                console.log(await response.posts);

            } catch(err) {
                console.log(err);
            }
        }
        fetchPost(viewPost);
    }, []);

    const handleClick = () => {
        setVerifyStatus(false);
        const verify = async () => {
            try {
                let res = await fetch(`${process.env.REACT_APP_SECRET_ROUTE}/verify/${viewPost}`, {
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
        <Box sx={{ maxWidth: '1500px', margin: '0 auto 20px', padding: '20px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {postDetails && postDetails.length &&           
            <Paper sx={{ minWidth: '500px', maxWidth: '700px', margin: '40px 0px', padding: '25px' }} >
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
                    ₹{postDetails[0].fund_raised}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button size="small" color="primary" onClick={handleClick}>Verify</Button>
                </div>
            </Paper>
            } 
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleClose} severity={verifyStatus ? "success" : "error"} sx={{ width: '100%' }}>
                    Verification {verifyStatus ? "success\n" : "failed"}
                    {verifyStatus && "! Refresh to see the updates"}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Adminview;