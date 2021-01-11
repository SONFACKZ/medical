import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table } from 'antd'


const PastHistoryList = () => {

    const [modalEdit, setModalEdit] = useState(false);
    // const [useredit, setPastHistoryListEdit] = useState({
    //     status: ''
    // })

    const pasthistoryModalEdit = ()=>{
        setModalEdit(!modalEdit);
    }

    const [pasthistory, setPastHistoryList] = useState([]);

    const getPastHistoryList = async () => {
        await axiosWithAuth().get('/pasthistory/user')
        .then(response=>{
            setPastHistoryList(response.data);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
        // const result = await axiosWithAuth().get('/pasthistory');
        // setPastHistoryList(result.data);
    };


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }


    useEffect(() => {
        getPastHistoryList();
    }, []);



// Making table
const columns = [
    {
    title: '#',
    dataIndex: 'pasthistory_id',
    key: 'pasthistory_id',
    align: 'center',
    width: 50,
    fixed: 'left'
    },
    {
    title: 'Past History Type',
    dataIndex: 'pasthistory_type',
    align: 'center',
    key: 'pasthistory_type',
    },
    {
    title: 'Particular Observation',
    dataIndex: 'pasthistory_observation',
    align: 'center',
    key: 'pasthistory_observation'
    },
    {
    title: 'Date',
    dataIndex: 'pasthistory_date',
    align: 'center',
    key: 'pasthistory_date'
    },
]

    return (
        <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>Past History</h1>

                <Table columns = {columns} dataSource = {pasthistory}
                 scroll={{ x: 1500, y: 300 }}
                 rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} />
            </div>
        </div>
    );
};

export default PastHistoryList;