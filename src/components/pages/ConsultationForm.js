import React, { Component, useState, useEffect } from 'react'
import { Form, Button, Select } from 'antd'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { message, Alert, Row, Col, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Title } = Typography;

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class ConsultationForm extends Component {
  state = {
    Symptoms: [],
    name: this.props.name,
    buttonLoading: false,
  }

  // handle submit value
  handleSubmit = event => {
    event.preventDefault() //Avoid to lose data after submited
    axiosWithAuth().post('create/consultation', this.state)
         .then(response => {
             console.log(response)
            // message.success(response.data.message, 5);
            //  warn_message
         })
         .catch(error => {
             console.log('registration error:',this.state.data.war_message)
            //  alert(error)
             console.log(error.data.warn_message)
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
              <Form>
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
                name = 'name'
                placeholder="Please search or select your symptoms"
                allowClear
                // defaultValue={['a10', 'c12']}
                onChange={handleChange}
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
                    <Button onClick = {this.handleSubmit}fluid type="primary" htmlType="submit" 
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
