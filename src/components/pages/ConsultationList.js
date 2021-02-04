import React, {useState, useEffect} from "react"
// import axios from "axios"
import { Link } from 'react-router-dom'
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import PastHistoryList from "./PastHistoryList"
import { Tabs } from 'antd'


const ConsultationList = () => {

    const [modalEdit, setModalEdit] = useState(false);
    // const [useredit, setConsultationListEdit] = useState({
    //     status: ''
    // })
    const { TabPane } = Tabs;

    const consultationModalEdit = ()=>{
        setModalEdit(!modalEdit);
    }

    const [consultation, setConsultationList] = useState([]);

    const getConsultationList = async () => {
        await axiosWithAuth().get('/consultations/user')
        .then(response=>{
            setConsultationList(response.data);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
        // const result = await axiosWithAuth().get('/consultation');
        // setConsultationList(result.data);
    };


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }


    useEffect(() => {
        getConsultationList();
    }, []);



// Making table
const columns = [
    {
    title: '#',
    dataIndex: 'consultation_id',
    key: 'consultation_id',
    align: 'center',
    width: 50,
    fixed: 'left'
    },
    {
    title: 'Consultation Date',
    dataIndex: 'consultation_date',
    align: 'center',
    key: 'consultation_date',
    },
    {
    title: 'Symptoms',
    dataIndex: 'symptoms',
    align: 'center',
    key: 'symptoms'
    },
    {
    title: 'Result 1',
    dataIndex: 'result1',
    align: 'center',
    key: 'result1'
    },
    {
    title: 'Result 2',
    dataIndex: 'result2',
    align: 'center',
    key: 'result2'
    },
    {
    title: 'Result 3',
    dataIndex: 'result3',
    align: 'center',
    key: 'result3'
    },
    {
    title: 'Other Observation',
    dataIndex: 'other_observation',
    fixed: 'right',
    align: 'center',
    key: 'other_observation'
    },
]

    return (
        <div className = "container">
            <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Past History List" key="1">
            <PastHistoryList />
            </TabPane>
            <TabPane tab="Predictions History" key="2">
            <Table columns = {columns} dataSource = {consultation}
                 scroll={{ x: 1500, y: 300 }}
                 rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} />
            </TabPane>
        </Tabs>
        </div>
    );
};

export default ConsultationList;