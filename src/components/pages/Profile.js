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

// const { Title } = Typography;
// let user = localStorage.getItem('user')
let email = localStorage.getItem('email')
// let role = localStorage.getItem('role_name')
// const [visible, setVisible] = useState(false);
class Profile extends Component {
  state = {
    Profil: [],
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
handleSexChange = (event) => {
    this.setState({
        sex: event.target.value
    })
}
handleContactphoneChange = (event) => {
    this.setState({
        contact_phone: event.target.value
    })
}
handleBloodgroupChange = (event) => {
    this.setState({
        blood_group: event.target.value
    })
}

handleBloodGroupChange = (value) =>{
    console.log('selected: '+ value);
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
      // console.log(response.data)
      this.setState({
        Profil: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

    render() {
      const { Meta } = Card;
      let profil = this.state.Profil;
      const { Option } = Select;
      const { visible, loading } = this.state;

      const{ fullname,email, residence, sex, contact_phone, blood_group, occupation, date_birth,
                password, person_to_contact_phone, person_to_contact_name } = this.state

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
                      <Button style = {{background: '#f0ad4e', color: 'white', float: 'right'}} onClick={this.showModal}><EditOutlined />Edit profil</Button>

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
                  edi =>{
                    return(
            <Form 
                name = 'update' onFinish = {onFinish}>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        name = "fullname"
                        value = {edi.fullname}
                        onChange = {this.handleFullnameChange}
                        hasFeedback
                        rules = {[{ required: true, message: 'Please input your Full Name!' }]}
                        >
                          {console.log(edi.fullname)}
                            <Input type = "fullname"
                            name = "fullname"
                            value = {edi.fullname}
                            onChange = {this.handleFullnameChange}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        name = "email"
                        value = {edi.email}
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
                           {console.log(edi.email)}
                            <Input
                            name = "email"
                            value = {edi.email}
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
                        name = "residence"
                        value = {edi.residence}
                        onChange = {this.handleResidenceChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Residence!' }]}
                        >
                          {console.log(edi.residence)}
                            <Input type = "residence"
                            name = "residence"
                            value = {edi.residence}
                            onChange = {this.handleResidenceChange}
                            prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Residence" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item 
                        name="sex"
                        value = {edi.sex}
                        onChange = {this.handleSexChange}
                        hasFeedback
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                          {console.log(edi.sex)}
                            <Select size = "large"
                            name="sex"
                            value = {edi.sex}
                            onChange = {this.handleSexChange}
                            placeholder="Gender">
                            <Option value = "">Choose your Gender</Option>
                            <Option value="F">Female</Option>
                            <Option value="M">Male</Option>
                            </Select>
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        name = "phone_contact"
                         value = {edi.contact_phone}
                        onChange = {this.handleContactphoneChange}
                        hasFeedback
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                          {console.log(edi.contact_phone)}
                            <Input addonBefore={+237}
                              name = "phone_contact" 
                             value = {edi.contact_phone}
                             onChange = {this.handleContactphoneChange}
                              pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" placeholder="Contact Phone" 
                              allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item 
                            name="blood_gooup"
                            value = {edi.blood_group}
                            onChange = {this.handleBloodgroupChange}
                            hasFeedback
                            rules={[{ required: true, message: 'Please select your Blood Group!' }]}
                        >
                           {console.log(edi.blood_group)}
                            <Select size = "large"
                            name="blood_gooup"
                            value = {edi.blood_group}
                            onChange = {this.handleBloodgroupChange}
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
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        value = {edi.occupation} 
                        name = "occupation" 
                        onChange = {this.handleOccupationChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Occupation!' }]}
                        >
                           {console.log(edi.occupation)}
                            <Input type = "email"
                            value = {edi.occupation} 
                            name = "occupation" 
                            onChange = {this.handleOccupationChange}
                            placeholder="Occupation" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        {console.log(edi.date_birth)}
                        <Form.Item
                        name = "date_birth" 
                        onChange = {this.handleDatebirthChange}
                        value = {edi.date_birth} 
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input your Date of Birth!' }]}
                        >
                           {console.log(edi.date_birth)}
                            <Input type = "date"
                            name = "date_birth" 
                            onChange = {this.handleDatebirthChange}
                            value = {edi.date_birth} 
                            placeholder="Date of Birth" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row gutter= {16}>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        name = "person_to_contact_name" 
                        value = {edi.person_to_contact_name} 
                        onChange = {this.handlePersontonameChange}
                        hasFeedback
                        rules = {[{ required: true, message: 'Please the name!' }]}
                        >
                           {console.log(edi.person_to_contact_name)}
                            <Input type = "fullname"
                            name = "person_to_contact_name" 
                            value = {edi.person_to_contact_name} 
                            onChange = {this.handlePersontonameChange}
                            prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Person to Contact Name" allowClear />
                        </Form.Item>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                        <Form.Item
                        name = "person_to_contact_phone" 
                        value = {edi.person_to_contact_phone}
                        onChange = {this.handlePersontophoneChange}
                        hasFeedback
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                           {console.log(edi.person_to_contact_phone)}
                            <Input addonBefore={+237}
                            name = "person_to_contact_phone" 
                            value = {edi.person_to_contact_phone}
                            onChange = {this.handlePersontophoneChange}
                              pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" placeholder="Person to contact Phone" 
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
