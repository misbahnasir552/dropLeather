import 'react-datepicker/dist/react-datepicker.css';

import type { FormikProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-datepicker';

interface DatePickerInputProps {
  label: string;
  name: string;
  touched?: boolean;
  error?: string | boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  name,
  touched,
  error,
}) => {
  return (
    <>
      <Field
        name={name}
        className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
          touched && error ? 'border-danger-base' : ''
        }`}
        // className={`h-[60px] bg-primary-400 w-full rounded-lg p-5 font-medium text-neutral-black-base focus:outline-none ${
        //   touched && error ? "border-danger-base" : ""
        // }`}
      >
        {({
          form,
          field,
        }: {
          field: { value: any; onChange: (val: any) => void };
          form: FormikProps<any>;
        }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <>
              {/* <input type='date'/> */}
              <ReactDatePicker
                {...field}
                id={name}
                // isClearable
                // placeholderText={label}
                className={`h-[60px] w-full rounded-lg border border-border-light p-5 font-medium text-neutral-black-base focus:outline-none ${
                  touched && error ? 'border-danger-base' : ''
                }`}
                selected={value}
                onChange={(val) => {
                  setFieldValue(name, val);
                }}
              />
            </>
          );
        }}
      </Field>
      <label
        htmlFor={label}
        className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-[18px] text-secondary-base transition-all duration-100 ease-in-out"
      >
        {label}
      </label>
      <ErrorMessage
        name={name}
        component="span"
        className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
      />
    </>
  );
};

export default DatePickerInput;
