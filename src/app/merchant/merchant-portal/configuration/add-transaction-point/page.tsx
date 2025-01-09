'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import FileInput from '@/components/UI/Inputs/FileInput';s
import Input from '@/components/UI/Inputs/Input';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import type { AddTransactionPointForm } from '@/interfaces/interface';
import { generateMD5Hash } from '@/utils/helper';
import {
  addTransactionPointInitialValues,
  addTransactionPointSchema,
} from '@/validations/merchant/transactions/addTransactionPoint';
// import MerchantRecordTable from '@/components/Table/MerchantRecordTable';

function AddTransactionPoint() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;

  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(1).fill(null),
  );
  const onSubmit = async (values: AddTransactionPointForm) => {
    console.log('i am add transaction point AddTransactionPoint', values);
    const { letterHeadImage, outletName, ...restValues } = values;
    const additionalValues = {
      ...restValues,
      managerMobile: userData?.managerMobile,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const req = { request: additionalValues, signature: md5Hash };
    const stringifyRequest = JSON.stringify(req);
    console.log(stringifyRequest, 'STRINGIFY OBJECT');

    const formData = new FormData();
    try {
      if (letterHeadImage) {
        formData.append('outletName', outletName);
        formData.append('letterHeadImage', letterHeadImage);
        formData.append('transactionPointDetailsRequestDTO', stringifyRequest);
        const response = await apiClient.post(
          '/merchant/addTransactionPointDetails',
          formData,
          {
            headers: { Authorization: `Bearer ${userData?.jwt}` },
          },
        );
        console.log(response);
      }
    } catch (e) {
      console.log('error adding a new outlet', e);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Add Transaction Point"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <H6>Transaction Point Details</H6>
        <Formik
          initialValues={addTransactionPointInitialValues}
          validationSchema={addTransactionPointSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
              <FormLayout formHeading="Transaction Point Details">
                <div className="flex flex-col gap-5">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
                  <DropdownInput
                    label="Outlet Name"
                    name="outletName"
                    formik={formik}
                    error={'payment method is false'}
                    touched={false}
                    options={[
                      { value: 'asdsad', label: 'asdsad' },
                      { value: 'US', label: 'US' },
                      { value: 'Afghanistan', label: 'Afghanistan' },
                      { value: 'Belgium', label: 'Belgium' },
                      { value: 'Greece', label: 'Greece' },
                    ]}
                  />

                  <Input
                    label="Transaction Point Number 1"
                    name="transactionPointNumber"
                    type="text"
                    error={formik.errors.outletName}
                    touched={false}
                  />
                  <Input
                    label="SMS Notification Number 1"
                    name="smsNotificationNumber1"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="SMS Notification Number 2"
                    name="smsNotificationNumber2"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />

                  <Input
                    label="SMS Notification Number 3"
                    name="smsNotificationNumber3"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="SMS Notification Number 4"
                    name="smsNotificationNumber4"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="SMS Notification Number 5"
                    name="smsNotificationNumber5"
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <BulkRegisterInput
                    key="LetterHeadImage"
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    index={0}
                    formik={formik}
                    item={{
                      label: 'Letter Head Image',
                      file: selectedFiles[0],
                      name: 'letterHeadImage',
                      icon: AttachmentsIcon,
                    }}
                  />
                  {/* <Input
                    label="Letter Head Image"
                    name="LetterHeadImage"
                    type="text"
                    error={"hi"}
                    touched={false}
                  /> */}
                </div>
              </FormLayout>
              <div className="flex w-full justify-end gap-6">
                <Button
                  label="Cancel"
                  routeName="/login"
                  className="button-secondary h-14 w-[270px] px-2 py-[11px] text-xs leading-tight"
                />
                <Button
                  label="Save"
                  type="submit"
                  className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
                />
              </div>
            </Form>
          )}
        </Formik>
        {/* <Input name="asd" label="ASD" formik='xyz'/> */}

        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>
    </>
  );
}

export default AddTransactionPoint;
