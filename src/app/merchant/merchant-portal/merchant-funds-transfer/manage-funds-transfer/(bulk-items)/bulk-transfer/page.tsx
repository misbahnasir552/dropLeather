'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import {
  manageBulkTransferInitialValues,
  manageBulkTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/bulk-transfer';
import type { IManageBulkTransfer } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';

function Page() {
  const userData = useAppSelector((state: any) => state.auth);

  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>(
    [],
  );
  const fetchBulkFundsTransferRecords = async (userData?: any) => {
    try {
      const res = await apiClient.get(
        '/merchant/getAllBulkFundsTransferRecords',
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
          params: { merchantEmail: userData?.jwt },
        },
      );

      setAllRecords(res?.data?.bulkFundsTransferRecords);
      const filteredValues = res?.data?.bulkFundsTransferRecords.map(
        (item: any) => ({
          accountNumber: item?.accountNumber,
          transferDate: new Date(item?.transferDate)
            .toISOString()
            .split('T')[0],
          transferAmount: item?.transferAmount?.toFixed(2),
          transferPurpose: item?.transferPurpose,
          failureReason: item?.failureReason,
          status: item?.status,
          actions: item?.actions ?? '',
        }),
      );
      setBeneficiaryFilteredData(filteredValues);
    } catch (error) {
      console.error('Error fetching merchant stores:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchBulkFundsTransferRecords(userData);
    }
  }, [userData]);

  const bulkTransferTableHeadings: string[] = [
    'Beneficiary Account Details',
    'Transfer Date',
    'Transfer Amount',
    'Transfer Purpose',
    'Status',
    'Failure Reason',
    'Actions',
  ];

  const onSubmit = (values: IManageBulkTransfer) => {
    const filtered = allRecords.filter((item) => {
      const matchesAccount = values.beneficiaryName
        ? item.accountNumber.includes(values.beneficiaryName)
        : true;

      const matchesDate = values.dateBetween
        ? new Date(item.transferDate).toISOString().split('T')[0] ===
          values.dateBetween
        : true;

      return matchesAccount && matchesDate;
    });

    const filteredSearchData = filtered?.map((item: any) => ({
      accountNumber: item?.accountNumber,
      // transferDate: new Date(item?.transferDate).toLocaleString(),
      // transferDate: new Date(item?.transferDate).toLocaleDateString('en-GB'),
      transferDate: new Date(item?.transferDate).toISOString().split('T')[0],
      transferAmount: item?.transferAmount?.toFixed(2),
      transferPurpose: item?.transferPurpose,
      failureReason: item?.failureReason,
      status: item?.status,
      actions: item?.actions ?? '',
    }));
    setBeneficiaryFilteredData(filteredSearchData);
  };

  const handleReset = (Formik: any) => {
    console.log('RESET');

    Formik.resetForm();
    fetchBulkFundsTransferRecords(userData);
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Bulk Transfer"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <MerchantFormLayout>
        <Formik
          initialValues={manageBulkTransferInitialValues}
          validationSchema={manageBulkTransferSchema}
          // initialValues={manageFundsTransferInitialValues}
          // validationSchema={manageFundsTransferSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className=" bg-screen-grey">
              <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey">
                {/* <Input
                  label="Account Type"
                  name={'accountType'}
                  type="text"
                  error={'hi'}
                  touched={formik.touched.accountType}
                />
                <Input
                  label="MSISDN"
                  name={'msisdn'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Available Balance"
                  name={'availableBalance'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Current Balance"
                  name={'currentBalance'}
                  type="text"
                  error={'hi'}
                  touched={false}
                /> */}
                <Input
                  label="Beneficiary Name"
                  formik={formik}
                  name={'beneficiaryName'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <DateInputNew
                  label="Date Between"
                  formik={formik}
                  name={'dateBetween'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />

                {/* <DropdownInput
                  formik={formik}
                  label="Payment Status"
                  name={'paymentStatus'}
                  options={[{ label: 'hi', value: 'hi' }]}
                /> */}
              </div>
              <div className="flex w-full justify-start gap-6">
                <Button
                  label="Search"
                  // routeName="/login"
                  type="submit"
                  className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
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
      <div>
        {beneficiaryFilteredData.length > 0 ? (
          <div>
            <SearchTransactionTable
              tableHeadings={bulkTransferTableHeadings}
              tableData={beneficiaryFilteredData}
            />
          </div>
        ) : (
          <H4>No Records Found</H4>
        )}
      </div>
    </div>
  );
}

export default Page;
