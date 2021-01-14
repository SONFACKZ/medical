import React from 'react';
import { Pie} from '@ant-design/charts';

function PieChart() {

    const dataPie = [
        {
          type: 'Users',
          value: 130737,
        },
        {
          type: 'Doctors',
          value: 21468,
        },
        {
          type: 'Patients',
          value: 18098,
        },
        {
          type: 'Pending',
          value: 17912,
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