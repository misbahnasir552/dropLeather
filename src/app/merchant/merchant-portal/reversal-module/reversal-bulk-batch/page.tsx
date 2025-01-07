'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
// import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { IReversalBulkBatch } from '@/validations/merchant/merchant-portal/reversal-module/interfaces';
import {
  reversalBulkBatchInitialValues,
  reversalBulkBatchSchema,
} from '@/validations/merchant/merchant-portal/reversal-module/reversal-bulk-batch';

function page() {
  const reversalBulkBatchTableHeadings: string[] = [
    'Batch ID',
    'Batch Upload Date',
    'Batch status',
    'Actions',
  ];
  const reversalBulkBatchTableData: any =
    // : TableData[]
    [
      {
        batchId: '1254132B',
        batchUploadDate: '02/05/2024',
        batchStatus: 'momin',
        actions: 'Images',
      },
      {
        batchId: '1254132B',
        batchUploadDate: '02/05/2024',
        batchStatus: 'momin',
        actions: 'Images',
      },
      {
        batchId: '1254132B',
        batchUploadDate: '02/05/2024',
        batchStatus: 'momin',
        actions: 'Images',
      },
      {
        batchId: '1254132B',
        batchUploadDate: '02/05/2024',
        batchStatus: 'momin',
        actions: 'Images',
      },
    ];
  const onSubmit = (values: IReversalBulkBatch) => {
    console.log('i am outlet page', values);
  };
  return (
    <div>
      <>
        <div className="flex flex-col gap-6">
          <HeaderWrapper
            heading="Reversal Bulk Batch"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
          />
          <MerchantFormLayout>
            <Formik
              initialValues={reversalBulkBatchInitialValues}
              validationSchema={reversalBulkBatchSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="bg-screen-grey">
                  <div className="mb-9 grid gap-5 bg-screen-grey sm:grid-cols-1 md:grid-cols-3 ">
                    {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
                    <Input
                      label="Batch ID"
                      name="batchId"
                      type="text"
                      // error={"hi"}
                      // formik={formik}
                      // touched={formik.touched.CardNumber}
                    />
                    <DateInputNew
                      label="QR Generation Date Between"
                      name="reversalDateBetween"
                      formik={formik}
                      error={formik.errors.reversalDateBetween}
                      touched={formik.touched.reversalDateBetween}
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
            tableHeadings={reversalBulkBatchTableHeadings}
            tableData={reversalBulkBatchTableData}
            hasEdit
            hasShare
          />
        </div>
      </>
    </div>
  );
}

export default page;
