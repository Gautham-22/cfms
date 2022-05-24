import React from "react";


const LoginForm = () => {
    return (
        <div>
            <input type='text' id='login' name='login' placeholder='Username'></input>
            <input type='password' id='passwd' name='passwd' placeholder='Password'></input>
        </div>
    )
};
export default LoginForm;