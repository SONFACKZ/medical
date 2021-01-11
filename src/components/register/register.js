import React from "react"
import { Tabs } from 'antd'
import TabNav from '../TabNav'
import RegisterPatient from '../register/registerPatientPage'
import RegisterDoctor from '../register/registerDoctorPage'

const { TabPane } = Tabs;

    class Register extends React.Component {
      
  render()
  {
    return(
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Patient Register" key="1">
            <RegisterPatient />
            </TabPane>
            <TabPane tab="Doctor Register" key="2">
            <RegisterDoctor />
            </TabPane>
        </Tabs>
    );
  }
};

export default Register;