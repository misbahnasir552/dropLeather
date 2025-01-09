'use client';

import Image from 'next/image';
import React from 'react';

import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

function DynamicRecordsTable({
  response,
  heading,
}: {
  response: any;
  title: string;
  heading: string[];
  onApprove?: (profileName: string) => void;
}) {
  console.log('response hiii is', response);

  return (
    <>
      <table className="flex w-full flex-col">
        <thead>
          <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
            {heading.map((heading: any, i: any) => (
              <th
                key={i}
                className={`${
                  heading === '#' ? 'w-1/8' : 'w-1/2'
                } py-[17px] text-center`}
              >
                <H7>{heading}</H7>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {response?.map((item: any, i: any) => (
            <tr
              key={i}
              className="flex w-full items-center justify-between border-b border-border-light px-6"
            >
              {Object.entries(item).map(([key, value]) => {
                const cellClass = key === 'id' ? 'w-1/8' : 'w-1/2';
                return (
                  <td
                    key={key}
                    className={`${cellClass} flex flex-row justify-center gap-4 py-[18px] text-center`}
                  >
                    {key === 'actions' && Array.isArray(value) ? (
                      value.map((action: any, actionIndex: any) => (
                        <Image
                          alt="xyz"
                          key={actionIndex}
                          onClick={action.onClick}
                          src={action.icon}
                          width={action.width}
                          height={action.height}
                        />
                      ))
                    ) : (
                      <B3
                        textColor={`${
                          (key === 'status' ||
                            key === 'requestStatus' ||
                            key === 'applicationStatus') &&
                          (value === 'Approved' ||
                            value === 'Approved By BET' ||
                            value === 'Approved By RM')
                            ? 'text-primary-base'
                            : (key === 'status' ||
                                key === 'requestStatus' ||
                                key === 'applicationStatus') &&
                              (value === 'Rejected' ||
                                value === 'Rejected By BET' ||
                                value === 'Rejected By RM')
                            ? 'text-danger-base'
                            : (key === 'status' ||
                                key === 'requestStatus' ||
                                key === 'applicationStatus') &&
                              value === 'Pending'
                            ? 'text-warning-base'
                            : 'text-secondary-base'
                        }`}
                      >
                        {/* {value} */}

                        {/* {value === 'Approved By RM'
                          ? 'Approved by Relationship Manager'
                          : value === 'Approved By CPU'
                          ? 'Approved by Telenor Bank'
                          : value === 'Approved By BET'
                          ? 'Approved by EasyPaisa'
                          : value} */}

                        {value === 'Approved By RM'
                          ? 'Approved by Relationship Manager'
                          : value === 'Approved By CPU'
                          ? 'Approved by Telenor Bank'
                          : value === 'Approved By BET'
                          ? 'Approved by EasyPaisa'
                          : value === 'Rejected By RM'
                          ? 'Rejected by Relationship Manager'
                          : value === 'Rejected By CPU'
                          ? 'Rejected by Telenor Bank'
                          : value === 'Rejected By BET'
                          ? 'Rejected by EasyPaisa'
                          : value === 'Requested Revision By RM'
                          ? 'Requested Revision by Relationship Manager'
                          : value === 'Requested Revision By CPU'
                          ? 'Requested Revision by Telenor Bank'
                          : value === 'Requested Revision By BET'
                          ? 'Requested Revision by EasyPaisa'
                          : value}
                      </B3>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DynamicRecordsTable;
