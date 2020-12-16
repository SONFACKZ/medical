import React from 'react'
import './App.css'
import Home from  './components/pages/Home';
import {Route, BrowserRouter as Router} from "react-router-dom";
import PatientBoard from './components/Dashboards/PatientBoard'
import DoctorBoard from './components/Dashboards/DoctorBoard'
import ManagerBoard from './components/Dashboards/ManagerBoard'



// const { Header, Footer, Sider, Content } = Layout;

function App(){

  return(
    <div className='App'>
      <Router>
      <Route exact path ="/" component = {Home} />
      <Route exact path ="/patient" component = {PatientBoard} />
      <Route exact path ="/doctor" component = {DoctorBoard} />
      <Route exact path ="/manager" component = {ManagerBoard} />
      </Router>
     {/* <Layout>
     <Header style = {{padding: 9, background: 'grey'}}>
      <Avatar shape = "circle" size={50} style = {{float: 'right'}} src={ patientImg } />
       <Title style = {{color: 'white'}} level = {3}>
         <img src = {logo} alt = 'Mediagnostic logo' style = {{margin: -17}} width="150" height="100" /></Title>
     </Header>
     <Layout>
      <Sider>
        <Menu defaultSelectedKeys = {['Dashboard']}
          mode = 'inline'>
          <Menu.Item key = 'Dashboard'>
          <HomeOutlined />Dashboard
          </Menu.Item>
          <SubMenu
          title = {
            <span><MailOutlined /><span>About Us</span></span>
          }>
            <Menu.ItemGroup key = 'AboutUs' title = 'Country 1'>
              <Menu.Item key = 'location1'>Location 1</Menu.Item>
              <Menu.Item key = 'location2'>Location 2</Menu.Item>

            </Menu.ItemGroup>
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
            <SubMenuT />
            </div>
        </Content>
        <Footer style = {{ textAlign: 'center'}}>Copyright Sonfack.Z. All right reserved 2020</Footer>
      </Layout>
    </Layout>
    </Layout> */}
    </div>
  )
}
export default App;
















// import React, { useState } from 'react'
// // import { render } from 'react-dom'
// import Header from './components/Dashboards/Header'
// import Main from './components/Dashboards/Main'
// import Sidebar from './components/Dashboards/Sidebar'
// import 'semantic-ui-css/semantic.min.css'

// import cx from 'classnames'

// function App(){


//   const [toggle, setToggle] = useState(false);

//   const classes = cx(
//     'pusher',
//     'bottom',
//     {'dimmed': toggle}
//   );


//   function toggleMenu(){
//     setToggle(!toggle)
//   }

//   return(
//     <div className='App'>
//      <Header onToggleMenu = {toggleMenu} />
//      <div className = "ui attached pushable" style = {{height: '100vh'}}>
//       <Sidebar toggleMenu = {toggle} />
//       <div className = {classes}>
//         <Main />
//       </div>
//      </div>
//     </div>
//   )
// }
// export default App;