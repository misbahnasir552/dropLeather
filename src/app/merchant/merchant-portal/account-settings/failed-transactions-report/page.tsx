'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import H6 from "@/components/UI/Headings/H6";
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import {
  failedTransactionsReportInitialValues,
  failedTransactionsReportSchema,
} from '@/validations/merchant/merchant-portal/account-settings/FailedTransactionsReport';
import type { IFailedTransactionsReport } from '@/validations/merchant/merchant-portal/account-settings/interfaces';

function page() {
  const failureReportTableHeadings: string[] = [
    'Order ID',
    'Payment Method',
    'Transaction Date',
    'Amount',
    'Store ID',
    'Store Name',
    'MSISDN',
    'Channel',
    'Failure Reason',
  ];
  const failureReportTableData: any =
    // : TableData[]
    [
      {
        orderId: '001123',
        paymentMethod: 'CC',
        transactionDate: 'easypaisa',
        amount: 'momin@gmail.com',
        storeId: '03345674415',
        storeName: 'momin',
        MSISDN: '2020-06-13',
        channel: 'Approved',
        failureReason: 'apasdasd',
      },
      {
        orderId: '001123',
        paymentMethod: 'CC',
        transactionDate: 'easypaisa',
        amount: 'momin@gmail.com',
        storeId: '03345674415',
        storeName: 'momin',
        MSISDN: '2020-06-13',
        channel: 'Approved',
        failureReason: 'apasdasd',
      },
      {
        orderId: '001123',
        paymentMethod: 'CC',
        transactionDate: 'easypaisa',
        amount: 'momin@gmail.com',
        storeId: '03345674415',
        storeName: 'momin',
        MSISDN: '2020-06-13',
        channel: 'Approved',
        failureReason: 'no reason',
      },
      {
        orderId: '001123',
        paymentMethod: 'CC',
        transactionDate: 'easypaisa',
        amount: 'momin@gmail.com',
        storeId: '03345674415',
        storeName: 'momin',
        MSISDN: '2020-06-13',
        channel: 'Approved',
        failureReason: 'apasdasd',
      },
      {
        orderId: '00112555',
        paymentMethod: 'CC',
        transactionDate: 'easypaisa',
        amount: 'momin@gmail.com',
        storeId: '03345674415',
        storeName: 'momin',
        MSISDN: '2020-06-13',
        channel: 'Approved',
        failureReason: 'apasdasd',
      },
    ];
  const onSubmit = (values: IFailedTransactionsReport) => {
    console.log('i am outlet page', values);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Failed Transaction Report"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <MerchantFormLayout>
          <Formik
            initialValues={failedTransactionsReportInitialValues}
            validationSchema={failedTransactionsReportSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
                  <Input
                    label="Store ID"
                    name="storeId"
                    type="text"
                    // error={"hi"}
                    // formik={formik}
                    // touched={formik.touched.CardNumber}
                  />
                  <Input
                    label="Customer MSISDN"
                    name="customerMSISDN"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="Store Name"
                    name="storeName"
                    type="text"
                    // error={"hi"}
                    // formik={formik}
                    // touched={formik.touched.CardNumber}
                  />
                  <Input
                    label="Order ID"
                    name="orderID"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <DateInputNew
                    formik={formik}
                    label="Order Date Between"
                    name="orderDateBetween"
                    error={formik.errors.orderDateBetween}
                    touched={formik.touched.orderDateBetween}
                  />
                  <DropdownInput
                    label="Failure Reason"
                    options={[
                      { label: 'hi', value: 'hi' },
                      { label: 'bye', value: 'bye' },
                    ]}
                    name="failureReason"
                  />
                  <DropdownInput
                    label="Channel"
                    options={[
                      { label: 'hi', value: 'hi' },
                      { label: 'bye', value: 'bye' },
                    ]}
                    name="channel"
                  />
                </div>
                <div className="flex w-full justify-start gap-6">
                  <Button
                    label="Search"
                    type="submit"
                    className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                  />
                  <Button
                    label="Export"
                    routeName="/login"
                    className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                  />
                  <Button
                    label="Reset"
                    routeName="/login"
                    className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                  />
                </div>
              </Form>
            )}
          </Formik>
          {/* <Input name="asd" label="ASD" formik='xyz'/> */}
        </MerchantFormLayout>
        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>
      <div className="flex pt-[40px]">
        <SearchTransactionTable
          tableHeadings={failureReportTableHeadings}
          tableData={failureReportTableData}
        />
      </div>
    </>
  );
}

export default page;
