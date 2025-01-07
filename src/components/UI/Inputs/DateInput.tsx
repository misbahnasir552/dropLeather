'use client';

import { ErrorMessage, Field } from 'formik';
import type { ForwardRefRenderFunction } from 'react';
import React, { forwardRef } from 'react';

interface IDateInputProps {
  label: string;
  name: string;
  touched: boolean;
  error: boolean;
}

const DateInput: ForwardRefRenderFunction<unknown, IDateInputProps> = (
  { label, name, touched, error },
  ref,
) => (
  <div>
    <Field
      ref={ref}
      name={name}
      // type={isPasswordVisible ? 'text' : type}
      id={label}
      className={`h-[60px] rounded-lg p-5 font-medium text-neutral-black-base focus:outline-none ${
        touched && error ? 'border-danger-base' : ''
      }`}
      placeholder=""
      autoComplete="off"
      disabled={false}
    />
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
  </div>
);

export default forwardRef(DateInput);
