// import { renderCustomAxisTick } from '@/utils/graph/helper';
import React, { useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import CustomTick from './custom/CustomTick';

// const data = [
//   { name: '1', uv: 1500, },
//   { name: '2', uv: 3000,  },
//   { name: '3', uv: 1000,  },
//   { name: '4', uv: 2000,  },
//   { name: '5', uv: 8200,  },
//   { name: '6', uv: 8200,  },
//   { name: '7', uv: 8200,  },

//   // More data points...
// ];

const LineChartGraph = (filteredGraphData: any) => {
  console.log(filteredGraphData, 'LINECHART');
  useEffect(() => {}, [filteredGraphData]);
  return (
    <ResponsiveContainer width={1200} height={500}>
      <LineChart data={filteredGraphData}>
        <XAxis dataKey="name" tick={<CustomTick />} />
        <YAxis />
        <CartesianGrid strokeDasharray="7 3" />
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        {/* <Line type="monotone" dataKey="pv" stroke="#82ca0p" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
