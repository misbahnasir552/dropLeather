'use client';

import { Field } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

// import { useField } from 'formik';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
// import H7 from '@/components/UI/Headings/H7';
import type { IInput } from '@/interfaces/interface';

import H6 from '../Headings/H6';

// import FormikErrorMessage from '../Formik/ErrorHandling/FormikErrorMessage';

const Input = ({
  desclaimer,
  asterik = false,
  label,
  formik,
  type,
  name,
  error,
  touched,
  hasImage,
  subString,
  image,
  eyeinput,
  isDisabled = false,
  // value,
  placeholder = '',
  onKeyDown,
}: IInput) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = () => {
    setIsPasswordVisible((prev) => !prev);
    console.log(formik);
  };

  return (
    <div className="flex w-full flex-col gap-[6px]">
      <div
        className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
          touched && error ? 'border-danger-base' : ''
        }`}
      >
        <Field
          // value={value}
          // value={applicationFormData[name] || formik?.values[name]}
          // value={formik?.values[name] || ''}
          name={name}
          type={isPasswordVisible ? 'text' : type}
          id={label}
          className={`font-medium ${
            eyeinput ? 'w-[95%]' : 'w-full'
          } h-[60px] rounded-lg p-5 pr-[48px] focus:outline-none ${
            touched && error ? 'border-danger-base' : ''
          }appearance-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-password-toggle-button]:hidden`}
          placeholder={showPlaceholder ? placeholder : ''}
          autoComplete="off"
          disabled={isDisabled}
          onFocus={() => setShowPlaceholder(true)}
          onBlur={() => setShowPlaceholder(false)}
          onKeyDown={onKeyDown}
        />
        {/* <label
          htmlFor={label}
          className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-tight text-secondary-base transition-all duration-100 ease-in-out"
        >
          {`${label} ${subString || ''}`}
        </label> */}

        <label
          htmlFor={label}
          className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-tight text-secondary-base transition-all duration-100 ease-in-out"
        >
          <div className="flex gap-2">
            {`${label} ${subString || ''}`}{' '}
            {asterik && <H6 textColor="text-danger-base">*</H6>}
          </div>
        </label>
        {hasImage && image && (
          <div className="pointer-events-auto absolute right-5 top-[50%] z-10 -translate-y-1/2 will-change-transform">
            <Image
              src={image}
              alt="Image"
              className="h-6 w-6"
              onMouseDown={handleImageClick}
              onMouseUp={() => setIsPasswordVisible(false)}
            />
          </div>
        )}
      </div>
      <div className="flex text-xs text-neutral-white-600">{desclaimer}</div>
      <FormikErrorMessage name={name} />
    </div>
  );
};

export default Input;
