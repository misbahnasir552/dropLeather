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

// import CustomTick from './custom/CustomTick';

const LineChartGraph = (filteredGraphData: any) => {
  return filteredGraphData ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1200}
        height={500}
        data={filteredGraphData?.filteredGraphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="transactions/revenue" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="rejected" stroke="#8884d8" />
        <Line type="monotone" dataKey="approved" stroke="#82ca9d" />
        <Line type="monotone" dataKey="pending" stroke="#FF0000" />
      </LineChart>
    </ResponsiveContainer>
  ) : null;
};

export default LineChartGraph;
