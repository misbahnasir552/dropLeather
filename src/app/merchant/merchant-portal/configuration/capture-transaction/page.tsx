'use client';

import { Form, Formik } from 'formik';
import React from 'react';

// import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from "@/components/UI/Headings/H6";
import Input from '@/components/UI/Inputs/Input';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { CaptureTransactionForm } from '@/interfaces/interface';
import {
  captureTransactionsInitialValues,
  captureTransactionsSchema,
} from '@/validations/merchant/transactions/captureTransation';

function page() {
  const onSubmit = (values: CaptureTransactionForm) => {
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
          heading="Capture/Void Transaction"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />

        <MerchantFormLayout>
          {/* <H6>Transaction Point Details</H6> */}
          {/* <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" />
        <PrimaryInput name="xyz" label="Momin" /> */}
          <Formik
            initialValues={captureTransactionsInitialValues}
            validationSchema={captureTransactionsSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className=" bg-screen-grey">
                <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}

                  <Input
                    label="Card Number"
                    name="CardNumber"
                    type="text"
                    // error={"hi"}
                    formik={formik}
                    // touched={formik.touched.CardNumber}
                  />
                  <Input
                    label="Merchant Name"
                    name="MerchantName"
                    formik={formik}
                    type="text"
                    error={formik.errors.CardNumber}
                    touched={false}
                  />

                  <Input
                    label="Order Id"
                    name="OrderId"
                    formik={formik}
                    type="text"
                    error={'hi'}
                    touched={false}
                  />
                  <Input
                    label="Seller Code"
                    name="SellerCode"
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
                    className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                  />
                  <Button
                    label="Reset"
                    onClickHandler={() => handleReset(formik)}
                    // routeName="/login"
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
