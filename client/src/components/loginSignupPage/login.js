import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';

const Login = () => {

    const [uname, setUname] = useState("");
    const [passwd, setPasswd] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const userFields = {
            UserName: uname,
            Password: passwd,
        };
        console.log(userFields);
        console.log("Form Submitted");
    }

    return (
        <div className='wrapper fadeInDown'>
            <div id="formContent">
                <h2 className="active"> Login </h2>
                <h2 className="inactive underlineHover"><Link to="/signup"> Sign Up </Link></h2>
                <div className="fadeIn first"><img src="./user-icon.png" id="icon" alt="User Icon" /></div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="fadeIn second" value={uname} onChange={e => setUname(e.target.value)} placeholder="Username" /><br />
                        <input type="password" className="fadeIn third" value={passwd} onChange={e => setPasswd(e.target.value)} placeholder="Password" /><br />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                <div id="formFooter"><a className="underlineHover" href='./user-icon.png'>Forgot Password?</a></div> 
            </div>
        </div>  
    )
};

export default Login;