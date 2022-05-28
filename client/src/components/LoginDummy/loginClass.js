import React, { Component } from 'react'
import './form.css'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserName: "",
            password: "",
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    UserNamehandler = (event) => {
        this.setState({
            UserName: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        alert(`${this.state.UserName} Registered Successfully !!!!`)
        console.log(this.state);
        this.setState({
            UserName: '',
            password: '',
        })
    }
    render() {
        return (
            <div className='wrapper fadeInDown'>
                <div id="formContent">
                    <h2 className="active"> Login </h2>
                    <h2 className="inactive underlineHover" href='./user-icon.png'>Sign Up </h2>
                    {/* <div className='container'> */}
                    <div className="fadeIn first"><img src="./user-icon.png" id="icon" alt="User Icon" /></div>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className="fadeIn second" value={this.state.Username} onChange={this.UserNamehandler} placeholder="Username" /><br />
                            <input type="password" className="fadeIn third" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" /><br />
                            <input type="submit" className="fadeIn fourth" value="Log In" />
                        </form>
                        <div id="formFooter"><a class="underlineHover" href='./user-icon.png'>Forgot Password?</a></div> 
                </div>
                </div>  
        )
    }
}

export default Form;