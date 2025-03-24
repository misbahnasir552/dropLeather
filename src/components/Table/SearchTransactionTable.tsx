'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import ReversalIcon from '@/assets/icons/reverseIcon.png';
import B3 from '@/components/UI/Body/B3';
import H7 from '@/components/UI/Headings/H7';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

import CustomModal from '../UI/Modal/CustomModal';
import ErrorModal from '../UI/Modal/ErrorModal';

const SearchTransactionTable = ({ tableHeadings, tableData }: any) => {
  const userData = useAppSelector((state: { auth: any }) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
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
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      if (response.data.responseCode === '009') {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      } else if (response?.data?.responseCode === '000') {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowErrorModal(true);
      } else {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowErrorModal(true);
        // setShowModal(true);
      }
    } catch (e: any) {
      console.log(e, 'Error');
      setDescription(e?.message);
      setShowErrorModal(true);
    }
    // setSubmitting(false);
  };

  return (
    <>
      <div className="scrollbar-thin scrollbar-thumb-primary-400 scrollbar-track-primary-100 hover:scrollbar-thumb-primary-base max-h-[500px] w-full overflow-auto">
        {' '}
        {showModal && (
          <CustomModal
            title={title}
            description={description}
            setShowModal={setShowModal}
            show={showModal}
          />
        )}
        {showErrorModal && (
          <ErrorModal
            title={title}
            description={description}
            show={showErrorModal}
            setShow={setShowErrorModal}
          />
        )}
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
                    <B3>N/A</B3>
                    {/* Empty cell for rows without "Success" */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchTransactionTable;
