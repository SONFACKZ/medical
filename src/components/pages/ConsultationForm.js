import React, { Component, useState, useEffect } from 'react'
import { Form, Button, Select } from 'antd'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { message, Alert, Row, Col, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Title } = Typography;

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};


class ConsultationForm extends Component {
  state = {
    Symptoms: [],
    symptomsform: '',
    // name: this.props.name,
    buttonLoading: false,
  }

// Enable fielling form
  //  handleChange = (event) => {
  //   // console.log(`Selected: ${value}`);
  //   this.setState({
  //     symptomsform: event.target.value
  // })
  // }

  handleChange = (value, event) =>{
    console.log('selected: '+ value);
    this.setState({
      symptomsform: value
    })

}

// // Enable fielling form
// handleReportonChange = (event) => {
//   this.setState({
//       observation: event.target.value
//   })
//   // console.log(event.target.value)
// }

  // handle submit value
  handleSubmit = event => {
    event.preventDefault() //Avoid to lose data after submited
    axiosWithAuth().post('/create/consultation', this.state.symptomsform)
         .then(response => {
             console.log(response)
             if (response)
             {
                 if(response.status === 200)
                 {
                    message.success(response.data.message, 5);
                 }
                 else if(response.status === 201)
                 {
                    message.warning(response.data.war_message, 5)
                 }
             }
            // message.success(response.data.message, 5);
            //  warn_message
         })
         .catch(error => {
             console.log(error)
            //  alert(error)
            //  console.log(error)
            // message.warning(error.data.warn_message, 15);
         })
}

  // // state = {
  // //   name: this.props.name,
  // //   buttonLoading: false,
  // // }

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   this.setState({buttonLoading: true});
  // }

  componentDidMount(){
    axiosWithAuth().get('/symptoms')
    .then(response => {
      console.log(response.data.symptoms)
      this.setState({
        Symptoms: response.data.symptoms
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

    render() {
      const { Option } = Select;
      let symptoms = this.state.Symptoms;
      let symptomsItems = symptoms.map((symptom) =>
      <Option value = {symptom.symptom_name} key = {symptom.symptom_name}>{symptom.symptom_name}</Option>
          // symptomsItems.push(<Option key = {symptom.symptom_name}>{symptom.symptom_name}</Option>)
            );
        return (
            <div className = "text-center">
              <Form onFinish = {onFinish}>
              <Row gutter= {16} justify = "center">
              <Title level={3}>Fill the form below
                   by selecting or by seraching
                    and selecting your symptoms to predict the
                     disease you may have</Title>
              <Col span={16}>
              <Form.Item>
              <Title level={1}>
              <Select
                mode="multiple"
                size='large'
                onChange={(value, event) => this.handleChange(value, event)}
                name = 'symptomsform'
                value = {this.symptomsform}
                placeholder="Please search or select your symptoms"
                allowClear
                // defaultValue={['headache', 'fever']}
                // onChange={this.handleChange}
                style={{ width: '100%' }}
              >
              {symptomsItems}
              </Select>
              </Title>
              <div><Title level={4}>Result:</Title></div>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter= {10} justify = "center">
            <Col span={5}>
                <Form.Item className = "text-center">
                    <Button onClick = {this.handleSubmit} fluid type="primary" htmlType="submit" 
                    // loading={this.state.buttonLoading}
                     className="login-form-button"  style = {{width: '100%'}}>
                    Predict
                    </Button>
                </Form.Item>
                </Col>
                </Row>
              </Form>
              
            </div>
        )
        }
      }

export default ConsultationForm
