'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import Input from '@/components/UI/Inputs/Input';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import {
  failedTransactionsReportInitialValues,
  failedTransactionsReportSchema,
} from '@/validations/merchant/merchant-portal/account-settings/FailedTransactionsReport';

export default function page() {
  const onSubmit = () => {};
  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Add Product"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <FormLayout>
        <Formik
          initialValues={failedTransactionsReportInitialValues}
          validationSchema={failedTransactionsReportSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className=" bg-screen-grey">
              <div className="flex flex-col gap-4">
                <H6>Add Product Details</H6>
                <Input
                  label="Product Name"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={formik.touched.channel}
                  // formik={formik}
                />
                <Input
                  label="Amount"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Product Details"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Product Number"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Store Name/ID"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
              </div>
            </Form>
          )}
        </Formik>
      </FormLayout>
      <div className="flex w-full justify-end gap-6">
        <Button
          label="Reset"
          routeName="/login"
          className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
        />
        <Button
          label="Save"
          type="submit"
          className="button-primary w-[270px] py-[19px] text-sm leading-tight"
        />
      </div>
    </div>
  );
}
