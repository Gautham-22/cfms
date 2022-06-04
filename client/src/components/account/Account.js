import React, {useEffect, useState} from 'react';
import { Box, Paper, Typography, Divider, Button, Modal, FormControl, TextField, Snackbar, Alert } from '@mui/material';
import dateFormat from "dateformat";

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
const Account = ({isAccount}) => {

    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState("@gmail.com");
    const [username, setusername] = useState("xyz");
    const [dateCreated, setDateCreated] = useState("2000/01/01");
    const [number, setNumber] = useState("0000000000");
    const [postNum, setPostNum] = useState("0");
    const [fundRaised, setFundRaised] = useState("0");
    const [donated, setDonated] = useState("0");
    const [validNumber, setValidNumber] = useState(true);
    const [saveStatus, setSaveStatus] = useState(false);
    const openDonate = () => setEdit(true);
    const closeDonate = () => setEdit(false);

    const [open, setOpen] = useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const handleNumber = (e) => {
        setNumber(e.target.value); 
        setValidNumber(/^[0-9]+$/.test(e.target.value) || e.target.value==="");
    };
    const handleSave = async () => {
        const details = {
            mail: email,
            number 
        };

        try {
            let res = await fetch("http://localhost:5000/cfms/account", {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details)
            });
            
            if(!res.ok) {
                console.log("yes");
                setOpen(true);
                return setSaveStatus(false);
            }
            
        } catch(err) {
            setOpen(true);
            return setSaveStatus(false);
        }
        setSaveStatus(true);
        setOpen(true);

    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                let res = await fetch("http://localhost:5000/cfms/account", {
                    credentials: 'include',
                    method: 'GET'
                });
                let response = await res.json();

                console.log(await response);

                if(!res.ok) {
                    // error
                    return console.log(response);
                }
                
                setusername(response.account[0].username);
                setDateCreated(dateFormat(new Date(response.account[0].date_created), "dddd, mmmm dS, yyyy"));
                setNumber(response.account[0].number);
                setEmail(response.account[0].mail);
                setFundRaised(response.account[0].fund_raised);
                setDonated(response.account[0].amt_donated);
                setPostNum(response.posts);

            } catch(err) {
                return console.log(err);
            }
        };
        if(isAccount) {
            fetchAccount();
        }
    }, [isAccount]);

    return (
        <Box style={{ maxWidth: '1500px', margin: '10px auto' }}>
            <Paper sx={{ maxWidth: '700px', margin: '40px auto', padding: '25px'}} >
                <Typography style={{marginBottom: '20px'}} variant='h6'>
                    {username}
                    <span style={{ display: 'inline-block', marginLeft: '20px' }}></span>
                    <Typography sx={{ display: { xs: 'block', sm: 'inline'}}} variant='caption'>created on {dateCreated}</Typography>    
                </Typography>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px 10px'}}>Details</Typography>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Phone:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>{number}</Typography>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Email:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>{email}</Typography>
                </div>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px 10px'}}>Account</Typography>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Number of Posts:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>{postNum}</Typography>
                </div>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Fund raised:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>{fundRaised}</Typography>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Donated:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>{donated}</Typography>
                </div>
                <Divider />
                <div style={{marginTop: '20px'}}>
                    <Button variant='contained' color="secondary" onClick={() => openDonate()}>Edit</Button>
                </div>
            </Paper>
            <Modal
                open={edit}
                onClose={closeDonate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit details
                    </Typography>
                    <FormControl>
                        <TextField style={{minWidth: '350px', margin: '20px 0px 10px'}}
                            variant="outlined" autoComplete="off" disabled value={username}
                        />
                        <TextField  
                            id="email" label="Email Id" style={{minWidth: '350px', margin: '10px 0px'}}
                            variant="outlined" autoComplete="off" autoFocus={true}
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {validNumber && <TextField  
                            id="amount-expected" label="Phone number" style={{minWidth: '350px', margin: '10px 0px 20px'}}
                            variant="outlined" autoComplete="off"
                            value={number} onChange={handleNumber} autoFocus={true}
                        />}
                        {!validNumber && <TextField
                            error autoFocus={true}
                            style={{minWidth: '350px', margin: '10px 0px 20px'}}
                            id="outlined-error" 
                            label="Invalid number"
                            value={number}
                            onChange={handleNumber}
                            autoComplete="off"
                        />}
                        <Button variant='contained' color="primary" 
                            onClick={handleSave}
                        >Save</Button>
                    </FormControl>
                </Box>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleClose} severity={saveStatus ? "success" : "error"} sx={{ width: '100%' }}>
                    {saveStatus ? "Saved successfully! Refresh to see changes" : "Edit failed"}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Account;