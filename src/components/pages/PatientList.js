import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Input, Form, message, Tag } from 'antd'


const {Item} = Form;


const PatientList = () => {

    // const [use, setUse] = useState(
    //     {
    //         user_id: '',
    //         fullname: '',
    //         status: '',
    //         email: '',
    //         role_id: ''
    //     }
    // )

    const [visible, setVisible] = useState(false);

 

    const [users, setUser] = useState([]);

    const [user, setUse] = useState([]);

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


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }


    useEffect(() => {
        getUsers();
    }, []);


    function activateUser(public_id){
        axiosWithAuth().put('/user/status/'+public_id, public_id)
         .then(response => {
            //  console.log(response)
            message.success(response.data.message, 5);

         })
         .catch(error => {
             console.log(error.data.warn_message)
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
    {
    title: 'Public Id',
    dataIndex: 'public_id',
    align: 'center',
    key: 'public_id',
    // fixed: 'left',
    },
    {
    title: 'Name',
    dataIndex: 'fullname',
    align: 'center',
    key: 'fullname'
    },
    {
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    key: 'email'
    },
    {
    title: 'Role',
    dataIndex: 'role_id',
    align: 'center',
    key: 'role_id'
    },
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
    fixed: 'right',
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
                                <li><b>Public_id</b>: {use.public_id}</li>
                                <li><b>Email</b>: {use.email}</li>
                                <li><b>Fullname</b>: {use.fullname}</li>   
                                <li><b>Residence</b>: {use.residence}</li>   <li></li>
                                <li><b>Occupation</b>: {use.occupation}</li>   <li></li>
                                <li><b>Status</b>: {use.satus === true?<Tag style = {{color: '#5cb85c'}}>Active</Tag>:<Tag style = {{color: '#f0ad4e'}}>Inactive</Tag>}</li>
                                <li><b>Birthday</b>: {use.date_birth}</li>
                                <li><b>Phone</b>: {use.contact_phone}</li>
                                <li><b>Gender</b>: {use.sex === 'M'?'Male':'Female'}</li>
                                <li><b>Blood Group</b>: {use.blood_group}</li>
                                <li><b>Marital Status</b>: {use.sex === 'S'?'Single':'Married'}</li>
                                {use.status === true?
                                <Button key="submit" type="link" style = {{background: '#f0ad4e', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Desactivate this user</Button>:
                                    <Button key="submit" type="primary" style = {{background: '#5cb85c', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Activate this user</Button>}
                            </>
                                )
                            }
                                )
                     } 
                </Modal>
            </div>
        </div>
    );
};

export default PatientList;