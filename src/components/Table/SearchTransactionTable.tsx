'use client';

// import Image from 'next/image';
import React from 'react';

// import EyeIcon from '@/assets/icons/eye.svg';
// import TickIcon from "@/assets/icons/tick-icon-table-checkbox.svg";
// import TrashIcon from '@/assets/icons/trash-icon.svg';
import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';

const SearchTransactionTable = ({ tableHeadings, tableData }: any) => {
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // const [selectAll, setSelectAll] = useState<boolean>(false);

  // // Function to toggle select/deselect all rows
  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(tableData.map((_, index) => index));
  //   }
  //   setSelectAll(!selectAll);
  // };

  // // Function to toggle select/deselect individual row
  // const handleRowClick = (index: number) => {
  //   const selectedIndex = selectedRows.indexOf(index);
  //   const newSelectedRows = [...selectedRows];
  //   if (selectedIndex === -1) {
  //     newSelectedRows.push(index);
  //   } else {
  //     newSelectedRows.splice(selectedIndex, 1);
  //     setSelectAll(false);
  //   }
  //   setSelectedRows(newSelectedRows);
  //   // setSelectAll(newSelectedRows.length === tableData.length);
  // };
  return (
    // <table className="flex w-full flex-col overflow-auto">
    //   <thead>
    //     <tr className="flex w-full items-center justify-between rounded-lg  bg-screen-grey px-6">
    //       {tableHeadings.map((heading: any, i: number, arr: any) => (
    //         <th
    //           key={i}
    //           className={`py-[17px] ${
    //             i === 0
    //               ? 'w-32 text-left'
    //               : i === arr.length - 1
    //               ? 'w-32 text-center'
    //               : 'w-32 text-center'
    //           }`}
    //         >
    //           <H7>{heading}</H7>
    //         </th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {tableData.map((item: any, i: number) => (
    //       <tr
    //         key={i}
    //         className={`flex w-full items-center justify-between border-b border-border-light px-6`}
    //       >
    //         {Object.values(item).map((value, colIndex, colArr) => (
    //           <td
    //             key={colIndex}
    //             className={`${
    //               colIndex === 0
    //                 ? 'w-32 text-left'
    //                 : colIndex === colArr.length - 1
    //                 ? 'w-32 text-center'
    //                 : 'w-32 text-center'
    //             } py-[18px]`}
    //           >
    //             <B3 textColor="text-secondary-base">{value ? value : 'N/A'}</B3>
    //           </td>
    //         ))}
    //         {/* <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.merchantName}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.webstoreName}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.emailAddress}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.mobileNumber}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.turnaroundTime}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3 textColor="text-secondary-base">{item.registrationDate}</B3>
    //         </td>
    //         <td className="w-1/2 py-[18px] text-center">
    //           <B3
    //             textColor={`${
    //               item.requestStatus === 'Approved'
    //                 ? 'text-primary-base'
    //                 : item.requestStatus === 'Rejected'
    //                 ? 'text-danger-base'
    //                 : 'text-warning-base'
    //             }`}
    //           >
    //             {item.requestStatus}
    //           </B3>
    //         </td>
    //         <td className="flex w-1/4 items-center justify-end gap-4 py-[18px]">
    //           <Image src={EyeIcon} height={20} width={20} alt="eye" />
    //           <Image src={TrashIcon} height={20} width={20} alt="trash" />
    //         </td> */}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <div className="max-h-[500px] w-full overflow-auto">
      {' '}
      {/* Adjust max height as needed */}
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-screen-grey">
          <tr className="flex w-full items-center justify-between rounded-lg px-6">
            {tableHeadings.map((heading: any, i: number, arr: any) => (
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
        <tbody className="block max-h-[450px] overflow-auto">
          {tableData.map((item: any, i: number) => (
            <tr
              key={i}
              className="flex w-full items-center justify-between border-b border-border-light px-6"
            >
              {Object.values(item).map((value, colIndex, colArr) => (
                <td
                  key={colIndex}
                  className={`${
                    colIndex === 0
                      ? 'w-32 text-left'
                      : colIndex === colArr.length - 1
                      ? 'w-32 text-center'
                      : 'w-32 text-center'
                  } py-[18px]`}
                >
                  {value === 'success' ? (
                    <B3 textColor="text-primary-base">{value || 'N/A'}</B3>
                  ) : value === 'failed' ? (
                    <B3 textColor="text-danger-base">{value || 'N/A'}</B3>
                  ) : (
                    <B3 textColor="text-secondary-base">{value || 'N/A'}</B3>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTransactionTable;
