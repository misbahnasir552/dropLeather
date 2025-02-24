'use client';

// import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch } from '@/hooks/redux';
import { addFormData } from '@/redux/features/signUpSlice';
import {
  signUpInitialValues,
  signUpSchema,
} from '@/validations/merchant/auth/signUpSchema';

const PersonalInfo = () => {
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [responseCode, setResponseCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: SignupForm, { setSubmitting }: any) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('merchant/sendotp', {
        managerMobile: values.managerMobile,
        email: values.email,
      });
      // apiClient.post('merchant/sendotp', {
      //   managerMobile: values.managerMobile,
      //   email: values.email,
      // });

      if (response.data.responseCode === '009') {
        setResponseCode('009');
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
        setTitle(response.data.responseCode);
        setDescription(response.data.responseDescription);
        setShowModal(true);
      }
    } catch (e: any) {
      console.log('Error submitting form', e);
      setTitle(e.code);
      setDescription(e.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
      // setShowModal(true);
    }
    setSubmitting(false);
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      {isLoading && (
        <p className="bg-primary-600 p-4 text-screen-white">LOADING.......</p>
      )}
      {showModal && (
        <CustomModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          responseCode={responseCode}
        />
      )}
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
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
                show
              />
              <FormWrapper>
                <div className="flex w-full flex-col items-start justify-between gap-4">
                  <div className=" text-base font-semibold leading-tight text-secondary-base ">
                    Personal Information
                  </div>
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                  />
                  <Input
                    label="Merchant Name"
                    name="merchantName"
                    type="text"
                    error={formik.errors.merchantName}
                    touched={formik.touched.merchantName}
                  />
                  <Input
                    label="Mobile Number"
                    name="managerMobile"
                    type="text"
                    error={formik.errors.managerMobile}
                    touched={formik.touched.managerMobile}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                  <Input
                    label="Website"
                    name="website"
                    type="text"
                    error={formik.errors.website}
                    touched={formik.touched.website}
                  />
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex w-full flex-col gap-4">
                  <div className=" text-base font-semibold leading-tight text-secondary-base">
                    Set your Login Password
                  </div>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    error={formik.errors.confirmPassword}
                    touched={formik.touched.confirmPassword}
                  />
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className=" text-base font-semibold leading-tight text-secondary-base">
                    Terms & Conditions
                  </div>
                  <div className="bg-neutral-white-base p-6">
                    <div className="text-xs leading-tight text-secondary-base">
                      In using this website, you are deemed to have read and
                      agreed to the following terms and conditions. The
                      following terminology applies to these Terms and
                      Conditions, Privacy Statement and applies to these Terms
                      and Conditions Disclaimer Notice and any or all Agree
                      Notice and any other terms and In using this website, you
                      are deemed to have read and agreed to the following terms
                      and conditions. The following terminology applies to these
                      Terms and Conditions, Privacy Statement and applies to
                      these Terms and Conditions Disclaimer Notice and any or
                      all Agree Notice and any other terms and In using this
                      website, you are deemed to have read and agreed to the
                      following terms and conditions. The following terminology
                      applies to these Terms and Conditions, Privacy Statement
                      and applies to these Terms and Conditions Disclaimer
                      Notice and any or all Agree Notice and any other terms and
                      In using this website, you are deemed to have read and
                      agreed to the following terms and co
                    </div>
                  </div>
                  <CheckboxItem
                    description={'I agree to easypaisa Terms & Conditions'}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                  {/* <div className="flex gap-2">
                    {isChecked ? (
                      <div
                        className="flex h-4 w-4 items-center justify-center rounded-sm border-[1px] border-border-dark bg-primary-base"
                        onClick={handleCheckboxChange}
                      >
                        <Image
                          src={TickIcon}
                          alt="checkbox"
                          height={10}
                          width={8}
                          className="bg-primary-base"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-4 w-4 items-center justify-center rounded-sm border-[1px] border-border-dark bg-neutral-white-base"
                        onClick={handleCheckboxChange}
                      ></div>
                    )}
                    <p className="text-xs font-semibold leading-tight">
                      I agree to easypaisa Terms & Conditions
                    </p>
                  </div> */}
                </div>
              </FormWrapper>
              <div className="flex flex-col justify-center gap-9 sm:items-center sm:px-5 md:items-end md:px-[150px]">
                {/* <div className="w-full">VERIFY COMPONENT</div> */}
                <Button
                  label={`Next`}
                  type="submit"
                  isDisabled={!isChecked}
                  className={`button-primary ${
                    isLoading && 'bg-neutral-black-300'
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
