import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Select, Form, message, Input, Row, Col } from 'antd'

let email = localStorage.getItem('email')
let userId = localStorage.getItem("user_id")

const initialState = {
    report_case: '',
}

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

// const ReportDoctor = () => {
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

    // const [doc, setDoc] = useState([]);

    // const [report, setReport] = useState({})

    

    // let report_reason = '';
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
    // const isValid = this.validate();
    // if(isValid){
    //     console.log(this.state);
    //     this.setState(initialState); //Clearing Form
    // }
    axiosWithAuth().post('/case-reporting/add', this.state)
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
            //  console.log('registration error:',this.state.data.war_message)
            //  alert(error)
            //  console.log(error.data.warn_message)
            // message.warning(error.data.warn_message, 15);
         })
}

render(){
    let report_case = this.state.report_case;
return (
    <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>My Doctor</h1>
                     <Form  onFinish = {onFinish}>
                        <Input type = "report_reason"
                            name = "report_reason"
                            value = {this.report_reason}
                            onChange = {this.handleReportonChange}
                            // prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Type the reason" allowClear /><p></p>
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
