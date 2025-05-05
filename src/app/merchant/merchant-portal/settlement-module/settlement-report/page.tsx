'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import FundsTransferTable from '@/components/Table/FundsTranferTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H7 from '@/components/UI/Headings/H7';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import type { ISettlementReport } from '@/validations/merchant/merchant-portal/settlement-module/interfaces';
import {
  settlementReportInitialValues,
  settlementReportSchema,
} from '@/validations/merchant/merchant-portal/settlement-module/settlement-report';

function SettlementReport() {
  const userData = useAppSelector((state) => state.auth);
  const [settlementFilteredData, setSettlementFilteredData] = useState<any[]>(
    [],
  );
  const [filteredData, setFilteredData] = useState();
  const [loading, setLoading] = useState(false);
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);
  const [exportError, setExportError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);

  const settlementTransactionHistoryTableHeadings: string[] = [
    'Financial Transaction ID',
    'Settlement Date/Time',
    'From Account',
    'To Account',
    'To Account Title',
    'To Bank',
    'Amount',
    'Status',
    'Remarks',
  ];

  const onSubmit = async (values: ISettlementReport) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });

    if (Object.keys(filteredValues).length === 0) {
      return;
    }
    setPageNumber(0);
    setApierror('');
    setFilteredData(filteredValues);
  };
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        '/merchant/getSettlementTransferReport',
        {
          params: {
            ...(filteredData && typeof filteredData === 'object'
              ? filteredData
              : {}), // Spread existing filtered data
            page: pageNumber, // Add page parameter
            size: +envPageSize, // Add size parameter
          },
          headers: {
            merchantEmail: userData?.email,
          },
        },
      );
      if (response?.data?.responseCode === '009') {
        setLoading(false);
        setTotalPages(response?.data?.totalPages);
        const filteredValues = response?.data?.settlementReportResponse.map(
          ({ msisdn, accountType, batchId, ...rest }: any) => rest,
        );
        setSettlementFilteredData(filteredValues);
      } else if (response?.data?.responseCode === '000') {
        setLoading(false);
        setApierror(response?.data?.responseDescription);
      } else {
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setLoading(false);
      setApierror(e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [filteredData, pageNumber]);

  const exportToExcel = (data: any) => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (data?.length === 0) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Settlement Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'Settlement Report.xlsx');
  };

  const fetchExportedRecords = async (values: any) => {
    setExportError('');
    if (!values?.transferDateFrom || !values?.transferDateTo) {
      return setExportError('Select From Date and To Date');
    }
    try {
      setExportLoading(true);
      const response = await apiClient.get(
        '/merchant/getExportSettlementTransferReport',
        {
          params: {
            transferDateFrom: values?.transferDateFrom,
            transferDateTo: values?.transferDateTo,
          },
          headers: {
            merchantEmail: userData?.email,
          },
        },
      );

      if (response?.data?.responseCode === '009') {
        if (response?.data?.settlementReportResponse?.length === 0) {
          setExportError('No Data Available for Export');
        }
        exportToExcel(response?.data?.settlementReportResponse);
      } else if (response?.data?.responseCode === '000') {
        setExportError(response?.data?.responseDescription);
      } else {
        setExportError(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setExportError(e?.message);
    } finally {
      setExportLoading(false);
    }
  };
  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
    // fetchRecords()
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };
  const handleReset = (Formik: any) => {
    Formik.resetForm();
    fetchRecords();
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
                  <div className="mb-9 flex flex-col gap-5 bg-screen-grey md:w-[75%] md:flex-row ">
                    <DateInputNew
                      label="From Date"
                      name="transferDateFrom"
                      formik={formik}
                      error={formik.errors.transferDateFrom}
                      touched={formik.touched.transferDateFrom}
                    />
                    <DateInputNew
                      label="To Date"
                      name="transferDateTo"
                      formik={formik}
                      error={formik.errors.transferDateTo}
                      touched={formik.touched.transferDateTo}
                      isDisabled={!formik.values.transferDateFrom}
                      minDate={formik.values.transferDateFrom}
                    />
                  </div>
                  {exportError && (
                    <div className="flex w-full justify-start px-3 pb-[16px] text-xs text-danger-base">
                      {exportError}
                    </div>
                  )}
                  <div className="flex w-full justify-start gap-6">
                    <Button
                      label="Search"
                      type="submit"
                      className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                    />
                    <Button
                      label="Reset"
                      type="button"
                      onClickHandler={() => {
                        if (
                          !Object.values(formik.values)?.some(
                            (value) => value !== '',
                          )
                        ) {
                          return;
                        }
                        handleReset(formik);
                        setFilteredData(undefined);
                      }}
                      // routeName="/login"
                      className="button-secondary h-9 w-[120px] px-2 py-[19px] text-xs leading-tight"
                    />
                    <Button
                      label={exportLoading ? 'Exporting' : 'Export'}
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={() =>
                        fetchExportedRecords(formik?.values)
                      }
                      disable={exportLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </MerchantFormLayout>
        </div>
        {loading ? (
          <BarLoader color="#21B25F" className="mx-auto mt-6 block" />
        ) : (
          <>
            {settlementFilteredData?.length > 0 ? (
              <div className="flex flex-col gap-3 pt-[40px]">
                <FundsTransferTable
                  tableHeadings={settlementTransactionHistoryTableHeadings}
                  tableData={settlementFilteredData}
                />
                <Pagination
                  pageNumber={pageNumber}
                  totalPages={totalPages}
                  onNext={showNextPage}
                  onPrev={showPrevPage}
                />
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
              </div>
            ) : (
              <H7 className="mt-4 text-center">No Records Found</H7>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default SettlementReport;
