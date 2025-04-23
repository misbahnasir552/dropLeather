'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Do Not Remove
// import CartIcon from '@/assets/icons/cartIcon.svg';
// import GlobalIcon from '@/assets/icons/global.svg';
import QrIcon from '@/assets/icons/scanning.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import type { BusinessNatureForm, ICheckboxData } from '@/interfaces/interface';
import {
  businessNatureInitialValues,
  businessNatureSchema,
} from '@/validations/merchant/onBoarding/businessNatureSchema';

const checkboxData: ICheckboxData[] = [
  // {/* Do not remove this code */ }
  // {
  //   value: 'onlinePayments',
  //   label: 'Online Payments',
  //   logo: GlobalIcon,
  // },
  {
    value: 'qrPayments',
    label: 'QR Payments',
    logo: QrIcon,
  },
  // {/* Do not remove this code */ }
  // {
  //   value: 'miniApps',
  //   label: 'Mini Apps',
  //   logo: CartIcon,
  // },
];

const AccountOptions = () => {
  const router = useRouter();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | string[] | undefined
  >();
  const handleSubmit = (values: BusinessNatureForm, { setSubmitting }: any) => {
    console.log(values);
    router.push(
      `/sign-up/personal-information/?option=${values.businessNature}`,
    );
    setSubmitting(false);
  };
  console.log('selected value checkbox input', selectedCheckValue);
  console.log('setSelectedCheckValue ', setSelectedCheckValue);

  return (
    <div className="flex flex-col gap-6 py-[76px]">
      <HeaderWrapper
        heading="What would you like to sign up for?"
        description="Select the easypaisa products you are interested in."
      />
      <Formik
        initialValues={businessNatureInitialValues}
        validationSchema={businessNatureSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <FormWrapper>
              <div className="flex w-full flex-col items-center justify-center gap-8">
                <div className="flex w-full flex-col items-start justify-between space-y-4">
                  {/* Do not remove this code */}
                  {/* <H6>Please Select One Option</H6> */}
                  <H6>Please Select Option</H6>
                  <CheckboxInput
                    setSelectedCheckValue={setSelectedCheckValue}
                    name="businessNature"
                    options={checkboxData}
                    form={formik}
                    error={formik.errors.businessNature}
                  />
                </div>
                <Button
                  label="Next"
                  type="submit"
                  className="button-primary w-[270px] px-3 py-[19px] text-sm"
                />
              </div>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountOptions;
