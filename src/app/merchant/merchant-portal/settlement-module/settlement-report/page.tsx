'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import Pagination from '@/components/Pagination/Pagination';
import FundsTransferTable from '@/components/Table/FundsTranferTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { ISettlementReport } from '@/validations/merchant/merchant-portal/settlement-module/interfaces';
import {
  settlementReportInitialValues,
  settlementReportSchema,
} from '@/validations/merchant/merchant-portal/settlement-module/settlement-report';

function SettlementReport() {
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);

  const settlementTransactionHistoryTableHeadings: string[] = [
    'Financial Transaction ID',
    'Settlement Date/Time',
    'From Account',
    'To Account',
    'To Account Title',
    'To Bank',
    'Status',
    'Remarks',
  ];
  console.log(setTotalPages);
  const settlementTransactionHistoryTableData: any = [
    {
      financialTransactionId: '001123',
      settlementDate: '24/04/2025',
      fromAccount: 'momin',
      toAccount: 'Jawad',
      toAccountTitle: 'Jawad',
      toBank: 'HBL',
      status: 'success',
      remarks: 'none',
    },
  ];
  const onSubmit = (values: ISettlementReport) => {
    console.log('i am outlet page', values);
  };
  const exportToExcel = () => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (!settlementTransactionHistoryTableData) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(
      settlementTransactionHistoryTableData,
    );

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Settlement Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'Settlement-Report.xlsx');
  };
  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
    // fetchRecords()
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };
  return (
    <div>
      <>
        <div className="flex flex-col gap-6">
          <HeaderWrapper heading="Settlement Report" />
          <MerchantFormLayout>
            <Formik
              initialValues={settlementReportInitialValues}
              validationSchema={settlementReportSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className=" bg-screen-grey">
                  <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                    <DateInputNew
                      label="From Date"
                      name="settlementDateFrom"
                      formik={formik}
                      error={formik.errors.settlementDateFrom}
                      touched={formik.touched.settlementDateFrom}
                    />
                    <DateInputNew
                      label="To Date"
                      name="settlementDateTo"
                      formik={formik}
                      error={formik.errors.settlementDateTo}
                      touched={formik.touched.settlementDateTo}
                      isDisabled={!formik.values.settlementDateFrom}
                      minDate={formik.values.settlementDateFrom}
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
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={exportToExcel} // Export button click handler
                    />
                    <Button
                      label="Reset"
                      type="button"
                      // routeName="/login"
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </MerchantFormLayout>
        </div>
        <div className="flex flex-col gap-3 pt-[40px]">
          <FundsTransferTable
            tableHeadings={settlementTransactionHistoryTableHeadings}
            tableData={settlementTransactionHistoryTableData}
          />
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            onNext={showNextPage}
            onPrev={showPrevPage}
          />
        </div>
      </>
    </div>
  );
}

export default SettlementReport;
