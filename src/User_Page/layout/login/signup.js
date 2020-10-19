import React from 'react';
import './login.scss';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailValid: false,
            emailUsedValid: true,
            emailError: "That’s not a valid Email Address",
            emailUsed: "That email’s already in our system.",
            password: "",
            checked: false,
        }

        this.validate = this.validate.bind(this);
    }

    validate = (text) => {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, emailValid: false, emailUsedValid: true })
            return false;
        }
        else {
            this.setState({ email: text, emailValid: true, emailUsedValid: true })
            return true;
        }
    }

    render() {
        return (
            <div className="login">

                <span>Sign Up</span>
                <div id='div_1'>
                    <span>Already a member?</span>
                    <div id='leftSize' />
                    <a>Log In</a>
                </div>
                <div id='heightSize' />

                <div className="input-group">
                    <input type="text" className="input-area" required id="inputField" onChange={(text)=>
                    {
                        this.validate(text.target.value)
                    }} />
                    <label htmlFor="inputField" className="label">Email *</label>

                    {this.state.emailValid === false ? (<div className='textFieldError'>
                        {this.state.emailUsedValid === true ? (<a>{this.state.emailError}</a>) : (<a>{this.state.emailUsed}</a>)}
                    </div>) : (<></>)}
                </div>

                <div className="input-group">
                    <input type="text" className="input-area" required id="inputField"/>
                    <label htmlFor="inputField" className="label">Password *</label>
                </div>

                <FormControlLabel
                    style={this.checkBox}
                    control={
                        <Checkbox style={{marginLeft: "2px"}}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={<span style={{ fontSize: '0.9rem', display: "flex", marginTop: "2px"}}>동의</span>}
                />

                <Button variant="outlined" style={this.btnStyle}>
                    <a className="btn_text">Sign Up</a>
                </Button>

            </div>
        );
    }

    btnStyle = {
        marginTop: "10px",
        color: "white",
        border: "1px solid mediumaquamarine",
        borderRadius: "5px",
        width: "288px",
        height: "50px",
    }

    checkBox = {

        width: "288px",
        alignItems: "center",
    }
}



export default Login;

