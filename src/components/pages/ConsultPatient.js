import React, {useState, useEffect} from "react"
import { Link, Redirect, Route } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Drawer, Modal, Form, message, Input, Row, Col, Statistic, Tag } from 'antd'
import Logout from "../Dashboards/logout"

const initialState = {
    Patients: [],
    Patient: [],
    observation: '',
    Consultations: [],
    Consultation: [],
    public_id: '',
    consultation_id: '',
    visible: false,
    loading: false,
    visible1: false,
}

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const { TextArea } = Input;
 
class ConsultPatient extends React.Component {
        constructor(props){
            super(props);
            this.state = initialState;
        }

// Enable fielling form
handleReportonChange = (event) => {
        this.setState({
            observation: event.target.value
        })
        // console.log(event.target.value)
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

    showModal = () => {
        this.setState({
          visible1: true,
        });
      };

      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible1: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible1: false });
      };

    
    componentDidMount() {
            axiosWithAuth().get('/specific-patient-doctor')
            .then(response=>{
                this.setState({
                    Patients: response.data
                  })
                console.log(response.data);
            }).catch(error=>{
                if(error.response)
                {
                    if(error.response.status === 401)
                    {
                    message.warning('Token expired', 5)
                    return(<Route exact path = "/" component = {Logout} />)
                    // return(<Redirect to = '/login' />)
                    }
                // console.log(error);
            }
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

    detailsConsultation = (public_id) => {
        axiosWithAuth().get('/consultations/user/'+public_id)
        .then(response => {
            this.setState({
                Consultations: response.data
              })
            console.log(response)
        })
        .catch(error => {
           //  console.log(error.data.warn_message)
        })
    }


    seeObservation = (consultation_id) => {
        axiosWithAuth().get('/user/consultation/'+consultation_id)
        .then(response => {
            this.setState({
                Consultation: response.data
              })
            console.log(response)
        })
        .catch(error => {
           //  console.log(error.data.warn_message)
        })
    }

// handle submit value
handleSubmit = (consultation_id) => {
    axiosWithAuth().put('/user/consultation/'+consultation_id,
    {
        observation: this.state.observation
    })
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
            // // this.setState(initialState)
            // window.location.reload();
            //  warn_message
         })
         .catch(error => {
            message.error('Server error', 5)
            //  if(error.response)
            //  {
            //      if(error.response.status === 201){
            //         message.warning(error.response.war_message, 5)
            //      }
            //      else if(error.response.war_message)
            //      {
            //         message.error(error.response.war_message, 5)
            //      }
            //  }
         })
}

render(){
    let patients = this.state.Patients
    let consultation = this.state.Consultation
    let consultations = this.state.Consultations
    let visible1 = this.state.visible1
    let loading = this.state.loading
    // let observation = this.state.Consultation
return (
    <div className="site-statistic-demo-card">
          <h1 style = {{textAlign: 'center'}}>My Patients</h1><hr />
                <Row gutter={16} className="text-center" type = 'flex'>
                            {
                        patients.map(
                        patient =>{
                            return(
                                <Col span={12} 
                                style={{ color: '#0275d8' }} 
                                onClick = {() => {this.showDrawer(true, this.detailsConsultation(patient.public_id))}}
                                >
                                <div className = "border shadow p-5 mx-auto" style={{ background: '#ebe7bf' }} >
                                <b><UserOutlined />{""} {patient.email}</b>
                                </div>
                                    </Col>
                                    
                            )
                        }
                        )
                    }
                </Row>
                <Drawer 
                // Consult this Patient
                title="Prediction Results"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                >
                    {
                        consultations.map(consult => {
                            return(
                                <>
                                <Row gutter= {16}>
                                <Col span={5}>
                                    <span><b>Patient Symptoms</b>: {consult.symptoms}<br /></span>
                                </Col>
                                <Col span={5}>
                                <span><b>Consultation Result</b>: {consult.result1}</span>
                                </Col>
                                <Col span={5}>
                                <span><b>Consultation Date</b>: {consult.consultation_date}</span>
                                </Col>
                                <Col span={8}>
                                <span><b>Recommendation</b>: {consult.other_observation}</span>
                                </Col>
                                {/* { */}
                                    {/* consult.other_observation===null? */}
                                    <Col span={1}>
                                    <Button type = 'link' onClick = {() => {this.showModal(true, this.seeObservation(consult.consultation_id))}}>
                                        <Tag style = {{ color: 'white', background: '#0275d8'}}>Consult</Tag></Button>
                                    </Col>
                                    {/* :'' */}
                                {/* } */}
                                </Row>
                                
                                <hr /><br />
                                </>
                            )
                        }
                        )
                    }
                </Drawer>

                <Modal
                visible={visible1}
                title="Write your Recommendations"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                    Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading}
                    onClick = {() => {this.handleSubmit(consultation.consultation_id)}}
                    >
                    Send
                    </Button>,
                ]}
                >
                    <>
                    {/* {
                            patient.map(pat => {
                                return( */}
                    <Form  onFinish = {onFinish}>
                        {/* <Item
                            // name = "observation"
                            value = {this.state.Consultation.other_observation}
                            onChange = {this.handleReportonChange}
                            hasFeedback
                                rules = {[{ required: true, message: 'Please type your recommendations!' }]}
                            > */}
                            {/* <Input type = "text"
                            name = "observation"
                            value = {this.observation}
                            onChange = {this.handleReportonChange}
                            placeholder="Type the reason" allowClear /> */}
                            {/* {console.log(consultation.other_observation)} */}
                            <TextArea
                            name = "observation"
                            value = {this.observation}
                            onChange = {this.handleReportonChange}
                            placeholder="Observations or Recommendation"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            allowClear
                            />
                        {/* </Form.Item> */}
                        <p></p>
                            {/* <Button size = 'large' loading={loading}
                            onClick = {() => {this.handleSubmit(consultation.consultation_id)}}
                            // {this.handleSubmit} 
                            fluid type="primary" htmlType="submit"
                            className="login-form-button"  style = {{width: 235}}>
                            Save
                            </Button> */}
                    </Form>
                                {/* )
                            }
                            )
                        } */}
                        </>
                </Modal>
    </div>
);
}
}
export default ConsultPatient



//  {/* </div> */}
//     {/* <div className = "container">
//            <div className = "py-4">
//              <h1 style = {{textAlign: 'center'}}>My Patients</h1><hr /> */}
//              {
//                 //             patients.map(
//                 //               patient =>{
//                 //                 return(
//                 //             <Row gutter= {16}>
//                 //                 <Col span={10}>
//                 //                     <span><b>Patient Name</b>: {patient.fullname}</span>
//                 //                 </Col>
//                 //                 <Col span={10}>
//                 //                 <span><b>Patient Phone</b>: {patient.contact_phone}</span>
//                 //                 </Col>
//                 //                 <Col span={4}>
//                 //                 <Button type = 'link' onClick = {() => {this.showDrawer(true, this.detailsPatient(patient.public_id))}}>
//                 //                     <Tag style = {{ color: 'white', background: '#0275d8'}}>Report</Tag></Button>
//                 //                 </Col>{" "}
//                 //                 </Row>
//                 //                 )
//                 //             }
//                 //             )