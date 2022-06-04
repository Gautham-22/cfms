import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../form.css'
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Snackbar, Alert } from '@mui/material';

const SignUp = ({setLogin, setAppnav}) => {
    setAppnav(false);
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [num, setNum] = useState("");
    const [email, setEmail] = useState("");
    const [passwd1, setPasswd1] = useState("");
    const [passwd2, setPasswd2] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [failmsg, setFailmsg] = useState("");

    const handleFailure = (msg) => {
        setFailmsg(msg);
        setOpenFailure(true);
    }

    const handleSubmit = async (event) =>{
        setFailmsg("");
        event.preventDefault();

        if(passwd1 !== passwd2){
            return handleFailure("Passwords Don't match");
        } else if(/^[0-9]*$/.test(num) === false) {
            return handleFailure("Phone no can only have digits");
        } else if(num.length !== 10) {
            return handleFailure("Phone no should have 10 digits");
        } else if(passwd1.length < 8){
            return handleFailure("Password needs to be atleast 8 characters");
        }

        const formFields = {
            username: fname,
            number: num,
            mail: email,
            password: passwd1,
        };

        try {
            let res = await fetch("http://localhost:5000/cfms/signup", {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formFields)
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
                <a href='/login'>Login</a>
                <a href='/signup' className='active'>SignUp</a>
                </ul>
            </div>
            <div className='formContainer'>
                <div className='wrapper fadeInDown'>
                    <div id='formContent'>
                        <h2 className="inactive underlineHover"> <a href="/login"> Login </a></h2>
                        <h2 className="active" > Sign Up </h2>
                        <form onSubmit={handleSubmit}>
                            <input required type="text" id="fname" className="fadeIn second" name="fname" value={fname} onChange={e => setFname(e.target.value)} placeholder="Name" autoComplete='off' />
                            <input required type="text" id="num" className="fadeIn second" name="num" value={num} onChange={e => setNum(e.target.value)} placeholder="Phone number" autoComplete='off'/>
                            <input required type="email" id="email" className="fadeIn second" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete='off'/>
                            <input required type="password" id="passwd1" className="fadeIn third" name="passwd1" value={passwd1} onChange={e => setPasswd1(e.target.value)} placeholder="Password" autoComplete='off'/>
                            <input required type="password" id="passwd2" className="fadeIn third" name="passwd2" value={passwd2} onChange={e => setPasswd2(e.target.value)} placeholder="Confirm Password" autoComplete='off'/><br/>
                            <input type="checkbox" id="agree" name="agree" required/><label>I agree the <strong>Terms of Use</strong> & <strong>Privacy Policy</strong></label>
                            <br/><br/>
                            <input type="submit" style={{cursor: "pointer"}} className="fadeIn fourth" value="Sign Up"/>
                        </form>
                        <div id="formFooter">
                        <a className="underlineHover" href="/login">Already a user? Login Here</a>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)} style={{ left: '50%', transform: 'translate(-50%,0%)' }}>
                <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Signed in
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

export default SignUp;