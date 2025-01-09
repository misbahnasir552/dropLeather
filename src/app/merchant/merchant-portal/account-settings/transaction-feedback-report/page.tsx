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
import type { ITransactionFeedbackReportForm } from '@/validations/merchant/merchant-portal/account-settings/interfaces';
import {
  transactionsFeedbackReportInitialValues,
  transactionsFeedbackReportSchema,
} from '@/validations/merchant/merchant-portal/account-settings/TransactionFeedbackReport';

function page() {
  const transactionFeedbackReportTableHeadings: string[] = [
    'Transaction ID',
    'Order ID',
    'Store Name',
    'Customer MSISDN',
    'Customer Email',
    'Order Date',
    'Review',
    'Comments',
  ];
  const transactionFeedbackReportTableData: any =
    // : TableData[]
    [
      {
        transactionId: '123098',
        orderId: '001123',
        storeName: 'momin',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        orderDate: '2020-06-13',
        review: 'momin@gmail.com',
        comments: '3740667589058',
      },
      {
        transactionId: '123098',
        orderId: '001123',
        storeName: 'momin',
        review: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        comments: '3740667589058',
      },
      {
        transactionId: '123098',
        orderId: '001123',
        storeName: 'momin',
        review: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        comments: '3740667589058',
      },
      {
        transactionId: '123098',
        orderId: '001123',
        storeName: 'momin',
        review: 'momin@gmail.com',
        transactionDate: '2020-06-13',
        customerMobile: '03345674415',
        customerEmail: 'momin@gmail.com',
        comments: '3740667589058',
      },
    ];
  const onSubmit = (values: ITransactionFeedbackReportForm) => {
    console.log('i am outlet page', values);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Transaction Feedback Report"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />

        <MerchantFormLayout>
          {/* <H6>Transaction Point Details</H6> */}
          {/* <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" /> */}
          <Formik
            initialValues={transactionsFeedbackReportInitialValues}
            validationSchema={transactionsFeedbackReportSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}

                  <DateInputNew
                    formik={formik}
                    label="Order Date Between"
                    name="orderDateBetween"
                    error={formik.errors.orderDateBetween}
                    touched={formik.touched.orderDateBetween}
                  />
                  <Input
                    label="Transaction ID"
                    name="transactionId"
                    type="text"
                    error={formik.errors.transactionId}
                    touched={false}
                  />
                  <Input
                    label="Order ID"
                    name="orderID"
                    type="text"
                    error={formik.errors.orderID}
                    touched={false}
                  />
                  <Input
                    label="Review"
                    name="review"
                    type="text"
                    error={formik.errors.review}
                    touched={false}
                  />
                  <Input
                    label="Customer MSISDN"
                    name="customerMSISDN"
                    type="text"
                    error={formik.errors.customerMSISDN}
                    touched={false}
                  />
                  <Input
                    label="Customer Email"
                    name="customerEmail"
                    type="text"
                    error={formik.errors.customerEmail}
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
          {/* <Input name="asd" label="ASD" formik='xyz'/> */}
        </MerchantFormLayout>
        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>

      <div className="flex pt-[40px]">
        <SearchTransactionTable
          tableHeadings={transactionFeedbackReportTableHeadings}
          tableData={transactionFeedbackReportTableData}
        />
      </div>
    </>
  );
}

export default page;
