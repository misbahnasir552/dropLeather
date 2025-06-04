'use client';

import { Field } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

// import { useField } from 'formik';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
// import H6 from '@/components/UI/Headings/H6';
// import H7 from '@/components/UI/Headings/H7';
import type { IInput } from '@/interfaces/interface';

import H3 from '../Headings/H3';

const Input = ({
  // desclaimer,
  // asterik = false,
  required = false,
  label,
  formik,
  type,
  name,
  error,
  touched,
  hasImage,
  subString,
  icon,
  // image,
  eyeinput,
  isDisabled = false,
  // value,
  placeholder = '',
  onKeyDown,
}: IInput) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  // const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = () => {
    setIsPasswordVisible((prev) => !prev);
    console.log(formik, setShowPlaceholder);
  };

  return (
    <div className="flex w-full flex-col gap-[10px]">
      {label && (
        <label
          htmlFor={label}
          className="pointer-events-none h-full origin-left text-base font-light leading-tight text-secondary-base transition-all duration-100 ease-in-out"
        >
          <div className="flex flex-row gap-1">
            {`${label} ${subString || ''}`}{' '}
            {required && (
              <>
                <H3 textColor="text-danger-base">*</H3>
                <span>(Required)</span>
              </>
            )}
          </div>
        </label>
      )}

      <div
        // className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
        className={` relative w-full rounded-lg border-[0.79px] border-neutral-white-100  hover:shadow-sm focus:shadow-sm focus:outline-none ${
          touched && error ? 'border-danger-base' : ''
        }`}
      >
        <div>
          {hasImage && icon && (
            <div className="pointer-events-auto absolute left-5 top-[50%] z-10 -translate-y-1/2 will-change-transform">
              <Image
                src={icon}
                alt="Image"
                className="h-[14px] w-[14px]"
                onMouseDown={handleImageClick}
                onMouseUp={() => setIsPasswordVisible(false)}
              />
            </div>
          )}
          <Field
            // value={value}
            // value={applicationFormData[name] || formik?.values[name]}
            // value={formik?.values[name] || ''}
            name={name}
            type={isPasswordVisible ? 'text' : type}
            id={label}
            className={`font-medium ${
              eyeinput ? 'w-[95%]' : 'w-full'
            } h-[40px] rounded-lg p-5 ${
              hasImage ? 'pl-[48px]' : ''
            } focus:outline-none ${
              touched && error ? 'border-danger-base' : ''
            }appearance-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-password-toggle-button]:hidden`}
            placeholder={showPlaceholder ? placeholder : ''}
            autoComplete="off"
            disabled={isDisabled}
            // onFocus={() => setShowPlaceholder(true)}
            // onBlur={() => setShowPlaceholder(false)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
      {/* <div className="ml-2 flex text-xs text-neutral-white-600">
        {desclaimer}
      </div> */}
      <FormikErrorMessage name={name} />
    </div>
  );
};

export default Input;
