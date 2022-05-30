import React, {useState} from 'react';
import { Box, Paper, Typography, Divider, Button, Modal, FormControl, TextField, Snackbar, Alert } from '@mui/material';

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
const Account = () => {
    let curEmail = "gautham22poy@gmail.com", curNumber = "7598426960";
    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState("gautham22poy@gmail.com");
    const [number, setNumber] = useState("7598426960");
    const [validNumber, setValidNumber] = useState(true);
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

    return (
        <Box style={{ maxWidth: '1500px', margin: '10px auto' }}>
            <Paper sx={{ maxWidth: '700px', margin: '40px auto', padding: '25px'}} >
                <Typography style={{marginBottom: '20px'}} variant='h6'>
                    Gautham Kumar
                    <span style={{ display: 'inline-block', marginLeft: '20px' }}></span>
                    <Typography sx={{ display: { xs: 'block', sm: 'inline'}}} variant='caption'>created on 29/05/22</Typography>    
                </Typography>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px 10px'}}>Details</Typography>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Phone:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>7598426960</Typography>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Email:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>gautham22poy@gmail.com</Typography>
                </div>
                <Divider />
                <Typography color="primary" variant="button" style={{display: 'block', fontSize: '1.05rem', margin: '20px 0px 10px'}}>Account</Typography>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Number of Posts:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>12</Typography>
                </div>
                <div>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Fund raised:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>10000</Typography>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Typography gutterbottom  style={{display: 'inline-block', lineHeight: '0.4'}}><b><pre>Donated:  </pre></b></Typography>
                    <Typography variant="body1"  style={{display: 'inline-block', lineHeight: '0.4'}}>5000</Typography>
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
                            variant="outlined" autoComplete="off" disabled value={"Gautham Kumar"}
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
                        <Button disabled={email && number && email !== curEmail && number !== curNumber} variant='contained' color="primary" 
                            onClick={() => {
                                setOpen("true");
                            }}
                        >Save</Button>
                    </FormControl>
                </Box>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Saved successfully
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Account;