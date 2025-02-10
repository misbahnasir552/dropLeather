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
}

const ImageInput = ({
  name,
  label,
  // type,
  className,
  isDisabled = false,
  error,
  touched,
  hasImage = false,
  image,
  data,
  formik,
  selectedCheckValue,
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
        formik?.setFieldValue(name, response?.data?.accountTitle);
      } else {
        console.log('Caling TMB', data);

        const response = await apiClient.post(
          '/merchant/fetchTitleTMB',
          requestBody,
          { headers: { Authorization: `Bearer ${userData?.jwt}` } },
        );
        formik?.setFieldValue(name, response?.data?.accountTitle);
        // console.log(response, "FETCH TMB");
      }
    } catch (e) {
      console.log('Image input', e);
    }
  };
  return (
    <>
      <div className={`relative w-full`}>
        <Field
          name={name}
          type={'text'}
          id={label}
          className={`${className} dark:text-white peer block w-full appearance-none rounded-lg border-2 border-border-light bg-neutral-white-base px-2.5 pb-1.5 pt-5 text-base font-medium leading-tight text-secondary-base focus:border-primary-base focus:outline-none focus:ring-0 ${touched && error && 'border-danger-base focus:border-danger-base'
            }`}
          placeholder=" "
          style={{ zIndex: 0 }}
          disabled={isDisabled}
        // autoComplete="off"
        />
        <label
          htmlFor={label}
          style={{ zIndex: 0 }}
          className="peer-focus:text-blue-600 absolute start-3 top-4 z-10 origin-[0] -translate-y-3 scale-75 text-sm font-medium leading-tight text-secondary-base duration-300 focus:text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {label}
        </label>
        {hasImage &&
          (image === 'Fetch Title' ? (
            <div
              onClick={handleClick}
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <B3 medium textColor="text-primary-base">
                {image}
              </B3>
            </div>
          ) : (
            <p>image isnt fetch title</p>
          ))}
      </div>
    </>
  );
};

export default ImageInput;
