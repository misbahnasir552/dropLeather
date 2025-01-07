'use client';

import { Field } from 'formik';
import React from 'react';

import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
// import H7 from '@/components/UI/Headings/H7';
import type { IComment } from '@/interfaces/interface';

const CommentInput = ({ name, error, touched, placeholder }: IComment) => {
  return (
    <div className="flex w-full flex-col gap-[6px]">
      <div
        className={`relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
          touched && error ? 'border-danger-base' : ''
        }`}
        // className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
        //   touched && error ? "border-danger-base" : ""
        // }`}
      >
        <Field
          name={name}
          // type={isPasswordVisible ? "text" : type}
          type={'text'}
          className="w-full resize-none rounded-lg border-[1px] border-border-light px-5 py-6 outline-none placeholder:text-sm placeholder:font-medium placeholder:text-secondary-base focus:border-primary-base"
          placeholder={placeholder}
          autoComplete="off"
          disabled={false}
        />
      </div>
      <FormikErrorMessage name={name} />
    </div>
  );
};

export default CommentInput;
