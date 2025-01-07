import React from 'react';

const CustomTick = ({ x, y, payload }: any) => {
  return (
    <text
      x={x}
      y={y + 20} // Adjust this value as needed
      color="21B25F"
      style={{ fill: 'var(--primary-base)' }}
      textAnchor="middle text-primary-base"
      className="fill-primary-base text-sm font-semibold" // Tailwind CSS classes
    >
      {payload.value}
    </text>
  );
};

export default CustomTick;
