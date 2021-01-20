import React, {useState, useEffect} from 'react'
import axios from 'axios'
import patientImg from "../../assets/images/patient.png"
import { Form, Input, Button, Checkbox, Select, Row, Col, DatePicker, message} from 'antd'
import { MailOutlined, UserOutlined, LockOutlined, 
        LoginOutlined, QuestionCircleOutlined, HomeOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom"


const initialState = {
            fullname: '',
            email: '',
            residence: '',
            sex: '',
            contact_phone: '',
            blood_group: '',
            occupation: '',
            date_birth: '',
            password: '',
            person_to_contact_phone: '',
            person_to_contact_name: '',
            fullnameError: '',
            emailError: '',
            residenceError: '',
            sexError: '',
            contact_phoneError: '',
            blood_groupError: '',
            occupationError: '',
            date_birthError: '',
            passwordError: '',
            person_to_contact_phoneError: '',
            person_to_contact_nameError: ''
}

const { Option } = Select;

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

class RegisterPatient extends React.Component {
    constructor(props){
        super(props);

        this.handleSexOnChange = this.handleSexOnChange.bind(this);
        this.handleBloodOnChange = this.handleBloodOnChange.bind(this);

        // const handleFormChange = (inputValue) => {
        //     // setAddPatient(inputValue)
        // }

        this.state = initialState;
    }


// Enable fielling form

    handleFullnameChange = (event) => {
        this.setState({
            fullname: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleResidenceChange = (event) => {
        this.setState({
            residence: event.target.value
        })
    }

    // handleSexChange = (value, event) => {
    //     this.setState({
    //         sex: event.target.value
    //     })
    // }

    handleSexOnChange = (value, event) =>{
        console.log('selected: '+ value);
        this.setState({
            sex: value
        })
    }

    handleContactphoneChange = (event) => {
        this.setState({
            contact_phone: event.target.value
        })
    }

    // handleBloodgroupChange = (value, event) => {
    //     this.setState({
    //         blood_group: event.target.value
    //     })
    // }

    handleBloodOnChange = (value, event) =>{
        console.log('selected: '+ value);
        this.setState({
            blood_group: value
        })

    }

    handleOccupationChange = (event) => {
        this.setState({
            occupation: event.target.value
        })
    }

    handleDatebirthChange = (event) => {
        this.setState({
            date_birth: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handlePersontophoneChange = (event) => {
        this.setState({
            person_to_contact_phone: event.target.value
        })
    }
    handlePersontonameChange = (event) => {
        this.setState({
            person_to_contact_name: event.target.value //All name attribute on the HTML form
        })
    }

// Validation form
    // valid(item, type)
    // {
    //     let itemValue = item.target.value;
    //     switch(type)
    //     {
    //         case "fullname":{
    //             if(itemValue.length<4)
    //             {
    //                 item.target.style.color='red';
    //                 this.setState({fullname: itemValue})
    //             }
    //             else
    //             {
    //                 item.target.style.color='green';
    //                 this.setState({fullname: itemValue})
    //             }
    //         }
    //     }
    // }
    

// Validation form
    validate = () => {
        let fullnameError = '';
        let emailError = '';
        let residenceError = '';
        let sexError = '';
        let contact_phoneError = '';
        let blood_groupError = '';
        let occupationError = '';
        let date_birthError = '';
        let passwordError = '';
        let person_to_contact_phoneError = '';
        let person_to_contact_nameError = '';

        if(!this.state.fullname){
            fullnameError = 'Name cannot be blank';
        }
        if(!this.state.email.includes("@")){
            emailError = 'Invalid email';
        }
        if(emailError || fullnameError){
            this.setState({emailError, fullnameError});
            return false;
        }

        return true;
    };
    

// handle submit value
    handleSubmit = event => {
        event.preventDefault() //Avoid to lose data after submited
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            this.setState(initialState); //Clearing Form
        }
        axios.post('auth/register/patient', this.state)
             .then(response => {
                 console.log(response)
                message.success(response.data.message, 5);
                window.location.reload();
                //  warn_message
             })
             .catch(error => {
                 if(error.response)
                 {
                     if(error.response.status === 202){
                        message.warning('This user already exists')
                     }
                     else if(error.response.status === 500)
                     {
                        message.error('Server Error !')
                     }
                 }
                //  console.log('registration error:',this.state.data.war_message)
                //  alert(error)
                //  console.log(error.data.warn_message)
                // message.warning(error.data.warn_message, 15);
             })
    }

    render() {
        const{ fullname,email, residence, sex, contact_phone, blood_group, occupation, date_birth,
                password, person_to_contact_phone, person_to_contact_name } = this.state
        return (
            // style={{ background: '#ECECEC', padding: '30px' }}
            <div className="base-container" style={{background: '#ECECEC', padding: '60px' }}>
               
                <div className="header">Patient Registration</div>
                <br />
                <div className="content mx-auto border shadow p-5" 
                style={{ background: 'white', padding: '30px' }}>
                    <div className="text-center">
                            <img className = 'image' alt = "logo" src={patientImg} />
                    </div><br />
                   
                        {/* <form onSubmit = {this.handleSubmit}> */}
                        <Form 
                            name = 'regiter' onFinish = {onFinish}>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "fullname"
                                    value = {fullname}
                                    onChange = {this.handleFullnameChange}
                                    hasFeedback
                                    rules = {[{ required: true, message: 'Please input your Full Name!' }]}
                                    >
                                        <Input type = "fullname"
                                        name = "fullname"
                                        value = {fullname}
                                        onChange = {this.handleFullnameChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" allowClear />
                                    </Form.Item>
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.fullnameError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "email"
                                    value = {email}
                                    onChange = {this.handleEmailChange}
                                    hasFeedback
                                        rules={[
                                            {
                                              type: 'email',
                                              message: 'The input is not valid Email!',
                                            },
                                            {
                                              required: true,
                                              message: 'Please input your Email!',
                                            },
                                          ]}
                                    >
                                        <Input
                                        name = "email"
                                        value = {email}
                                        onChange = {this.handleEmailChange}
                                        prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" allowClear />
                                    </Form.Item>
                                        
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.emailError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "residence"
                                    value = {residence}
                                    onChange = {this.handleResidenceChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Residence!' }]}
                                    >
                                        <Input type = "residence"
                                        name = "residence"
                                        value = {residence}
                                        onChange = {this.handleResidenceChange}
                                        prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Residence" allowClear />
                                    </Form.Item>

                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.residenceError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                    name="sex"
                                    value = {sex}
                                    onChange={(value, event) => this.handleSexOnChange(value, event)}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please select your gender!' }]}
                                    >
                                        <Select size = "large"
                                        name="sex"
                                        value = {sex}
                                        onChange={(value, event) => this.handleSexOnChange(value, event)}
                                        placeholder="Gender">
                                        <Option value = "">Choose your Gender</Option>
                                        <Option value="F">Female</Option>
                                        <Option value="M">Male</Option>
                                        </Select>
                                        {/* <span style = {{fontSize: 9, color: 'grey'}}>Choose your gender</span> */}
                                    </Form.Item>
{/* 
                                        <label>Sex</label>
                                        <select class="form-control" name = "sex" value = {sex} onChange = {this.handleSexChange} required>
                                            <option value = "">Choose your Sex</option>
                                            <option value = "F">Female</option>
                                            <option value = "M">Male</option>
                                        </select> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.sexError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "phone_contact" value = {contact_phone}
                                    onChange = {this.handleContactphoneChange}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true, message: 'Please input your phone number!'
                                        }, 
                                        {
                                         pattern: /[0-9]{3}[0-9]{3}[0-9]{3}/,
                                         message: 'Please input a valid phone number format! (Ex: 600000000)',
                                        }
                                         ]}
                                         >
                                        <Input addonBefore={+237}
                                         name = "phone_contact" value = {contact_phone}
                                         onChange = {this.handleContactphoneChange}
                                         pattern = "[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="Contact Phone" 
                                         allowClear />
                                    </Form.Item>
                                        {/* <label>Contact Phone</label>
                                        <input class="form-control" type = "tel" name = "phone_contact" value = {contact_phone} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handleContactphoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.contact_phoneError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                   <Form.Item 
                                        name="blood_gooup"
                                        value = {blood_group}
                                        onChange={(value, event) => this.handleBloodOnChange(value, event)}
                                        hasFeedback
                                        rules={[{ required: true, message: 'Please select your Blood Group!' }]}
                                    >
                                        <Select size = "large"
                                        name="blood_gooup"
                                        value = {blood_group}
                                        onChange={(value, event) => this.handleBloodOnChange(value, event)}
                                        placeholder = "Blood Group">
                                            <Option value = "">Choose your Blood Group</Option>
                                            <Option value="A+">A RhD positive (A+)</Option>
                                            <Option value="A-">A RhD negative (A-)</Option>
                                            <Option value="B+" >B RhD positive (B+)</Option>
                                            <Option value="B-">B RhD negative (B-)</Option>
                                            <Option value="O+">O RhD positive (O+)</Option>
                                            <Option value="O-">O RhD negative (O-)</Option>
                                            <Option value="AB+" >AB RhD positive (AB+)</Option>
                                            <Option value="AB-">AB RhD negative (AB-)</Option>
                                        </Select>
                                        {/* <span style = {{fontSize: 9, color: 'grey'}}>Choose your Blood Group</span> */}
                                    </Form.Item>

                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.blood_groupError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    value = {occupation} name = "occupation" 
                                    onChange = {this.handleOccupationChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Occupation!' }]}
                                    >
                                        <Input type = "occupation"
                                        value = {occupation} name = "occupation" onChange = {this.handleOccupationChange}
                                        placeholder="Occupation" allowClear />
                                    </Form.Item>
                                        {/* <label>Occupation</label>
                                        <input class="form-control" type = "text" value = {occupation} name = "occupation" onChange = {this.handleOccupationChange} required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.occupationError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    value = {date_birth} name = "date_birth" 
                                    onChange = {this.handleDatebirthChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Date of Birth!' }]}
                                    >
                                        <Input type = "date"
                                        value = {date_birth} name = "date_birth" 
                                        onChange = {this.handleDatebirthChange}
                                        placeholder="Date of Birth" allowClear />
                                    </Form.Item>
                                    {/* <DatePicker  format={dateFormat} /> */}
                                        {/* <label>Date of Birth</label>
                                        <input class="form-control" type="date" value = {date_birth} name = "date_birth" onChange = {this.handleDatebirthChange} required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.data_birthError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "person_to_contact_name" 
                                    value = {person_to_contact_name} 
                                    onChange = {this.handlePersontonameChange}
                                    hasFeedback
                                    rules = {[{ required: true, message: 'Please the name!' }]}
                                    >
                                        <Input type = "fullname"
                                        name = "person_to_contact_name" 
                                        value = {person_to_contact_name} 
                                        onChange = {this.handlePersontonameChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Person to Contact Name" allowClear />
                                    </Form.Item>
                                        {/* <label>Person to Contact Name</label>
                                        <input class="form-control" type = "text" name = "person_to_contact_name" value = {person_to_contact_name} onChange = {this.handlePersontonameChange} required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_nameError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "person_to_contact_phone" value = {person_to_contact_phone}
                                    onChange = {this.handlePersontophoneChange}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true, message: 'Please input your phone number!'
                                        }, 
                                        {
                                         pattern: /[0-9]{3}[0-9]{3}[0-9]{3}/,
                                         message: 'Please input a valid phone number format! (Ex: 600000000)',
                                        }
                                         ]}
                                    >
                                        <Input addonBefore={+237}
                                        name = "person_to_contact_phone" value = {person_to_contact_phone}
                                        onChange = {this.handlePersontophoneChange}
                                         pattern = "[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="Person to contact Phone" 
                                         allowClear />
                                    </Form.Item>
                                        {/* <label>Person to contact Phone</label>
                                        <input class="form-control" type = "text" name = "person_to_contact_phone" value = {person_to_contact_phone} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handlePersontophoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_phoneError}</span>
                                    </div>
                                </Col>
                            </Row>
                        <Row gutter= {16}>
                            <Col span={12}>
                                <div>
                                    <Form.Item
                                        name="password" rules={[{required: true, message: 'Please input your password!',},]}
                                        hasFeedback
                                    >
                                    <Input.Password 
                                    name = "password"
                                    value = {password}
                                    onChange = {this.handlePasswordChange}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password" />
                                    </Form.Item>
                                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.passwordError}</span>
                                </div>
                            </Col>
                            <Col span = {12}>
                                <div>
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                        ]}
                                    >
                                        <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder =" Confirm Password" />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                            <div>
                            <Form.Item className = "text-center">
                    <Button size = 'large' onClick = {this.handleSubmit} fluid type="primary" htmlType="submit"
                     className="login-form-button"  style = {{width: 235}}> {/*290*/}
                    <LoginOutlined className="site-form-item-icon" />Sign Up
                    </Button>
                </Form.Item>
                                {/* <input class="form-control btn btn-info" value = "Register" type = "submit" /> */}
                            </div>
                            </Form>
                        <div className = 'text-center'><br />Have an account? 
                            <Link to="/login"> Sign In </Link>
                        </div>
                        </div>
                        </div>
        );
    }
}

export default RegisterPatient;