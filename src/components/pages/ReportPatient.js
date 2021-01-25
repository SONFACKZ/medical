import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, Tag, Form, message, Input, Row, Col } from 'antd'

let email = localStorage.getItem('email')
let userId = localStorage.getItem("user_id")

const initialState = {
    report_case: '',
    Patients: [],
    Patient: [],
    public_id: '',
    visible: false

}

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

class ReportPatient extends React.Component {
        constructor(props){
            super(props);
            this.state = initialState;
        }

// Enable fielling form

handleReportonChange = (event) => {
        this.setState({
            report_case: event.target.value
        })
    }

showDrawer = () => {
    this.setState({
        visible: true,
    });
    };

onClose = () => {
    this.setState({
        visible: false,
    });
    };

    
    componentDidMount() {
            axiosWithAuth().get('/specific-patient-doctor')
            .then(response=>{
                this.setState({
                    Patients: response.data
                  })
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
    }

    detailsPatient = (public_id) => {
        axiosWithAuth().get('/users/'+public_id)
        .then(response => {
            this.setState({
                Patient: response.data
              })
            console.log(response)
        })
        .catch(error => {
           //  console.log(error.data.warn_message)
        })
    }


// handle submit value
handleSubmit = event => {
    event.preventDefault() //Avoid to lose data after submited
    axiosWithAuth().post('/case-reporting/add', this.state.report_case)
         .then(response => {
             console.log(response)
            message.success(response.data.message, 5);
            this.setState(initialState)
            // window.location.reload();
            //  warn_message
         })
         .catch(error => {
             if(error.response)
             {
                 if(error.response.status === 202){
                    message.warning('This user already exists')
                 }
                 else if(error.response.status === 500)
                 {
                    message.error('Server Error !')
                 }
             }
         })
}

// handle submit value
handleSubmit = event => {
    event.preventDefault() //Avoid to lose data after submited
    axiosWithAuth().post('/case-reporting/add', this.state)
         .then(response => {
             console.log(response)
            // message.success(response.data.message, 5);
            // this.setState(initialState)
            // window.location.reload();
            //  warn_message
            if (response)
             {
                 if(response.status === 200)
                 {
                    message.success(response.data.message, 5);
                    window.location.reload();
                 }
                 else if(response.status === 201)
                 {
                    message.warning(response.data.war_message, 5)
                 }
             }
         })
         .catch(error => {
             if(error.response)
             {
                 if(error.response.status === 202){
                    message.warning('This user already exists')
                 }
                 else if(error.response.status === 500)
                 {
                    message.error('Server Error !')
                 }
             }
         })
}

render(){
    let patients = this.state.Patients
    let patient = this.state.Patient
return (
    <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>My Patients</h1><hr />
                {
                patients.map(
                  patient =>{
                    return(
                <Row gutter= {16}>
                    <Col span={10}>
                        <span><b>Patient Name</b>: {patient.fullname}</span>
                    </Col>
                    <Col span={10}>
                    <span><b>Patient Phone</b>: {patient.contact_phone}</span>
                    </Col>
                    <Col span={4}>
                    <Button type = 'link' onClick = {() => {this.showDrawer(true, this.detailsPatient(patient.public_id))}}>
                        <Tag style = {{ color: 'white', background: '#0275d8'}}>Report</Tag></Button>
                    </Col>{" "}
                    </Row>
                    )
                }
                )
                }<br /><br />

                <Drawer 
                title="Report this Patient"
                width={500}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                            patient.map(pat => {
                                return(
                <Form  onFinish = {onFinish}>
                     <Form.Item
                        name = "report_reason"
                        value = {this.report_reason}
                        onChange = {this.handleReportonChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input the reason!' }]}
                        >
                        <Input type = "text"
                            name = "report_reason"
                            value = {this.report_reason}
                            onChange = {this.handleReportonChange}
                            placeholder="Type the reason" allowClear />
                            </Form.Item><p></p>
                            <Button size = 'large' 
                            onClick = {this.handleSubmit} 
                            fluid type="primary" htmlType="submit"
                            className="login-form-button"  style = {{width: 235}}> {/*290*/}
                            Report
                            </Button>
                    </Form>
                                )
                            }
                            )
                        }
                </Drawer>
            </div>
    </div>
);
}
}
export default ReportPatient
