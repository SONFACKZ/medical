import React from 'react';
import loginImg from "../../login.svg";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) =>{

    }

    handleSubmit = (e) =>{

    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img alt = "another test" src={loginImg} />
                    </div>
                <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                                    <label htmlFor="username">Password</label>
                                    <input type="password" name="password" placeholder="password"/>
                    </div>
                        <div className="footer">
                            <input type = "submit" class = "btn btn-info" value = "Login" />
                        </div>
                </form>
                </div>
            </div>
        );
    }
}

export default Login;