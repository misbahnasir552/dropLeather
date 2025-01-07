'use client';

import React, { useState } from 'react';

import H7 from '@/components/UI/Headings/H7';

const TableComponent = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Momin Hyat',
      email: 'momin@gmail.com',
    },
    {
      id: 2,
      name: 'Momin Hyat',
      email: 'momin@gmail.com',
    },
    {
      id: 3,
      name: 'Momin Hyat',
      email: 'momin@gmail.com',
    },
    {
      id: 4,
      name: 'Momin Hyat',
      email: 'momin@gmail.com',
    },
    {
      id: 5,
      name: 'Momin Hyat',
      email: 'momin@gmail.com',
    },
  ]);

  const updateState = () => {
    setData([]);
  };

  return (
    <div className="container mx-auto w-full pb-12">
      <h2 className="mb-4 text-2xl font-bold">Data Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-border-light bg-screen-grey">
          <thead>
            <tr>
              <th className="border-b border-border-light bg-border-light px-6 py-3">
                <H7>ID</H7>
              </th>
              <th className="border-b border-border-light bg-border-light px-6 py-3 text-xs font-bold uppercase text-secondary-600">
                Name
              </th>
              <th className="border-b border-border-light bg-border-light px-6 py-3 text-xs font-bold uppercase text-secondary-600">
                Email
              </th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? 'bg-screen-grey' : 'bg-screen-white'
                }
              >
                <td className="whitespace-nowrap border-b border-border-dark px-6 py-4">
                  {item.id}
                </td>
                <td className="whitespace-nowrap border-b border-border-dark px-6 py-4">
                  {item.name}
                </td>
                <td className="whitespace-nowrap border-b border-border-dark px-6 py-4">
                  {item.email}
                </td>
                {/* Render additional columns based on the data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={updateState}></button>
    </div>
  );
};

export default TableComponent;
