import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Route, Redirect } from 'react-router-dom'
import { message } from 'antd'
// import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined, MailOutlined, UserOutlined, LockOutlined, 
    LoginOutlined, QuestionCircleOutlined, HomeOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Input, Form, Checkbox, Select, Row, Col } from 'antd'


const {Item} = Form;
const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  

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


const UserList = () => {

    const [visible, setVisible] = useState(false);
    // const [profilevisible, setProfileVisible] = useState(false);

    const [users, setUser] = useState([]);

    // const userEdit = () =>{
    //     setProfileVisible
    // }

    const getUsers = async () => {
        await axiosWithAuth().get('/users')
        .then(response=>{
            setUser(response.data);
            // console.log(response.data);
        }).catch(error=>{
            // if(!localStorage.getItem('token') || error.response.status === 401)
            // {
            //   message.error('You are not authenticated, authenticate first', 5);
            // }
            return <Redirect to='/login' />
            // console.log(error);
        })
        // const result = await axiosWithAuth().get('/users');
        // setUser(result.data);
    };


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }


    useEffect(() => {
        getUsers();
    }, []);

    // const singUser = async() => {
    //     await axiosWithAuth().get('/users', artisa)
    //     .then(response=>{
    //         setUser(data.concat(response.data));
    //     })
    // }


