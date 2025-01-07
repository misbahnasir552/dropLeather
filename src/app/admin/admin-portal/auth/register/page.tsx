'use client';

// import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
// import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import {
  registerInitialValues,
  registerSchema,
} from '@/validations/admin/auth/register';

const Register = () => {
  // const [isChecked, setChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('i am here to reg');
    try {
      setIsLoading(true);
      const response = await apiClient.post('admin/register', {
        managerMobile: values.managerMobile,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        adminRole: values.adminRole,
      });

      if (response.data.responseCode === '009') {
        router.push('/admin/auth/login');
      } else {
        console.log('hello');
      }
    } catch (e: any) {
      console.log('Error submitting form', e);
    } finally {
      setIsLoading(false);
      // setShowModal(true);
    }
    setSubmitting(false);
  };

  // const handleCheckboxChange = () => {
  //   setChecked(!isChecked);
  // };

  return (
    <div className="flex flex-col px-[150px] ">
      <div className="flex pb-[40px] pt-[48px]">
        <H1>Register Admin</H1>
      </div>
      <Formik
        initialValues={registerInitialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
              <div className="flex w-full flex-col gap-5 px-[290px]">
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
                  label="Email"
                  name="username"
                  type="text"
                  error={formik.errors.username}
                  touched={formik.touched.username}
                />
                <Input
                  label="Mobile Number"
                  name="managerMobile"
                  type="text"
                  error={formik.errors.managerMobile}
                  touched={formik.touched.managerMobile}
                />
                <Input
                  label="Password"
                  name="password"
                  type="text"
                  error={formik.errors.password}
                  touched={formik.touched.password}
                />
                <DropdownInput
                  label="Admin Role"
                  name="adminRole"
                  options={[
                    { value: 'maker', label: 'Maker' },
                    { value: 'checker', label: 'Checker' },
                  ]}
                  formik={formik}
                  error={formik.errors.adminRole}
                  touched={formik.touched.adminRole}
                />

                <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
                  {/* <div className="w-full">VERIFY COMPONENT</div> */}
                  <Button
                    label={`Register`}
                    type="submit"
                    // isDisabled={!isChecked}
                    className={`button-primary ${
                      isLoading && 'bg-neutral-black-300'
                    } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
