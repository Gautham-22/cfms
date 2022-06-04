import React, { useState } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Snackbar, Alert } from '@mui/material';

const Login = ({setLogin, setAppnav}) => {
    setAppnav(false);
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
            let res = await fetch("http://localhost:5000/cfms/login", {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFields)
            });
            
            let response = await res.json();
            if(!res.ok) {
                return handleFailure(response.message);
            }
        } catch(err) {
            return handleFailure("Internal server error!");
        }

        setOpenSuccess(true);
        setTimeout(() => {
            setLogin(true);
            navigate("/dashboard");
        }, 2000);
    }

    return (
        <>
            <div className='open-menu'>
                <BiMenuAltRight id='m' className='open' />
                <AiOutlineClose id='m' className='close' />
            </div>
            <div className='menu'>
                <ul>
                <a href='/#home'>
                    home
                </a>
                <a href='/#about'>About us</a>
                <a href='/#contact'>Contact</a>
                <a href='/login' className='active'>Login</a>
                <a href='/signup'>SignUp</a>
                </ul>
            </div>
            <div className='formContainer'>
            <div className='wrapper fadeInDown'>
                <div id="formContent">
                    <h2 className="active"> Login </h2>
                    <h2 className="inactive underlineHover"><a href="/signup"> Sign Up </a></h2>
                    <div className="fadeIn first"><img src="./user-icon.png" id="icon" alt="User Icon" /></div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="fadeIn second" value={uname} onChange={e => setUname(e.target.value)} placeholder="Username" required /><br />
                            <input type="password" className="fadeIn third" value={passwd} onChange={e => setPasswd(e.target.value)} placeholder="Password" required /><br />
                            <input type="submit" style={{cursor: "pointer"}} className="fadeIn fourth" value="Log In" />
                        </form>
                    <div id="formFooter"><a className="underlineHover" href='/signup'>Don't have an account?</a></div> 
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

export default Login;