import React, { Component } from 'react'
import { Menu, Switch, Layout, Avatar, Breadcrumb } from 'antd'
import Title from 'antd/lib/typography/Title'
import patientImg from "../../assets/images/patient.png"
import logo from "../../assets/images/logo.png"

import { MailOutlined, HomeOutlined, SettingOutlined, AppstoreAddOutlined, MedicineBoxOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu;
const { Header, Footer, Content, Sider } = Layout;

class SubMenuT extends React.Component {
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
            style = {{padding: 9, background: 'grey'}}>
            <Avatar shape = "circle" size={50} style = {{float: 'right'}} src={ patientImg } />
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
            <Sider 
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            collapsedWidth = {10}
            >
        <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 200 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
          <SubMenu key="sub1" title={<span><MailOutlined /><span>Navigation One</span></span>}>
            <Menu.Item key = '1'><HomeOutlined />Dashboard</Menu.Item>
            <Menu.Item key="2">Option 1</Menu.Item>
            <Menu.Item key="3">Option 2</Menu.Item>
            <Menu.Item key="4">Option 3</Menu.Item>
            <Menu.Item key="5">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><AppstoreAddOutlined /><span>Navigtion Two</span></span>}>
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
          </SubMenu>
        </Menu>
        </Sider>
        <Layout>
        <Content style = {{ padding: '0 50px' }}>
          <Breadcrumb style = {{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style = {{ background: '#fff', padding:24, minHeight: 580 }}>
            Content
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

export default SubMenuT;