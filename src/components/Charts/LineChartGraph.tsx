// import { renderCustomAxisTick } from '@/utils/graph/helper';
import React from 'react';
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

const data = [
  { name: 'Page A', uv: 1500, amt: 2400 },
  { name: 'Page B', uv: 3000, amt: 2210 },
  { name: 'Page C', uv: 1000, amt: 2210 },
  { name: 'Page D', uv: 2000, amt: 2210 },
  { name: 'Page E', uv: 8200, amt: 2210 },

  // More data points...
];

const LineChartGraph = () => (
  <ResponsiveContainer>
    <LineChart data={data}>
      <XAxis dataKey="name" tick={<CustomTick />} />
      <YAxis />
      <CartesianGrid strokeDasharray="2 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      {/* <Line type="monotone" dataKey="pv" stroke="#82ca0p" /> */}
    </LineChart>
  </ResponsiveContainer>
);

export default LineChartGraph;
