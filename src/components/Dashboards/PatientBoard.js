import React, { Component, useState } from 'react'
import { Menu, Switch, Layout, Avatar, Breadcrumb, Space, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import patientImg from "../../assets/images/patient.png"
import logo from "../../assets/images/logo.png"
import Logout from './logout'
import { HomeOutlined, SettingOutlined, IssuesCloseOutlined,
         MessageOutlined, LogoutOutlined, MedicineBoxOutlined,
         HistoryOutlined, UserOutlined } from '@ant-design/icons'
import ConsultationForm from '../pages/ConsultationForm'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import PastHistory from '../pages/PastHistory'
// import Logout from './logout'

// const SubMenu = Menu.SubMenu;
const user = localStorage.getItem('user')
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content, Sider } = Layout;
const { Text } = Typography;


class PatientBoard extends React.Component {


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
      <Router>
        <div>
          <Layout>
            <Header
            style = {{padding: 9, background: '#34495E'}}>
            <Space align="center" style = {{float: 'right'}}>
                <Avatar shape = "circle" size={40}  src={ patientImg } />
                <Text strong style = {{color: 'white'}}>{user}</Text>
                <Logout />
              </Space>
            {/* <Avatar shape = "circle" size={50} style = {{float: 'right'}} src={ patientImg } /> */}
            
            <Title style = {{color: 'white'}} level = {3}>
                <img src = {logo} className = 'logo' alt = 'Mediagnostic logo'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                 style = {{margin: -17}} width="150" height="100" />
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
            collapsedWidth = {0}
            >
        <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 200 }}
              // defaultSelectedKeys = {{'/patient'}}
              // defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
          {/* <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}> */}
            <Menu.Item key = '1' icon = {<HomeOutlined />}>
              Dashboard
              <Link to = '/patient' />
            </Menu.Item>

            <Menu.Item key="2" icon = {<MedicineBoxOutlined />}>
              Consultation
            <Link to = '/patient/consultation' />
            </Menu.Item>

            <Menu.Item key="3" icon = {<HistoryOutlined />}>
              Past History
              <Link to = '/patient/past-history' />
            </Menu.Item>

            <Menu.Item key="5" icon = {<IssuesCloseOutlined />}>
              Case Reporting
              <Link to = '/patient/case-reporting' />
            </Menu.Item>
            
            <Menu.Item key="6" icon = {<MessageOutlined />}>
              Live Chat
              <Link to = '/patient/chat' />
            </Menu.Item>
            <Menu.Item key="7" icon = {<UserOutlined />}>
              Profil
              <Link to = '/patient/profil' />
            </Menu.Item>
            <Menu.Item key="/8" icon = {<SettingOutlined />}>
              Setting
              <Link to = '/patient/setting' />
            </Menu.Item>
          {/* </SubMenu> */}
          {/* <SubMenu key="sub2" title={<span><AppstoreAddOutlined /><span>Navigtion Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><SettingOutlined /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
        </Menu>
        </Sider>
        <Layout>
        <Content style = {{ padding: '0 50px' }}>
          <Breadcrumb style = {{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style = {{ background: '#fff', padding:24, minHeight: 580 }}>
          <Route exact path="/patient" component={ConsultationForm} />
            {/* <Route path="/patient/" component={DoctorList} />
            <Route path="/patient/" component={PatientList} />
            <Route exact path="/patient/" component={DoctorsReview} /> */}
            </div>
        </Content>
        <Footer style = {{ textAlign: 'center'}}>Copyright Sonfack.Z. All right reserved 2020</Footer>
      </Layout>
      </Layout>
      </Layout>
      </div>
      </Router>
    );
  }
}

export default PatientBoard;
