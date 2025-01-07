'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import H7 from '@/components/UI/Headings/H7';
import type { IInput } from '@/interfaces/interface';

const MerchantInput = ({
  label,
  type,
  name,
  error,
  touched,
  hasImage,
  subString,
  image,
  eyeinput,
}: IInput) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleImageClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div
        className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none ${
          touched && error ? 'border-danger-base' : ''
        }`}
      >
        <input
          name={name}
          type={isPasswordVisible ? 'text' : type}
          id={label}
          className={`font-medium ${
            eyeinput ? 'w-[95%]' : 'w-full'
          } h-[60px] rounded-lg p-5 focus:outline-none ${
            touched && error ? 'border-danger-base' : ''
          }`}
          placeholder=""
          autoComplete="off"
          disabled={false}
        />
        <label
          htmlFor={label}
          className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-tight text-secondary-base transition-all duration-100 ease-in-out"
        >
          {label}
          {subString && (
            <H7
              medium={true}
              textColor="text-secondary-500"
              className={` sm:max-md:hidden`}
            >
              {' '}
              {subString}
            </H7>
          )}
        </label>
        {hasImage && image && (
          <div className="absolute right-5 top-[55%] z-20 -translate-y-1/2">
            <Image
              src={image}
              alt="Image"
              className="h-6 w-6 "
              onMouseDown={handleImageClick}
              onMouseUp={() => setIsPasswordVisible(false)}
            />
          </div>
        )}
      </div>
      {/* <FormikErrorMessage name={name} /> */}
    </div>
  );
};

export default MerchantInput;
