'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import DynamicRecordsTable from '@/components/Table/DynamicRecordsTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H7 from '@/components/UI/Headings/H7';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import { formatDateTime } from '@/utils/helper';
import type { IManageFundsTransfer } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';
import {
  manageFundsTransferInitialValues,
  manageFundsTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/manage-funds-transfer';

function ManageFundsTransfer() {
  const userData = useAppSelector((state: any) => state.auth);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>(
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

  const fetchRecords = async () => {
    setExportError('');
    try {
      setLoading(true);
      const response = await apiClient.get(
        '/merchant/getAllFundsTransferRecords',
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
        setAllRecords(response?.data?.fundsTransferReportRecords);
        setTotalPages(response?.data?.totalPages);
        const filteredValues = response?.data?.fundsTransferReportRecords?.map(
          ({ msisdn, accountType, batchId, ...rest }: any) => rest,
        );
        setBeneficiaryFilteredData(
          filteredValues?.map((item: any) => ({
            ...item,
            transferDate: formatDateTime(item?.transferDate),
          })),
        );
      } else if (response?.data?.responseCode === '000') {
        setApierror(response?.data?.responseDescription);
      } else {
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setApierror(e?.message);
      // setShowModal(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [filteredData, pageNumber]);
  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
    // fetchRecords()
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
    // fetchRecords()
  };
  const handleReset = (Formik: any) => {
    Formik.resetForm();
    fetchRecords();
  };

  const tableHeadings: string[] = [
    'Beneficiary Name',
    'Transfer Date',
    'Transaction Id',
    'Transfer Amount',
    'Account Closing Balance',
    'Status',
    'Failure Reason',
    // 'OPS ID',
    // 'Merchant Name',
    // 'Order ID',
    // 'Order Date',
    // 'Amount (Rs.)',
    // 'Pyment Mode',
    // 'Transaction ID',
    // 'Channel',
  ];

  const onSubmit = (values: IManageFundsTransfer) => {
    setExportError('');
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    if (Object.keys(filteredValues)?.length === 0) {
      return;
    }
    setFilteredData(filteredValues);
    const filteredData = allRecords
      .map((record: any) => {
        const matchesAccountType = values.accountType
          ? record.accountType === values.accountType
          : true;
        const matchesBeneficiaryName = values.beneficiaryName
          ? record.beneficiaryName
              .toLowerCase()
              .includes(values.beneficiaryName.toLowerCase())
          : true;
        const matchesPaymentStatus = values.status
          ? record.paymentStatus === values.status
          : true;

        // Only keep records that match all filters
        if (
          matchesAccountType &&
          matchesBeneficiaryName &&
          matchesPaymentStatus
        ) {
          const { msisdn, accountType, ...rest } = record; // Exclude msisdn, accountType, and failureReason
          return {
            ...rest, // Return only the necessary fields
          };
        }

        return null;
      })
      ?.filter(Boolean); // Remove null entries from the array
    setPageNumber(0);
    setBeneficiaryFilteredData(filteredData);
  };

  const exportToExcel = (data: any) => {
    // if (!response) return;
    console.log('data', data);

    // if (!response || response.length === 0) {
    if (!data?.length) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Funds Transfer Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'funds_transfer_report.xlsx');
  };

  const fetchExportedRecords = async (values: any) => {
    setExportError('');
    if (!values?.transferDateFrom || !values?.transferDateTo) {
      return setExportError('Select From Date and To Date');
    }
    try {
      setExportLoading(true);
      const response = await apiClient.get(
        '/merchant/getAllExportFundsTransferRecords',
        {
          params: {
            ...(filteredData && typeof filteredData === 'object'
              ? filteredData
              : {}), // Spread existing filtered data
            transferDateFrom: values?.transferDateFrom, // Add page parameter
            transferDateTo: values?.transferDateTo, // Add size parameter
          },
          headers: {
            merchantEmail: userData?.email,
          },
        },
      );
      if (response?.data?.responseCode === '009') {
        if (response?.data?.fundsTransferReportRecords?.length === 0) {
          setExportError('No Data Available for Export');
        }
        exportToExcel(response?.data?.fundsTransferReportRecords);
      } else if (response?.data?.responseCode === '000') {
        setExportError(response?.data?.responseDescription);
      } else {
        setExportError(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setExportError(e?.message);
      // setShowModal(true);
    } finally {
      setExportLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 pb-[120px] pt-9">
      <HeaderWrapper heading="Manage Funds Transfer" />
      <MerchantFormLayout>
        <Formik
          initialValues={manageFundsTransferInitialValues}
          validationSchema={manageFundsTransferSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="">
              <div className="mb-9 grid grid-cols-3 gap-5">
                <DropdownInput
                  formik={formik}
                  label="Account Type"
                  name={'accountType'}
                  options={[
                    { value: 'Savings', label: 'Savings' },
                    { value: 'Current', label: 'Current' },
                  ]}
                  error={formik.errors.accountType}
                  touched={formik.touched.accountType}
                />
                {/* <Input
                  label="MSISDN"
                  name={'msisdn'}
                  type="text"
                  touched={false}
                />
                <Input
                  label="Current Balance"
                  name={'currentBalance'}
                  type="number"
                  touched={false}
                /> */}
                <Input
                  label="Beneficiary Name"
                  name={'beneficiaryName'}
                  type="text"
                  touched={false}
                />
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
                <DropdownInput
                  formik={formik}
                  label="Payment Status"
                  name={'status'}
                  options={[
                    { label: 'Success', value: 'SUCCESS' },
                    { label: 'Failed', value: 'FAILED' },
                  ]}
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
                    setExportError('');
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
                  className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                />
                <Button
                  label={exportLoading ? 'Exporting' : 'Export'}
                  className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                  onClickHandler={() => fetchExportedRecords(formik?.values)} // Export button click handler
                  disable={exportLoading}
                />
                <Button
                  label={`Funds Transfer`}
                  routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/funds-transfer"
                  className="button-secondary h-9 w-[160px] px-3 py-[19px] text-sm"
                />
                <Button
                  label="Manage Beneficiary"
                  routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
                  className="button-secondary h-9 w-[160px] px-3 py-[19px] text-sm"
                />
                {/* <Button
                  label="View Scheduled Transactions"
                  type="submit"
                  className="button-secondary h-9 w-[250px] px-3 py-[19px] text-sm"
                /> */}
              </div>
            </Form>
          )}
        </Formik>
      </MerchantFormLayout>
      {loading ? (
        <>
          <BarLoader color="#21B25F" />
        </>
      ) : (
        <>
          {apierror ? (
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
          ) : beneficiaryFilteredData?.length > 0 ? (
            <div className="flex flex-col gap-3">
              <DynamicRecordsTable
                heading={tableHeadings}
                response={beneficiaryFilteredData}
              />
              <Pagination
                pageNumber={pageNumber}
                totalPages={totalPages}
                onNext={showNextPage}
                onPrev={showPrevPage}
              />
            </div>
          ) : (
            <H7 className="text-center">No Records Found</H7>
          )}
        </>
      )}
    </div>
  );
}

export default ManageFundsTransfer;
