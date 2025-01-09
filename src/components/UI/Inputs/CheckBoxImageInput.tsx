'use client';

import type { FormikProps } from 'formik';
import { ErrorMessage, Field } from 'formik';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import type {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import React from 'react';

// import TickIcon from '@/assets/icons/tick-icon.svg';
import H7 from '@/components/UI/Headings/H7';
import { useAppSelector } from '@/hooks/redux';

interface ICheckBoxImageInput {
  name: string;
  // options: any;
  options: Array<{
    index: any;
    value: Key | null | undefined;
    logo: string | StaticImport | ReactNode;
    email: any;
    label:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | PromiseLikeOfReactNode
      | null
      | undefined;
  }>;
  error?: string;
  form?: FormikProps<any>;
  isMulti?: boolean;
  setSelectedCheckValue: React.Dispatch<
    React.SetStateAction<string | undefined | string[]>
  >;
}

const CheckBoxImageInput: React.FC<ICheckBoxImageInput> = ({
  name,
  options,
  form,
  error,
  setSelectedCheckValue,
  isMulti = false,
}) => {
  console.log('OPTION CHECKKK', options);

  const formData = useAppSelector((state) => state.onBoardingForms);
  // Handle checkbox change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    setSelectedCheckValue(optionValue);

    const isChecked = e.target.checked;

    // Ensure the value is initialized as an array if it's a multi-select checkbox
    const currentValues = form?.values[name] || (isMulti ? [] : '');

    if (isMulti) {
      if (isChecked) {
        form?.setFieldValue(name, [...currentValues, optionValue]);
      } else {
        form?.setFieldValue(
          name,
          currentValues.filter((value: string) => value !== optionValue),
        );
      }
    } else {
      form?.setFieldValue(name, optionValue);
    }
  };

  const handleDownload = (option: any, email: any) => {
    console.log('email is', email, 'OPTION', option);
    // const downloadUrl = `http://api-gateway-opsdev.telenorbank.pk/corporate/downloadCorporateFile?filename=${filename}&email=${encodeURIComponent(
    const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${
      // const downloadUrl = `https://api-gateway-opsdev.telenorbank.pk/corporate/downloadCorporateFile?filename=${-
      option.label
    }&email=sampledocuments@gmail.com&type=${
      formData?.businessNature === 'soleProprietor'
        ? 'soleProprietor'
        : 'otherThanSole'
    }`;

    window.open(downloadUrl, '_blank');
  };

  // console.log("OPTIONS ", options, React.isValidElement(options[0]?.logo));

  return (
    <div className="flex w-full flex-col gap-4">
      {options?.map(
        (option: {
          index: any;
          value: Key | null | undefined;
          logo: string | StaticImport | ReactNode;
          email: any;
          label:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined;
        }) => (
          <label
            className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"
            key={option.value}
          >
            <div className="flex items-center gap-4">
              {/* {
                <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
                  <div className="h-[8px] w-[10px]">
                    <Image
                      src={TickIcon}
                      width={100}
                      height={100}
                      alt="tick-icon"
                    />
                  </div>
                </div>
              } */}

              <div className="text-white flex h-6 w-6 items-center justify-center">
                <span className="text-sm font-medium">
                  {option?.index !== undefined ? option.index + 1 : ''}.
                </span>
                {/* <span className="text-sm font-medium">{option?.index + 1}.</span> */}
              </div>
              <Field
                className="hidden"
                type="checkbox"
                name={name}
                value={option.value}
                checked={
                  isMulti
                    ? form?.values[name]?.includes(option.value)
                    : form?.values[name] === option.value
                }
                onChange={handleChange}
              />
              <H7 medium={true}>{option.label}</H7>
            </div>

            {/* {option?.logo && (
              <Image
                width={24}
                height={24}
                src={option?.logo}
                alt="left-icon"
              />
            )} */}
            {option.logo ? (
              React.isValidElement(option.logo) ? (
                // option?.logo
                <div onClick={() => handleDownload(option, option?.email)}>
                  {/* <div onClick={() => handleDownload(option.label as string)}> */}
                  {option.logo}
                </div>
              ) : (
                <Image
                  width={24}
                  height={24}
                  src={option.logo as string | StaticImport}
                  alt="left-icon"
                />
              )
            ) : null}
          </label>
        ),
      )}
      {error && (
        <ErrorMessage
          name={name}
          component="div"
          className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
        />
      )}
    </div>
  );
};

export default CheckBoxImageInput;
