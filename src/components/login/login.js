import React, { useState }from 'react';
// import loginImg from "../../login.svg";
import loginImg from "../../assets/images/doctor.png";
import {Form, Icon, Input} from 'semantic-ui-react'
import axios from "axios";
import {QuoteContext} from "../../contexts/QuoteContext";

export default function AuthForm({role, history}) {
    const {setLoggedIn} = React.useContext(QuoteContext);

    const [authInfo, setAuthInfo] = useState( {
        email: "",
        password: ""
    })

    const handleChange = e => {
        setAuthInfo({
            ...authInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        
        axios.post( `localhost:5000/auth/${role}`, authInfo)
            .then(res => {
                console.log(res)
                    setLoggedIn(true);
                    localStorage.setItem("token", res.data.token)
                    history.push('/admin')
            })
            .catch(err => console.log(err))
    }

        return (
            <div className="base-container">
                <br />
                <div className="header">Login</div>
                <br />
                <div className="content border shadow p-5 mx-auto">
                    <div className="image">
                        <img alt = "logo" src={loginImg} />
                    </div><br />

                    <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={authInfo.email}
                    onChange={handleChange} />
                <input
                    name="password"
                    type="password"
                    value={authInfo.password}
                    onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
                {/* <Form>
                    <div>
                    <Input iconPosition='left'
                     placeholder='Email' label = "Email"
                     value={authInfo.email} name = "email"
                     onChange={handleChange}
                     required >
                    <Icon name='mail' />
                    <input />
                    </Input>
                    </div><br />
                    <div>
                    <Input iconPosition='left'
                     placeholder='Password' label = "Password"
                     value={authInfo.password} name = "password"
                     onChange={handleChange}
                     required >
                    <Icon name='lock' />
                    <input />
                    </Input>
                    </div>
                        <div>
                            <input type = "submit" class = "form-control btn btn-info"  onClick={{handleSubmit}} />
                        </div>
                </Form> */}
                </div>
            </div>
        );
    }