// Making table
const columns = [
    {
    title: '#',
    dataIndex: 'user_id',
    key: 'user_id',
    align: 'center',
    width: 50,
    fixed: 'left'
    },
    {
    title: 'Public Id',
    dataIndex: 'public_id',
    align: 'center',
    key: 'public_id',
    // fixed: 'left',
    },
    {
    title: 'Name',
    dataIndex: 'fullname',
    align: 'center',
    key: 'fullname'
    },
    {
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    key: 'email'
    },
    {
    title: 'Role',
    dataIndex: 'role',
    align: 'center',
    key: 'role'
    },
    {
    title: 'Status',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: (dataIndex) =>(
            <>
            <Checkbox name = '' onChange={onChange} defaultChecked = {dataIndex}>Status</Checkbox>
            </>)
    },
    {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    render: (text, users) =>(
        <>
        <Button type = 'primary' onClick={() => setVisible(true)}><EyeOutlined /></Button>{"  "}
        <Button style = {{background: '#f0ad4e', color: 'white'}} onClick={() => setVisible(true, users)}><EditOutlined /></Button>
        {/* <Button type = 'warning'>Detail</Button>{"  "} */}
        </>
    )
    }

]

    return (
        <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>User List</h1>

                <Table columns = {columns} 
                    dataSource = {users} scroll={{ x: 1500, y: 300 }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                />

                {/* <Button type="primary" onClick={() => setVisible(true)}>
                    Update profile
                </Button> */}
                <Modal
                    title="Update my profile"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        <Button key="back" onClick={() => setVisible(false)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => setVisible(false)}>
                          Update
                        </Button>,
                      ]}
                >
                        <Form 
                            name = 'regiter' onFinish = {onFinish}>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "fullname"
                                    // value = {fullname}
                                    // onChange = {this.handleFullnameChange}
                                    hasFeedback
                                    rules = {[{ required: true, message: 'Please input your Full Name!' }]}
                                    >
                                        <Input type = "fullname"
                                        name = "fullname"
                                        // value = {fullname}
                                        // onChange = {this.handleFullnameChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" allowClear />
                                    </Form.Item>
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.fullnameError}</span> */}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "email"
                                    // value = {email}
                                    // onChange = {this.handleEmailChange}
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
                                        // value = {email}
                                        // onChange = {this.handleEmailChange}
                                        prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" allowClear />
                                    </Form.Item>
                                        
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.emailError}</span> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "residence"
                                    // value = {residence}
                                    // onChange = {this.handleResidenceChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Residence!' }]}
                                    >
                                        <Input type = "residence"
                                        name = "residence"
                                        // value = {residence}
                                        // onChange = {this.handleResidenceChange}
                                        prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Residence" allowClear />
                                    </Form.Item>

                                        
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.residenceError}</span> */}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                    name="sex"
                                    // value = {sex}
                                    // onChange = {this.handleSexChange}
                                    hasFeedback
                                        rules={[{ required: true, message: 'Please select your gender!' }]}
                                    >
                                        <Select size = "large"
                                        name="sex"
                                        // value = {sex}
                                        // onChange = {this.handleSexChange}
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
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.sexError}</span> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "phone_contact"
                                    //  value = {contact_phone}
                                    // onChange = {this.handleContactphoneChange}
                                    hasFeedback
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input addonBefore={+237}
                                         name = "phone_contact" 
                                        //  value = {contact_phone}
                                        //  onChange = {this.handleContactphoneChange}
                                         pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" placeholder="Contact Phone" 
                                         allowClear />
                                    </Form.Item>
                                        {/* <label>Contact Phone</label>
                                        <input class="form-control" type = "tel" name = "phone_contact" value = {contact_phone} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handleContactphoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required /> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.contact_phoneError}</span> */}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                        name="blood_gooup"
                                        // value = {blood_group}
                                        // onChange = {this.handleBloodgroupChange}
                                        hasFeedback
                                        rules={[{ required: true, message: 'Please select your Blood Group!' }]}
                                    >
                                        <Select size = "large"
                                        name="blood_gooup"
                                        // value = {blood_group}
                                        // onChange = {this.handleBloodgroupChange}
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

                                        {/* <label>Blood Group</label>
                                        <select class="form-control" value = {blood_group} name = "blood_gooup" onChange = {this.handleBloodgroupChange} required>
                                            <option value = "">Choose your Blood Group</option>
                                            <option value = "A+">A RhD positive (A+)</option>
                                            <option value = "A-">A RhD negative (A-)</option>
                                            <option value = "B+">B RhD positive (B+)</option>
                                            <option value = "B-">B RhD negative (B-)</option>
                                            <option value = "O+">O RhD positive (O+)</option>
                                            <option value = "O-">O RhD negative (O-)</option>
                                            <option value = "AB+">AB RhD positive (AB+)</option>
                                            <option value = "AB-">AB RhD negative (AB-)</option>
                                        </select> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.blood_groupError}</span> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    // value = {occupation} 
                                    name = "occupation" 
                                    // onChange = {this.handleOccupationChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Occupation!' }]}
                                    >
                                        <Input type = "email"
                                        // value = {occupation} 
                                        name = "occupation" 
                                        // onChange = {this.handleOccupationChange}
                                        placeholder="Occupation" allowClear />
                                    </Form.Item>
                                        {/* <label>Occupation</label>
                                        <input class="form-control" type = "text" value = {occupation} name = "occupation" onChange = {this.handleOccupationChange} required /> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.occupationError}</span> */}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    // value = {date_birth} 
                                    name = "date_birth" 
                                    // onChange = {this.handleDatebirthChange}
                                    // value = {date_birth} 
                                    // name = "date_birth"
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Date of Birth!' }]}
                                    >
                                        <Input type = "date"
                                          // value = {date_birth} 
                                        name = "date_birth" 
                                        // onChange = {this.handleDatebirthChange}
                                        // value = {date_birth} 
                                        // name = "date_birth"
                                        placeholder="Date of Birth" allowClear />
                                    </Form.Item>
                                    {/* <DatePicker  format={dateFormat} /> */}
                                        {/* <label>Date of Birth</label>
                                        <input class="form-control" type="date" value = {date_birth} name = "date_birth" onChange = {this.handleDatebirthChange} required /> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.data_birthError}</span> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "person_to_contact_name" 
                                    // value = {person_to_contact_name} 
                                    // onChange = {this.handlePersontonameChange}
                                    hasFeedback
                                    rules = {[{ required: true, message: 'Please the name!' }]}
                                    >
                                        <Input type = "fullname"
                                        name = "person_to_contact_name" 
                                        // value = {person_to_contact_name} 
                                        // onChange = {this.handlePersontonameChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Person to Contact Name" allowClear />
                                    </Form.Item>
                                        {/* <label>Person to Contact Name</label>
                                        <input class="form-control" type = "text" name = "person_to_contact_name" value = {person_to_contact_name} onChange = {this.handlePersontonameChange} required /> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_nameError}</span> */}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "person_to_contact_phone" 
                                    // value = {person_to_contact_phone}
                                    // onChange = {this.handlePersontophoneChange}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input addonBefore={+237}
                                        name = "person_to_contact_phone" 
                                        // value = {person_to_contact_phone}
                                        // onChange = {this.handlePersontophoneChange}
                                         pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" placeholder="Person to contact Phone" 
                                         allowClear />
                                    </Form.Item>
                                        {/* <label>Person to contact Phone</label>
                                        <input class="form-control" type = "text" name = "person_to_contact_phone" value = {person_to_contact_phone} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handlePersontophoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required /> */}
                                        {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_phoneError}</span> */}
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
                                    // value = {password}
                                    // onChange = {this.handlePasswordChange}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password" />
                                    </Form.Item>
                                    {/* <span style = {{fontSize: 12, color: 'red'}}>{this.state.passwordError}</span> */}
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
                        {/* <Form.Item className = "text-center">
                    <Button size = 'large' 
                    onClick = {this.handleSubmit} 
                    fluid type="primary" htmlType="submit"
                     className="login-form-button"  style = {{width: 235}}> {/*290*/}
                    {/* <LoginOutlined className="site-form-item-icon" />Sign Up */}
                    {/* </Button> */}
                        {/* </Form.Item> */} 
                                {/* <input class="form-control btn btn-info" value = "Register" type = "submit" /> */}
                            </div>
                    </Form>
      </Modal>




                {/* <div className = "table-responsive-sm">
                <table class="table border shadow table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Public ID</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope = "row">{index +1}</th>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.occupation}</td>
                                    <td>{user.public_id}</td>
                                    <td>
                                        <Link to = ''><EyeOutlined style = {{color: 'primary'}} />Edit</Link>
                                        <Link to = ''><EditOutlined style = {{color: 'gold'}} />View</Link>
                                        <Link to = ''><DeleteOutlined style = {{color: 'red'}} />Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                <Link className = "btn btn-outline-primary" to = "/register"> Add User</Link>
                     */}
            </div>
        </div>
    );
};

export default UserList;