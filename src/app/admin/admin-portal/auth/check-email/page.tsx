'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';

import apiClient from '@/api/apiClient';
import B1 from '@/components/UI/Body/B1';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import Input from '@/components/UI/Inputs/Input';
//
import checkEmailSchema, {
  checkEmailInitialValues,
} from '@/validations/admin/auth/checkEmail';

export default function CheckEmail() {
  // const [apierror, setApierror] = useState('');
  const router = useRouter();
  const onSubmit = async (values: any) => {
    try {
      const response = await apiClient.get(`/admin/checkEmail/${values.email}`);
      if (response?.data?.responseCode === '009') {
        // router.push(`/admin/admin-portal/auth/change-password`);
        router.push(
          `/admin/admin-portal/auth/change-password/?email=${values.email}`,
        );
      }
    } catch (error) {
      console.log('Failure', error);
    }
  };
  return (
    <div className="flex flex-col gap-6 px-[150px] py-6">
      <div className="flex flex-col gap-2">
        <H1>Forgot Password</H1>
        {/* <div className='flex flex-col gap-2'> */}
        <div>
          <B1>
            To reset your password, enter the username you use to sign in to
            Telenor Easypaisa Account. Your username is your email address that
            is associated with this account
          </B1>
          <br />
          <B1>
            For further details you can contact us on &nbsp;
            <span>correspondence@telenor.com.pk</span>
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
