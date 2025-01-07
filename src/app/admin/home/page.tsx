'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  searchMerchantInitialValues,
  searchMerchantSchema,
} from '@/validations/merchant/searchMerchant/searchMerchant';
// import { useAppSelector } from '@/hooks/redux';

function Admin() {
  // const userData = useAppSelector((state: any) => state.auth);
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // const jwt=userData.jwt

  const [response, setResponse] = useState<Array<any> | null>(null);

  const getAllMerchants = async () => {
    try {
      const response = await apiClient.get(
        `merchant/allMerchantWithPagination?page=${pageNumber}&size=10`,
      );

      if (response?.data?.responseCode == '009') {
        setResponse(response?.data?.information);
        setTotalPages(response?.data?.information.totalPages);
      } else {
        // setResponse(null);
        setApierror(response?.data.responseDescription);
      }
      console.log('All Merchants are', response);
    } catch (error) {
      console.log('error is', error);
    }
  };
  useEffect(() => {
    getAllMerchants();
  }, []);

  const exportToExcel = () => {
    // if (!response) return;

    // if (!response || response.length === 0) {
    if (!response) {
      console.error('No data available to export');
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX.utils.json_to_sheet(response);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Merchants');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'merchants_data.xlsx');
  };

  const handleMerchantSearch = async (values: any) => {
    console.log('values is', values);

    const req = {
      merchantName: values.merchantName,
      websiteAddress: values.websiteAddress,
      merchantEmail: values.merchantEmail,
      sellerCode: values.sellerCode,
      merchantMobileNumber: values.merchantMobileNumber,
      registrationRequestStatus: values.registrationRequestStatus,
      businessMode: values.businessMode,
      dateOfApplication: values.dateOfApplication,
    };

    const mdRequest = {
      ...req,
      apisecret: adminData.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const searchMerchantResponse = await apiClient.post(
        `merchant/searchMerchantByPagination?page=&size=1`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${adminData.jwt}` },
        },
      );

      console.log('searchMerchantResponse', searchMerchantResponse);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleReset = (formik: any) => {
    formik.resetForm();
    setApierror('');
    getAllMerchants();
    // setFilteredData(responseData);
  };

  const allPendingRequests = async () => {
    try {
      const response = await apiClient.get('merchant/getAllPendingRequest', {});
      console.log('response from search merchant is', response);
      const pendingRecords = response.data.information.filter(
        (item: any) => item.requestStatus === 'Pending',
      );
      if (response?.data.responseCode === '009') {
        setResponse(pendingRecords);
      } else {
        setResponse(null);
        setApierror(response?.data.responseDescription);
      }

      console.log('response filtered is', pendingRecords);
    } catch (error) {
      console.log('error is', error);
    }
  };

  const onSubmit = async (values: any) => {
    console.log('hellerrr', values);

    try {
      const response = await apiClient.post('merchant/searchMerchant', {
        request: {
          merchantName: values.merchantName,
          websiteAddress: values.websiteAddress,
          merchantEmail: values.merchantEmail,
          sellerCode: values.sellerCode,
          merchantMobileNumber: values.merchantMobileNumber,
          registrationRequestStatus: values.registrationRequestStatus,
          businessMode: values.businessMode,
          dateOfApplication: values.dateOfApplication,
        },
      });
      console.log('response from search merchant is', response);
      setResponse(response.data.information);
    } catch (error) {
      console.log('error is', error);
    }
  };
  const showNextPage = () => {
    console.log('i am on next page');
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    getAllMerchants();
    console.log('response is', response);
  };

  const showPrevPage = () => {
    console.log('i am on previous page');
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
    getAllMerchants();
  };
  return (
    <div className="flex flex-col gap-10 pt-12">
      <div className="flex flex-col gap-4">
        <H1>Registration Queue</H1>
        <Formik
          initialValues={searchMerchantInitialValues}
          validationSchema={searchMerchantSchema}
          onSubmit={onSubmit}
        >
          {(formik: any) => (
            <Form>
              <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
                <div className="grid w-full grid-cols-4 gap-5 p-9 pl-6">
                  <Input
                    label={'Merchant Name'}
                    type={'text'}
                    name={'merchantName'}
                    formik={formik}
                  />
                  <Input
                    label={'Website Address'}
                    type={'text'}
                    name={'websiteAddress'}
                    formik={formik}
                  />
                  <Input
                    label={'Merchant Email'}
                    type={'text'}
                    name={'merchantEmail'}
                    formik={formik}
                  />
                  <Input
                    label={'Seller Code'}
                    type={'text'}
                    name={'sellerCode'}
                    formik={formik}
                  />
                  <Input
                    label={'Merchant Mobile Number'}
                    type={'text'}
                    name={'merchantMobileNumber'}
                    formik={formik}
                  />

                  <DropdownInput
                    label="Registration Request Status"
                    name="registrationRequestStatus"
                    options={[
                      { value: 'Pending', label: 'Pending' },
                      { value: 'Approved', label: 'Approved' },
                    ]}
                    formik={formik}
                    error={formik.errors.registrationRequestStatus}
                    touched={formik.touched.registrationRequestStatus}
                  />

                  <DropdownInput
                    label="Business Mode"
                    name="businessMode"
                    options={[
                      { value: 'Online', label: 'Online' },
                      { value: 'Retail', label: 'Retail' },
                    ]}
                    formik={formik}
                    error={formik.errors.businessMode}
                    touched={formik.touched.businessMode}
                  />
                  <DateInputNew
                    label="Date Of Application"
                    name="dateOfApplication"
                    formik={formik}
                    error={formik.errors.dateOfApplication}
                    touched={formik.touched.dateOfApplication}
                  />
                </div>
                <div className="flex w-full items-end justify-end gap-5 px-6">
                  <Button
                    label="Export"
                    className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    onClickHandler={exportToExcel} // Export button click handler
                  />
                  <Button
                    label="View All pending Requests"
                    className="button-secondary w-[180px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    onClickHandler={allPendingRequests}
                  />
                  <Button
                    label="Reset"
                    className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    onClickHandler={() => handleReset(formik)}
                  />
                  <Button
                    label="Search"
                    onClickHandler={() => handleMerchantSearch(formik.values)}
                    // type="submit"
                    className="button-primary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {apierror && <div>{apierror}</div>}
      </div>
      <div className="table">
        <div className="overflow-x-auto">
          {/* <Table /> */}
          {response && response.length > 0 ? (
            <MerchantRecordTable title="" response={response} />
          ) : null}
          {response ? (
            <div className="mt-4 flex justify-between">
              <button
                onClick={showPrevPage}
                // disabled={currentPage === 1}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
              >
                Previous
              </button>
              <span>
                Page {pageNumber} of {totalPages}
              </span>
              <button
                onClick={showNextPage}
                // disabled={currentPage === totalPages}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Admin;
