import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Input, Form, Checkbox, Tag } from 'antd'


const {Item} = Form;


const DoctorList = () => {

    const [modalEdit, setModalEdit] = useState(false);
    // const [useredit, setUserEdit] = useState({
    //     status: ''
    // })

    const usersModalEdit = ()=>{
        setModalEdit(!modalEdit);
    }

    const [users, setUser] = useState([]);

    const getUsers = async () => {
        await axiosWithAuth().get('/users/doctors')
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


    //     axios.get('/users')
    //     .then(res => {
    //         console.log(res)
    //         setUser(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])


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
            <>
            <Checkbox name = '' onChange={onChange} defaultChecked = {dataIndex}	>Status</Checkbox>
            </>)
    },
    {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    render: (action) =>(
        <>
        <Button type = 'primary' danger><EyeOutlined />Details</Button>{"  "}
        <Button type = 'primary'><EditOutlined />Edit</Button>
        {/* <Button type = 'warning'>Detail</Button>{"  "} */}
        </>
    )
    }

]

    return (
        <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>List of Doctors</h1>

                <Table columns = {columns} dataSource = {users}
                scroll={{ x: 1500, y: 300 }} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>

                <Modal visible = {modalEdit}
                title = 'Edit User'
                destroyOnClose = {true}
                onCancel = {usersModalEdit}
                centeredfooter = {[
                    <Button onClick = {usersModalEdit}>Cancel</Button>,
                    <Button type = 'primary'>Update</Button>
                ]}
                >
                    <Form>
                        <Item label = "Fullname">
                            <Input name = 'fullname' />
                        </Item>
                        <Item label = "Email">
                            <Input name = 'email' />
                        </Item>
                    </Form>
                </Modal>






                {/* <div className = "table-responsive-sm">
                <table class="table border shadow table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Public ID</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope = "row">{index +1}</th>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.occupation}</td>
                                    <td>{user.public_id}</td>
                                    <td>
                                        <Link to = ''><EyeOutlined style = {{color: 'primary'}} />Edit</Link>
                                        <Link to = ''><EditOutlined style = {{color: 'gold'}} />View</Link>
                                        <Link to = ''><DeleteOutlined style = {{color: 'red'}} />Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                <Link className = "btn btn-outline-primary" to = "/register"> Add User</Link>
                     */}
            </div>
        </div>
    );
};

export default DoctorList;