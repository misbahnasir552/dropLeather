'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { ActivityFormInfo } from '@/interfaces/interface';
import { setActivityForm } from '@/redux/features/formSlices/onBoardingForms';
import { generateMD5Hash } from '@/utils/helper';
import {
  ActivityFormInfoSchema,
  GetActivityInfoDetails,
} from '@/validations/merchant/onBoarding/activityInfo';

const ActivityInformationStatic = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const ActivityFormInfoInitialValues = GetActivityInfoDetails();

  const saveAndContinue = async (
    values: ActivityFormInfo,
    { setSubmitting }: any,
  ) => {
    try {
      const response: any = await apiClient.post(
        `merchant/activity/${userData.email}`,
        {
          businessNature: 'option1',
          managerMobile: userData.managerMobile,
          fatherName: values.fatherName,
          businessName: values.businessName,
          nameOfBusinessOwner: values.businessOwner,
          legalNameOfBusiness: values.legalName,
          dateOfIncorporation: values.incorporationDate,
          ntnNumber: values.ntnNumber,
          purposeOfAccount: values.purposeOfAccount,
          emailAddress: values.emailAddress,
          city: values.city,
          businessAddress: values.businessAddress,
          correspondenceAddress: values.correspondenceAddress,
          primaryPhoneNumber: values.primaryPhoneNumber,
          otherPhoneNumber: values.otherPhoneNumber,
          status: 'partial',
          terrorFinancing: values.terrorFinancing,
          politicallyExposed: values.politicallyExposed,
          accountHolder: values.accountHolder,
          gender: values.gender,
          citizenship: values.citizenship,
          countryOfResidency: values.residency,
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );

      if (response.data.responseCode === '000') {
        console.log(response, 'Activity Information');
        router.push('/business-details');
      } else {
        router.push('/login');
        console.log('Data submission failure');
      }
    } catch (e) {
      console.log(e, 'Error');
    }

    setSubmitting(false);
  };
  // console.log('ENV:', process.env.NEXT_PUBLIC_BASE_URL);

  const onSubmit = async (values: ActivityFormInfo, { setSubmitting }: any) => {
    console.log('activity valuesssssssssssss', values);
    // router.push('?activeTab=additional-information');

    const req = {
      businessNature: 'option1',
      managerMobile: userData.managerMobile,
      fatherName: values.fatherName,
      businessName: values.businessName,
      nameOfBusinessOwner: values.businessOwner,
      legalNameOfBusiness: values.legalName,
      dateOfIncorporation: values.incorporationDate,
      ntnNumber: values.ntnNumber,
      purposeOfAccount: values.purposeOfAccount,
      emailAddress: values.emailAddress,
      city: values.city,
      businessAddress: values.businessAddress,
      correspondenceAddress: values.correspondenceAddress,
      primaryPhoneNumber: values.primaryPhoneNumber,
      otherPhoneNumber: values.otherPhoneNumber,
      status: 'Completed',
      terrorFinancing: values.terrorFinancing,
      politicallyExposed: values.politicallyExposed,
      accountHolder: values.accountHolder,
      gender: values.gender,
      citizenship: values.citizenship,
      countryOfResidency: values.residency,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);

    try {
      dispatch(setActivityForm(values));
      const response: any = await apiClient.post(
        `merchant/activity/${userData?.email}`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );
      console.log('response activity info', response);
      if (response.data.responseCode === '009') {
        console.log(response, 'Activity Information');
        router.push('/on-boarding/business-details');
      } else {
        console.log('Data submission failure');
      }
    } catch (e) {
      console.log(e, 'Error');
    }

    setSubmitting(false);
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <Formik
        initialValues={ActivityFormInfoInitialValues}
        validationSchema={ActivityFormInfoSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
              {`ACTIVITY INFORMATION`}
            </div>

            <div className="flex flex-col justify-end gap-9">
              <div className="flex flex-col gap-6">
                <FormWrapper>
                  <H6>Merchant Personal Details</H6>
                  <Input
                    label="Father Name"
                    name="fatherName"
                    type="text"
                    error={formik.errors.fatherName}
                    touched={formik.touched.fatherName}
                  />
                  <DropdownInput
                    label="Gender"
                    name="gender"
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                    ]}
                    formik={formik}
                    error={formik.errors.gender}
                    touched={formik.touched.gender}
                  />

                  <DropdownInput
                    label="Purpose"
                    name="purposeOfAccount"
                    options={[
                      { value: 'RetailPayments', label: 'Retail Payments' },
                      { value: 'OnlinePayments', label: 'Online Payments' },
                      { value: 'Other', text: 'Other' },
                    ]}
                    formik={formik}
                    error={formik.errors.purposeOfAccount}
                    touched={formik.touched.purposeOfAccount}
                  />

                  <DropdownInput
                    label={'Citizenship'}
                    name="citizenship"
                    options={[
                      { value: 'Pakistani', label: 'Pakistani' },
                      { value: 'US', label: 'US' },
                      { value: 'Afghanistan', label: 'Afghanistan' },
                      { value: 'Belgium', label: 'Belgium' },
                      { value: 'Greece', label: 'Greece' },
                    ]}
                    formik={formik}
                    error={formik.errors.citizenship}
                    touched={formik.touched.citizenship}
                  />
                  <DropdownInput
                    label={'Country of residency'}
                    name="residency"
                    options={[
                      { value: 'Pakistani', label: 'Pakistani' },
                      { value: 'US', label: 'US' },
                      { value: 'Afghanistan', label: 'Afghanistan' },
                      { value: 'Belgium', label: 'Belgium' },
                      { value: 'Greece', label: 'Greece' },
                    ]}
                    formik={formik}
                    error={formik.errors.residency}
                    touched={formik.touched.residency}
                  />
                </FormWrapper>
                <FormWrapper>
                  <H6>Business Details</H6>
                  <Input
                    label="Name of Business Owner as Per CNIC"
                    name="businessOwner"
                    type="text"
                    error={formik.errors.businessOwner}
                    touched={formik.touched.businessOwner}
                  />
                  <Input
                    label="Business Name"
                    name="businessName"
                    type="text"
                    error={formik.errors.businessName}
                    touched={formik.touched.businessName}
                  />
                  <Input
                    label="Legal Name of Business"
                    name="legalName"
                    type="text"
                    error={formik.errors.legalName}
                    touched={formik.touched.legalName}
                  />
                  <DateInputNew
                    label="Date of Incorporation"
                    name="incorporationDate"
                    formik={formik}
                    error={formik.errors.incorporationDate}
                    touched={formik.touched.incorporationDate}
                  />
                  <DropdownInput
                    label={'Terror Financing'}
                    name="terrorFinancing"
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                    formik={formik}
                    error={formik.errors.terrorFinancing}
                    touched={formik.touched.terrorFinancing}
                  />
                  <DropdownInput
                    label={'Politically Exposed'}
                    name="politicallyExposed"
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                    formik={formik}
                    error={formik.errors.politicallyExposed}
                    touched={formik.touched.politicallyExposed}
                  />
                  <Input
                    label="NTN Number"
                    name="ntnNumber"
                    type="text"
                    error={formik.errors.ntnNumber}
                    touched={formik.touched.ntnNumber}
                  />
                </FormWrapper>
                <FormWrapper>
                  <H6>Contact Details</H6>
                  <Input
                    label="Email Address"
                    name="emailAddress"
                    type="text"
                    error={formik.errors.emailAddress}
                    touched={formik.touched.emailAddress}
                  />
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    error={formik.errors.city}
                    touched={formik.touched.city}
                  />
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Business Address"
                      name="businessAddress"
                      type="text"
                      error={formik.errors.businessAddress}
                      touched={formik.touched.businessAddress}
                    />
                    <CheckboxItem
                      description={
                        'Click here if correspondence address is same as business address'
                      }
                      isChecked={isChecked}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </div>
                  <Input
                    label="Correspondence Address"
                    subString=" (if different from business address)"
                    name="correspondenceAddress"
                    type="text"
                    error={formik.errors.correspondenceAddress}
                    touched={formik.touched.correspondenceAddress}
                  />
                  <DropdownInput
                    label={'Are you an Account Holder?'}
                    name="accountHolder"
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                    formik={formik}
                    error={formik.errors.accountHolder}
                    touched={formik.touched.accountHolder}
                  />
                  <Input
                    label="Primary Phone Number"
                    name="primaryPhoneNumber"
                    type="text"
                    error={formik.errors.primaryPhoneNumber}
                    touched={formik.touched.primaryPhoneNumber}
                  />
                  <Input
                    label="Other Phone Number"
                    subString="(Optional)"
                    name="otherPhoneNumber"
                    type="text"
                    error={formik.errors.otherPhoneNumber}
                    touched={formik.touched.otherPhoneNumber}
                  />
                </FormWrapper>
              </div>
              {/* <FormControlButtons saveAndContinue={saveAndContinue} /> */}
              <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                <Button
                  label={`Save & Continue Later`}
                  onClickHandler={() =>
                    saveAndContinue(
                      formik.values,
                      formik.setSubmitting,
                      // formik.validateForm,
                    )
                  }
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
          // </div>
        )}
      </Formik>
    </>
  );
};

export default ActivityInformationStatic;
