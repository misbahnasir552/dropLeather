'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
// import MerchantRecordTable from "@/components/Table/MerchantRecordTable";
// import TableComponent from '@/components/Table/TableComponent';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import type { SearchTransactionsForm } from '@/interfaces/interface';
import {
  searchTransactionsInitialValues,
  searchTransactionsSchema,
} from '@/validations/merchant/transactions/searchTransactionsSchema';
// import { useAppSelector } from "@/hooks/redux";

const SearchTransaction = () => {
  // const userData = useAppSelector((state) => state.auth);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  // console.log(userData, "userData");
  const fetchRecords = async () => {
    try {
      const response = await apiClient.get('/qrcode/searchTransactions', {
        params: filteredData,
      });
      console.log(response.data.transactionResponse, 'RESPONSE');

      setData(response?.data?.transactionResponse);
    } catch (e) {
      console.log('Error in fetching transactions', e);
    }
  };
  useEffect(() => {
    if (filteredData) {
      fetchRecords();
    }
  }, [filteredData]);

  const options = [
    { value: 'hi', label: 'hi' },
    { value: 'Bye', label: 'Bye' },
  ];

  // interface TableData {
  //   opsId: string;
  //   merchantName: string;
  //   orderId: string;
  //   orderDate: string;
  //   amount: string;
  //   paymentMode: string;
  //   transactionId: string;
  //   status: string;
  //   channel: string;
  // }

  const tableHeadings: string[] = [
    'OPS ID',
    'Merchant Name',
    'Order ID',
    'Order Date',
    'Amount (Rs.)',
    'Pyment Mode',
    'Transaction ID',
    'Channel',
    'Status',
  ];

  // const tableData: TableData[] = [
  //   {
  //     opsId: "5303696",
  //     merchantName: "momin",
  //     orderId: "123",
  //     orderDate: "2024-03-13T11:50:57.689",
  //     amount: "1.00",
  //     paymentMode: "ep emvco qr",
  //     transactionId: "5303696",
  //     status: "success",
  //     channel: "Online Merchant",
  //   },
  // ];
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
  };

  const handleReset = (Formik: any) => {
    console.log('RESET', Formik);

    Formik.resetForm();
    fetchRecords();
  };

  return (
    <div className="flex flex-col gap-6">
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
                error={'payment method is false'}
                touched={false}
                options={options}
              />
              <Input
                label="Customer Email"
                name="customerEmail"
                formik={formik}
                type="text"
                error={'hi'}
                touched={false}
              />
              <Input
                label="Merchant Name"
                name="merchantName"
                formik={formik}
                type="text"
                error={'hi'}
                touched={false}
              />
              {/* <DateInputNew
                label="OTC Expiration Date Between"
                name="otcExpirationDate"
                formik={formik}
                // error={formik.errors.incorporationDate}
                // touched={formik.touched.incorporationDate}
              /> */}
              {/* <Input
                label="Customer Cell Phone"
                name="customerCellPhone"
                type="text"
                error={"hi"}
                touched={false}
              />
              <Input
                label="OTC Token"
                name="otcToken"
                type="text"
                error={"hi"}
                touched={false}
              /> */}
              <DateInputNew
                label="Order Date Between"
                name="orderDate"
                formik={formik}
                // error={formik.errors.incorporationDate}
                // touched={formik.touched.incorporationDate}
              />
              {/* <Input
                label="Auth Id"
                name="authId"
                type="text"
                error={"hi"}
                touched={false}
              />
              <Input
                label="Batch"
                name="batch"
                type="text"
                error={"hi"}
                touched={false}
              /> */}
              <DateInputNew
                label="Payment Date Between"
                name="paymentDate"
                formik={formik}
                // error={formik.errors.incorporationDate}
                // touched={formik.touched.incorporationDate}
              />
              {/* <Input
                label="Credit Card (last 4 digits)"
                name="creditCard"
                type="text"
                error={"hi"}
                touched={false}
              />
              <DropdownInput
                label="Currency"
                name="currency"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <DropdownInput
                label="Integrating Bank Name"
                name="integratingBankName"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              /> */}
              {/* <Input
                label="Amount"
                name="amount"
                type="text"
                error={"hi"}
                touched={false}
              /> */}
              <Input
                label="Transaction Point"
                name="transactionPoint"
                formik={formik}
                type="text"
                error={'hi'}
                touched={false}
              />
              <Input
                label="Order ID"
                name="orderId"
                formik={formik}
                type="text"
                error={'hi'}
                touched={false}
              />
              <Input
                label="Store ID"
                name="storeId"
                formik={formik}
                type="text"
                error={'hi'}
                touched={false}
              />
              {/* <DropdownInput
                label="DD Gateway"
                name="ddGateway"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <Input
                label="CC Order ID"
                name="ccOrderId"
                type="text"
                error={"hi"}
                touched={false}
              />
              <DropdownInput
                label="DD Bank Name"
                name="ddBankName"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <Input
                label="Transaction Reference"
                name="transactionReference"
                type="text"
                error={"hi"}
                touched={false}
              />
              <DropdownInput
                label="Transaction Status"
                name="transactionStatus"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <DropdownInput
                label="Escrow Status"
                name="escrowStatus"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <DropdownInput
                label="Settlement Transaction Status"
                name="settlementtransactionStatus"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <Input
                label="Value 3D"
                name="value3d"
                type="text"
                error={"hi"}
                touched={false}
              />
              <DropdownInput
                label="3D Secure Enabled"
                name="threeDSecureEnabled"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              />
              <DropdownInput
                label="Escrow"
                name="escrow"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              /> */}
              {/* <DropdownInput
                label="Transaction Point"
                name="transactionPointNum"
                // formik={{hello}}
                error={"payment method is false"}
                touched={false}
                options={options}
              /> */}
              <DropdownInput
                label="Channel"
                name="channel"
                formik={formik}
                // formik={{hello}}
                error={'payment method is false'}
                touched={false}
                options={options}
              />
            </div>
            <div className="flex w-full items-center justify-start gap-6">
              <Button
                label="Search"
                type="submit"
                className="button-primary h-9 w-[120px] px-3 py-[19px] text-xs"
              />
              <Button
                label="Export"
                routeName="/login"
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Send IPN"
                routeName="/sign-up"
                className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
              />
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

      <div>
        {data ? (
          <SearchTransactionTable
            tableHeadings={tableHeadings}
            tableData={data}
          />
        ) : (
          <p>No record found</p>
        )}
      </div>
    </div>
  );
};

export default SearchTransaction;
