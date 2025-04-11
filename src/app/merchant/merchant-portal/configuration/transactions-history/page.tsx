'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H7 from '@/components/UI/Headings/H7';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import type { SearchTransactionsForm } from '@/interfaces/interface';
import { generateMD5Hash } from '@/utils/helper';
import {
  searchTransactionsInitialValues,
  searchTransactionsSchema,
} from '@/validations/merchant/transactions/searchTransactionsSchema';

const SearchTransaction = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const [data, setData] = useState([]);
  const [exportedData, setExportedData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [apierror, setApierror] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);
  const [tableHeadings, setTableHeadings] = useState<string[]>([]);

  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
    // fetchRecords()
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };

  function convertToLabel(camelCaseString: string): string {
    if (camelCaseString === 'TTC' || camelCaseString === 'CNIC') {
      return camelCaseString;
    }

    return camelCaseString
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
      .replace(/\bId\b/gi, 'ID')
      .replace(/\bPkr\b/gi, 'PKR')
      .replace(/\bMsisdn\b/gi, 'MSISDN');
  }

  const fetchRecords = async () => {
    // const selectedFIleds = selectedItems?.map((item: any) => item?.key);

    const transactionHistoryValues = {
      // merchantEmail: 'misbah55@yopmail.com',
      merchantEmail: userData.email,
      ...(filteredData || {}),
      managerMobile: userData?.managerMobile,
      page: pageNumber,
      size: +envPageSize,
    };
    const mdRequest = {
      ...transactionHistoryValues,
      apisecret: userData?.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const requestBody = {
      request: transactionHistoryValues,
      signature: md5Hash,
    };

    try {
      // merchant transaction post api call due to filters send in body
      setIsLoading(true);
      const response = await apiClient.post(
        'qrcode/getTransactionsHistory',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );
      // api success
      if (response.data.responseCode === '009') {
        if (response?.data?.transactions?.length > 0) {
          const labels = Object.keys(response?.data?.transactions[0]).map(
            convertToLabel,
          );
          setTableHeadings(labels);
        }

        setData(response?.data?.transactions);
        setExportedData(response?.data?.transactions);
        setTotalPages(response?.data?.totalPages);
      } else {
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setApierror(e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchRecords = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await apiClient.get('/qrcode/allRetailQrTransactions', {
  //       params: {
  //         ...(filteredData && typeof filteredData === 'object'
  //           ? filteredData
  //           : {}), // Spread existing filtered data
  //         page: pageNumber, // Add page parameter
  //         size: +envPageSize, // Add size parameter
  //       },
  //       headers: {
  //         merchantEmail: userData?.email, // Pass email in headers
  //       },
  //     });
  //     if (response?.data) {
  //       setData(
  //         response?.data?.retailTransactions?.map((item: any) => {
  //           return {
  //             id: item?.id,
  //             customerName: item?.customerName,
  //             orderId: item?.orderId,
  //             orderDate: item?.orderDate,
  //             amountPkr: item?.amountPkr,
  //             storeName: item?.storeName,
  //             storeType: item?.storeType,
  //             paymentMode: item?.paymentMode,
  //             channel: item?.transactionChannel,
  //             tpNumber: item?.transactionPointNumber,
  //             status: item?.status,
  //             reason: item?.errorCode === '000' ? item?.errorReason : 'N/A',
  //             // action: item?.status
  //           };
  //         }),
  //       );
  //       setExportedData(response?.data?.retailTransactions);
  //       setTotalPages(response?.data?.totalPages);
  //     } else {
  //       setApierror(response?.data?.responseDescription);
  //       // setShowModal(true);
  //     }
  //   } catch (e: any) {
  //     setApierror(e?.message);
  //     // setShowModal(true);
  //     console.log('Error in fetching transactions', e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchRecords();
  }, [pageNumber, filteredData]);

  // const statusOptions = [
  //   { value: 'Success', label: 'Success' },
  //   { value: 'Failed', label: 'Failed' },
  // ];

  // const tableHeadings: string[] = [
  //   'OPS ID',
  //   'Customer Name',
  //   'Order ID',
  //   'Order Date',
  //   'Amount (Rs.)',
  //   'Store Name',
  //   'Store Type',
  //   'Payment Mode',
  //   // 'Transaction ID',
  //   'Channel',
  //   'TP Number',
  //   'Status',
  //   'Reason',
  //   // 'Action'
  // ];

  const onSubmit = async (values: SearchTransactionsForm) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });

    if (Object.keys(filteredValues).length === 0) {
      setApierror('Please enter at least one filter to search.');
      return;
    }

    setApierror('');
    setFilteredData(filteredValues);
    // fetchRecords();
  };

  const handleReset = (formik: any) => {
    formik.resetForm();
    setPageNumber(0);
    // fetchRecords();
  };
  const exportToExcel = () => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (!exportedData) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(exportedData);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'QR Reporting');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'qr_reporting.xlsx');
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper heading="Transactions History" />
      <Formik
        initialValues={searchTransactionsInitialValues}
        validationSchema={searchTransactionsSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className=" bg-screen-grey px-6 pb-6 pt-[30px]">
            <div className="mb-4 text-base font-bold">Search Transactions</div>

            <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3">
              {/* <DropdownInput
                label="Payment Method"
                name="paymentMethod"
                formik={formik}
                error={formik.errors.paymentMethod}
                touched={formik.touched.paymentMethod}
                options={options}
              /> */}
              {/* <Input
                label="Customer Name"
                name="customerName"
                formik={formik}
                type="text"
                error={formik.errors.customerName}
                touched={formik.touched.customerName}
              /> */}
              <Input
                label="Customer Email"
                name="customerEmail"
                formik={formik}
                type="text"
                error={formik.errors.customerEmail}
                touched={formik.touched.customerEmail}
              />
              <DateInputNew
                label="Order From Date"
                name="fromDate"
                formik={formik}
                error={formik.errors.fromDate}
                touched={formik.touched.fromDate}
              />
              <DateInputNew
                label="Order To Date"
                name="toDate"
                formik={formik}
                error={formik.errors.toDate}
                touched={formik.touched.toDate}
                isDisabled={!formik.values.fromDate}
                minDate={formik.values.fromDate}
              />
              {/* <DateInputNew
                label="Payment From Date"
                name="paymentFromDate"
                formik={formik}
                error={formik.errors.paymentFromDate}
                touched={formik.touched.paymentFromDate}
              />
              <DateInputNew
                label="Payment To Date"
                name="paymentToDate"
                formik={formik}
                error={formik.errors.paymentToDate}
                touched={formik.touched.paymentToDate}
                isDisabled={!formik.values.paymentFromDate}
                minDate={formik.values.paymentFromDate}
              /> */}
              {/* <DateInputNew
                label="Payment Date Between"
                name="paymentDate"
                formik={formik}
                error={formik.errors.paymentDate}
                touched={formik.touched.paymentDate}
              /> */}
              {/* <Input
                label="Transaction Point"
                name="transactionPoint"
                formik={formik}
                type="text"
                error={formik.errors.transactionPoint}
                touched={formik.touched.transactionPoint}
              /> */}
              <Input
                label="Order ID"
                name="orderID"
                formik={formik}
                type="text"
                error={formik.errors.orderID}
                touched={formik.touched.orderID}
              />
              <Input
                label="Store ID"
                name="storeID"
                formik={formik}
                type="text"
                error={formik.errors.storeID}
                touched={formik.touched.storeID}
              />
              <Input
                label="Store Name"
                name="storeName"
                formik={formik}
                type="text"
                error={formik.errors.storeName}
                touched={formik.touched.storeName}
              />
              {/* <DropdownInput
                label="Channel"
                name="channel"
                formik={formik}
                // formik={{hello}}
                error={formik.errors.channel}
                touched={formik.touched.channel}
                options={options}
              /> */}
              {/* <DropdownInput
                label="Transaction Status"
                name="status"
                formik={formik}
                // formik={{hello}}
                error={formik.errors.status}
                touched={formik.touched.status}
                options={statusOptions}
              /> */}
            </div>
            <div className="flex w-full items-center justify-start gap-6">
              <Button
                label="Search"
                type="submit"
                className="button-primary h-9 w-[120px] px-3 py-[19px] text-xs"
              />
              {/* <Button
                label="Send IPN"
                routeName="/merchant/merchant-portal/account-settings/ipn-configuration"
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              /> */}
              <Button
                label="Reset"
                // routeName="/sign-up"
                onClickHandler={() => {
                  handleReset(formik);
                  setFilteredData(undefined);
                }}
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Export"
                className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                onClickHandler={exportToExcel} // Export button click handler
              />
              <Button
                label="Bulk Reversal"
                routeName="/merchant/merchant-portal/configuration/transactions-history/bulk-reversal"
                // type="submit"
                className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
              />
            </div>
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
          </Form>
        )}
      </Formik>

      {isLoading ? (
        <BarLoader color="#21B25F" />
      ) : (
        <>
          {data?.length > 0 ? (
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
            <H7 className="text-center">No Records found.</H7>
          )}
        </>
      )}
    </div>
  );
};

export default SearchTransaction;
