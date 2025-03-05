'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
// import FileInput from '@/components/UI/Inputs/FileInput';
import SuccessModal from '@/components/UI/Modal/CustomModal';
// import Input from '@/components/UI/Inputs/Input';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import {
  bulkUploadInitialValues,
  bulkUploadSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/bulk-fund-transfer';
import type { IBulkUpload } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/interfaces';

function BulkFileUpload() {
  const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([]);
  const formData = new FormData();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState<any[]>([]);

  const onSubmit = async (
    values: IBulkUpload,
    { resetForm }: { resetForm: () => void },
  ) => {
    const { bulkFile } = values;
    setApierror([]);
    try {
      // const additionalValues = {
      //   file: values.bulkFile,
      //   managerMobile: userData?.managerMobile
      // }
      if (bulkFile) {
        formData.append('file', bulkFile);
        const response = await apiClient.post(
          `/merchant/fundsTransfer1?email=${userData?.email}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for FormData
              Authorization: `Bearer ${userData?.jwt}`,
            },
          },
        );
        if (response?.data.responseCode === '009') {
          setTitle('Success');
          setDescription(response?.data.responseDescription);
          setShowModal(true);
          resetForm();
        } else {
          setTitle('Failed');
          setDescription(
            response?.data?.map((item: any) => item?.responseDescription),
          );
          setApierror(response?.data);
        }
      }
    } catch (e: any) {
      setTitle('Network Failed');
      setDescription(e.message);
      setApierror(e?.message);
    } finally {
      // setShowModal(true);
    }
  };
  console.log('apiError', apierror);

  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/"
        // routeName="/merchant/merchant-portal/configuration/add-transaction-point/"
      />
      <HeaderWrapper
        heading="Bulk Upload"
        description="File Should include Following fields: Beneficiary Account Number, Beneficiary Bank, Transfer Amount, Transfer Purpose"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={bulkUploadInitialValues}
        validationSchema={bulkUploadSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Upload File">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col"></div>
                <BulkRegisterInput
                  key="bulkFile"
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  index={0}
                  formik={formik}
                  item={{
                    label: 'Upload File',
                    file: selectedFiles[0],
                    name: 'bulkFile',
                    icon: AttachmentsIcon,
                  }}
                />
              </div>
            </FormLayout>
            {/* <div className="flex w-full flex-col justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror?.map((item, index) => (
                <p key={index}>{item?.responseDescription || ''}</p>
              ))}
            </div> */}
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/"
                className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
              <Button
                label="View Batch"
                type="submit"
                // routeName="/login"
                className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BulkFileUpload;
