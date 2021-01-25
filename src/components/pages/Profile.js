import React, { Component, useState } from 'react'
import { useParams } from "react-router-dom"
import { Card, Avatar, Row, Col } from 'antd'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { UserOutlined, MailOutlined, CalendarOutlined, CheckCircleTwoTone,
   HeartTwoTone, UserSwitchOutlined, PhoneOutlined, MedicineBoxOutlined, 
   PushpinOutlined, LockOutlined, HomeOutlined, EditOutlined} from '@ant-design/icons';
import {Button, Modal, Input, Form, Select } from 'antd'


import location from "../../assets/images/location.svg"
import logo from "../../assets/images/logo.png"
import sexImg from "../../assets/images/sex.png"

const email = localStorage.getItem('email')

let initialState = {
  Profil: [],
  User: [],
  loading: false,
  visible: false,
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
  person_to_contact_name: ''
}

class Profile extends Component {

  constructor(props){
    super(props);

    // this.handleSexOnChange = this.handleSexOnChange.bind(this);
    // this.handleBloodOnChange = this.handleBloodOnChange.bind(this);

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
// handleSexChange = (event) => {
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

// handleBloodgroupChange = (event) => {
//     this.setState({
//         blood_group: event.target.value
//     })
// }

// handleBloodGroupChange = (value) =>{
//     console.log('selected: '+ value);
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


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  
  componentDidMount(){
    axiosWithAuth().get(`/user/${email}/profile`)
    .then(response => {
      console.log(response.data)
      this.setState({
        Profil: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  detailsProfile = (email) => {
    axiosWithAuth().get(`/user/${email}/profile`)
    .then(response => {
        this.setState({
            User: response.data
          })
        console.log(response.data)
    })
    .catch(error => {
       //  console.log(error.data.warn_message)
    })
}

    render() {
      const { Meta } = Card;
      let profil = this.state.Profil;
      const { Option } = Select;
      const { visible, loading } = this.state;
      // let pro = this.state.User;
      // let { fullname,email, residence, sex, contact_phone, blood_group, occupation, date_birth,
      //           password, person_to_contact_phone, person_to_contact_name } = this.state

      const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

            // );
        return (
            <div className = "">
              {
                profil.map(
                  profile =>{
                    return(
                      <Card className = 'base-container text-center border shadow p-5 mx-auto'
                      // style={{ width: 500 }}
                      cover={
                        <img
                        className = 'bg-login'
                          alt="example"
                          style = {{width: 300}}
                          src = {logo} 
                          // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        // <span><MedicineBoxOutlined key="setting" />Blood group: {profile.blood_group}</span>,
                        // <span><PushpinOutlined />Address: {profile.residence} </span>,
                        // <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={profile.name}
                        description={profile.role}
                      />
                      <br />
                      <Row gutter= {16}>
                        <Col span={12}>
                          <span><MailOutlined /> <b>Email</b>: {profile.email} </span><br />
                        </Col>
                        <Col span={12}>
                        <span><UserOutlined /> <b>Full Name</b>: {profile.fullname} <CheckCircleTwoTone twoToneColor="#52c41a" /> </span><br />
                        </Col>
                        </Row><br />
                        <Row gutter= {16}>
                        <Col span={12}>
                        <span><MedicineBoxOutlined key="setting" /> <b>Blood group</b>: {profile.blood_group} <HeartTwoTone twoToneColor="#eb2f94" /></span><br />
                        </Col>
                        <Col span={12}>
                        <span><img className = 'image' style = {{width: 20}} alt = "location" src={location} />
                        <b>Address</b>: {profile.residence} </span><br />
                         </Col>
                         </Row><br />
                         <Row gutter= {16}>
                         <Col span={12}>
                        <span><PhoneOutlined /> <b>Contact</b>: {profile.contact_phone} </span><br />
                        </Col>
                        <Col span={12}>
                        <span><CalendarOutlined /> <b>Date of Birth</b>: {profile.date_birth} </span><br />
                        </Col>
                        </Row><br />
                        <Row gutter= {16}>
                        <Col span={12}>
                        <span><PushpinOutlined /> <b>Marital Status</b>: {profile.marital_status} </span><br />
                        </Col>
                        <Col span={12}>
                        <span><PushpinOutlined /> <b>Occupation</b>: {profile.occupation} </span><br />
                        </Col>
                        </Row><br />
                        <Row gutter= {16}>
                        <Col span={12}>
                        <span><UserOutlined /> <b>Person to contact Name</b>: {profile.person_to_contact_name} </span><br />
                        </Col>
                        <Col span={12}>
                        <span><PhoneOutlined /> <b>Person to contact phone</b>: {profile.person_to_contact_phone}</span><br />
                        </Col>
                        </Row><br />
                         <Row gutter= {16}>
                        <Col span={12}>
                        <span><UserSwitchOutlined /> Sex: {profile.sex} <img src = {sexImg} className = 'image' style = {{width: 20}} alt = "sex" /></span><br />
                        </Col>
                        {/* <StarOutlined />
                        <StarFilled />
                        <StarTwoTone twoToneColor="#eb2f96" /> */}
                      </Row>
                      <Button 
                      style = {{background: '#f0ad4e', color: 'white', float: 'right'}} 
                      // onClick={this.showModal}
                      onClick = {() => {this.showModal(true, this.detailsProfile(profile.email))}}
                      >
                      <EditOutlined />Edit profil</Button>
                    </Card>
                    )
                
                  })
              }

              {/* Edit profil Modal */}
              
            <Modal
              title="Update my profile"
              centered
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={1000}
              footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                    Update
                  </Button>,
                ]}
            >
               {
                profil.map(
                  user =>{
                    return(
            <Form 
                name = 'update' onFinish = {onFinish}>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        {/* <Form.Item
                        value = {user.fullname}
                        onChange = {this.handleFullnameChange}
                        hasFeedback
                        rules = {[{ required: true, message: 'Please input your Full Name!' }]}
                        > */}
                           {/* {console.log(user.email)} */}
                            <Input type = "fullname"
                            name = "fullname"
                            value = {user.fullname || this.state.fullname}
                            onChange = {this.handleFullnameChange}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" allowClear />
                        {/* </Form.Item> */}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.email}
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
                           {/* {console.log(user.email)} */}
                            <Input
                            name = "email"
                            value = {user.email}
                            onChange = {this.handleEmailChange}
                            prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.residence}
                        onChange = {this.handleResidenceChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Residence!' }]}
                        >
                          {/* {console.log(user.residence)} */}
                            <Input type = "residence"
                            name = "residence"
                            value = {user.residence}
                            onChange = {this.handleResidenceChange}
                            prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Residence" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        {/* <Form.Item 
                        value = {user.sex}
                        onChange={(value, event) => this.handleSexOnChange(value, event)}
                        hasFeedback
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        > */}
                          {/* {console.log(user.sex)} */}
                            <Select size = "large"
                            name="sex"
                            value = {user.sex}
                            onChange={(value, event) => this.handleSexOnChange(value, event)}
                            // onChange = {this.handleSexChange}
                            placeholder="Gender">
                            <Option value = "">Choose your Gender</Option>
                            <Option value="F">Female</Option>
                            <Option value="M">Male</Option>
                            </Select>
                        {/* </Form.Item> */}
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.contact_phone}
                        onChange = {this.handleContactphoneChange}
                        hasFeedback
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                          {/* {console.log(user.contact_phone)} */}
                            <Input addonBefore={+237}
                            name = "phone_contact" 
                            value = {user.contact_phone}
                            onChange = {this.handleContactphoneChange}
                            pattern = "[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="Contact Phone" 
                            allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                      {
                        user.role !== 'Patient'?'':
                        <div>
                        <Form.Item 
                            value = {user.blood_group}
                            onChange={(value, event) => this.handleBloodOnChange(value, event)}
                            // onChange = {this.handleBloodgroupChange}
                            hasFeedback
                            rules={[{ required: true, message: 'Please select your Blood Group!' }]}
                        >
                           {/* {console.log(user.blood_group)} */}
                            <Select size = "large"
                            name="blood_gooup"
                            value = {user.blood_group}
                            onChange={(value, event) => this.handleBloodOnChange(value, event)}
                            // onChange = {this.handleBloodgroupChange}
                            placeholder = "Blood Group">
                                <Option value = "">Choose your Blood Group</Option>
                                <Option value = "A+">A RhD positive (A+)</Option>
                                <Option value = "A-">A RhD negative (A-)</Option>
                                <Option value = "B+">B RhD positive (B+)</Option>
                                <Option value = "B-">B RhD negative (B-)</Option>
                                <Option value = "O+">O RhD positive (O+)</Option>
                                <Option value = "O-">O RhD negative (O-)</Option>
                                <Option value = "AB+">AB RhD positive (AB+)</Option>
                                <Option value = "AB-">AB RhD negative (AB-)</Option>
                            </Select>
                        </Form.Item>
                        </div>
                      }
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.occupation} 
                        onChange = {this.handleOccupationChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Occupation!' }]}
                        >
                           {/* {console.log(user.occupation)} */}
                            <Input type = "text"
                            value = {user.occupation} 
                            name = "occupation" 
                            onChange = {this.handleOccupationChange}
                            placeholder="Occupation" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        {/* {console.log(user.date_birth)} */}
                        {/* <Form.Item
                        onChange = {this.handleDatebirthChange}
                        value = {user.date_birth} 
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Date of Birth!' }]}
                        > */}
                           {/* {console.log(user.date_birth)} */}
                            {/* <Input type = "date"
                            name = "date_birth" 
                            onChange = {this.handleDatebirthChange}
                            value = {user.date_birth} 
                            placeholder="Date of Birth" allowClear />
                        </Form.Item> */}
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.person_to_contact_name} 
                        onChange = {this.handlePersontonameChange}
                        hasFeedback
                        rules = {[{ required: true, message: 'Please the name!' }]}
                        >
                           {/* {console.log(user.person_to_contact_name)} */}
                            <Input type = "fullname"
                            name = "person_to_contact_name" 
                            value = {user.person_to_contact_name} 
                            onChange = {this.handlePersontonameChange}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Person to Contact Name" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {user.person_to_contact_phone}
                        onChange = {this.handlePersontophoneChange}
                        hasFeedback
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                        >
                           {/* {console.log(user.person_to_contact_phone)} */}
                            <Input addonBefore={+237}
                            name = "person_to_contact_phone" 
                            value = {user.person_to_contact_phone}
                            onChange = {this.handlePersontophoneChange}
                              pattern = "[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="Person to contact Phone" 
                              allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <div>
                </div>
        </Form>
                    )})
                      } 
      </Modal>
            </div>
        )
        }
      }

export default Profile
