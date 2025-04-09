'use client';

import { Form, Formik } from 'formik';
import React from 'react';

import Button from '@/components/UI/Button/PrimaryButton';
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { DeLinkAccountReportForm } from '@/interfaces/interface';
import {
  deLinkAccountInitialValues,
  deLinkAccountSchema,
} from '@/validations/merchant/transactions/deLinkAccount';

function page() {
  const onSubmit = (values: DeLinkAccountReportForm) => {
    console.log('i am outlet page', values);
  };
  const handleReset = (Formik: any) => {
    console.log('RESET', Formik);

    Formik.resetForm();
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="De-Link Account Report"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <MerchantFormLayout>
          <Formik
            initialValues={deLinkAccountInitialValues}
            validationSchema={deLinkAccountSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="mb-9 flex flex-row gap-5  bg-screen-grey ">
                  <Input
                    label="Customer Mobile"
                    name="CustomerMobile"
                    formik={formik}
                    type="text"
                    error={formik.errors.CustomerMobile}
                    touched={false}
                  />
                  <Input
                    label="Token Number"
                    name="TokenNumber"
                    formik={formik}
                    type="text"
                    error={'hi'}
                    touched={false}
                  />

                  <Input
                    label="Store Name"
                    name="StoreName"
                    formik={formik}
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                </div>
                <div className="flex w-full justify-start gap-6">
                  <Button
                    label="Search"
                    type="submit"
                    className="button-primary h-9 w-[120px]  px-3 py-[19px] text-sm"
                  />
                  {/* <Button
                    label="Export"
                    routeName="/login"
                    className="button-secondary h-9 w-[120px]  px-2 py-[11px] text-xs leading-tight"
                  /> */}
                  <Button
                    label="Reset"
                    // routeName="/login"
                    onClickHandler={() => handleReset(formik)}
                    className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                  />
                </div>
              </Form>
            )}
          </Formik>
          {/* <Input name="asd" label="ASD" formik='xyz'/> */}
        </MerchantFormLayout>
        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>

      <div className="flex pt-[40px]">{/* <MerchantRecordTable /> */}</div>
    </>
  );
}

export default page;
