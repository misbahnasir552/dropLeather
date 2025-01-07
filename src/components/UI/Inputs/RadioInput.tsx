'use client';

import type { FormikProps } from 'formik';
import { Field } from 'formik';
import Image from 'next/image';
// import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import TickIcon from '@/assets/icons/tick-icon.svg';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
import H7 from '@/components/UI/Headings/H7';
import type { ICheckboxData } from '@/interfaces/interface';

interface ICheckboxInput {
  name: string;
  options: { value: string; label: string }[];
  form: FormikProps<any>;
  isMulti?: boolean;
  // logo?: string;
}

const RadioInput: React.FC<ICheckboxInput> = ({
  name,
  options,
  form,
  // logo,
  isMulti = false,
}) => {
  // console.log('form is', form);

  const searchParams = useSearchParams();

  useEffect(() => {
    const optionValue = searchParams.get('optionValue');

    if (optionValue) {
      form.setFieldValue(name, optionValue);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    const isChecked = e.target.checked;

    // const newSearchParams = new URLSearchParams();
    const newSearchParams = new URLSearchParams(window.location.search);

    if (isMulti) {
      if (isChecked) {
        form.setFieldValue(name, [...form.values[name], optionValue]);
      } else {
        form.setFieldValue(
          name,
          form.values[name].filter((value: string) => value !== optionValue),
        );
      }
    } else {
      // form.setFieldValue(name, optionValue);
      newSearchParams.set('optionValue', optionValue);
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${newSearchParams.toString()}`,
      );

      form.setFieldValue(name, optionValue);
    }
  };

  return (
    <div className="flex w-full flex-row gap-12">
      {options.map((option: ICheckboxData) => (
        <label
          className="flex  flex-row items-center gap-2 rounded-lg"
          key={option.value}
        >
          {form.values[name].includes(option.value) ? (
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
          ) : (
            <div className="flex h-6 w-6 justify-center rounded-full border-[1px] border-border-dark bg-screen-white px-[7px] py-2">
              <div className="h-[8px] w-[10px] "></div>
            </div>
          )}
          <div className="flex items-center gap-4">
            {option?.logo && (
              <Image
                width={24}
                height={24}
                src={option?.logo}
                alt="left-icon"
              />
            )}
            <Field
              className="hidden"
              type="checkbox"
              name={name}
              value={option.value}
              // checked={form.values[name].includes(option.value)}
              // checked={form.values[name].includes(option.value)}
              checked={
                isMulti
                  ? form.values[name].includes(option.value)
                  : form.values[name] === option.value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
            <H7 medium={true}>{option.label}</H7>
          </div>
        </label>
      ))}
      <FormikErrorMessage name={name} />
      {/* <ErrorMessage
        name={name}
        component="div"
        className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
      /> */}
    </div>
  );
};

export default RadioInput;

// import Image from "next/image";
// import React from "react";

// import TickIcon from "@/assets/icons/tick-icon.svg";

// function RadioInput({ label, logo, selected, onSelect }: any) {

//   return (
//     <>

//         <div
//           className="flex flex-row items-center justify-between gap-2 rounded-lg"
//           onClick={onSelect}
//         >
//           {selected ? (
//             <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
//               <div className="h-[8px] w-[10px]">
//                 <Image
//                   src={TickIcon}
//                   width={100}
//                   height={100}
//                   alt="tick-icon"
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
//               <div className="h-[8px] w-[10px]"></div>
//             </div>
//           )}
//           {logo && <Image width={24} height={24} src={logo} alt="left-icon" />}
//           <label
//             htmlFor="checkbox"
//             className="w-full text-sm font-medium text-secondary-base"
//           >
//             {label}
//           </label>
//         </div>

//     </>
//   );
// }

// export default RadioInput;
