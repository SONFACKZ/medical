import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Select, Form, message, Input, Row, Col } from 'antd'

let email = localStorage.getItem('email')
const initialState = {
  past_history_type: '',
  particular_observation: '',
}

const onFinish = values => {
    console.log('Received values of form:', values);
  };

export class PastHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
}

// Enable fielling form
handleHistoryChange = (event) => {
  this.setState({
    past_history_type: event.target.value
  })
}

handleObservationChange = (event) => {
  this.setState({
    particular_observation: event.target.value
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
  axiosWithAuth().post('/pasthistory/add', this.state)
       .then(response => {
           console.log(response)
          message.success(response.data.message, 5);
          this.setState(initialState)
          window.location.reload();
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
    render() {
        return (
                <div className = "container">
                <div className = "py-4">
                    <h1 style = {{textAlign: 'center'}}>Past History page</h1>
                        <Form  onFinish = {onFinish}>
                          <Form.Item
                            name = "past_history_type"
                            value = {this.past_history_type}
                            onChange = {this.handleHistoryChange}
                            hasFeedback
                            rules = {[{ required: true, message: 'Please input the type of history!' }]}
                            >
                              <Input type = "text"
                                name = "past_history_type"
                                value = {this.past_history_type}
                                onChange = {this.handleHistoryChange}
                                placeholder="Type the past history type" allowClear />
                          </Form.Item>
                                <p></p>

                          <Form.Item
                              name = "particular_observation"
                              value = {this.particular_observation}
                              onChange = {this.handleObservationChange}
                              hasFeedback
                              rules = {[{ required: true, message: 'Please input the observation!' }]}
                          >
                              <Input type = "text"
                              name = "particular_observation"
                              value = {this.particular_observation}
                              onChange = {this.handleObservationChange}
                              placeholder="Type the observations" allowClear />
                          </Form.Item>
                                <p></p>
                                <Button size = 'large' 
                                onClick = {this.handleSubmit} 
                                fluid type="primary" htmlType="submit"
                                className="login-form-button"  style = {{width: 235}}> {/*290*/}
                                Report
                                </Button>
                        </Form>
                </div>
        </div>
        )
    }
}

export default PastHistory
