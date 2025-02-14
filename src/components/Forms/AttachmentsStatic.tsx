'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
// import FileInput from '@/components/UI/Inputs/FileInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setAttachmentForm } from '@/redux/features/formSlices/onBoardingForms';
import {
  AttachmentFormInfoInitialValues,
  AttachmentFormInfoSchema,
} from '@/validations/merchant/onBoarding/attachmentInfo';

import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';

const AttachmentsStatic = () => {
  // const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(5).fill(null),
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);

  const formData = new FormData();

  const attachmentsData = [
    {
      label: 'Account Maintainance Certificate',
      file: selectedFiles[0],
      name: 'accountMaintainanceCertificate',
      icon: AttachmentsIcon,
    },
    {
      label: 'Your External Bank',
      file: selectedFiles[1],
      name: 'externalBank',
      icon: AttachmentsIcon,
    },
    {
      label: ' Live Picture or Digital Photo',
      file: selectedFiles[2],
      name: 'livePicture',
      icon: AttachmentsIcon,
    },
    {
      label: 'CNIC Front',
      file: selectedFiles[3],
      name: 'cnicFront',
      icon: AttachmentsIcon,
    },
    {
      label: 'CNIC Back',
      file: selectedFiles[4],
      name: 'cnicBack',
      icon: AttachmentsIcon,
    },
  ];

  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const arrayValues = [values];
    console.log('arrayyyyyvalues', arrayValues);
    dispatch(setAttachmentForm(values));
    try {
      formData.append('files', arrayValues[0]?.accountMaintainanceCertificate);
      formData.append('files', arrayValues[0]?.externalBank);
      formData.append('files', arrayValues[0]?.livePicture);
      formData.append('files', arrayValues[0]?.cnicFront);
      formData.append('files', arrayValues[0]?.cnicBack);
      formData.append('status', 'Completed');

      // const bodyData = {"Completed" };
      // const jsonBody = JSON.stringify(bodyData);
      // formData.append("managerMobile", userData.managerMobile);

      const response: any = await apiClient.post(`merchant/upload`, formData, {
        params: {
          username: userData?.email,
        },
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });

      if (response.data.responseCode === '009') {
        console.log('ATTACHMENT SUCCESS');
        router.push('?activeTab=review-form');
      } else {
        console.log('ATTACHMENT FAILURE');
      }
    } catch (e) {
      console.log(e, 'Error in submitting Attachment Form');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={AttachmentFormInfoInitialValues}
        validationSchema={AttachmentFormInfoSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {`ATTACHMENT INFORMATION`}
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
                  <FormWrapper>
                    <H6>
                      Upload Documentsm,jnkj{' '}
                      <span className="font-normal leading-tight text-secondary-500">
                        (What would you like to integrate)
                      </span>
                    </H6>
                    {attachmentsData.map((item, index) => {
                      return (
                        <BulkRegisterInput
                          key={index}
                          selectedFiles={selectedFiles}
                          setSelectedFiles={setSelectedFiles}
                          index={index}
                          formik={formik}
                          item={item}
                        />
                      );
                    })}
                  </FormWrapper>
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  <Button
                    label={`Save & Continue Later`}
                    type="button"
                    className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                  <Button
                    label={`Next`}
                    type="submit"
                    className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AttachmentsStatic;
