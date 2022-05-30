import React, {useState} from 'react';
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

const Main = () => {
    const [value, setValue] = useState(0);
    const [donate, setDonate] = useState(false);
    const [donateAmount, setDonateAmount] = useState("");
    const [validAmount, setValidAmount] = useState(true);
    const openDonate = () => setDonate(true);
    const closeDonate = () => setDonate(false);

    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleAmount = (e) => {
        setDonateAmount(e.target.value); 
        setValidAmount(/^[0-9]+$/.test(e.target.value) || e.target.value==="");
    };

    const handleChange = (event, newvalue) => {
        setValue(newvalue);
    }

    return (
        <div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '30px' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Feed" />
                    <Tab label="My posts" />
                    <Tab label="Donated" />
                    <Tab label="New post" />
                </Tabs>
            </Box>
            <Feed openDonate={openDonate} />
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
                            onClick={() => {
                                setOpen("true");
                                setDonateAmount("");
                            }}
                        >Donate</Button>
                    </FormControl>
                </Box>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Donated successfully
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Main;