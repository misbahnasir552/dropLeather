'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import apiClient from '@/api/apiClient';
import B1 from '@/components/UI/Body/B1';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';
import { generateMD5Hash } from '@/utils/helper';
import resetPasswordSchema, {
  resetPasswordInitialValues,
} from '@/validations/merchant/home/reset-password/resetPassword';

export default function ResetPassword() {
  const userData = useAppSelector((state: any) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [route, setRoute] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    try {
      const additionalValues = {
        newPassword: values.newPassword,
        username: userData?.email,
        // managerMobile: userData?.managerMobile,
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      // Replace with actual API call for resetting the password
      const response = await apiClient.post(
        `/auth/changePasswordMerchant`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );

      if (response.data.responseCode === '009') {
        // router.push(`/login`);
        setShowModal(true);
        setTitle('Password Updated!');
        setDescription(response.data.responseMessage);
        dispatch(setLogout());
        setRoute('/login');
      } else {
        setShowModal(true);
        setTitle('Retry');
        setDescription(response.data.responseMessage);
      }
    } catch (e: any) {
      setShowModal(true);
      setTitle(e.code);
      setDescription(e.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={route}
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
              <div className="flex flex-col gap-4 bg-screen-grey px-[190px] py-[60px]">
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  // error={formik.errors.newPassword}
                  // touched={formik.touched.newPassword}
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  // error={formik.errors.confirmPassword}
                  // touched={formik.touched.confirmPassword}
                />
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  label="Submit"
                  type="submit"
                  isDisabled={!formik.isValid}
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
