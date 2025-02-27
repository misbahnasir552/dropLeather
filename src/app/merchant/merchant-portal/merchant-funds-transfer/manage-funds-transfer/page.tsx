'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import FundsTransferTable from '@/components/Table/FundsTranferTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { IManageFundsTransfer } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';
import {
  manageFundsTransferInitialValues,
  manageFundsTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/manage-funds-transfer';

function ManageFundsTransfer() {
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
  console.log('beneficiaryFilteredData', beneficiaryFilteredData);

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
        },
      );
      if (response.data.responseCode === '009') {
        setAllRecords(response?.data?.fundsTransferReportRecords);
        setTotalPages(response?.data?.totalPages);
        const filteredValues = response?.data?.fundsTransferReportRecords.map(
          ({ msisdn, failureReason, accountType, ...rest }: any) => rest,
        );
        setBeneficiaryFilteredData(filteredValues);
      } else {
        setTitle('Error Occured');
        setDescription(response?.data?.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      }
      // setLoading(false);
    } catch (e: any) {
      console.log('Error in fetching dynamic QR list', e);
      setTitle('Network Failed');
      setDescription(e.message);
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
  };
  const tableHeadings: string[] = [
    'Beneficiary Name',
    'Transfer Date',
    'Transaction Id',
    'Transfer Amount',
    'Account Closing Balance',
    // 'Failure Reason',
    'Status',
    // 'OPS ID',
    // 'Merchant Name',
    // 'Order ID',
    // 'Order Date',
    // 'Amount (Rs.)',
    // 'Pyment Mode',
    // 'Transaction ID',
    // 'Channel',
  ];
  // const onSubmit = (values: IManageFundsTransfer) => {
  //   console.log(values);
  //   // Using map to process records
  //   const mappedRecords = allRecords.map(record => {
  //     const matchesAccountType = values.accountType ? record.accountType === values.accountType : true;
  //     const matchesMsisdn = values.msisdn ? record.msisdn.includes(values.msisdn) : true;
  //     const matchesBeneficiaryName = values.beneficiaryName ? record.beneficiaryName.includes(values.beneficiaryName) : true;
  //     const matchesPaymentStatus = values.paymentStatus ? record.paymentStatus === values.paymentStatus : true;
  //     const matchesDate = values.dateBetween ? record.transferDate >= values.dateBetween[0] && record.transferDate <= values.dateBetween[1] : true;

  //     // Only return records that match all conditions
  //     if (matchesAccountType && matchesMsisdn && matchesBeneficiaryName && matchesPaymentStatus && matchesDate) {
  //       // Return the record without msisdn and accountType
  //       const { msisdn, accountType, ...filteredRecord } = record;
  //       return filteredRecord;
  //     }
  //     return null; // Return null for records that don't match
  //   }).filter(record => record !== null); // Remove null entries

  //   // Update filtered data for the table
  //   setBeneficiaryFilteredData(mappedRecords);

  // };
  const onSubmit = (values: IManageFundsTransfer) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    setFilteredData(filteredValues);
    fetchRecords();
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
        // const matchesDate = values.dateBetween ? record.transferDate >= values.dateBetween[0] && record.transferDate <= values.dateBetween[1] : true;
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
          const { msisdn, accountType, failureReason, ...rest } = record; // Exclude msisdn, accountType, and failureReason
          return {
            ...rest, // Return only the necessary fields
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries from the array

    setBeneficiaryFilteredData(filteredData);
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
                  error={'hi'}
                  touched={false}
                />
                {/* <Input
                  label="Available Balance"
                  name={'availableBalance'}
                  type="text"
                  error={'hi'}
                  touched={false}
                /> */}
                <Input
                  label="Current Balance"
                  name={'currentBalance'}
                  type="number"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Transfer Amount"
                  name={'transferAmount'}
                  type="number"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Beneficiary Name"
                  name={'beneficiaryName'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <DateInputNew
                  formik={formik}
                  label="Date"
                  name={'transferDate'}
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
                  // routeName="/login"
                  className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                />
                <Button
                  label="Manage Beneficiary"
                  routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
                  type="submit"
                  className="button-secondary h-9 w-[160px] px-3 py-[19px] text-sm"
                />
                {/* <Button
                  label="View Scheduled Transactions"
                  type="submit"
                  className="button-secondary h-9 w-[250px] px-3 py-[19px] text-sm"
                /> */}
                <Button
                  label="Bulk Transfer"
                  routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/bulk-upload/"
                  type="submit"
                  className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                />
                {/* <Button
                  label="Export"
                  type="submit"
                  className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                /> */}
                <Button
                  label="Reset"
                  type="button"
                  onClickHandler={() => handleReset(formik)}
                  className="button-secondary h-9 w-[120px] px-3 py-[19px] text-sm"
                />
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
          {beneficiaryFilteredData.length > 0 ? (
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
            <H4>No Records Found</H4>
          )}
        </>
      )}
    </div>
  );
}

export default ManageFundsTransfer;
