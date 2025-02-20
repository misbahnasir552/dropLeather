'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
// import MerchantRecordTable from "@/components/Table/MerchantRecordTable";
// import TableComponent from '@/components/Table/TableComponent';
import Button from '@/components/UI/Button/PrimaryButton';
import H7 from '@/components/UI/Headings/H7';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import type { SearchTransactionsForm } from '@/interfaces/interface';
import {
  searchTransactionsInitialValues,
  searchTransactionsSchema,
} from '@/validations/merchant/transactions/searchTransactionsSchema';
// import { useAppSelector } from "@/hooks/redux";

const ReversalModule = () => {
  // const userData = useAppSelector((state) => state.auth);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();

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

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      // const response = await apiClient.get('/qrcode/searchTransactions', {
      //   params: filteredData,page: pageNumber, size: totalPages ,
      // });
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
      if (response?.data?.responseCode === '009') {
        setData(response?.data?.transactionResponse);
        setTotalPages(response.data.totalPages);
      } else {
        setTitle('Failed');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      }
    } catch (e: any) {
      setTitle('Network Error');
      setDescription(e.message);
      setShowModal(true);
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

  const tableHeadings: string[] = [
    'Batch ID',
    'Order Date',
    'Reversal Date',
    'Order ID',
    'OPS ID',
    'Reversal ID',
    'Transaction Count',
    'Total Reversal Amount',
    'Total Reversal Fee',
    'Total Reversal Text',
    'Total Transaction Amount',
  ];

  console.log('Filtered data', filteredData);

  const onSubmit = async (values: SearchTransactionsForm) => {
    console.log('VALUES SEARCH TRANSACTIONS', values);
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
      <HeaderWrapper heading="Reversal Module" />
      <Formik
        initialValues={searchTransactionsInitialValues}
        validationSchema={searchTransactionsSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className=" bg-screen-grey px-6 pb-6 pt-[60px]">
            <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3">
              <Input
                label="Store ID"
                name="merchantName"
                formik={formik}
                type="text"
                error={formik.errors.merchantName}
                touched={formik.touched.merchantName}
              />
              <Input
                label="Till Number"
                name="transactionPoint"
                formik={formik}
                type="text"
                error={formik.errors.transactionPoint}
                touched={formik.touched.transactionPoint}
              />
              <DateInputNew
                label="Date"
                name="orderDate"
                formik={formik}
                error={formik.errors.orderDate}
                touched={formik.touched.orderDate}
                // error={formik.errors.incorporationDate}
                // touched={formik.touched.incorporationDate}
              />
            </div>
            <div className="flex w-full items-center justify-start gap-6">
              <Button
                label="Search"
                type="submit"
                className="button-primary h-9 w-[120px] px-3 py-[19px] text-xs"
              />
              {/* <Button
                label="Export"
                // routeName="/merchant/merchant-portal/account-settings/ipn-configuration"
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              /> */}
              <Button
                label="Reset"
                // routeName="/sign-up"
                onClickHandler={() => handleReset(formik)}
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
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
        </>
      )}
    </div>
  );
};

export default ReversalModule;
