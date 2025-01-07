'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import apiClient from '@/api/apiClient';
import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
// import DateInputNew from "@/components/UI/Inputs/DateInputNew";
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/SuccessModal';
import {
  searchMerchantInitialValues,
  searchMerchantSchema,
} from '@/validations/merchant/searchMerchant/searchMerchant';

function Admin() {
  // const userData = useAppSelector((state: any) => state.auth);

  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log(setTitle, setDescription);
  const data = [
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
    { field1: 'yes', field2: 'no' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // const allPendingRequests = async () => {
  //   try {
  //     const response = await apiClient.get("merchant/getAllPendingRequest", {});
  //     console.log("response from search merchant is", response);
  //     const pendingRecords = response.data.information.filter(
  //       (item: any) => item.requestStatus === "Pending"
  //     );
  //     // console.log("penidng record", pendingRecords)
  //     setResponse(pendingRecords);
  //     console.log("response filtered is", pendingRecords);
  //   } catch (error) {
  //     console.log("error is", error);
  //   }
  // };

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
  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
      <div className="flex flex-col gap-10 px-[150px] pt-12">
        <div className="flex flex-col gap-4">
          <H1>Welcome to Admin Portal</H1>
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
                      label={'Merchant Name or Seller Code'}
                      type={'text'}
                      name={'merchantName'}
                    />

                    <DropdownInput
                      label="Graph Type"
                      name="registrationRequestStatus"
                      options={[
                        { value: 'Male', label: 'M' },
                        { value: 'Female', label: 'F' },
                      ]}
                      formik={formik}
                      error={formik.errors.registrationRequestStatus}
                      touched={formik.touched.registrationRequestStatus}
                    />

                    <DropdownInput
                      label="Graph Duration"
                      name="businessMode"
                      options={[
                        { value: 'Male', label: 'M' },
                        { value: 'Female', label: 'F' },
                      ]}
                      formik={formik}
                      error={formik.errors.businessMode}
                      touched={formik.touched.businessMode}
                    />
                  </div>
                  <div className="flex w-full items-end justify-start gap-5 px-6">
                    <Button
                      label="Generate"
                      type="submit"
                      className="button-primary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="table">
          <div className="overflow-x-auto">
            {/* <Table /> */}
            {response ? (
              <MerchantRecordTable title="" response={response} />
            ) : null}
            {response ? (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
