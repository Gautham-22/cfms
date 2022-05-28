import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css'

const SignUp = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [passwd1, setPasswd1] = useState("");
    const [passwd2, setPasswd2] = useState("");
    const handleSubmit = (event) =>{
        event.preventDefault();
        var samePassword = false;
        var length;
        if(passwd1 === passwd2){
            samePassword = true;
            length = passwd1.length;
        }
        if(samePassword === true && length >= 8){
            const formFields = {
                FirstName: fname,
                LastName: lname,
                Email: email,
                Password: passwd1,
            };
            console.log(formFields);
            console.log("Form Submitted");  
        }
        else if(samePassword === false){
            alert("Passwords Don't match");
        }
        else if(length < 8){
            alert("Password needs to be atleast 8 characters")
        }
    }
    
    return (
        <div className='wrapper fadeInDown'>
            <div id='formContent'>
                <h2 className="inactive underlineHover"> <Link to="/"> Login </Link></h2>
                <h2 className="active" > Sign Up </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="fname" className="fadeIn second" name="fname" value={fname} onChange={e => setFname(e.target.value)} placeholder="First Name"/>
                    <input type="text" id="lname" className="fadeIn second" name="lname" value={lname} onChange={e => setLname(e.target.value)} placeholder="Last Name"/>
                    <input type="email" id="email" className="fadeIn second" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <input type="password" id="passwd1" className="fadeIn third" name="passwd1" value={passwd1} onChange={e => setPasswd1(e.target.value)} placeholder="Password"/>
                    <input type="password" id="passwd2" className="fadeIn third" name="passwd2" value={passwd2} onChange={e => setPasswd2(e.target.value)} placeholder="Confirm Password"/><br/>
                    <input type="checkbox" id="agree" name="agree" required/><label>I agree the <strong>Terms of Use</strong> & <strong>Privacy Policy</strong></label>
                    <br/><br/><input type="submit" className="fadeIn fourth" value="Sign Up"/>
                </form>
                <div id="formFooter">
                <a className="underlineHover" href="./user-icon.png">Already a user? Login Here</a>
                </div>
            </div>
        </div>
    )
};

export default SignUp;