'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
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

import { categories } from '../../qr-payments/utils/utils';
import {
  azadKashmirCities,
  federalCities,
  generalCities,
  gilgitCities,
  peshawarCities,
  punjabCities,
  quettaCities,
  sindhCities,
} from './utils/data';

function AddOutlet() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formData = new FormData();
  const [cities, setCities] = useState(generalCities);

  const onSubmit = async (
    values: AddOutletForm,
    { resetForm }: { resetForm: () => void },
  ) => {
    console.log('AddOutlet', values);

    const { outletImage, categoryCode, ...restValues } = values;

    const categoryNum: any = categories.find(
      (category: any) => category.label === categoryCode,
    );

    const additionalValues = {
      ...restValues,
      categoryCode: categoryNum.categoryCode,
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
        if (response?.data.responseCode === '009') {
          setTitle('Outlet created successfully');
          setDescription(response?.data.responseDescription);
          resetForm();
        } else if (response?.data.responseCode === '000') {
          setTitle('Failed to create an Outlet.');
          setDescription(response?.data.responseDescription);
        } else {
          setTitle('Failed to create an Outlet.');
          setDescription(response.data.errorDescription);
        }
      }
    } catch (e: any) {
      setTitle('Network Failure!');
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
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        // innerRef={formikRef}
        initialValues={addOutletsInitialValues}
        validationSchema={addOutletsSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          /* eslint-disable react-hooks/rules-of-hooks */
          useEffect(() => {
            const selectedRegion = formik.values.region;
            // if (selectedRegion === "Punjab") {
            //   setCities(punjabCities)
            // } else if (selectedRegion === "Sindh") {
            //   setCities(sindhCities)
            // } else if (selectedRegion === "Islamabad Capital Territory") {
            //   setCities(federalCities)
            // } else if (selectedRegion === "Balochistan") {
            //   setCities(quettaCities)
            // } else if (selectedRegion === "Khyber Pakhtunkhwa") {
            //   setCities(peshawarCities)
            // } else if (selectedRegion === "Azad Jammu and Kashmir") {
            //   setCities(azadKashmirCities)
            // } else if (selectedRegion === "Gilgit Baltistan") {
            //   setCities(gilgitCities)
            // } else {
            //   setCities(generalCities)
            // }
            switch (selectedRegion) {
              case 'Punjab':
                setCities(punjabCities);
                break;
              case 'Sindh':
                setCities(sindhCities);
                break;
              case 'Islamabad Capital Territory':
                setCities(federalCities);
                break;
              case 'Balochistan':
                setCities(quettaCities);
                break;
              case 'Khyber Pakhtunkhwa':
                setCities(peshawarCities);
                break;
              case 'Azad Jammu and Kashmir':
                setCities(azadKashmirCities);
                break;
              case 'Gilgit Baltistan':
                setCities(gilgitCities);
                break;
              default:
                setCities(generalCities);
            }
          }, [formik.values.region]);
          return (
            <Form className="flex flex-col gap-6">
              <FormLayout formHeading="Outlet Details">
                <div className="flex flex-col gap-5">
                  <Input
                    asterik
                    label="Outlet Name"
                    name="outletName"
                    type="text"
                    error={formik.errors.outletName}
                    touched={formik.touched.outletName}
                  />
                  <DropdownInput
                    asterik
                    label="Store Type"
                    name="storeType"
                    options={[
                      { value: 'Online Payments', label: 'Online Payments' },
                      { value: 'Retail', label: 'Retail' },
                    ]}
                    formik={formik}
                    error={formik.errors.storeType}
                    touched={formik.touched.storeType}
                  />
                  <DropdownInput
                    asterik
                    label="Category"
                    name="categoryCode"
                    formik={formik}
                    error={formik.errors.categoryCode}
                    touched={formik.touched.categoryCode}
                    options={categories}
                  />
                  <DropdownNew
                    asterik
                    label="Region"
                    name="region"
                    formik={formik}
                    error={formik.errors.region}
                    touched={formik.touched.region}
                    options={[
                      { value: 'Punjab', label: 'Punjab' },
                      { value: 'Sindh', label: 'Sindh' },
                      {
                        value: 'Khyber Pakhtunkhwa',
                        label: 'Khyber Pakhtunkhwa',
                      },
                      { value: 'Balochistan', label: 'Balochistan' },
                      { value: 'Gilgit Baltistan', label: 'Gilgit Baltistan' },
                      {
                        value: 'Azad Jammu and Kashmir',
                        label: 'Azad Jammu and Kashmir',
                      },
                      {
                        value: 'Islamabad Capital Territory',
                        label: 'Islamabad Capital Territory',
                      },
                    ]}
                  />
                  <DropdownNew
                    asterik
                    label="City"
                    name="city"
                    formik={formik}
                    error={formik.errors.city}
                    touched={formik.touched.city}
                    options={cities}
                  />
                  <Input
                    asterik
                    label="Address"
                    name="address"
                    type="text"
                    error={formik.errors.address}
                    touched={formik.touched.address}
                  />
                  <Input
                    asterik
                    label="Manager Name"
                    name="managerName"
                    type="text"
                    error={formik.errors.managerName}
                    touched={formik.touched.managerName}
                  />

                  <Input
                    asterik
                    label="Manager Mobile Number"
                    name="managerMobile"
                    type="text"
                    error={formik.errors.managerMobile}
                    touched={formik.touched.managerMobile}
                  />
                  <Input
                    asterik
                    label="Outlet POC Name"
                    name="outletPocName"
                    type="text"
                    error={formik.errors.outletPocName}
                    touched={formik.touched.outletPocName}
                  />
                  <Input
                    asterik
                    label="Outlet POC Contact Number"
                    name="outletPocContactNumber"
                    type="text"
                    error={formik.errors.outletPocContactNumber}
                    touched={formik.touched.outletPocContactNumber}
                  />
                  <Input
                    asterik
                    label="Outlet POC Email"
                    name="outletPocEmail"
                    type="text"
                    error={formik.errors.outletPocEmail}
                    touched={formik.touched.outletPocEmail}
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
                    error={formik.errors.outletLongitude}
                    touched={formik.touched.outletLongitude}
                  />
                  <Input
                    label="Outlet Latitude"
                    name="outletLatitude"
                    type="text"
                    error={formik.errors.outletLatitude}
                    touched={formik.touched.outletLatitude}
                  />
                  <BulkRegisterInput
                    asterik
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
                  {/* <Input
                  asterik
                    label="Number of Tills/QRs/NFC Machines Required"
                    name="numberOfTillsRequired"
                    type="text"
                    error={formik.errors.numberOfTillsRequired}
                    touched={formik.touched.numberOfTillsRequired}
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
          );
        }}
      </Formik>
    </div>
  );
}

export default AddOutlet;
