import React, { useState }from 'react';
// import loginImg from "../../login.svg";
import loginImg from "../../assets/images/doctor.png";
import {Link} from "react-router-dom";
import {Form, Icon, Input, Segment, Button} from 'semantic-ui-react'
import axios from "axios";
// import {QuoteContext} from "../../contexts/QuoteContext";

export default function AuthForm({role, history}) {
    // const {setLoggedIn} = React.useContext(QuoteContext);

    // const [authInfo, setAuthInfo] = useState( {
    //     email: "",
    //     password: ""
    // })

    // const handleChange = e => {
    //     setAuthInfo({
    //         ...authInfo,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleSubmit = e => {
    //     e.preventDefault();

        
    //     axios.post( `localhost:5000/auth/${role}`, authInfo)
    //         .then(res => {
    //             console.log(res)
    //                 setLoggedIn(true);
    //                 localStorage.setItem("token", res.data.token)
    //                 history.push('/admin')
    //         })
    //         .catch(err => console.log(err))
    // }

        return (
            <div className="base-container">
                <br />
                <div className="header">Login</div>
                <br />
                <div className="content border shadow p-5 mx-auto">
                    <div className="text-center">
                        <img className = 'image' alt = "logo" src={loginImg} />
                    </div>
                <Form>
                    <div>
                        <Form.Input iconPosition='left'
                        placeholder='Email' label = "Email"
                        icon = 'mail'
                        required />
                    </div><br />
                    <div>
                        <Form.Input iconPosition='left'
                        placeholder='Password' label = "Password"
                        icon = 'lock'
                        required />
                    </div><br />
                    <div>
                        <button type="submit" name="login-button" class="ui blue submit button">
                        <i class="sign in icon"></i>
                            Sign In
                        </button>
                        </div>
                        {/* <div class="ui left icon input">
                        <input type = "submit" 
                        class = "text-center form-control btn btn-info"
                        value = 'Sign In' />
                        <i class="unlock icon"></i>
                        </div> */}
                </Form>
                <div className = 'text-center'><br />Don't have an account?
                <Link to="/register"> Sign Up </Link>
                </div>
                </div>
            </div>
        );
    }