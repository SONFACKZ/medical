import React, { useState } from 'react'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./components/login/style.css"
import Login from './components/login/login'
import Register from './components/register/register';
import ConsultationForm from  './components/pages/ConsultationForm'
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import PatientBoard from './components/Dashboards/PatientBoard'
import DoctorBoard from './components/Dashboards/DoctorBoard'
import ManagerBoard from './components/Dashboards/ManagerBoard'
import PastHistory from './components/pages/PastHistory'
import {QuoteContext} from "./contexts/QuoteContext"
import QuotesList from "./components/QuotesList"
import PrivateRoute from "./utils/PrivateRoute";
// import UserList from './components/Dashboards/UserList';
// import CheckRole from './components/RoleChecking'



function App(){

  const [quotes, setQuotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  return(

    <Router>
      <QuoteContext.Provider value={{quotes, setQuotes, loggedIn, setLoggedIn}}>
      <div className='App'>
      <Switch>
      <PrivateRoute path="/manager" component={ManagerBoard} />
      <Route exact path = "/" component = {Login} />
      <Route exact path = "/login" component = {Login} />
      <Route path = "/register" component = {Register} />
      <PrivateRoute path ="/patient" component = {PatientBoard} />
      <PrivateRoute path ="/doctor" component = {DoctorBoard} />
      {/* <Route exact path ="/manager" component = {ManagerBoard} /> */}
      {/* <Route exact path ="/consultation" component = {ConsultationForm} />
      <Route exact path ="/pasthistory" component = {PastHistory} /> */}
      </Switch>
      </div>
      </QuoteContext.Provider>
    </Router>

    
  )
}
export default App;
















// // import React, { useState } from 'react'
// // // import { render } from 'react-dom'
// // import Header from './components/Dashboards/Header'
// // import Main from './components/Dashboards/Main'
// // import Sidebar from './components/Dashboards/Sidebar'
// // import 'semantic-ui-css/semantic.min.css'

// // import cx from 'classnames'

// // function App(){


// //   const [toggle, setToggle] = useState(false);

// //   const classes = cx(
// //     'pusher',
// //     'bottom',
// //     {'dimmed': toggle}
// //   );


// //   function toggleMenu(){
// //     setToggle(!toggle)
// //   }

// //   return(
// //     <div className='App'>
// //      <Header onToggleMenu = {toggleMenu} />
// //      <div className = "ui attached pushable" style = {{height: '100vh'}}>
// //       <Sidebar toggleMenu = {toggle} />
// //       <div className = {classes}>
// //         <Main />
// //       </div>
// //      </div>
// //     </div>
// //   )
// // }
// // export default App;