import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Select, Form, message, Input, Row, Col } from 'antd'


const ReportDoctor = () => {


    const [user, setUse] = useState([]);


    function detailsUser(public_id){
        axiosWithAuth().get('/doctor-assigned/'+public_id)
         .then(response => {
            setUse(response.data);
             console.log(response)

         })
         .catch(error => {
            //  console.log(error.data.warn_message)
         })
}

return (
    <Form>
        <Input type = "report_reason"
            name = "report_reason"
            // value = {report_reason}
            // onChange = {this.handleFullnameChange}
            // prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="Type the reason" allowClear /><p></p>
            <Button size = 'large' 
            // onClick = {this.handleSubmit} 
            fluid type="primary" htmlType="submit"
            className="login-form-button"  style = {{width: 235}}> {/*290*/}
            Report
            </Button>
    </Form>
)
}
export default ReportDoctor
