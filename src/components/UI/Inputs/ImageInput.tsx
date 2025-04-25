import type { FormikProps } from 'formik';
import { Field } from 'formik';
// import Image, { StaticImageData } from 'next/image';
// import type { StaticImageData } from "next/image";
// import Image from "next/image";
import React from 'react';

import apiClient from '@/api/apiClient';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

import B3 from '../Body/B3';

interface IInput {
  name: string;
  label: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
  error?: string | undefined;
  touched?: boolean | undefined;
  hasImage: boolean;
  image: any;
  formik: FormikProps<any>;
  data: {
    managerMobile?: string;
    accNumber: string;
    bankName: string;
    // msisdn?: string;
  };
  selectedCheckValue: string | undefined | string[];
  inputApiError?: string;
  setInputApiError?: React.Dispatch<React.SetStateAction<string>>;
}

const ImageInput = ({
  name,
  label,
  // type,
  // className,
  isDisabled = false,
  error,
  touched,
  hasImage = false,
  image,
  data,
  formik,
  selectedCheckValue,
  inputApiError,
  setInputApiError,
}: IInput) => {
  const userData = useAppSelector((state: any) => state.auth);
  // const [accountTitle, setAccountTtitle] = useState();
  // console.log(formik, "FORMIKKKKKKK");

  const handleClick = async () => {
    try {
      const additionalValues = {
        ...data,
        managerMobile: userData?.managerMobile,
      };

      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };

      if (selectedCheckValue === 'bankaccount') {
        console.log('Caling OTHER BANK', data);

        const response = await apiClient.post(
          '/merchant/fetchTitleOtherBanks',
          requestBody,
          { headers: { Authorization: `Bearer ${userData?.jwt}` } },
        );
        console.log(response, 'FETCH OTHER BANK TITLE');
        // formik?.setFieldValue(name, response?.data?.accountTitle);
        formik?.setFieldValue(name, 'response?.data?.accountTitle');
      } else {
        console.log('Caling TMB', data);

        const response = await apiClient.post(
          formik?.values?.bank === 'otherBanks'
            ? '/merchant/fetchTitleOtherBanks'
            : '/merchant/fetchTitleTMB',
          requestBody,
          { headers: { Authorization: `Bearer ${userData?.jwt}` } },
        );
        if (response?.data?.responseCode === '009') {
          formik?.setFieldValue(name, response?.data?.accountTitle);
        } else {
          setInputApiError?.(response?.data?.responseMessage);
        }
        // formik?.setFieldValue(name, response?.data?.accountTitle);
      }
    } catch (e: any) {
      console.log('Image input', e);
      setInputApiError?.(e?.message);
    }
  };
  return (
    <>
      <div className={`floating-input relative w-full`}>
        <Field
          name={name}
          type={'text'}
          id={label}
          value={formik.values[name] || ''}
          // className={`${className} dark:text-white peer block w-full appearance-none rounded-lg border-2 border-border-light bg-neutral-white-base px-2.5 pb-1.5 pt-5 text-base font-medium leading-tight text-secondary-base focus:border-primary-base focus:outline-none focus:ring-0 ${
          //   touched && error && 'border-danger-base focus:border-danger-base'
          // }`}
          className={`h-[60px] w-full
          rounded-lg p-5 pr-[48px] font-medium focus:outline-none ${
            touched && error ? 'border-danger-base' : ''
          }appearance-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-password-toggle-button]:hidden`}
          placeholder=" "
          // style={{ zIndex: 0 }}
          disabled={isDisabled}
          // autoComplete="off"
        />
        <label
          htmlFor={label}
          className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-tight text-secondary-base transition-all duration-100 ease-in-out"
        >
          {label}
        </label>
        {hasImage &&
          (image === 'Fetch Title' ? (
            <div
              onClick={handleClick}
              className="absolute right-5 top-[50%] -translate-y-1/2 cursor-pointer will-change-transform"
            >
              <B3 medium textColor="text-primary-base">
                {image}
              </B3>
            </div>
          ) : (
            <p>image isnt fetch title</p>
          ))}
      </div>

      {inputApiError && (
        <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
          {inputApiError}
        </div>
      )}
    </>
  );
};

export default ImageInput;
