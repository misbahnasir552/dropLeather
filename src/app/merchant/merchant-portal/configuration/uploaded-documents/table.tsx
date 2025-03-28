'use client';

import Image from 'next/image';
import React from 'react';

import eyeIcon from '@/assets/icons/eye.svg';
import H7 from '@/components/UI/Headings/H7';

const DocumentTable = ({ documents }: any) => {
  const handleDownload = (filename: any, email: any, type: any) => {
    const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${filename}&email=${email}&type=${type}`;

    window.open(downloadUrl, '_blank');
  };

  return (
    <>
      <div className="scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-primary-100 hover:scrollbar-thumb-primary-base bg-white max-h-[500px] w-full overflow-auto">
        <table className="w-full border-collapse">
          {' '}
          {/* Ensure table background is white */}
          <thead className="sticky top-0 z-10 bg-screen-grey">
            <tr className="flex w-full items-center justify-between rounded-lg px-6">
              <th className="w-1/2 py-[17px] text-left">
                <H7>Document</H7>
              </th>
              <th className="w-1/2 py-[17px] text-center">
                <H7>Preview</H7>
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-[450px]">
            {documents.map((item: any, i: number) => (
              <tr
                key={i}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                <td className="w-1/2 py-[18px] text-left">
                  <span className="text-secondary-base">{item?.filename}</span>
                </td>
                <td className="w-1/2 p-[18px] text-center">
                  <div className="flex w-full items-center justify-center">
                    <div
                      className="col-span-3 flex items-center justify-end"
                      onClick={() =>
                        handleDownload(
                          item?.filename,
                          item?.merchantEmail,
                          'merchant',
                        )
                      }
                    >
                      <Image
                        className="cursor-pointer"
                        src={eyeIcon}
                        height={39}
                        width={24}
                        alt="preview-icon"
                        // onClick={() => window.open(item.link, '_blank')}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentTable;
