import React, { Component } from 'react'
import { Menu, Switch, Layout, Avatar, Breadcrumb, Space, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import managerImg from "../../assets/images/manager.png"
import logo from "../../assets/images/logo.png"
import Logout from './logout'
import { HomeOutlined, SettingOutlined, IssuesCloseOutlined,
   MessageOutlined, LogoutOutlined, MedicineBoxOutlined,
   HistoryOutlined, UserOutlined } from '@ant-design/icons'
import UserList from '../pages/UserList'
import PatientList from '../pages/PatientList'
import DoctorList from '../pages/DoctorList'
import DoctorsReview from '../pages/DoctorRev'

const user = localStorage.getItem('user')
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content, Sider } = Layout;
const { Text } = Typography;


class ManagerBoard extends React.Component {
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
                <Avatar shape = "circle" size={40}  src={ managerImg } />
                <Text strong style = {{color: 'white'}}>{user}</Text>
                <Logout />
              </Space>
            
            
            <Title style = {{color: 'white'}} level = {3}>
                <img src = {logo} alt = 'Mediagnostic logo'
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
              // defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
          {/* <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}> */}
            <Menu.Item key = "1" ><HomeOutlined />Dashboard <Link to="/manager" /></Menu.Item>
            <Menu.Item key = "2"><MedicineBoxOutlined />Doctors <Link to="/manager/doctors" /></Menu.Item>
            <Menu.Item key = "3"><HistoryOutlined />Patients <Link to="/manager/patients" /></Menu.Item>
            <Menu.Item key = "4"><IssuesCloseOutlined />Doctor Review <Link to="/manager/doctorsreview" /></Menu.Item>
            <Menu.Item key = "5"><MessageOutlined />Live Chat <Link to="/manager/chat" /></Menu.Item>
            <Menu.Item key = "6"><UserOutlined />Profil <Link to="/manager/profil" /></Menu.Item>
            <Menu.Item key = "7"><SettingOutlined />Setting <Link to="/manager/setting" /></Menu.Item>
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
            {/* Content: */}
            <Route exact path="/manager" component={UserList} />
            <Route path="/manager/doctors" component={DoctorList} />
            <Route path="/manager/patients" component={PatientList} />
            <Route exact path="/manager/doctorsreview" component={DoctorsReview} />
            {/* <Route exact path="/manager/chat" component={Chat} />
            <Route exact path="/manager/profil" component={Profil} />
            <Route exact path="/manager/setting" component={Setting} /> */}
            {/* <UserList />
            <br />
            <PatientList />
            <br />
            <DoctorList /> */}
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

export default ManagerBoard;
