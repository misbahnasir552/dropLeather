'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import Input from '@/components/UI/Inputs/Input';
import FileInput from '@/components/UI/Inputs/FileInput';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import {
  manageFundsTransferInitialValues,
  manageFundsTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/manage-funds-transfer';

const BulkRegister = () => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(5).fill(null),
  );
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formData = new FormData();

  const attachmentsData = [
    {
      label: 'Upload File',
      file: selectedFiles[0],
      name: 'accountMaintainanceCertificate',
      // icon: AttachmentsIcon,
    },
  ];
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const uploadBulk = async (file: any) => {
    console.log('hi ia m in bulk');
    formData.append('file', file);
    try {
      const response = await apiClient.post(
        `merchant/bulkRegistration`,
        formData,
        {},
      );
      console.log('File response is', response);
      if (response?.data.responseCode === '009') {
        setShowModal(true);
        setTitle(response?.data.responseMessage);
        setDescription(response?.data.responseDescription);
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };
  return (
    <>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={'/admin/admin-portal/manage-users/search-user'}
      />
      <div className="flex flex-col gap-6 px-[150px] pt-12">
        <HeaderWrapper
          heading="Bulk Upload"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <FormLayout formHeading="Upload File">
          <Formik
            initialValues={manageFundsTransferInitialValues}
            validationSchema={manageFundsTransferSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="flex flex-col gap-4">
                  {attachmentsData.map((item, index) => {
                    return (
                      <FileInput
                        key={index}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        index={index}
                        formik={formik}
                        item={item}
                      />
                    );
                  })}
                </div>
              </Form>
            )}
          </Formik>
        </FormLayout>
        <div className="flex w-full justify-end gap-6 pb-9">
          <Button
            label="Cancel"
            type="submit"
            className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
          />
          <Button
            label="View Batch"
            // routeName="/login"
            className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
            onClickHandler={() => uploadBulk(selectedFiles[0])}
          />
        </div>
      </div>
    </>
  );
};

export default BulkRegister;
