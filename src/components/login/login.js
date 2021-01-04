import React, { useState } from 'react'
import logo from "../../assets/images/logo.png"
import {Link} from "react-router-dom"
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import axios from "axios"
import {QuoteContext} from "../../contexts/QuoteContext"
import { message, Alert } from 'antd'
import { render } from '@testing-library/react'

export default function AuthForm({history}) {

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

        
        axios.post( `auth/login`, authInfo)
            .then(res => {
                // console.log(res)
                    setLoggedIn(true);
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", res.data.user)
                    localStorage.setItem('role_id', res.data.role_id)
                    localStorage.setItem('status', res.data.status)
                    if (res.data.role_id === 1 && res.data.status === true)
                    {
                        // console.log('logged success')
                        // return (<Alert message="Success Tips" type="success" showIcon />);
                        // alert('success');
                        message.success(res.data.message, 5);
                    //    render(<Alert
                    //     message={res.data.message}
                    //     description="Detailed description and advice about successful copywriting."
                    //     type="success"
                    //     timer = '5'
                    //     showIcon
                    //   />)
                        history.push('/manager')
                    }
                    else if(res.data.role_id === 2 && res.data.status === true)
                    {
                        // console.log('logged success')
                        message.success(res.data.message, 5);
                        history.push('/doctor')
                    }
                    else if(res.data.role_id === 3 && res.data.status === true)
                    {
                        // console.log('logged success')
                        message.success(res.data.message, 5);
                        history.push('/patient')
                    }
                    else
                    {
                        // return (<Alert message="Your account is not active contact adminstrator" type="warning" showIcon />);
                        message.warning(res.data.war_message, 3);
                        // console.log('Your account is not active contact adminstrator')
                    }
            })
            .catch(err => {message.error('incorrect email or password', 5)});
            // ('Your account does not exist!');
    }



    const onFinish = values => {
        console.log('Received values of form: ', values);
      };
      
        return (
            <div className="base-container">
                <br />
                <div className="header">Login</div>
                <br />
                <div className="content border shadow p-5 mx-auto" style={{ background: '#ECECEC', padding: '30px' }}>
                    <div className="text-center bg-login">
                        <img className = 'image' alt = "logo" src={logo} />
                    </div><br/>
                {/* <Form>
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
                {/* </Form> */} 
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
                <Form.Item
                name = "email"
                value={authInfo.email}
                onChange={handleChange}
                    rules = {[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input type = "email"
                    name = "email"
                    value={authInfo.email}
                    onChange={handleChange}
                    prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" allowClear />
                </Form.Item>
                <Form.Item
                name = "password"
                value={authInfo.password}
                onChange={handleChange}
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                    name = "password"
                    value={authInfo.password}
                    onChange={handleChange}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item> */}

                <Form.Item className = "text-center">
                    <Button onClick = {handleSubmit} fluid type="primary" htmlType="submit"
                     className="login-form-button"  style = {{width: '100%'}}>
                    <LoginOutlined className="site-form-item-icon" />Sign In
                    </Button>
                </Form.Item>
            </Form>
                <div className = 'text-center'><br />Don't have an account?
                <Link to="/register"> Sign Up </Link>
                        {/* <Alert
                            message="Successful Logged"
                            description="Dashboard redirection ..."
                            type="success"
                            showIcon
                          /> */}
                </div>
                </div>
            </div>
        );
    }