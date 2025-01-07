'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import {
  signUpInitialValues,
  signUpSchema,
} from '@/validations/merchant/auth/signUpSchema';

const SignUpForm = ({ onSubmit }: any) => {
  return (
    <div className="flex flex-col place-items-center bg-neutral-white-base p-3">
      <div className="text-5xl font-semibold text-primary-base">Sign Up</div>
      <Formik
        initialValues={signUpInitialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="mx-auto mt-8 max-w-md space-y-4 px-10 py-6 shadow-lg">
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

            {/* <button
              type="submit"
              disabled={!formik.isValid}
              className={`${
                !formik.isValid ? 'bg-neutral-black-300' : 'bg-primary-base'
              } text-sm leading-tight font-semibold w-full text-neutral-white-base p-2 rounded-md hover:bg-blue-600 transition duration-300`}
            >
              Sign Up
            </button> */}
            <Button
              routeName="/home"
              label="Sign up"
              type="submit"
              isDisabled={!formik.isValid}
              className={`button-primary w-full px-4 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
