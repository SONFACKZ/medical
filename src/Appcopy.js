// import React, {useState} from 'react';
// import './App.css';
// import {QuoteContext} from "./contexts/QuoteContext";
// import {Route, BrowserRouter as Router} from "react-router-dom";
// import Navigation from "./components/Navigation";
// import AuthForm from "./components/AuthForm";
// import PrivateRoute from "./utils/PrivateRoute";
// import QuotesList from "./components/QuotesList";
// function App() {
//   const [quotes, setQuotes] = useState([]);
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

//   return (

//     <Router>
//       <QuoteContext.Provider value={{quotes, setQuotes, loggedIn, setLoggedIn}}>
//         <div className="App">

//           <Navigation />

//           <PrivateRoute path="/users" component={QuotesList} />
//           <Route path="/login" render={ props => <AuthForm {...props} role="login" /> } />
//           <Route path="/register" render={ props => <AuthForm {...props} role="register" /> } />
          
//         </div>
//       </QuoteContext.Provider>
//     </Router>
//   );
// }

// export default App;


















import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {QuoteContext} from "./contexts/QuoteContext";
// import QuotesList from "./components/QuotesList";
import 'semantic-ui-css/semantic.min.css'
import Home from  './components/Dashboards/Manager/UserList';
import About from  './components/pages/About';
import Contact from  './components/pages/Contact';
import Register from './components/register/register';
import Login from './components/login/login';
import Admin from './components/login/admin';
import Logout from './components/login/logout';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import "./components/login/style.css";
// // import { Row, Col } from "react-bootstrap";
// // import logo from './logo.svg';
// // import './App.css';
// import { AllUsers } from './components/AllUsers';
// // import loginImg from "./login.svg";
// import TabNav from './components/TabNav';
// import Tab from './components/Tab';
// import Menu from './components/Menu';
// import Login from './components/login/login';
// // import RolePage from './components/register/rolePage';
// // import FormPatient from './components/Form/formPatient';
// import RegisterPatient from './components/register/registerPatientPage';
// import RegisterDoctor from './components/register/registerDoctorPage';
// // import Users from './components/allUsers';
// // import PatientRegister from './components/register/PatientRegister';
// // import DoctorRegister from './components/register/DoctorRegister';
// // import { Login } from "./components/login/index";
// // import { Register } from "./components/register/index";

function App(){
  // const [quotes, setQuotes] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  return(
    <div className='App'>
     <div className="App">
        <BrowserRouter>
        <div className="App">
       <Navbar />
       <Switch>
         <Route exact path ="/" component = {Home} />
         <Route exact path = "/about" component = {About} />
         <Route exact path = "/contact" component = {Contact} />
         <Route exact path = "/register" component = {Register} />
         <Route exact path = "/login" component = {Login} />
         <Route path = "/admin" component = {Admin} />
         <Route path = "/logout" component = {Logout} />
         <Route component = {NotFound} />
       </Switch>
     </div>
     </BrowserRouter>
         {/* <Menu /> */}
         <br></br>
         {/* <div className="container"> */}
         {/* <TabNav tabs={['Patient Register', 'Doctor Register', 'Getting all users', 'Login']} selected={ this.state.selected } setSelected={ this.setSelected }> */}
           {/* <Tab isSelected={ this.state.selected === 'Patient Register'}> */}
           {/* <RegisterPatient /> */}
           {/* <FormPatient /> */}
           {/* </Tab> */}

           {/* <Tab isSelected={ this.state.selected === 'Doctor Register'}> */}
           {/* <RegisterDoctor /> */}
           {/* </Tab> */}

           {/* <Tab isSelected={ this.state.selected === 'Getting all users'}> */}
           {/* <AllUsers /> */}
           {/* </Tab> */}

            {/* <Tab isSelected={ this.state.selected === 'Login'}> */}
            {/* <Login /> */}
            {/* </Tab> */}
         {/* </TabNav> */}
         {/* </div> */}
       </div>
    </div>
  )
}
export default App;



// const [quotes, setQuotes] = useState([]);
//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
// class App extends React.Component {
  

//   render()
//   {
//     return (
//       <div className="App">
//        <BrowserRouter>
//        <div className="App">
//       <Navbar />
//       <Switch>
//         <Route exact path ="/" component = {Home} />
//         <Route exact path = "/about" component = {About} />
//         <Route exact path = "/contact" component = {Contact} />
//         <Route exact path = "/register" component = {Register} />
//         <Route exact path = "/login" component = {Login} />
//         <Route path = "/admin" component = {Admin} />
//         <Route path = "/logout" component = {Logout} />
//         <Route component = {NotFound} />
//       </Switch>
//     </div>
//     </BrowserRouter>
//         {/* <Menu /> */}
//         <br></br>
//         {/* <div className="container"> */}
//         {/* <TabNav tabs={['Patient Register', 'Doctor Register', 'Getting all users', 'Login']} selected={ this.state.selected } setSelected={ this.setSelected }> */}
//           {/* <Tab isSelected={ this.state.selected === 'Patient Register'}> */}
//           {/* <RegisterPatient /> */}
//           {/* <FormPatient /> */}
//           {/* </Tab> */}

//           {/* <Tab isSelected={ this.state.selected === 'Doctor Register'}> */}
//           {/* <RegisterDoctor /> */}
//           {/* </Tab> */}

//           {/* <Tab isSelected={ this.state.selected === 'Getting all users'}> */}
//           {/* <AllUsers /> */}
//           {/* </Tab> */}

//            {/* <Tab isSelected={ this.state.selected === 'Login'}> */}
//            {/* <Login /> */}
//            {/* </Tab> */}
//         {/* </TabNav> */}
//         {/* </div> */}
//       </div>
//     );
//   }
  
// }

// export default App;
