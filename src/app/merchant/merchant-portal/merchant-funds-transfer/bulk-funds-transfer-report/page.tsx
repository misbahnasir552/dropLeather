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
import { useAppSelector } from '@/hooks/redux';
import { formatDateTime } from '@/utils/helper';
import {
  searchBulkInitialValues,
  searchBulkSchema,
} from '@/validations/merchant/merchant-portal/reversal-module/reversal-bulk-batch';

function BulkFundsTransferReport() {
  const userData = useAppSelector((state: any) => state.auth);
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [fileNames, setFileNames] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState(+envPageSize);
  const [exportError, setExportError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);

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
          headers: {
            merchantEmail: userData?.email,
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
        setResponse(
          response?.data?.fundsTransferRecords?.map((item: any) => ({
            ...item,
            createdAt: formatDateTime(item?.createdAt),
          })),
        );
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
  const exportToExcel = (data: any) => {
    if (!data) {
      return;
    }

    // Create a worksheet from the data data
    const ws = XLSX?.utils?.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Funds Transfer Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'Bulk Funds Transfer Report.xlsx');
  };

  const fetchExportedRecords = async (values: any) => {
    setExportError('');
    if (!values?.fromDate || !values?.toDate) {
      return setExportError('Select From Date and To Date');
    }
    try {
      setExportLoading(true);
      const response = await apiClient.get(
        '/merchant/getExportBulkFundsTransferRecords',
        {
          params: {
            fromDate: values?.fromDate, // Add page parameter
            toDate: values?.toDate, // Add size parameter
          },
          headers: {
            merchantEmail: userData?.email,
          },
        },
      );
      if (response?.data?.responseCode === '009') {
        if (response?.data?.fundsTransferRecords?.length === 0) {
          setExportError('No Data Available for Export');
        }
        exportToExcel(response?.data?.fundsTransferRecords);
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
    setPageNumber(0);
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
                  <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey px-4 md:grid-cols-3 md:px-6">
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
                      minDate={formik.values.fromDate}
                      isDisabled={!formik.values.fromDate}
                    />
                  </div>
                  {exportError && (
                    <div className="flex w-full justify-start px-3 pb-[16px] text-xs text-danger-base">
                      {exportError}
                    </div>
                  )}
                  <div className="flex w-full items-end gap-5 px-6">
                    <Button
                      label="Search"
                      // onClickHandler={() => onSubmit(formik.values)}
                      type="submit"
                      className="button-primary w-[120px] px-2 py-[13px] text-xs leading-tight transition duration-300"
                    />
                    <Button
                      label="Reset"
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
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
                    />
                    <Button
                      label={exportLoading ? 'Exporting' : 'Export'}
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={() =>
                        fetchExportedRecords(formik?.values)
                      }
                      disable={exportLoading}
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
