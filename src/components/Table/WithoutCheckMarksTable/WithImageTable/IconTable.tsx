'use client';

import Image from 'next/image';
import React from 'react';

import DownloadIcon from '@/assets/icons/Download-Table-Icon.svg';
import EditIcon from '@/assets/icons/Edit-Table-Icon.svg';
import ShareIcon from '@/assets/icons/Share-Table-Icon.svg';
import DeleteIcon from '@/assets/icons/table-delete-icon.svg';
import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

interface IconTableProps {
  tableHeadings: string[];
  tableData: any[];
  hasShare?: boolean;
  hasDelete?: boolean;
  hasDownload?: boolean;
  hasEdit?: boolean;
  hasIcons?: boolean;
  handleDelete?: (id: any) => void;
  handleView?: (staticQRCode: string, name: string, tillNum?: string) => void;
  isDynamicQr?: boolean;
}

const IconTable: React.FC<IconTableProps> = ({
  tableHeadings,
  tableData,
  hasShare = false,
  hasDelete = false,
  hasDownload = false,
  hasEdit = false,
  hasIcons = true,
  isDynamicQr = false,
  handleDelete,
  handleView,
}) => {
  const handleEdit = (id: any) => {
    console.log('Edit row with id:', id);
  };

  const handleDownload = (id: any) => {
    console.log('Download row with id:', id);
    // Add your download functionality here
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="flex w-full items-center justify-between rounded-lg bg-screen-grey px-6">
            {tableHeadings?.map((heading, i, arr) => (
              <th
                key={i}
                className={`py-[17px] ${
                  i === 0
                    ? 'w-32 text-left'
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
        <tbody>
          {tableData?.map(
            (
              {
                id,
                staticQRCode,
                qrCode,
                webSiteUrl,
                tillNumber,
                ...tableItem
              },
              rowIndex,
            ) => (
              <tr
                key={rowIndex}
                className="flex w-full items-center justify-between border-b border-border-light px-6"
              >
                {Object.values(tableItem).map((value, colIndex, colArr) => (
                  <td
                    key={colIndex}
                    className={`${
                      colIndex === 0
                        ? 'w-32 text-left'
                        : colIndex === colArr.length - 1 && hasIcons
                        ? 'w-32 text-center'
                        : 'w-32 text-center'
                    } py-[18px]`}
                  >
                    <B3 textColor="text-secondary-base">{value || 'N/A'}</B3>
                  </td>
                ))}
                {hasIcons && (
                  <td className="w-32 py-[18px] text-right">
                    <div className="flex w-full items-center justify-center gap-4">
                      {hasShare && (
                        <div
                          onClick={() =>
                            handleView &&
                            handleView(
                              isDynamicQr ? qrCode : staticQRCode,
                              isDynamicQr
                                ? tableItem?.productName
                                : tableItem?.storeName,
                              tillNumber,
                            )
                          }
                        >
                          <Image
                            className="cursor-pointer"
                            src={ShareIcon}
                            height={20}
                            width={20}
                            alt="share-icon"
                          />
                        </div>
                      )}
                      {hasEdit && (
                        <div onClick={() => handleEdit(id)}>
                          <Image
                            className="cursor-pointer"
                            src={EditIcon}
                            height={20}
                            width={20}
                            alt="edit-icon"
                          />
                        </div>
                      )}
                      {hasDownload && (
                        <div onClick={() => handleDownload(id)}>
                          <Image
                            className="cursor-pointer"
                            src={DownloadIcon}
                            height={20}
                            width={20}
                            alt="download-icon"
                          />
                        </div>
                      )}
                      {hasDelete && (
                        <div onClick={() => handleDelete && handleDelete(id)}>
                          <Image
                            className="cursor-pointer"
                            src={DeleteIcon}
                            height={20}
                            width={20}
                            alt="delete-icon"
                          />
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IconTable;
