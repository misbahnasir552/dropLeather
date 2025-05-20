'use client';

// import Image from 'next/image';
import React from 'react';

import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

const ReversalReportTable = ({ tableHeadings, tableData }: any) => {
  console.log('table Data', tableData);

  return (
    <>
      <div className="scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-primary-100 hover:scrollbar-thumb-primary-base max-h-[500px] w-full overflow-auto">
        {/* Adjust max height as needed */}
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-screen-grey">
            <tr className="flex w-full items-center justify-between rounded-lg px-6">
              {tableHeadings?.map((heading: any, i: number, arr: any) => (
                <th
                  key={i}
                  className={`py-[17px] ${
                    i === 0
                      ? 'w-16 text-left'
                      : i === arr.length - 1
                      ? 'w-32 text-center'
                      : 'w-32 text-center'
                  }`}
                >
                  <H7>{heading}</H7>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block max-h-[450px]">
            {tableData?.map((item: any, i: number) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                {Object?.values(item)?.map((value, colIndex, colArr) => (
                  <React.Fragment key={colIndex}>
                    <td
                      className={`${
                        colIndex === 0
                          ? 'w-16 text-left'
                          : colIndex === colArr.length - 1
                          ? 'w-32 text-center'
                          : 'w-32 text-center'
                      } py-[18px]`}
                    >
                      <B3 textColor="text-secondary-base">{value || 'N/A'}</B3>
                    </td>
                  </React.Fragment>
                ))}
                {/* Add action button for rows with "Success" */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReversalReportTable;
