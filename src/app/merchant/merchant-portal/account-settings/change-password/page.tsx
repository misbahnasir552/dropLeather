'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';
import { resetForms } from '@/redux/features/formSlices/onBoardingForms';
import { generateMD5Hash } from '@/utils/helper';
import {
  changePasswordInitialValues,
  changePasswordSchema,
} from '@/validations/merchant/merchant-portal/account-settings/changePassword';
import type { IChangePassword } from '@/validations/merchant/merchant-portal/account-settings/interfaces';

export default function ChangePasswordPage() {
  const userData = useAppSelector((state) => state.auth); // Fetch email and other user details from Redux
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [route, setRoute] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [apierror, setApierror] = useState('');

  const onSubmit = async (values: IChangePassword) => {
    // Your form submission logic here
    const { confirmPassword, ...rest } = values;
    setIsLoading(true);
    const additionalValues = {
      // ...values,
      ...rest,
      username: userData?.email,
      managerMobile: userData?.managerMobile,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: userData?.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const requestBody = { request: additionalValues, signature: md5Hash };
    try {
      const response = await apiClient.post(
        '/merchant/changePassword',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );

      if (response?.data.responseCode === '009') {
        setShowModal(true);
        dispatch(setLogout());
        dispatch(resetForms());
        setIsLoading(false);
        setRoute('/login');
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
      } else {
        setIsLoading(false);
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setApierror(e?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      // setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={route}
      />
      <HeaderWrapper heading="Change Password" />

      <Formik
        initialValues={changePasswordInitialValues}
        // enableReinitialize // Ensures form gets reinitialized when initialValues change
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
      >
        {({ resetForm, errors, touched, values }) => (
          <Form className="flex flex-col gap-6">
            <FormLayout>
              <div className="flex flex-col gap-4">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  error={errors?.currentPassword}
                  onKeyDown={() => {
                    touched.currentPassword = true;
                  }}
                  hasImage={true}
                  image={eye}
                  // isDisabled={true} // Disable as it's autofilled
                />
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  error={errors?.newPassword}
                  onKeyDown={() => {
                    touched.newPassword = true;
                  }}
                  hasImage={true}
                  image={eye}
                />
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  error={errors?.confirmPassword}
                  onKeyDown={() => {
                    touched.confirmPassword = true;
                  }}
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
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {touched.confirmPassword}
                </div>
              </div>
            </FormLayout>
            {isLoading && <BarLoader color="#21B25F" />}

            <div className="flex w-full justify-end gap-6">
              <Button
                label="Reset"
                onClickHandler={() => resetForm()}
                className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
              />
              <Button
                disable={isLoading}
                label="Change Password"
                type="submit"
                isDisabled={
                  Object.values(values).some((v) => v === '') ||
                  Object.keys(errors).length !== 0
                }
                className="button-primary w-[270px] py-[19px] text-sm leading-tight"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
