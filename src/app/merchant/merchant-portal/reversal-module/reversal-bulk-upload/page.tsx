'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import UploadIcon from '@/assets/icons/UploadIcon.svg';
import Button from '@/components/UI/Button/PrimaryButton';
// import CrossIcon from '@/assets/icons/Cross.svg';
import H6 from '@/components/UI/Headings/H6';
import FileInput from '@/components/UI/Inputs/FileInput';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
// import { setAttachmentForm } from "@/redux/features/formSlices/onBoardingForms";
import {
  AttachmentFormInfoInitialValues,
  AttachmentFormInfoSchema,
} from '@/validations/merchant/onBoarding/attachmentInfo';

function Reversal() {
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(1).fill(null),
  );
  const formData = new FormData();
  const attachmentsData = [
    {
      label: 'Upload File',
      file: selectedFiles[0],
      name: 'accountMaintainanceCertificate',
      icon: UploadIcon,
      // className: 'flex bg'
    },
  ];

  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const arrayValues = [values];
    console.log('arrayyyyyvalues', arrayValues, setSubmitting);

    try {
      formData.append('files', arrayValues[0]?.accountMaintainanceCertificate);

      formData.append('status', 'Completed');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Reversal Bulk Upload"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <FormLayout>
        <Formik
          initialValues={AttachmentFormInfoInitialValues}
          validationSchema={AttachmentFormInfoSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="flex flex-col">
              <Form className="flex flex-col gap-4">
                <H6>Upload File</H6>
                {attachmentsData.map((item, index) => {
                  return (
                    <FileInput
                      // className={"flex bg-primary-900"}
                      key={index}
                      selectedFiles={selectedFiles}
                      setSelectedFiles={setSelectedFiles}
                      index={index}
                      formik={formik}
                      item={item}
                    />
                  );
                })}
              </Form>
            </div>
          )}
        </Formik>
      </FormLayout>
      <div className="flex w-full justify-end gap-6">
        <Button
          label="Cancel"
          routeName="/login"
          className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
        />
        <Button
          label="View Batch"
          type="submit"
          className="button-primary w-[270px] py-[19px] text-sm leading-tight"
        />
      </div>
    </div>
  );
}

export default Reversal;
