import React, { useState } from 'react'
import logo from "../../assets/images/logo.png"
import {Link} from "react-router-dom"
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import axios from "axios"
import {QuoteContext} from "../../contexts/QuoteContext"
import { message } from 'antd'
// import { render } from '@testing-library/react'

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
                    localStorage.setItem("user", res.data.user)
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem('role_id', res.data.role_id)
                    localStorage.setItem("role_name", res.data.role_name)
                    localStorage.setItem('status', res.data.status)
                    if (res.data.role_id === 1 && res.data.status === true && res.data.role_name === 'Manager')
                    {
                        message.success(res.data.message, 5);
                        history.push('/manager')
                    }
                    else if(res.data.role_id === 2 && res.data.status === true && res.data.role_name === 'Doctor')
                    {
                        message.success(res.data.message, 5);
                        history.push('/doctor')
                    }
                    else if(res.data.role_id === 3 && res.data.status === true  && res.data.role_name === 'Patient')
                    {
                        message.success(res.data.message, 5);
                        history.push('/patient')
                    }
                    else
                    {
                        message.warning(res.data.war_message, 3);
                    }
            })
            .catch(err => {message.error('incorrect email or password', 5)});
            // ('Your account does not exist!');
    }



    const onFinish = values => {
        console.log('Received values of form: ', values);
      };
      
        return (
            <div className="base-container" style={{background: '#ECECEC', padding: '139px' }}>
                <br />
                <div className="header">Login</div>
                <br />
                <div className="content border shadow p-5 mx-auto" style={{ background: 'white', padding: '30px' }}>
                    <div className="text-center bg-login">
                        <img className = 'image' alt = "logo" src={logo} />
                    </div><br/>
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
                </div>
                </div>
            </div>
        );
    }