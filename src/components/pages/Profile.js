import React, { Component, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Form, Button, Select, Card, Avatar } from 'antd'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { UserOutlined, MailOutlined, CalendarOutlined, CheckCircleTwoTone,
   HeartTwoTone, UserSwitchOutlined, PhoneOutlined, MedicineBoxOutlined, 
   PushpinOutlined, StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import logo from "../../assets/images/logo.png"
import axios from 'axios';

// const { Title } = Typography;
// let user = localStorage.getItem('user')
let email = localStorage.getItem('email')
// let role = localStorage.getItem('role_name')

class Profile extends Component {
  state = {
    Profil: [],
  }

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
  
      // const { Option } = Select;
      // let symptoms = this.state.Symptoms;
      // let symptomsItems = symptoms.map((symptom) =>
      // <Option value = {symptom.symptom_name} key = {symptom.symptom_name}>{symptom.symptom_name}</Option>
          // symptomsItems.push(<Option key = {symptom.symptom_name}>{symptom.symptom_name}</Option>)
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
                        <span><MailOutlined /> Email: {profile.email} </span><br />
                        <span><UserOutlined /> Full Name: {profile.name} <CheckCircleTwoTone twoToneColor="#52c41a" /> </span><br />
                        <span><MedicineBoxOutlined key="setting" /> Blood group: {profile.blood_group} <HeartTwoTone twoToneColor="#eb2f96" /></span><br />
                        <span><PushpinOutlined /> Address: {profile.residence} </span><br />
                        <span><PhoneOutlined /> Contact: {profile.contact_phone} </span><br />
                        <span><CalendarOutlined /> Date of Birth: {profile.date_birth} </span><br />
                        <span><PushpinOutlined /> Marital Status: {profile.marital_status} </span><br />
                        <span><PushpinOutlined /> Occupation: {profile.occupation} </span><br />
                        <span><UserOutlined /> Person to contact Name: {profile.person_to_contact_name} </span><br />
                        <span><PhoneOutlined /> Person to contact phone: {profile.person_to_contact_phone} </span><br />
                        <span><UserSwitchOutlined /> Sex: {profile.sex} </span><br />
                        {/* <StarOutlined />
                        <StarFilled />
                        <StarTwoTone twoToneColor="#eb2f96" /> */}
                    </Card>
                    )
                
                  })
              }              
            </div>
        )
        }
      }

export default Profile
