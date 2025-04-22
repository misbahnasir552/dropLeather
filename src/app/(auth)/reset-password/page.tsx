'use client';

import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import B1 from '@/components/UI/Body/B1';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import { setLogout } from '@/redux/features/authSlice';
import resetPasswordSchema, {
  resetPasswordInitialValues,
} from '@/validations/merchant/home/reset-password/resetPassword';

export default function ResetPassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  const dispatch = useDispatch();
  const email = useSearchParams().get('email');
  const token = useSearchParams().get('token');

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const additionalValues = {
        newPassword: values?.newPassword,
        email: email || null,
        oldPassword: values?.oldPassword,
        confirmNewPassword: values?.confirmNewPassword,
      };
      const response = await apiClient.post(
        `merchant/resetPassword${token ? `?token=${token}` : ''}`,
        {
          request: additionalValues,
        },
      );

      if (response.data.responseCode === '009') {
        setShowModal(true);
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        dispatch(setLogout());
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setApierror(response.data.responseDescription);
      }
    } catch (e: any) {
      setIsLoading(false);
      setApierror(e.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={'/login'}
        isVisible={true}
      />
      <div className="flex flex-col gap-2">
        <H1>Reset Password</H1>
        <div>
          <B1>Enter a new password for your account.</B1>
        </div>
      </div>
      <div>
        <Formik
          initialValues={resetPasswordInitialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col ">
              <div className="flex flex-col gap-4 bg-screen-grey px-[20px] py-[60px] md:px-[190px]">
                <Input
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  error={formik.errors.oldPassword}
                  touched={formik.touched.oldPassword}
                  hasImage={true}
                  image={eye}
                />
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  error={formik.errors.newPassword}
                  touched={formik.touched.newPassword}
                  hasImage={true}
                  image={eye}
                />
                <Input
                  label="Confirm Password"
                  name="confirmNewPassword"
                  type="password"
                  error={formik.errors.confirmNewPassword}
                  touched={formik.touched.confirmNewPassword}
                  hasImage={true}
                  image={eye}
                />
                <span className="px-4 text-xs font-normal">
                  Password should include pattern of - lower case, upper case,
                  digits (0-9), Special Characters (@,#,$,!).It should contain
                  between 8 to 15 characters
                </span>
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  label="Submit"
                  type="submit"
                  isDisabled={isLoading}
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
