'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import B3 from '@/components/UI/Body/B3';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import changePasswordSchema, {
  changePasswordInitialValues,
} from '@/validations/admin/auth/change-password';

function ChangePassword() {
  const router = useRouter();
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { jwt } = adminData;
  const { email } = adminData;
  const [apierror, setApierror] = useState('');

  const onSubmit = async (values: any) => {
    console.log('hi i am change password page');
    try {
      // Define the type for the request data
      type RequestData = {
        username: string | null;
        newPassword: string;
        currentPassword?: string; // currentPassword is optional
      };

      const requestData: RequestData = {
        username: email,
        newPassword: values.newPassword,
      };

      // Add currentPassword only if jwt is not 'null'
      if (jwt !== 'null') {
        requestData.currentPassword = values.currentPassword;
      }

      const response = await apiClient.post(
        'admin/changePassword',
        requestData,
      );

      if (response?.data?.responseCode === '000') {
        router.push(`/admin/admin-portal/auth/login`);
      } else {
        setApierror(response?.data?.responseMessage);
      }
    } catch (error) {
      console.log('Failure', error);
    }
  };

  return (
    <div className="flex flex-col px-[150px] py-[60px]">
      <Formik
        initialValues={changePasswordInitialValues}
        // validationSchema={changePasswordSchema}
        validationSchema={changePasswordSchema(jwt)}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex w-full flex-col gap-10 ">
            <H1>Change Password</H1>
            <div className="flex flex-col gap-4  bg-screen-grey px-[290px] py-[60px] ">
              {jwt ? (
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="text"
                  error={formik.errors.currentPassword}
                  touched={false}
                />
              ) : null}

              <div>
                <Input
                  label="New Password"
                  name="newPassword"
                  type="text"
                  error={formik.errors.newPassword}
                  touched={false}
                />
                <B3>
                  Password should include pattern of - lower case, upper case,
                  digits (0-9), Special Characters (@,#,$,!). It should contain
                  between 8 to 15 characters
                </B3>
              </div>
              <Input
                label="Confirm New password"
                name="confirmNewPassword"
                type="text"
                error={formik.errors.confirmNewPassword}
                touched={false}
              />
              <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                {apierror}
              </div>
            </div>
            <div className="flex w-full justify-end gap-6">
              <Button
                label="Cancel"
                routeName="/admin/admin-portal/auth/login"
                className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
              />
              <Button
                label="Change Password"
                type="submit"
                className="button-primary w-[270px] py-[19px] text-sm leading-tight"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
