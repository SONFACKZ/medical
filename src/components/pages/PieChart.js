import React, {useState, useEffect} from 'react'
import { Pie} from '@ant-design/charts'
import axiosWithAuth from "../../utils/axiosWithAuth"

function PieChart() {

    const [users, setUser] = useState([]);

    const getUsers = async () => {
        await axiosWithAuth().get('/stat')
        .then(response=>{
            setUser(response.data);
            // console.log(response.data);
        }).catch(error=>{
            // if(!localStorage.getItem('token') || error.response.status === 401)
            // {
            //   message.error('You are not authenticated, authenticate first', 5);
            // }
            // console.log(error);
        })

    };



    useEffect(() => {
        getUsers();
    }, []);

    const dataPie = [
        // {
        //   type: 'Users',
        //   value: users.nbr_user,
        // },
        {
            type: 'Active Users',
            value: users.nbr_active_user,
        },
        {
          type: 'Doctors',
          value: users.nbr_doctor,
        },
        {
          type: 'Patients',
          value: users.nbr_patient,
        },
        {
          type: 'Pending',
          value: users.nbr_pending_user,
        },
      ];
    
      const configPie = {
        appendPadding: 10,
        data: dataPie,
        angleField: 'value',
        colorField: 'type',
        height: 450,
        radius: 0.8,
        label: {
          type: 'inner',
          offset: '-0.5',
          content: '{name} {percentage}',
          style: {
            fill: '#fff',
            fontSize: 14,
            textAlign: 'center',
          },
        },
      };

    return (
        <Pie {...configPie} style={{ backgroundColor: '#1F263C'}} />
    );
}

export default PieChart;