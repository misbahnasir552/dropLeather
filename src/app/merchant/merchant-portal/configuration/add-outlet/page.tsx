'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
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
                  error={formik.errors.outletName}
                  touched={formik.touched.outletName}
                />
                <DropdownNew
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
                    { value: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan' },
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
                  label="City"
                  name="city"
                  formik={formik}
                  error={formik.errors.city}
                  touched={formik.touched.city}
                  options={[
                    { value: 'Islamabad', label: 'Islamabad' },
                    { value: 'Karachi', label: 'Karachi' },
                    { value: 'Lahore', label: 'Lahore' },
                    { value: 'Rawalpindi', label: 'Rawalpindi' },
                    { value: 'Peshawar', label: 'Peshawar' },
                    { value: 'Quetta', label: 'Quetta' },
                    { value: 'Faisalabad', label: 'Faisalabad' },
                    { value: 'Multan', label: 'Multan' },
                    { value: 'Hyderabad', label: 'Hyderabad' },
                    { value: 'Sialkot', label: 'Sialkot' },
                    { value: 'Bahawalpur', label: 'Bahawalpur' },
                    { value: 'Gujranwala', label: 'Gujranwala' },
                    { value: 'Sargodha', label: 'Sargodha' },
                    { value: 'Sheikhupura', label: 'Sheikhupura' },
                    { value: 'Mardan', label: 'Mardan' },
                    { value: 'Kasur', label: 'Kasur' },
                    { value: 'Rahim Yar Khan', label: 'Rahim Yar Khan' },
                    { value: 'Jhelum', label: 'Jhelum' },
                    { value: 'Abbottabad', label: 'Abbottabad' },
                    { value: 'Okara', label: 'Okara' },
                    { value: 'Wah Cantt', label: 'Wah Cantt' },
                    { value: 'Mingora', label: 'Mingora' },
                    { value: 'Mirpur', label: 'Mirpur' },
                    { value: 'Nowshera', label: 'Nowshera' },
                    { value: 'Swabi', label: 'Swabi' },
                    { value: 'Muzaffarabad', label: 'Muzaffarabad' },
                    { value: 'Gujrat', label: 'Gujrat' },
                    { value: 'Dera Ghazi Khan', label: 'Dera Ghazi Khan' },
                    { value: 'Chiniot', label: 'Chiniot' },
                    { value: 'Kamoke', label: 'Kamoke' },
                    { value: 'Toba Tek Singh', label: 'Toba Tek Singh' },
                    { value: 'Khuzdar', label: 'Khuzdar' },
                    { value: 'Mansehra', label: 'Mansehra' },
                    { value: 'Kohat', label: 'Kohat' },
                    { value: 'Pakpattan', label: 'Pakpattan' },
                    { value: 'Dera Ismail Khan', label: 'Dera Ismail Khan' },
                    { value: 'Sahiwal', label: 'Sahiwal' },
                    { value: 'Chakwal', label: 'Chakwal' },
                    { value: 'Vehari', label: 'Vehari' },
                    { value: 'Ghotki', label: 'Ghotki' },
                    { value: 'Larkana', label: 'Larkana' },
                    { value: 'Jacobabad', label: 'Jacobabad' },
                    { value: 'Shikarpur', label: 'Shikarpur' },
                    { value: 'Khairpur', label: 'Khairpur' },
                    { value: 'Bannu', label: 'Bannu' },
                    { value: 'Hafizabad', label: 'Hafizabad' },
                    { value: 'Sukkur', label: 'Sukkur' },
                    { value: 'Jamshoro', label: 'Jamshoro' },
                    { value: 'Narowal', label: 'Narowal' },
                  ]}
                />
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  error={formik.errors.address}
                  touched={formik.touched.address}
                />
                <Input
                  label="Manager Name"
                  name="managerName"
                  type="text"
                  error={formik.errors.managerName}
                  touched={formik.touched.managerName}
                />

                <Input
                  label="Manager Mobile Number"
                  name="managerMobile"
                  type="text"
                  error={formik.errors.managerMobile}
                  touched={formik.touched.managerMobile}
                />
                <Input
                  label="Outlet POC Name"
                  name="outletPocName"
                  type="text"
                  error={formik.errors.outletPocName}
                  touched={formik.touched.outletPocName}
                />
                <Input
                  label="Outlet POC Contact Number"
                  name="outletPocContactNumber"
                  type="text"
                  error={formik.errors.outletPocContactNumber}
                  touched={formik.touched.outletPocContactNumber}
                />
                <Input
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
                  error={formik.errors.numberOfTillsRequired}
                  touched={formik.touched.numberOfTillsRequired}
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
