import React, { useState } from 'react';
import '../form.css';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Snackbar, Alert } from '@mui/material';

const Adminlogin = ({setAdminLogin}) => {
    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [passwd, setPasswd] = useState("");

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [failmsg, setFailmsg] = useState("");

    const handleFailure = (msg) => {
        setFailmsg(msg);
        setOpenFailure(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userFields = {
            username: uname,
            password: passwd,
        };

        try {
            let res = await fetch(process.env.REACT_APP_SECRET_ROUTE, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFields)
            });
            
            let response = await res.json();
            console.log(await response);
            if(!res.ok) {
                return handleFailure(response.message);
            }
        } catch(err) {
            return handleFailure("Internal server error!");
        }

        setOpenSuccess(true);
        setTimeout(() => {
            setAdminLogin(true);
            navigate(process.env.REACT_APP_ADMIN_ROUTE)
        }, 2000);
    }

    return (
        <>
            <div className='formContainer'>
            <div className='wrapper fadeInDown'>
                <div id="formContent">
                    <h2 className="active"> Login </h2>
                    <div className="fadeIn first"><img src="/user-icon.png" id="icon" alt="User Icon" /></div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="fadeIn second" value={uname} onChange={e => setUname(e.target.value)} placeholder="Username" required /><br />
                            <input type="password" className="fadeIn third" value={passwd} onChange={e => setPasswd(e.target.value)} placeholder="Password" required /><br />
                            <input type="submit" style={{cursor: "pointer"}} className="fadeIn fourth" value="Log In" />
                        </form>
                </div>
            </div> 
            </div> 
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Logged in
                </Alert>
            </Snackbar>
            <Snackbar open={openFailure} autoHideDuration={4000} onClose={() => setOpenFailure(false)} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={() => setOpenFailure(false)} severity="error" sx={{ width: '100%' }}>
                    {failmsg}
                </Alert>
            </Snackbar>
        </>
    )
};

export default Adminlogin;