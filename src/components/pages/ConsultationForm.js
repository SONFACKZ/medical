import React, { Component, useState, useEffect } from 'react'
import { Form, Button, Select } from 'antd'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { message, Alert, Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'


function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class ConsultationForm extends Component {
  state = {
    Symptoms: [],
    name: this.props.name,
    buttonLoading: false,
  }


  // state = {
  //   name: this.props.name,
  //   buttonLoading: false,
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    this.setState({buttonLoading: true});
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

    axiosWithAuth().post('/symptoms')
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
              <Form onSubmit={(event) => this.handleFormSubmit(event)}>
              <Row gutter= {16} justify = "center">
              <Col span={16}>
              <Form.Item>
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
              </Form.Item>
              </Col>
            </Row>
            <Row gutter= {10} justify = "center">
            <Col span={5}>
                <Form.Item className = "text-center">
                    <Button fluid type="primary" htmlType="submit" loading={this.state.buttonLoading}
                     className="login-form-button"  style = {{width: '100%'}}>
                    {/* <LoginOutlined className="site-form-item-icon" /> */}
                    {/* <LoadingOutlined /> */}
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
