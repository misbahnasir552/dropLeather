'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { ISettlementTransactionHistory } from '@/validations/merchant/merchant-portal/settlement-module/interfaces';
import {
  settlementTransactionHistoryInitialValues,
  settlementTransactionHistorySchema,
} from '@/validations/merchant/merchant-portal/settlement-module/settlement-transation-history';

function page() {
  const settlementTransactionHistoryTableHeadings: string[] = [
    'Order Date',
    'Settlement Date',
    'OPS ID',
    'Order ID',
    'Payment Mode',
    'Amount',
    'Disbursed Amount',
    'EP Tax',
    'EP Fee',
    'Settlement Status',
    'Reversal Status',
    'Requested Action',
    'Actions',
  ];
  const settlementTransactionHistoryTableData: any =
    // : TableData[]
    [
      {
        orderDate: '001123',
        settlementDate: '03345674415',
        opsId: 'momin',
        orderId: '02/05/2024',
        paymentMode: 'CC',
        amount: '10000',
        disbursedAmount: '999',
        epTax: 'none',
        epfee: '1.25',
        settlementStatus: 'approved',
        reversalStatus: 'denied',
        requestedAction: 'none',
        actions: 'Images',
      },
      {
        orderDate: '001123',
        settlementDate: '03345674415',
        opsId: 'momin',
        orderId: '02/05/2024',
        paymentMode: 'CC',
        amount: '10000',
        disbursedAmount: '999',
        epTax: 'none',
        epfee: '1.25',
        settlementStatus: 'approved',
        reversalStatus: 'denied',
        requestedAction: 'none',
        actions: 'Images',
      },
      {
        orderDate: '001123',
        settlementDate: '03345674415',
        opsId: 'momin',
        orderId: '02/05/2024',
        paymentMode: 'CC',
        amount: '10000',
        disbursedAmount: '999',
        epTax: 'none',
        epfee: '1.25',
        settlementStatus: 'approved',
        reversalStatus: 'denied',
        requestedAction: 'none',
        actions: 'Images',
      },
      {
        orderDate: '001123',
        settlementDate: '03345674415',
        opsId: 'momin',
        orderId: '02/05/2024',
        paymentMode: 'CC',
        amount: '10000',
        disbursedAmount: '999',
        epTax: 'none',
        epfee: '1.25',
        settlementStatus: 'approved',
        reversalStatus: 'denied',
        requestedAction: 'none',
        actions: 'Images',
      },
      {
        orderDate: '001123',
        settlementDate: '03345674415',
        opsId: 'momin',
        orderId: '02/05/2024',
        paymentMode: 'CC',
        amount: '10000',
        disbursedAmount: '999',
        epTax: 'none',
        epfee: '1.25',
        settlementStatus: 'approved',
        reversalStatus: 'denied',
        requestedAction: 'none',
        actions: 'Images',
      },
    ];
  const onSubmit = (values: ISettlementTransactionHistory) => {
    console.log('i am outlet page', values);
  };
  return (
    <div>
      <>
        <div className="flex flex-col gap-6">
          <HeaderWrapper
            heading="Settlement Transaction History"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
          />
          <MerchantFormLayout>
            <Formik
              initialValues={settlementTransactionHistoryInitialValues}
              validationSchema={settlementTransactionHistorySchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className=" bg-screen-grey">
                  <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                    <Input
                      label="Order ID"
                      name="orderId"
                      type="text"
                      // error={"hi"}
                      // formik={formik}
                      // touched={formik.touched.CardNumber}
                    />
                    <Input
                      label="OPS ID"
                      name="opsId"
                      type="text"
                      error={'hi'}
                      touched={false}
                    />
                    <DateInputNew
                      formik={formik}
                      label="Date Between"
                      name="settlementDateBetween"
                      error={formik.errors.settlementDateBetween}
                      touched={formik.touched.settlementDateBetween}
                    />
                    <DropdownInput
                      label="Status"
                      options={[
                        { label: 'hi', value: 'hi' },
                        { label: 'bye', value: 'bye' },
                      ]}
                      name="status"
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
          <IconTable
            tableHeadings={settlementTransactionHistoryTableHeadings}
            tableData={settlementTransactionHistoryTableData}
            hasEdit
            hasShare
          />
        </div>
      </>
    </div>
  );
}

export default page;
