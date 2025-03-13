'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H7 from '@/components/UI/Headings/H7';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import type { SearchTransactionsForm } from '@/interfaces/interface';
import {
  searchTransactionsInitialValues,
  searchTransactionsSchema,
} from '@/validations/merchant/transactions/searchTransactionsSchema';

const SearchTransaction = () => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [apierror, setApierror] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);

  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
    // fetchRecords()
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
    // fetchRecords()
  };

  // console.log(userData, "userData");
  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/qrcode/searchTransactions', {
        params: {
          ...(filteredData && typeof filteredData === 'object'
            ? filteredData
            : {}), // Spread existing filtered data
          page: pageNumber, // Add page parameter
          size: +envPageSize, // Add size parameter
        },
      });
      console.log(
        response.data.transactionResponse,
        'RESPONSE',
        'PAGE NUMBER',
        pageNumber,
      );
      if (response?.data) {
        setData(response?.data?.transactionResponse);
        setTotalPages(response.data.totalPages);
      } else {
        setTitle('Failed');
        setDescription(response?.data?.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      }
    } catch (e: any) {
      setTitle('Network Error');
      setDescription(e.message);
      setApierror(e?.message);
      // setShowModal(true);
      console.log('Error in fetching transactions', e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log('FILTERED DATA:', filteredData);

    // if (filteredData) {
    fetchRecords();
    // }
  }, [pageNumber, filteredData]);

  const options = [
    { value: 'Missing Document', label: 'Missing Document' },
    { value: 'Missing Field', label: 'Missing Field' },
    { value: 'CNIC Mismatched', label: 'CNIC Mismatched' },
  ];

  const statusOptions = [
    { value: 'Success', label: 'Success' },
    { value: 'Failed', label: 'Failed' },
  ];

  const tableHeadings: string[] = [
    'OPS ID',
    'Merchant Name',
    'Order ID',
    'Order Date',
    'Amount (Rs.)',
    'Store Name',
    'Store Type',
    'Pyment Mode',
    // 'Transaction ID',
    'Channel',
    'TP Number',
    'Status',
    'Reason',
    // 'Action'
  ];

  console.log('Filtered data', filteredData);

  const onSubmit = async (values: SearchTransactionsForm) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    setFilteredData(filteredValues);
    fetchRecords();
  };

  const handleReset = (formik: any) => {
    formik.resetForm();
    fetchRecords();
  };

  return (
    <div className="flex flex-col gap-6">
      <CustomModal
        title={title}
        description={description}
        setShowModal={setShowModal}
        show={showModal}
      />
      <HeaderWrapper heading="Search Transactions" />
      <Formik
        initialValues={searchTransactionsInitialValues}
        validationSchema={searchTransactionsSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className=" bg-screen-grey px-6 pb-6 pt-[60px]">
            <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3">
              <DropdownInput
                label="Payment Method"
                name="paymentMethod"
                formik={formik}
                error={formik.errors.paymentMethod}
                touched={formik.touched.paymentMethod}
                options={options}
              />
              <Input
                label="Merchant Name"
                name="merchantName"
                formik={formik}
                type="text"
                error={formik.errors.merchantName}
                touched={formik.touched.merchantName}
              />
              <DateInputNew
                label="Order Date Between"
                name="orderDate"
                formik={formik}
                error={formik.errors.orderDate}
                touched={formik.touched.orderDate}
                // error={formik.errors.incorporationDate}
                // touched={formik.touched.incorporationDate}
              />
              <DateInputNew
                label="Payment Date Between"
                name="paymentDate"
                formik={formik}
                error={formik.errors.paymentDate}
                touched={formik.touched.paymentDate}
              />
              <Input
                label="Transaction Point"
                name="transactionPoint"
                formik={formik}
                type="text"
                error={formik.errors.transactionPoint}
                touched={formik.touched.transactionPoint}
              />
              <Input
                label="Order ID"
                name="orderId"
                formik={formik}
                type="text"
                error={formik.errors.orderID}
                touched={formik.touched.orderID}
              />
              <Input
                label="Store ID"
                name="storeId"
                formik={formik}
                type="text"
                error={formik.errors.storeID}
                touched={formik.touched.storeID}
              />
              <DropdownInput
                label="Channel"
                name="channel"
                formik={formik}
                // formik={{hello}}
                error={formik.errors.channel}
                touched={formik.touched.channel}
                options={options}
              />
              <DropdownInput
                label="Transaction Status"
                name="transactionStatus"
                formik={formik}
                // formik={{hello}}
                error={formik.errors.transactionStatus}
                touched={formik.touched.transactionStatus}
                options={statusOptions}
              />
            </div>
            <div className="flex w-full items-center justify-start gap-6">
              <Button
                label="Search"
                type="submit"
                className="button-primary h-9 w-[120px] px-3 py-[19px] text-xs"
              />
              <Button
                label="Send IPN"
                routeName="/merchant/merchant-portal/account-settings/ipn-configuration"
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Reset"
                // routeName="/sign-up"
                onClickHandler={() => handleReset(formik)}
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Bulk Reversal"
                routeName="/merchant/merchant-portal/configuration/transactions-history/bulk-reversal"
                type="submit"
                className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>

      {isLoading ? (
        <BarLoader color="#21B25F" />
      ) : (
        <>
          {data ? (
            <>
              <SearchTransactionTable
                tableHeadings={tableHeadings}
                tableData={data}
              />
              <Pagination
                pageNumber={pageNumber}
                totalPages={totalPages}
                onNext={showNextPage}
                onPrev={showPrevPage}
              />
            </>
          ) : (
            <H7>No Records found.</H7>
          )}
          <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
            {apierror}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchTransaction;
