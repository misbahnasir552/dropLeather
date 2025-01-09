'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import {
  failedTransactionsReportInitialValues,
  failedTransactionsReportSchema,
} from '@/validations/merchant/merchant-portal/account-settings/FailedTransactionsReport';

function page() {
  const onSubmit = () => {};
  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Reversal Report"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <MerchantFormLayout>
        <Formik
          initialValues={failedTransactionsReportInitialValues}
          validationSchema={failedTransactionsReportSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className=" bg-screen-grey">
              <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey">
                <Input
                  label="Batch ID"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={formik.touched.channel}
                />
                <Input
                  label="Date Between"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="View By"
                  name="OutletName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
              </div>
              <div className="flex w-full justify-start gap-6">
                <Button
                  label="Search"
                  routeName="/login"
                  className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
                />
                {/* <Button
                  label="Export"
                  type="submit"
                  className="button-primary w-[270px] py-[19px] text-sm leading-tight"
                /> */}
                <Button
                  label="Reset"
                  type="submit"
                  className="button-primary w-[270px] py-[19px] text-sm leading-tight"
                />
              </div>
            </Form>
          )}
        </Formik>
      </MerchantFormLayout>
    </div>
  );
}

export default page;
