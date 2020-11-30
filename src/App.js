import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/login/style.css";
// import { Row, Col } from "react-bootstrap";
// import logo from './logo.svg';
import './App.css';
import { AllUsers } from './components/AllUsers';
// import loginImg from "./login.svg";
import TabNav from './components/TabNav';
import Tab from './components/Tab';
import Menu from './components/Menu';
// import Login from './components/login/login';
import RolePage from './components/register/rolePage';
// import FormPatient from './components/Form/formPatient';
import RegisterPatient from './components/register/registerPatientPage';
import RegisterDoctor from './components/register/registerDoctorPage';
// import Users from './components/allUsers';
// import PatientRegister from './components/register/PatientRegister';
// import DoctorRegister from './components/register/DoctorRegister';
// import { Login } from "./components/login/index";
// import { Register } from "./components/register/index";

// function App(){
//   return(
//     <div className='App'>
     
//     </div>
//   )
// }
class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      selected: 'Patient Register'
    }
  }

  setSelected = (tab) => {
    this.setState({ selected: tab });
  }

  render()
  {
    return (
      <div className="App">
        <Menu />
        <br></br>
        <TabNav tabs={['Patient Register', 'Doctor Register', 'Test Flask Backend API get Data', 'Test Flask Backend API send Data']} selected={ this.state.selected } setSelected={ this.setSelected }>
          <Tab isSelected={ this.state.selected === 'Patient Register'}>
          <RegisterPatient />
          {/* <FormPatient /> */}
          </Tab>

          <Tab isSelected={ this.state.selected === 'Doctor Register'}>
          <RegisterDoctor />
          </Tab>

          <Tab isSelected={ this.state.selected === 'Test Flask Backend API get Data'}>
          <AllUsers />
          </Tab>

           <Tab isSelected={ this.state.selected === 'Test Flask Backend API send Data'}>
           <RolePage />
           </Tab>
        </TabNav>
      </div>
    );
  }
  
}

export default App;
