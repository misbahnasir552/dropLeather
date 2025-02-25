import { Field } from 'formik';
import Image from 'next/image';
import React from 'react';

import TickIcon from '@/assets/icons/tick-icon.svg';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';

interface ICheckboxItem {
  description: string;
  isChecked: boolean;
  handleCheckboxChange: () => void;
  handleTermsAndConditionsChange?: () => void;
  span?: string;
  name: string;
  error?: string | undefined | string[];
  touched?: boolean | undefined;
}

function CheckboxItemSignUp({
  description,
  isChecked,
  handleCheckboxChange,
  // handleTermsAndConditionsChange,
  span,
  // touched,
  name,
  error,
}: ICheckboxItem) {
  console.log('error is', error);
  return (
    <>
      <div className="flex gap-2">
        {isChecked ? (
          <Field
            type="checkbox"
            name={name}
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-[1px] border-border-dark bg-primary-base"
            onClick={handleCheckboxChange}
          >
            <Image
              src={TickIcon}
              alt="checkbox"
              height={10}
              width={8}
              className="bg-primary-base"
            />
          </Field>
        ) : (
          <Field
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-[1px] border-border-dark bg-neutral-white-base"
            type="checkbox"
            name={name}
            // onClick={handleCheckboxChange}
          />
        )}
        <p className="text-xs font-semibold leading-tight text-secondary-base">
          {/* I agree to easypaisa Terms & Conditions */}
          {description}
        </p>
        {span ? (
          <p
            className="text-xs font-semibold leading-tight text-primary-base underline"
            // onClick={handleTermsAndConditionsChange}
          >
            {span}
          </p>
        ) : null}
      </div>
      <FormikErrorMessage name={name} />
    </>
  );
}

export default CheckboxItemSignUp;
