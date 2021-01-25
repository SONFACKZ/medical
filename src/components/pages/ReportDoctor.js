import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Tag, Form, message, Input, Row, Col } from 'antd'

let email = localStorage.getItem('email')
let userId = localStorage.getItem("user_id")

const initialState = {
    report_case: '',
}

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

class ReportDoctor extends React.Component {
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

    
    componentDidMount() {
            axiosWithAuth().get('/doctor-assigned/'+email)
            .then(response=>{
                this.setState(response.data);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
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
            //  warn_message
         })
         .catch(error => {
            //  if(error.response)
            //  {
            //      if(error.response.status === 202){
            //         message.warning('This user already exists')
            //      }
            //      else if(error.response.status === 500)
            //      {
            //         message.error('Server Error !')
            //      }
            //  }
         })
}

render(){
    let doctor = this.state
return (
    <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>My Doctor</h1><hr />
                <Row gutter= {16}>
                    <Col span={12}>
                        <span><b>Doctor Name</b>: {doctor.fullname}</span>
                    </Col>
                    <Col span={12}>
                    <span><b>Doctor Phone</b>: {doctor.contact_phone}</span>
                    </Col>
                    {/* <Col span={8}>
                    <a href={doctor.contact_phone}><Tag style = {{color: '#5cb85c'}}>Call</Tag></a>
                    </Col> */}
                    </Row><br /><br />
                     <Form  onFinish = {onFinish}>
                     <Form.Item
                        name = "report_reason"
                        value = {this.report_reason}
                        onChange = {this.handleReportonChange}
                        hasFeedback
                            rules = {[{ required: true, message: 'Please input the reason!' }]}
                        >Report your medical Doctor?
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
            </div>
    </div>
);
}
}
export default ReportDoctor
