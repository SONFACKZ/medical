import React, { Component, useState, useEffect } from 'react'
import { Form, Button, Select } from 'antd'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { message, Alert, Row, Col, Typography, Tag } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Title } = Typography;

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};


class ConsultationForm extends Component {
  state = {
    Symptoms: [],
    symptomsform: '',
    Result:'',
  }


  handleChange = (value, event) =>{
    console.log('selected: '+ value);
    this.setState({
      symptomsform: value
    })

}


  // handle submit value
  handleSubmit = event => {
    event.preventDefault() //Avoid to lose data after submited
    axiosWithAuth().post('/create/consultation', this.state.symptomsform)
         .then(response => {
          this.setState({
            Result: response.data.prediction
          })
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
      let result = this.state.Result;
      let symptomsItems = symptoms.map((symptom) =>
      <Option value = {symptom.symptom_name} key = {symptom.symptom_name}>{symptom.symptom_name}</Option>
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
              { result === '' || null?'':
                <div><Title level={4}>Result:</Title>
              <p>According to your symptoms, you have <Tag style = {{color: '#5bc0de'}}>{result}</Tag></p>
              </div>
              }
              </Form.Item>
              </Col>
            </Row>
            <Row gutter= {10} justify = "center">
            <Col span={5}>
                <Form.Item className = "text-center">
                    <Button onClick = {this.handleSubmit} fluid type="primary" htmlType="submit"  
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
