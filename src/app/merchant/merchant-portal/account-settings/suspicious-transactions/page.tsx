'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import H6 from "@/components/UI/Headings/H6";
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { ISuspiciousTransactionForm } from '@/validations/merchant/merchant-portal/account-settings/interfaces';
import {
  suspiciousTransactionsInitialValues,
  suspiciousTransactionsSchema,
} from '@/validations/merchant/merchant-portal/account-settings/SuspiciousTransactions';

function page() {
  const suspiciousReportTableHeadings: string[] = [
    'OPS ID',
    'Order ID',
    'Store Name',
    'Amount',
    'Order Date',
    'Customer Mobile',
    'Customer Email',
    'Card #',
  ];
  const suspiciousReportTableData: any =
    // : TableData[]
    [
      {
        opsId: '123098',
        orderId: '001123',
        storeName: 'momin',
        amount: 'momin@gmail.com',
        orderDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        cardNo: '3740667589058',
      },
      {
        opsId: '123098',
        orderId: '001123',
        storeName: 'momin',
        amount: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        cardNo: '3740667589058',
      },
      {
        opsId: '123098',
        orderId: '001123',
        storeName: 'momin',
        amount: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        cardNo: '3740667589058',
      },
      {
        opsId: '123098',
        orderId: '001123',
        storeName: 'momin',
        amount: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        cardNo: '3740667589058',
      },
    ];
  const onSubmit = (values: ISuspiciousTransactionForm) => {
    console.log('i am outlet page', values);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Suspicious Transaction Report"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />

        <MerchantFormLayout>
          <Formik
            initialValues={suspiciousTransactionsInitialValues}
            validationSchema={suspiciousTransactionsSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}

                  <Input
                    label="Store Name"
                    name="storeName"
                    type="text"
                    // error={"hi"}
                    // formik={formik}
                    // touched={formik.touched.CardNumber}
                  />
                  <DateInputNew
                    formik={formik}
                    label="Order Date Between"
                    name="orderDateBetween"
                    error={formik.errors.orderDateBetween}
                    touched={formik.touched.orderDateBetween}
                  />
                  {/* <Input
                    label="Merchant Name"
                    name="MerchantName"
                    type="text"
                    error={formik.errors.CardNumber}
                    touched={false}
                  /> */}

                  <Input
                    label="OPS ID"
                    name="opsId"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="Order ID"
                    name="orderID"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="Customer MSISDN"
                    name="customerMSISDN"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="Card # (First 6 Digits)"
                    name="cardNo"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                </div>
                <div className="flex w-full justify-start gap-6">
                  <Button
                    label="Search"
                    type="submit"
                    className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                  />
                  {/* <Button
                    label="Export"
                    routeName="/login"
                    className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                  /> */}

                  <Button
                    label="Reset"
                    routeName="/login"
                    className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </MerchantFormLayout>
        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>

      <div className="flex pt-[40px]">
        <SearchTransactionTable
          tableHeadings={suspiciousReportTableHeadings}
          tableData={suspiciousReportTableData}
        />
      </div>
    </>
  );
}

export default page;
