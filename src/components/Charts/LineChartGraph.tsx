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

  const formatYAxis = (value: number) => {
    if (value >= 1_000_000_000_000) {
      return `${(value / 1_000_000_000_000).toFixed(1)}T`;
    }
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`;
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`;
    }
    return value.toString();
  };

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
          width={50}
          tickFormatter={formatYAxis}
          // label={{
          //   value: 'Total Records',
          //   angle: -90,
          //   position: 'insideLeft',
          // }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatYAxis(value),
            name,
          ]}
        />
        <Legend />

        <Line
          type="monotone"
          dataKey="success"
          stroke="#82ca9d"
          name={`Successful ${nameKey}`}
        />
        <Line
          type="monotone"
          dataKey="failed"
          stroke="#FF0000"
          name={`Failed ${nameKey}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartGraph;
