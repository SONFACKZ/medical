import React, { Component } from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { UserOutlined, ArrowDownOutlined, HourglassOutlined } from '@ant-design/icons';
import PieChart from './PieChart';
import { Pie} from '@ant-design/charts';




// function UserStatistique(){

    class UserStatistique extends Component {
        state = {
          Stat: [],
        }
      
        componentDidMount(){
          axiosWithAuth().get('/stat')
          .then(response => {
            // console.log(response.data)
            this.setState({
              Stat: response.data
            })
          })
          .catch(error => {
            console.log(error)
          })
        }
      
          render() {
            const { Meta } = Card;
            let stat = this.state.Stat;

    return(
         <div className="site-statistic-demo-card">
                            <Row gutter={16} className="text-center" type = 'flex'>
                        <Col span={8}>
                            <Card className = "border shadow p-5 mx-auto">
                              <Statistic
                                title="Total Users"
                                value={stat.nbr_user}
                                // precision={2}
                                valueStyle={{ color: 'gray' }}
                                prefix={<UserOutlined />}
                                icon = {<UserOutlined />}
                                // suffix="%"
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card className = "border shadow p-5 mx-auto">
                              <Statistic
                                title="Active Users"
                                value={stat.nbr_active_user}
                                // precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<UserOutlined />}
                                icon = {<UserOutlined />}
                                // suffix="%"
                              />
                            </Card><br />
                          </Col>
                          <Col span={8}>
                            <Card className = "border shadow p-5 mx-auto">
                              <Statistic
                                title="Doctors"
                                value={stat.nbr_doctor}
                                // precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<UserOutlined />}
                                icon = {<UserOutlined />}
                                // suffix="%"
                              />
                            </Card>
                          </Col>
                          </Row>
                          <Row gutter={16} className="text-center" type = 'flex'>
                          <Col span={8}>
                            <Card className = "border shadow p-5 mx-auto">
                              <Statistic
                                title="Patients"
                                value={stat.nbr_patient}
                                // precision={2}
                                valueStyle={{ color: 'teal' }}
                                prefix={<UserOutlined />}
                                icon = {<UserOutlined />}
                                // suffix="%"
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card className = "border shadow p-5 mx-auto">
                              <Statistic
                                title="Pending Users"
                                value={stat.nbr_pending_user}
                                // precision={2}
                                valueStyle={{ color: '#f0ad4e' }}
                                prefix={<HourglassOutlined />}
                                // suffix="%"
                                icon = {<HourglassOutlined />}
                              />
                            </Card>
                          </Col>
                          </Row><br />
                          <Row gutter={16}>
                          <Col span={18}>
                          <PieChart />
                          </Col>
                          </Row>
                        
      </div>
    )
        }
    }
export default UserStatistique
