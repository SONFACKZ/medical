import React, {useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Select, Form, message, Tag, Row, Col } from 'antd'

const { Option } = Select;

const PatientList = () => {

    const state = {
        doc_id: ''
    }

    const [visible, setVisible] = useState(false);

    const [doctors, setDoctors] = useState([]);

    const [users, setUser] = useState([]);

    const [user, setUse] = useState([]);

    let doc_id = '';

    const getUsers = async () => {
        await axiosWithAuth().get('/users/patients')
        .then(response=>{
            setUser(response.data);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
        // const result = await axiosWithAuth().get('/users');
        // setUser(result.data);
    };

    function onChange(value) {
        console.log(`selected ${value}`);
        {doc_id = value}
      }

      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }


    useEffect(() => {
        getUsers();
    }, []);


    function activateUser(public_id){
        axiosWithAuth().put('/user/status/'+public_id)
         .then(response => {
            //  console.log(response)
            message.success(response.data.message, 5);
            window.location.reload();

         })
         .catch(error => {
             console.log(error.data.warn_message)
         })
}

function assignDoctor(public_id)
{
    axiosWithAuth().put('/patient/assign-doctor/'+public_id, 
    {
        doc_id: doc_id
    })
    .then(response => {
        console.log(response.data)
        // console.log("================> "+doc_id)
        message.success(response.data.message, 5);
        window.location.reload();
    })
    .catch(error => {
        console.log(error)
    })
}


    function detailsUser(public_id){
        axiosWithAuth().get('/users/'+public_id)
         .then(response => {
            setUse(response.data);
             console.log(response)
         })
         .catch(error => {
            //  console.log(error.data.warn_message)
         })
}



const getDoctors = async () => {
    await axiosWithAuth().get('/users/doctors')
    .then(response=>{
        setDoctors(response.data);
        // console.log(response.data);
    }).catch(error=>{
        console.log(error);
    })
};

useEffect(() => {
    getDoctors();
}, []);


// Making table
const columns = [
    {
    title: '#',
    dataIndex: 'user_id',
    key: 'user_id',
    align: 'center',
    width: 50,
    fixed: 'left'
    },
    // {
    // title: 'Public Id',
    // dataIndex: 'public_id',
    // align: 'center',
    // key: 'public_id',
    // // fixed: 'left',
    // },
    // {
    // title: 'Name',
    // dataIndex: 'fullname',
    // align: 'center',
    // key: 'fullname'
    // },
    {
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    key: 'email'
    },
    // {
    // title: 'Role',
    // dataIndex: 'role_id',
    // align: 'center',
    // key: 'role_id'
    // },
    {
    title: 'Status',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: (dataIndex) =>(
            <>{dataIndex === true?<Tag style = {{color: '#5cb85c'}}>Active</Tag>:
                <Tag style = {{color: '#f0ad4e'}}>Inactive</Tag>}
            </>)
    },
    {
    title: 'Details',
    key: 'actions',
    align: 'center',
    // fixed: 'right',
    render: (action) =>(
        <>
        <Button type = 'primary' onClick = {() => {setVisible(true, detailsUser(action.public_id))}}>
            <EyeOutlined /></Button>{"  "}
            {/* <Button type = 'link' style = {{background: '#f0ad4e', color: 'white'}}><EditOutlined /></Button> */}
        {/* <Button type = 'warning'>Detail</Button>{"  "} */}
        </>
    )
    }

]

    return (
        <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>List of Patients</h1>

                <Table columns = {columns} dataSource = {users} 
                scroll={{ x: 1500, y: 300 }} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>

                <Modal
                    title="User Details"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        <Button key="back" onClick={() => setVisible(false)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => setVisible(false)}>
                          Ok
                        </Button>,
                      ]}
                >
                     {
                            user.map(use => {
                                return(
                            <>
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Public_id</b>: {use.public_id}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Email</b>: {use.email}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Fullname</b>: {use.fullname}</li>
                            </Col>  
                            <Col span={12}> 
                                <li><b>Residence</b>: {use.residence}</li> 
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}> 
                                <li><b>Occupation</b>: {use.occupation}</li>
                            </Col>
                            <Col span={12}>   
                                <li><b>Status</b>: {use.status === true?<Tag style = {{color: '#5cb85c'}}>Active</Tag>:<Tag style = {{color: '#f0ad4e'}}>Inactive</Tag>}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Birthday</b>: {use.date_birth}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Phone</b>: {use.contact_phone}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Gender</b>: {use.sex === 'M'?'Male':'Female'}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Blood Group</b>: {use.blood_group}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Marital Status</b>: {use.sex === 'S'?'Single':'Married'}</li>
                            </Col>
                            <Col span={12}>
                                {use.status === true?
                                <Button key="submit" type="link" style = {{background: '#f0ad4e', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Desactivate this Patient</Button>:
                                    <Button key="submit" type="primary" style = {{background: '#5cb85c', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Activate this user</Button>}
                                </Col>
                                </Row>
                                    
                            </>
                                )
                            }
                                )
                     } 
                                <p></p>
                                    <Form> Assign a Doctor:{" "}
                                        <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Please select a Doctor to assign!"
                                        optionFilterProp="children"
                                        onChange={onChange} 
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        >
                                {
                                    doctors.map(doctor => {
                                        return(
                                        <Option value={doctor.user_id}>{doctor.email}</Option>
                                        )
                                    }
                                        )
                                }
                                        </Select>{" "}
                                        {
                                            doctors.map(doc =>{
                                                const doc_id = doc.user_id
                                                return(
                                                    <input type = 'hidden'
                                                    onChange={onChange} name = "doc_id" value = {doc_id} />
                                                    // onChange ={{onChange}} name = "id" value = {doc_id} />
                                                )
                                                
                                            })
                                        }
                                        {
                                            user.map(p_user =>{
                                                // const public_id = p_user.public_id
                                                // console.log(p_user.public_id)
                                                return(
                                        <Button style = {{background: '#5cb85c', color: 'white'}}
                                        onClick = {() =>{assignDoctor(p_user.public_id)}}>
                                        <EditOutlined />Assign
                                        </Button>
                                                )
                                            }
                                            )
                                        }
                                    </Form>
                                     
                </Modal>
            </div>
        </div>
    );
};

export default PatientList;