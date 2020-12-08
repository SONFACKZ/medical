import React from "react";
import Tab from '../Tab';
import TabNav from '../TabNav';
import RegisterPatient from '../register/registerPatientPage';
import RegisterDoctor from '../register/registerDoctorPage';


// const Register = () => {
    class Register extends React.Component {

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
    return(
        <>
            {/* <Menu /> */}
                <br></br>
                <div className="container">
                  
                  <TabNav className = "base-container" tabs={['Patient Register', 'Doctor Register']} selected={ this.state.selected } setSelected={ this.setSelected }>
                  <Tab isSelected={ this.state.selected === 'Patient Register'}>
                  <RegisterPatient />
                  </Tab>

                  <Tab isSelected={ this.state.selected === 'Doctor Register'}>
                  <RegisterDoctor />
                  </Tab>

                  </TabNav>
                
                </div>
               </> 
    );
  }
};

export default Register;