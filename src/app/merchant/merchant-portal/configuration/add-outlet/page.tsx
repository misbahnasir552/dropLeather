'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import FileInput from '@/components/UI/Inputs/FileInput';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import type { AddOutletForm } from '@/interfaces/interface';
import { generateMD5Hash } from '@/utils/helper';
import {
  addOutletsInitialValues,
  addOutletsSchema,
} from '@/validations/merchant/transactions/addOutlet';

function AddOutlet() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  console.log('selected FILESSS', selectedFiles);
  const formData = new FormData();

  const onSubmit = async (
    values: AddOutletForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    console.log('i am outlet AddOutlet', values);

    const { outletImage, ...restValues } = values;

    const additionalValues = {
      ...restValues,
      sendSms: true,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    const req = { request: additionalValues, signature: md5Hash };
    const stringifyRequest = JSON.stringify(req);
    console.log(stringifyRequest, 'STRIGIFYOBJECT');

    try {
      if (outletImage) {
        console.log(userData?.email, 'EMAILLLLL');

        formData.append('merchantEmail', userData?.email);
        formData.append('filedata', outletImage);
        formData.append('outletRequestDTO', stringifyRequest);
        // console.log("FORM DATAAAA", formData);

        const response = await apiClient.post('/merchant/addoutlet', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for FormData
            Authorization: `Bearer ${userData?.jwt}`,
          },
        });
        console.log(response);
        if (response?.data.responseCode === '00') {
          setTitle(response?.data.responseCode);
          setDescription(response?.data.responseDescription);
          resetForm();
        } else {
          setTitle(response.data.errorDescription);
          setDescription(response.data.errorDescription);
        }
      }
    } catch (e: any) {
      setTitle(e.code);
      setDescription(e.message);
    } finally {
      // setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/merchant-portal/configuration/add-transaction-point/"
      />
      <HeaderWrapper
        heading="Add Outlet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={addOutletsInitialValues}
        validationSchema={addOutletsSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Outlet Details">
              <div className="flex flex-col gap-5">
                <Input
                  label="Outlet Name"
                  name="outletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <DropdownInput
                  label="Region"
                  name="region"
                  formik={formik}
                  error={'payment method is false'}
                  touched={false}
                  options={[
                    { value: 'Pakistani', label: 'Pakistani' },
                    { value: 'US', label: 'US' },
                    { value: 'Afghanistan', label: 'Afghanistan' },
                    { value: 'Belgium', label: 'Belgium' },
                    { value: 'Greece', label: 'Greece' },
                  ]}
                />
                <DropdownInput
                  label="City"
                  name="city"
                  formik={formik}
                  error={'payment method is false'}
                  touched={false}
                  options={[
                    { value: 'Pakistani', label: 'Pakistani' },
                    { value: 'US', label: 'US' },
                    { value: 'Afghanistan', label: 'Afghanistan' },
                    { value: 'Belgium', label: 'Belgium' },
                    { value: 'Greece', label: 'Greece' },
                  ]}
                />
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Manager Name"
                  name="managerName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />

                <Input
                  label="Mangaer Mobile Number"
                  name="managerMobile"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Outlet POC Name"
                  name="outletPocName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Outlet POC Contact Number"
                  name="outletPocContactNumber"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Outlet POC Email"
                  name="outletPocEmail"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                {/* <CheckboxInput
                  setSelectedCheckValue={setSelectedCheckValue}
                  name="sendSms"
                  form={formik}
                  key={"sendSms"}
                  options={[{ label: "sendSms", value: selectedCheckValue }]}
                /> */}

                <Input
                  label="Outlet Longitude"
                  name="outletLongitude"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Outlet Latitude"
                  name="outletLatitude"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <BulkRegisterInput
                  key="OutletImage"
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  index={0}
                  formik={formik}
                  item={{
                    label: 'Outlet Image',
                    file: selectedFiles[0],
                    name: 'outletImage',
                    icon: AttachmentsIcon,
                  }}
                />
                <Input
                  label="Number of Tills/QRs/NFC Machines Required"
                  name="numberOfTillsRequired"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
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
    </div>
  );
}

export default AddOutlet;
