'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { AdditionalFormInfo } from '@/interfaces/interface';
import { setAdditionalForm } from '@/redux/features/formSlices/onBoardingForms';
import { generateMD5Hash } from '@/utils/helper';
import {
  AdditionalInfoInitialValues,
  additionalInfoSchema,
} from '@/validations/merchant/onBoarding/additionalInfo';

const AdditionalDetails = () => {
  const router = useRouter();
  const userData = useAppSelector((state: any) => state.auth);
  const [isChecked, setChecked] = useState(false);
  // const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { apiSecret } = userData;

  const onSubmit = async (
    values: AdditionalFormInfo,
    { setSubmitting }: any,
  ) => {
    const req = {
      managerMobile: userData.managerMobile,
      nomineeName: values.nomineeName,
      nomineeCNIC: values.nomineeCNIC,
      relationWithHolder: values.relationShipWithHolder,
      contactNumberOfNominee: values.nomineeContactNumber,
      companyPortalAddress: values.companyPostalAddress,
      authorizedSignatoryName: values.authorisedSignatoryName,
      designationOfAuthorizedSignatory: values.designationOfAuthorisedSignatory,
      CNICOfAuthorizedSignatory: values.cnicOfAuthorisedSignatory,
      mobileNumberOfAuthorizedSignatory:
        values.mobileNumberOfAuthorisedSignatory,
      landlineNumberOfAuthorizedSignatory:
        values.landLineNumberOfAuthorizedSignatory,
      companyRegistrationAddress: values.companyRegistrationAddress,
      status: 'Completed',
    };

    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    console.log(values, 'Values additional form');
    // mute it after testing
    dispatch(setAdditionalForm(values));
    try {
      const response: any = await apiClient.post(
        `merchant/additionaldetails/${userData.email}`,
        {
          request: req,
          signature: md5Hash,
        },
        { headers: { Authorization: `Bearer ${userData.jwt}` } },
      );
      console.log(response, 'response from additional details');
      if (response.data.responseCode === '009') {
        console.log(response, 'Addition Information Successfully hit');
        dispatch(setAdditionalForm(values));
        router.push('?activeTab=settlement-information');

        // setActiveStep((prev: any) => prev + 1);
      } else {
        console.log('Data submission failure');
      }
    } catch (e) {
      router.push('/login');
      console.log(e, 'Error');
    }
    // setActiveStep((prev: any) => prev + 1);
    setSubmitting(false);
  };

  const handleCheckboxChange = () => {
    // Toggle the state value when the checkbox is clicked
    setChecked(!isChecked);
  };
  return (
    <div>
      <Formik
        initialValues={AdditionalInfoInitialValues}
        validationSchema={additionalInfoSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pb-[4px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {' '}
                ADDITIONAL DETAILS{' '}
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
                  <FormWrapper>
                    <H6>Next of kin</H6>
                    <Input
                      label="Nominee Name"
                      name="nomineeName"
                      type="text"
                      error={formik.errors.nomineeName}
                      touched={formik.touched.nomineeName}
                    />
                    <Input
                      label="Nominee CNIC"
                      name="nomineeCNIC"
                      type="text"
                      error={formik.errors.nomineeCNIC}
                      touched={formik.touched.nomineeCNIC}
                    />
                    <DropdownInput
                      label="Relationship with Holder"
                      name="relationShipWithHolder"
                      options={[
                        { value: 'Father', label: 'Father' },
                        { value: 'Mother', label: 'Mother' },
                        { value: 'Brother', label: 'Brother' },
                        { value: 'Sister', label: 'Sister' },
                      ]}
                      formik={formik}
                      error={formik.errors.relationShipWithHolder}
                      touched={formik.touched.relationShipWithHolder}
                    />
                    <Input
                      label="Nominee Contact Number"
                      name="nomineeContactNumber"
                      type="text"
                      error={formik.errors.nomineeContactNumber}
                      touched={formik.touched.nomineeContactNumber}
                    />
                  </FormWrapper>
                  <FormWrapper>
                    <H6>For Legal Agreements</H6>
                    <Input
                      label="Company Postal Address"
                      name="companyPostalAddress"
                      type="text"
                      error={formik.errors.companyPostalAddress}
                      touched={formik.touched.companyPostalAddress}
                    />
                  </FormWrapper>
                  <FormWrapper>
                    <H6>Optional Information</H6>
                    <Input
                      label="Authorised Signatory Name "
                      name="authorisedSignatoryName"
                      type="text"
                      error={formik.errors.authorisedSignatoryName}
                      touched={formik.touched.authorisedSignatoryName}
                    />
                    <Input
                      label="Designation of Authorised Signatory"
                      name="designationOfAuthorisedSignatory"
                      type="text"
                      error={formik.errors.designationOfAuthorisedSignatory}
                      touched={formik.touched.designationOfAuthorisedSignatory}
                    />
                    <Input
                      label="CNIC of Authorised Signatory"
                      name="cnicOfAuthorisedSignatory"
                      type="text"
                      error={formik.errors.cnicOfAuthorisedSignatory}
                      touched={formik.touched.cnicOfAuthorisedSignatory}
                    />
                    <Input
                      label="Mobile Number of Authorised Signatory"
                      name="mobileNumberOfAuthorisedSignatory"
                      type="text"
                      error={formik.errors.mobileNumberOfAuthorisedSignatory}
                      touched={formik.touched.mobileNumberOfAuthorisedSignatory}
                    />

                    <Input
                      label="Land line  Number of Authorized Signatory"
                      name="landLineNumberOfAuthorizedSignatory"
                      type="text"
                      error={formik.errors.landLineNumberOfAuthorizedSignatory}
                      touched={
                        formik.touched.landLineNumberOfAuthorizedSignatory
                      }
                    />
                    <div className="flex flex-col gap-2">
                      <Input
                        label="Company Registration Address"
                        name="companyRegistrationAddress"
                        type="text"
                        error={formik.errors.companyRegistrationAddress}
                        touched={formik.touched.companyRegistrationAddress}
                      />
                      <CheckboxItem
                        description={
                          'Click here if same as registration address'
                        }
                        isChecked={isChecked}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                    </div>
                  </FormWrapper>
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  <Button
                    label={`Save & Continue Later`}
                    // onClickHandler={() =>
                    //   saveAndContinue(
                    //     formik.values,
                    //     formik.setSubmitting,
                    //     formik.validateForm,
                    //   )
                    // }
                    // type="button"
                    className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                    type="submit"
                    // className={`button-secondary ${'bg-primary-300'} w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
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

export default AdditionalDetails;
