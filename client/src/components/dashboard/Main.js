import React, {useEffect, useState} from 'react';
import { 
    Box, Tabs, Tab, Badge, FormControl,
    Button, Typography, Modal, TextField, Snackbar, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NewPost from "./NewPost";
import Feed from './Feed';
import View from './View';
import Post from './Post';
import EditPost from './EditPost';
import "./main.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3.5,
};

const Main = ({login, setAppnav}) => {
    setAppnav(true);
    const [posts, setPosts] = useState([]);
    const [value, setValue] = useState(0);
    const [donate, setDonate] = useState(false);
    const [isView, setIsView] = useState(false);
    const [postId, setPostId] = useState('');
    const [donateAmount, setDonateAmount] = useState("");
    const [donateTo, setDonateTo] = useState(null);
    const [donationStatus, setDonationStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [validAmount, setValidAmount] = useState(true);
    const [isEdit , setIsEdit] = useState(false);
    const [editPost , setEditPost] = useState(null);
    const openDonate = () => setDonate(true);
    const closeDonate = () => setDonate(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [editAlert, setEditAlert] = useState(false);
  
    const handleEditClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setEditAlert(false);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

    const handleAmount = (e) => {
        setDonateAmount(e.target.value); 
        setValidAmount(/^[0-9]+$/.test(e.target.value) || e.target.value==="");
    };

    const handleDonate = async () => {
        if(!donateTo) {
            return console.log("Post id is null");
        }
        try {
            let res = await fetch("http://localhost:5000/cfms/transaction", {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({post_id: donateTo, amount: donateAmount})
            });
            let response = await res.json();
            console.log(await response)
            if(!res.ok) {
                // error
                setDonationStatus(false);
                setOpenAlert(true);
                return console.log(response);
            }
            setDonationStatus(true);
            setOpenAlert(true);
        } catch(err) {
            setDonationStatus(false);
            setOpenAlert(true);
            return console.log(err);
        }
        setDonateAmount("");
        console.log({donateTo, donateAmount});
    }

    const handleChange = (event, newvalue) => {
        setValue(newvalue);
    }

    useEffect(() => {
        
        const fetchPosts = async () => {
            const url = ["http://localhost:5000/cfms/posts", "http://localhost:5000/cfms/posts/created", "http://localhost:5000/cfms/posts/donated"];
            try {
                let res = await fetch(url[value], {
                    credentials: 'include',
                    method: 'GET'
                });
                let response = await res.json();
                if(!res.ok) {
                    // error
                    return console.log(response);
                }
                setPosts(response.posts);
            } catch(err) {
                console.log(err);
            }
        }
        if(value <= 2) {
            fetchPosts();
        }
        
    }, [value]);

    return (
        <div>
            <Box sx={{ width: '100%', marginTop: '30px' }}>
                {(!isView && !isEdit) ? <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Feed" />
                    <Tab label="My posts" />
                    <Tab label="Donated" />
                    <Tab label="New post" />
                </Tabs> :
                <Button style={{position:'absolute', left: '7%'}} variant='contained' color="secondary" 
                    onClick={() => {
                        if(isView) {
                            setIsView(false);
                        }
                        if(isEdit) {
                            setIsEdit(false);
                        }
                    }}
                ><pre>&lt;- Back</pre></Button>
                }
            </Box>
            {!isEdit && !isView && value <= 2 && <Feed openDonate={openDonate} setPostId={setPostId} value={value} setIsView={setIsView} setDonateTo={setDonateTo} posts={posts} /> }
            {!isEdit && !isView && value == 3 && <NewPost />}
            {isView && !isEdit && <View openDonate={openDonate} setDonateTo={setDonateTo} postId={postId} 
            setIsView={setIsView} isView={isView} setIsEdit={setIsEdit} setEditPost={setEditPost}
            />}
            {isEdit && !isView && <EditPost postId={postId} editPost={editPost} setIsView={setIsView} setIsEdit={setIsEdit} setEditStatus={setEditStatus} 
                setEditAlert={setEditAlert}
            />}
            <Modal
                open={donate}
                onClose={closeDonate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Raise For a Cause
                    </Typography>
                    <FormControl>
                        {validAmount && <TextField  
                            id="amount-expected" label="Donation amount in ₹" style={{minWidth: '350px', margin: '20px 0px'}}
                            variant="outlined" autoComplete="off"
                            value={donateAmount} onChange={handleAmount} autoFocus={true}
                        />}
                        {!validAmount && <TextField
                            error autoFocus={true}
                            style={{minWidth: '350px', margin: '20px 0px'}}
                            id="outlined-error" 
                            label="Invalid amount"
                            value={donateAmount}
                            onChange={handleAmount}
                            autoComplete="off"
                        />}
                        <Button disabled={donateAmount === "" || !validAmount} variant='contained' color="primary" 
                            onClick={handleDonate}
                        >Donate</Button>
                    </FormControl>
                </Box>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleClose} severity={donationStatus ? "success" : "error"} sx={{ width: '100%' }}>
                    Donation {donationStatus ? "success\n" : "failed"}
                    {donationStatus && "Refresh to see your donation"}
                </Alert>
            </Snackbar>
            <Snackbar open={editAlert} autoHideDuration={6000} onClose={handleEditClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleEditClose} severity={editStatus ? "success" : "error"} sx={{ width: '100%' }}>
                    Edit {editStatus ? "success\n" : "failed"}
                    {editStatus && "! Refresh to see the updates"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Main;