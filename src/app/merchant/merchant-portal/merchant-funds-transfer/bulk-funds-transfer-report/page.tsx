'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import DynamicRecordsTable from '@/components/Table/DynamicRecordsTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import {
  searchBulkInitialValues,
  searchBulkSchema,
} from '@/validations/merchant/merchant-portal/reversal-module/reversal-bulk-batch';

function BulkFundsTransferReport() {
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [fileNames, setFileNames] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState(+envPageSize);

  const [response, setResponse] = useState<Array<any> | null>(null);
  const fetchRecords = async () => {
    try {
      const response = await apiClient.get(
        'merchant/getBulkFundsTransferRecords',
        {
          params: {
            ...(filteredData && typeof filteredData === 'object'
              ? filteredData
              : {}), // Spread existing filtered data
            page: pageNumber, // Add page parameter
            size: +envPageSize, // Add size parameter
          },
        },
      );
      if (response?.data) {
        const formattedRoles = response?.data?.fundsTransferRecords?.map(
          (file: any) => ({
            value: file?.fileName,
            label: file?.fileName,
          }),
        );
        setFileNames(formattedRoles);
        setResponse(response?.data?.fundsTransferRecords);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [filteredData, pageNumber]);
  useEffect(() => {}, [fileNames]);

  const bulkTableHeadings: string[] = [
    '#',
    'Batch ID',
    'Batch File Name',
    'Bulk Upload Date',
    'Detail',
    'Status',
  ];

  const generatebulkTableData = (response: any) => {
    return response?.map((item: any, index: any) => ({
      id: index + 1,
      batchId: item?.batchId,
      fileName: item?.fileName,
      batchUploadDate: item?.createdAt,
      detail: item?.responseDescription || 'N/A',
      status: item.status,
    }));
  };

  const bulktableData = generatebulkTableData(response);
  const handleReset = (formik: any) => {
    formik.resetForm();
    setApierror('');
    fetchRecords();
  };
  const exportToExcel = () => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (!response) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(response);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Funds Transfer Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'funds_transfer_report.xlsx');
  };
  const onSubmit = (values: any) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    setFilteredData(filteredValues);
    const filteredData: any = response
      ?.map((record: any) => {
        const matchesFile = values.file
          ? record.fileName === values.file
          : true;
        const matchesBatchId = values.batchId
          ? record.batchId === values.batchId
          : true;
        const matchesStatus = values.status ? record.status : true;
        const matchesFromDate = values.fromDate
          ? record.createdAt === values.fromDate
          : true;
        // const matchesDate = values.dateBetween ? record.transferDate >= values.dateBetween[0] && record.transferDate <= values.dateBetween[1] : true;
        const matchesToDate = values?.toDate
          ? record?.createdAt === values.toDate
          : true; // Filter for transferAmount

        // Only keep records that match all filters
        if (
          matchesFile &&
          matchesBatchId &&
          matchesStatus &&
          matchesFromDate &&
          matchesToDate
        ) {
          const { msisdn, accountType, ...rest } = record; // Exclude msisdn, accountType, and failureReason
          return {
            ...rest, // Return only the necessary fields
          };
        }

        return null;
      })
      ?.filter(Boolean); // Remove null entries from the array

    setResponse(filteredData);
  };
  const showNextPage = () => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + 1;
      return newPageNumber;
    });
  };

  const showPrevPage = () => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber - 1;
      return newPageNumber;
    });
  };
  return (
    <>
      <div className="flex flex-col gap-10 py-12">
        <HeaderWrapper heading="Bulk Funds Transfer Report" />
        <div className="flex flex-col gap-4">
          <Formik
            initialValues={searchBulkInitialValues}
            validationSchema={searchBulkSchema}
            onSubmit={onSubmit}
          >
            {(formik: any) => (
              <Form>
                <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
                  <div className="grid w-full grid-cols-4 gap-5 p-9 pl-6">
                    <Input
                      label={'Batch Id'}
                      type={'text'}
                      name={'batchId'}
                      formik={formik}
                    />

                    <DropdownInput
                      label="File Name"
                      name="file"
                      options={fileNames}
                      formik={formik}
                      error={formik.errors.file}
                      touched={formik.touched.file}
                    />
                    <DropdownInput
                      label="Status"
                      name="status"
                      options={[
                        { value: 'Failure', label: 'Failure' },
                        { value: 'Success', label: 'Success' },
                      ]}
                      formik={formik}
                      error={formik.errors.status}
                      touched={formik.touched.status}
                    />
                    <DateInputNew
                      label="Date From"
                      name="fromDate"
                      formik={formik}
                      error={formik.errors.fromDate}
                      touched={formik.touched.fromDate}
                    />
                    <DateInputNew
                      label="Date To"
                      name="toDate"
                      formik={formik}
                      error={formik.errors.toDate}
                      touched={formik.touched.toDate}
                    />
                  </div>
                  <div className="flex w-full items-end justify-end gap-5 px-6">
                    <Button
                      label="Reset"
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={() => {
                        handleReset(formik);
                        setFilteredData(undefined);
                      }}
                    />
                    <Button
                      label="Export"
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={exportToExcel} // Export button click handler
                    />
                    <Button
                      label="Search"
                      onClickHandler={() => onSubmit(formik.values)}
                      // type="submit"
                      className="button-primary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    />
                    <Button
                      label="Bulk Transfer"
                      routeName="/merchant/merchant-portal/merchant-funds-transfer/bulk-funds-transfer-report/bulk-upload/"
                      className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {apierror && <div>{apierror}</div>}
        </div>

        <div className="table">
          <div className="flex flex-col gap-4 overflow-x-auto">
            {/* <Table /> */}
            {response && response?.length > 0 ? (
              <>
                <DynamicRecordsTable
                  heading={bulkTableHeadings}
                  response={bulktableData}
                  title={'admin'}
                />
                <Pagination
                  pageNumber={pageNumber}
                  totalPages={totalPages}
                  onNext={showNextPage}
                  onPrev={showPrevPage}
                />
              </>
            ) : (
              <div className="flex justify-center">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BulkFundsTransferReport;
