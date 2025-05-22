'use client';

import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch } from '@/hooks/redux';
import { addFormData } from '@/redux/features/signUpSlice';
import { downloadEncryptedFile } from '@/utils/helper';
// import { generateAESEncryption } from '@/utils/helper';
import {
  signUpInitialValues,
  signUpSchema,
} from '@/validations/merchant/auth/signUpSchema';

const PersonalInfo = () => {
  const [apierror, setApierror] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showErrorModal = (title: string, description: string) => {
    setTitle(title);
    setDescription(description);
    setShowModal(true);
  };

  useEffect(() => {
    console.log('ischecked is', isChecked, setChecked);
  }, [isChecked]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    // if (isSubmitted) return; // Preventing multiple calls
    setIsSubmitted(true);
    setIsLoading(true);

    try {
      const response = await apiClient.post('merchant/register/inquire', {
        merchantName: values.merchantName,

        mobileNumber: values.managerMobile,

        website: values.website,

        email: values.email,
      });

      if (response?.data?.responseCode === '009') {
        try {
          const response = await apiClient.post('merchant/sendotp', {
            managerMobile: values.managerMobile,
            email: values.email,
          });

          if (response?.data.responseCode === '009') {
            dispatch(
              addFormData({
                ...values,
                merchantType: searchParams.get('option') || 'optionNotDefined',
              }),
            );
            router.push(
              `/sign-up/personal-information/otp/?expiry=${response.data.expirationTime}`,
            );
          } else {
            showErrorModal('Failed', response.data.responseDescription);
            setIsSubmitted(false); // Allow retry on failure
          }
        } catch (e: any) {
          console.error('Error during submission:', e, isSubmitted);
          showErrorModal('Network Failed', e.message);
          setIsSubmitted(false); // Allow retry on failure
        } finally {
          setIsLoading(false);
          setSubmitting(false);
        }
      } else if (response?.data?.responseCode === '000') {
        setApierror(response?.data?.responseMessage);
      }
    } catch (e: any) {
      setApierror(e?.message);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleTermsAndConditionsChange = () => {
    downloadEncryptedFile({
      filename: 'Online Payment Services Agreement.pdf',
      email: 'termsandconditions@gmail.com',
    });
  };

  return (
    <>
      {isLoading && (
        <p className="bg-primary-600 p-4 text-screen-white">LOADING.......</p>
      )}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // image={displayIcon}
      />
      <Formik
        initialValues={signUpInitialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex w-full flex-col gap-6 sm:pb-[60px] md:pb-[76px]">
              <HeaderWrapper
                heading="Please fill in the Information below"
                show
              />
              <FormWrapper>
                <div className="flex w-full flex-col items-start justify-between gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Personal Information
                  </div>
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    asterik
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    asterik
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                  />
                  <Input
                    label="Merchant / Business Name"
                    name="merchantName"
                    type="text"
                    asterik
                    error={formik.errors.merchantName}
                    touched={formik.touched.merchantName}
                  />
                  <Input
                    label="Mobile Number"
                    name="managerMobile"
                    type="text"
                    asterik
                    placeholder="92XXXXXXXXXX"
                    error={formik.errors.managerMobile}
                    touched={formik.touched.managerMobile}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    asterik
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                  {/* <Input
                    label="Website"
                    name="website"
                    type="text"
                    error={formik.errors.website}
                    touched={formik.touched.website}
                  /> */}
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex w-full flex-col gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Set your Login Password
                  </div>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    asterik
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    image={eye}
                    hasImage={true}
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    asterik
                    error={formik.errors.confirmPassword}
                    touched={formik.touched.confirmPassword}
                    image={eye}
                    hasImage={true}
                  />
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Terms & Conditions
                  </div>
                  <div className="bg-neutral-white-base p-6">
                    <div className="text-xs leading-tight text-secondary-base">
                      By accessing this website, you agree to abide by our Terms
                      and Conditions, Privacy Policy, and all related notices.
                      These terms outline the rules and policies governing your
                      use of this site
                    </div>
                  </div>
                  {/* <CheckboxItem
                    description="I agree to easypaisa"
                    span="Terms & Conditions"
                    handleTermsAndConditionsChange={
                      handleTermsAndConditionsChange
                    }
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                  /> */}
                  <CheckboxItem
                    description="I agree to easypaisa"
                    span="Terms & Conditions"
                    handleTermsAndConditionsChange={
                      handleTermsAndConditionsChange
                    }
                    isChecked={formik.values.termsAndConditions}
                    handleCheckboxChange={() =>
                      formik.setFieldValue(
                        'termsAndConditions',
                        !formik.values.termsAndConditions,
                      )
                    }
                  />
                  {formik.touched.termsAndConditions &&
                    formik.errors.termsAndConditions && (
                      <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                        {formik.errors.termsAndConditions}
                      </div>
                    )}
                </div>
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
              </FormWrapper>
              <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
                <Button
                  label="Next"
                  type="submit"
                  // isDisabled={!isChecked || isLoading} // Disable when loading
                  // isDisabled={!isChecked || !formik.isValid || isLoading} // Disable when loading
                  className={`button-primary ${
                    isLoading ? 'cursor-not-allowed bg-neutral-black-300' : ''
                  } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfo;
