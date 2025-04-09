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

const LineChartGraph = ({
  filteredGraphData,
}: {
  filteredGraphData: any[];
}) => {
  if (!filteredGraphData || filteredGraphData?.length === 0) {
    return <div className="text-gray-500 text-center">No data found</div>;
  }

  const nameKey =
    filteredGraphData?.length > 0 && filteredGraphData[0]?.type === 'revenue'
      ? 'Revenue'
      : 'Transactions';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={1400}
        height={500}
        data={filteredGraphData}
        margin={{
          top: 5,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} />
        <YAxis
          dataKey="total"
          // label={{
          //   value: 'Total Records',
          //   angle: -90,
          //   position: 'insideLeft',
          // }}
        />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="failed"
          stroke="#FF0000"
          name={`Failed ${nameKey}`}
        />
        <Line
          type="monotone"
          dataKey="success"
          stroke="#82ca9d"
          name={`Successful ${nameKey}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
