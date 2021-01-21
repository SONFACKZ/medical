import React, { Component } from 'react'
import { Menu, Switch, Layout, Avatar, Breadcrumb, Space, Typography, Tag } from 'antd'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Title from 'antd/lib/typography/Title'
import doctorImg from "../../assets/images/doctor.svg"
import logo from "../../assets/images/logo.png"
import Logout from './logout'

import { HomeOutlined, SettingOutlined, IssuesCloseOutlined,
   MessageOutlined, LogoutOutlined, MedicineBoxOutlined,
   HistoryOutlined, UserOutlined } from '@ant-design/icons'
import Profile from '../pages/Profile'
import ReportPatient from '../pages/ReportPatient'

const user = localStorage.getItem('user')
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content, Sider } = Layout;
const { Text } = Typography;


class DoctorBoard extends React.Component {
  state = {
    theme: 'light',
    current: '1',
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'light' : 'dark',
    });
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <div>
          <Layout>
          <Header
            style = {{padding: 9, background: "linear-gradient(#217561, #d9534f)"}}>
          <Space align="center" style = {{float: 'right'}}>
            <Avatar shape = "circle" size={40}  src={ doctorImg } />
            <Text strong style = {{color: 'white'}}>{user}</Text>
            <Tag style = {{background: '#f7f7f7'}}> <Logout /></Tag>
          </Space>
            
            <Title style = {{color: 'white'}} level = {3}>
                <img src = {logo} alt = 'Mediagnostic logo'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                 style = {{margin: -20}} width="150" height="100" />
            </Title>
          <Switch style = {{float: 'right'}}
          checked={this.state.theme === 'light'}
          onChange={this.changeTheme}
          checkedChildren="Light"
          unCheckedChildren="Dark"
            />
            </Header>
            <Layout>
            <Sider theme={this.state.theme}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            collapsedWidth = {10}
            >
        <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 200 }}
              // defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
          {/* <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}> */}
            <Menu.Item key = '1'><HomeOutlined /><Link to="/doctor" />Dashboard</Menu.Item>
            <Menu.Item key = "2"><MedicineBoxOutlined />Consultation</Menu.Item>
            <Menu.Item key = "4"><IssuesCloseOutlined /><Link to="/doctor/case-reporting" />Case Reporting</Menu.Item>
            <Menu.Item key = "5"><MessageOutlined />Live Chat</Menu.Item>
            <Menu.Item key = "6"><UserOutlined /><Link to="/doctor/profile" />Profile</Menu.Item>
            {/* <Menu.Item key = "7"><SettingOutlined />Setting</Menu.Item> */}
        </Menu>
        </Sider>
        <Layout>
        <Content style = {{ padding: '0 50px' }}>
          <Breadcrumb style = {{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style = {{ background: '#fff', padding:24, minHeight: 580 }}>
            <Route exact path="/doctor" component="" />
            {/* <Route path="/doctor/doctors" component={DoctorList} /> */}
            {/* <Route path="/doctor/patients" component={PatientList} /> */}
            {/* <Route exact path="/doctor/doctorsreview" component={DoctorsReview} /> */}
            <Route exact path="/doctor/case-reporting" component={ReportPatient} />
            <Route exact path="/doctor/profile" component={Profile} />
          </div>
        </Content>
        <Footer style = {{ textAlign: 'center'}}>Copyright Sonfack.Z. All right reserved 2020</Footer>
      </Layout>
      </Layout>
      </Layout>
      </div>
    );
  }
}

export default DoctorBoard;
