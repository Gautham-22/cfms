import React, {useState} from 'react';
import { Box, TextField, FormControl, Select, MenuItem, FormHelperText, Stack, Button, Snackbar } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPost = () => {
    const categories = [];

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [validAmount, setValidAmount] = useState(true);

    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("Post created successfully!");
    const [reqStatus, setReqStatus] = useState("success");
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value); 
        setValidAmount(/^[0-9]+$/.test(e.target.value) || e.target.value==="");
    };

    const handleSubmit = (e) => {
        const postFields = {
            title,
            type: category,
            description: desc,
            expected_fund: amount
        };

        const createPost = async () => {
            try {
                let res = await fetch("http://localhost:5000/cfms/post", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postFields)
                });
                
                let response = await res.json();
                if(!res.ok) {
                    setAlertMsg("Error while post creation!");
                    setReqStatus("error");
                } else {
                    setAlertMsg("Post created successfully!");
                    setReqStatus("success");
                    setTitle("");
                    setCategory("");
                    setDesc("");
                    setAmount("");
                }
            } catch(err) {
                setAlertMsg("Internal server error!");
                setReqStatus("error");
            }
            setOpen(true);
            console.log(alertMsg);
        }
        createPost();

    }

    return (
    <Box style={{display: 'flex', justifyContent: 'center'}}>
        <FormControl 
            sx={{ width: '50ch', margin: '40px auto' }} variant="outlined"
        >
            <Box
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: "2px 3px 20px -5px", 
                    background: '#f4f4f4'
                }}
            >
                <TextField 
                    id="title" label="Title" style={{minWidth: '350px', margin: '10px 0px'}} variant="outlined" 
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                {validAmount && <TextField  
                    id="amount-expected" label="Expected amount in ₹" style={{minWidth: '350px', margin: '10px 0px'}}
                    variant="outlined" 
                    value={amount} onChange={handleAmount} autoFocus={true}
                />}
                {!validAmount && <TextField
                    style={{minWidth: '350px', margin: '10px 0px'}}
                    error autoFocus={true}
                    id="outlined-error" 
                    label="Invalid amount"
                    value={amount}
                    onChange={handleAmount}
                />}
                <TextareaAutosize
                    aria-label="empty textarea" placeholder="Description"  minRows={5}
                    style={{ width: '450px', margin: '10px 0px', padding:'10px' }}
                    value={desc} onChange={(e) => setDesc(e.target.value)}
                />
                <Select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Business"}>Business</MenuItem>
                    <MenuItem value={"Startup"}>Startup</MenuItem>
                    <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Social"}>Social</MenuItem>
                </Select>
                <FormHelperText>Select category</FormHelperText>
                <Stack direction="row" spacing={2} style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                    <Button 
                        variant="outlined" disabled={!title || !desc || !amount}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button 
                        variant="outlined" color="secondary" disabled={!title && !desc && !amount && !category}
                        onClick={() => { setTitle(""); setDesc(""); setAmount(""); setCategory(""); }}    
                    >
                        Reset
                    </Button>
                </Stack>
            </Box>
        </FormControl>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
            <Alert onClose={handleClose} severity={reqStatus} sx={{ width: '100%' }}>
                {alertMsg}
            </Alert>
        </Snackbar>
    </Box>
    );
};

export default NewPost;