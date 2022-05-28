import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";

import Box from '@mui/material/Box';
import "./form.css"
const LoginForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) =>{
        event.preventDefault();
        alert(`Name: ${name} Password: ${password}`);
    };
    return (
        
        <div>
            <Box>
            <Container className="formContainer"><label>Login</label></Container>
            <form onSubmit={handleSubmit}>
            {/* <label>Username</label> */}
            <TextField type='text' value={name} onChange={(e) => setName(e.target.value)} label='Username' variant="outlined"></TextField><br/>
            {/* <label>Password</label> */}
            <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' variant="outlined"></TextField><br/>
            <Button type='submit' variant='contained'>Submit</Button> 
            </form>
            </Box>
        </div>
        
    )
};
// export function BoxSx() {
//     return (
//       <Box
//         sx={{
//           width: 300,
//           height: 300,
//           backgroundColor: 'primary.dark',
//           '&:hover': {
//             backgroundColor: 'primary.main',
//             opacity: [0.9, 0.8, 0.7],
//           },
//         }}
//       />
//     );
//   };
export default LoginForm;