'use client';

// import Image from 'next/image';
import Image from 'next/image';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import ReversalIcon from '@/assets/icons/reverseIcon.png';
// import EyeIcon from '@/assets/icons/eye.svg';
// import TickIcon from "@/assets/icons/tick-icon-table-checkbox.svg";
// import TrashIcon from '@/assets/icons/trash-icon.svg';
import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

import CustomModal from '../UI/Modal/CustomModal';

const SearchTransactionTable = ({ tableHeadings, tableData }: any) => {
  const userData = useAppSelector((state: { auth: any }) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  const onSubmit = async (transactionID: any) => {
    const req = {
      managerMobile: userData.managerMobile,
      transactionID,
    };

    const mdRequest = {
      ...req,
      apisecret: userData.apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response: any = await apiClient.post(
        `merchant/reverseTransaction`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          // params: {
          //   username: userData?.email,
          // },
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      if (response.data.responseCode === '009') {
        console.log('success response', response?.data);
      } else if (response?.data?.responseCode === '000') {
        setTitle('Error Occured');
        setDescription(response?.data?.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      } else {
        setTitle('Error Occured');
        setDescription(response?.data?.errorDescription);
        setApierror(response?.data?.errorCategory);
        // setShowModal(true);
      }
    } catch (e) {
      console.log(e, 'Error');
    }
    // setSubmitting(false);
  };
  console.log('apierror', apierror);

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
    <>
      <div className="scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-primary-100 hover:scrollbar-thumb-primary-base max-h-[500px] w-full overflow-auto">
        {' '}
        <CustomModal
          title={title}
          description={description}
          setShowModal={setShowModal}
          show={showModal}
        />
        {/* Adjust max height as needed */}
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-screen-grey">
            <tr className="flex w-full items-center justify-between rounded-lg px-6">
              {tableHeadings.map((heading: any, i: number, arr: any) => (
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
              {/* Add an extra header for the action button if needed */}
              <th className="w-32 py-[17px] text-center">
                <H7>Action</H7>
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-[450px]">
            {tableData.map((item: any, i: number) => (
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
                      {value === 'Success' ? (
                        <B3 textColor="text-primary-base">{'Approved'}</B3>
                      ) : value === 'Failed' ? (
                        <B3 textColor="text-danger-base">{value || 'N/A'}</B3>
                      ) : (
                        <B3 textColor="text-secondary-base">
                          {value || 'N/A'}
                        </B3>
                      )}
                    </td>
                  </React.Fragment>
                ))}
                {/* Add action button for rows with "Success" */}
                {Object.values(item)?.includes('Success') ? (
                  <td className="w-32 p-[18px] text-center">
                    <Image
                      src={ReversalIcon}
                      alt=""
                      onClick={() => onSubmit(item?.opsId)}
                      className="m-auto flex cursor-pointer"
                      width={15}
                      height={15}
                    />
                  </td>
                ) : (
                  <td className="w-32 p-[18px] text-center">
                    N/A
                    {/* Empty cell for rows without "Success" */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
        {apierror}
      </div>
    </>
  );
};

export default SearchTransactionTable;
