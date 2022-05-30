import React, {useState} from 'react';
import { Box, TextField, FormControl, Select, MenuItem, FormHelperText, Stack, Button, Snackbar } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [validAmount, setValidAmount] = useState(true);

    const [open, setOpen] = React.useState(false);
  
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
        setOpen(true);
        setTitle("");
        setCategory("");
        setDesc("");
        setAmount("");
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
                    boxShadow: "2px 3px 20px -5px"
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
                    error autoFocus={true}
                    id="outlined-error" 
                    label="Invalid amount"
                    value={amount}
                    onChange={handleAmount}
                />}
                <TextareaAutosize
                    aria-label="empty textarea" placeholder="Description"  minRows={5}
                    style={{ maxWidth: '370px', margin: '10px 0px', padding:'10px' }}
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
                    <MenuItem value={10}>Business</MenuItem>
                    <MenuItem value={20}>Startup</MenuItem>
                    <MenuItem value={30}>Agriculture</MenuItem>
                    <MenuItem value={40}>Education</MenuItem>
                    <MenuItem value={50}>Social</MenuItem>
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
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Post created successfully!
            </Alert>
        </Snackbar>
    </Box>
    );
};

export default NewPost;