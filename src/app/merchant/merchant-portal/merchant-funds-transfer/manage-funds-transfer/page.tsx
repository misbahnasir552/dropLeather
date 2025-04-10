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
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
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
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
        const filteredValues = response?.data?.fundsTransferReportRecords.map(
          ({ msisdn, accountType, batchId, ...rest }: any) => rest,
        );
        setBeneficiaryFilteredData(filteredValues);
      } else if (response?.data?.responseCode === '000') {
        setTitle(response?.data?.responseMessage || '');
        setDescription(response?.data?.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      } else {
        setTitle(response?.data?.responseMessage || '');
        setDescription(response?.data?.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      }
      // setLoading(false);
    } catch (e: any) {
      // setTitle('Network Failed');
      setDescription(e?.message);
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
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    setFilteredData(filteredValues);
    const filteredData = allRecords
      .map((record: any) => {
        const matchesAccountType = values.accountType
          ? record.accountType === values.accountType
          : true;
        const matchesMsisdn = values.msisdn
          ? record.msisdn === values.msisdn
          : true;
        const matchesBeneficiaryName = values.beneficiaryName
          ? record.beneficiaryName
              .toLowerCase()
              .includes(values.beneficiaryName.toLowerCase())
          : true;
        const matchesPaymentStatus = values.status
          ? record.paymentStatus === values.status
          : true;
        const matchesTransferAmount = values.transferAmount
          ? record.transferAmount === values.transferAmount
          : true; // Filter for transferAmount

        // Only keep records that match all filters
        if (
          matchesAccountType &&
          matchesMsisdn &&
          matchesBeneficiaryName &&
          matchesPaymentStatus &&
          matchesTransferAmount
        ) {
          const { msisdn, accountType, ...rest } = record; // Exclude msisdn, accountType, and failureReason
          return {
            ...rest, // Return only the necessary fields
          };
        }

        return null;
      })
      ?.filter(Boolean); // Remove null entries from the array

    setBeneficiaryFilteredData(filteredData);
  };
  const exportToExcel = () => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (!beneficiaryFilteredData) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(beneficiaryFilteredData);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Funds Transfer Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'funds_transfer_report.xlsx');
  };
  return (
    <div className="flex flex-col gap-6 pb-[120px] pt-9">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/login"
      />
      <HeaderWrapper
        heading="Manage Funds Transfer"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
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
                <Input
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
                />
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
                  minDate={formik.values.transferDateTo}
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
                    handleReset(formik);
                    setFilteredData(undefined);
                  }}
                  className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                />
                <Button
                  label="Export"
                  className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                  onClickHandler={exportToExcel} // Export button click handler
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
          {beneficiaryFilteredData?.length > 0 ? (
            <div className="flex flex-col gap-3">
              <FundsTransferTable
                tableHeadings={tableHeadings}
                tableData={beneficiaryFilteredData}
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
            <H7 className="text-center">No Records Found</H7>
          )}
        </>
      )}
    </div>
  );
}

export default ManageFundsTransfer;
