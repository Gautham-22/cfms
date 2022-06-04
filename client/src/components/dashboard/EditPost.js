import React, {useState} from 'react';
import { Box, TextField, FormControl, Select, MenuItem, FormHelperText, Stack, Button, Snackbar } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditPost = ({editPost, setIsView, setIsEdit, setEditAlert, setEditStatus, postId}) => {
    const [title, setTitle] = useState(editPost.title);
    const [category, setCategory] = useState(editPost.category);
    const [desc, setDesc] = useState(editPost.description);
    const amount = editPost.expected_fund;

    const handleSubmit = async (e) => {
        try {
            let res = await fetch("http://localhost:5000/cfms/post", {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, description: desc, category, id: postId})
            });
            
            if(!res.ok) {
                setEditAlert(true);
                return setEditStatus(false);
            }

            setTitle("");
            setCategory("");
            setDesc("");
            
        } catch(err) {
            setEditAlert(true);
            return setEditStatus(false);
        }

        setEditAlert(true);
        setEditStatus(true);
        setIsView(true);
        setIsEdit(false);
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
                <TextField  
                    id="amount-expected" label="Expected amount in ₹" style={{minWidth: '350px', margin: '10px 0px'}}
                    variant="outlined" 
                    value={amount} disabled autoFocus={true}
                />
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
                        Save
                    </Button>
                    <Button 
                        variant="outlined" color="secondary" disabled={!title && !desc && !category}
                        onClick={() => { setTitle(""); setDesc(""); setCategory(""); }}    
                    >
                        Reset
                    </Button>
                </Stack>
            </Box>
        </FormControl>
    </Box>
    );
};

export default EditPost;