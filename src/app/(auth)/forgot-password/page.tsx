'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import B1 from '@/components/UI/Body/B1';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
//
import checkEmailSchema, {
  checkEmailInitialValues,
} from '@/validations/admin/auth/checkEmail';

export default function CheckEmail() {
  // const [apierror, setApierror] = useState('');
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      // email inquiry call
      const inquiryResponse = await apiClient.get(
        `/merchant/inquireAllRegisteredUsers?username=${values.email}`,
      );
      // account exist flow
      if (inquiryResponse.data.responseCode === '000') {
        try {
          // send otp call
          const otpResponse = await apiClient.post(
            `/corporate/send-otp?email=${values.email}`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          if (otpResponse?.data.success) {
            router.push(
              `otp/?expiry=${'2'}&email=${values.email}&option=corporatePortal`,
            );
          } else {
            // send otp failure
            setShowModal(true);
            setTitle(otpResponse?.data.responseCode);
            setDescription(otpResponse?.data.responseDescription);
          }
        } catch (e: any) {
          // send otp request failure
          setShowModal(true);
          setTitle(e.code);
          setDescription(e.message);
        }
      } else if (inquiryResponse.data.responseCode === '009') {
        // account doesn't exist flow
        setShowModal(true);
        setTitle('Error!');
        setDescription(inquiryResponse.data.responseDescription);
      } else {
        // account doesn't exist flow
        setShowModal(true);
        setTitle(inquiryResponse.data.responseCode);
        setDescription(inquiryResponse.data.responseDescription);
      }
    } catch (e: any) {
      // email inquiry request failure
      setShowModal(true);
      setTitle(e.code);
      setDescription(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 py-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/login"
        // routeName={route}
      />
      <div className="flex flex-col gap-2">
        <H1>Forgot Password</H1>
        {/* <div className='flex flex-col gap-2'> */}
        <div>
          <B1>
            To reset your password, enter the email you use to sign in to
            easypaisa Account.
          </B1>
        </div>
      </div>
      <div>
        <Formik
          initialValues={checkEmailInitialValues}
          validationSchema={checkEmailSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col ">
              <div className="flex bg-screen-grey px-[190px] py-[60px] ">
                <Input
                  label="Email Address"
                  name="email"
                  type="text"
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  label="Submit"
                  // routeName="/merchant/home"
                  type="submit"
                  isDisabled={!formik.isValid || isLoading}
                  className={`button-primary mt-[24px] w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
