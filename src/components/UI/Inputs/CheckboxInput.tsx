// 'use client';

// import type { FormikProps } from 'formik';
// import { ErrorMessage, Field } from 'formik';
// import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
// import Image from 'next/image';
// import type {
//   JSXElementConstructor,
//   Key,
//   PromiseLikeOfReactNode,
//   ReactElement,
//   ReactNode,
//   ReactPortal,
// } from 'react';

// // import React, { Dispatch, SetStateAction } from "react";
// import TickIcon from '@/assets/icons/tick-icon.svg';
// import H7 from '@/components/UI/Headings/H7';
// // import type { ICheckboxData } from "@/interfaces/interface";

// interface ICheckboxInput {
//   name: string;
//   options: any;
//   // { value: string; label: string; logo?: string }[];
//   form?: FormikProps<any>;
//   isMulti?: boolean;
//   // setSelectedCheckValue?: Dispatch<SetStateAction<undefined>>;
//   setSelectedCheckValue: React.Dispatch<
//     React.SetStateAction<string | undefined | string[]>
//   >;
//   // logo?: string;
// }

// const CheckboxInput: React.FC<ICheckboxInput> = ({
//   name,
//   options,
//   form,
//   // logo,
//   setSelectedCheckValue,
//   isMulti = false,
// }) => {
//   // console.log("OPTIONS FROM CHECKBOX INPUT", options);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const optionValue = e.target.value;
//     setSelectedCheckValue(optionValue);
//     console.log('CHECKBOX VALUEE ITEM', optionValue);

//     const isChecked = e.target.checked;

//     if (isMulti) {
//       if (isChecked) {
//         form?.setFieldValue(name, [...form.values[name], optionValue]);
//       } else {
//         form?.setFieldValue(
//           name,
//           form.values[name].filter((value: string) => value !== optionValue),
//         );
//       }
//     } else {
//       form?.setFieldValue(name, optionValue);
//     }
//   };
//   // console.log(options, "OPTIONSSSSSSSSSSSSSSSS");
//   // console.log(form, "FORM VALUES NAME");

//   return (
//     <div className="flex w-full flex-col gap-4">
//       {options?.map(
//         (option: {
//           value: Key | null | undefined;
//           logo: string | StaticImport;
//           label:
//             | string
//             | number
//             | boolean
//             | ReactElement<any, string | JSXElementConstructor<any>>
//             | Iterable<ReactNode>
//             | ReactPortal
//             | PromiseLikeOfReactNode
//             | null
//             | undefined;
//         }) => (
//           <label
//             className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"
//             key={option.value}
//           >
//             <div className="flex items-center gap-4">
//               {option?.logo && (
//                 <Image
//                   width={24}
//                   height={24}
//                   src={option?.logo}
//                   alt="left-icon"
//                 />
//               )}
//               <Field
//                 className="hidden"
//                 type="checkbox"
//                 name={name}
//                 value={option.value}
//                 checked={form?.values[name]?.includes(option.value)}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   handleChange(e);
//                 }}
//               />
//               <H7 medium={true}>{option.label}</H7>
//             </div>
//             {form?.values[name]?.includes(option.value) ? (
//               <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
//                 <div className="h-[8px] w-[10px]">
//                   <Image
//                     src={TickIcon}
//                     width={100}
//                     height={100}
//                     alt="tick-icon"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
//                 <div className="h-[8px] w-[10px]"></div>
//               </div>
//             )}
//           </label>
//         ),
//       )}
//       <ErrorMessage
//         name={name}
//         component="div"
//         className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
//       />
//     </div>
//   );
// };

// export default CheckboxInput;

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

import TickIcon from '@/assets/icons/tick-icon.svg';
import H7 from '@/components/UI/Headings/H7';

interface ICheckboxInput {
  name: string;
  options: any;
  error?: string | string[] | undefined;
  form?: FormikProps<any>;
  layout?: string;
  isMulti?: boolean;
  setSelectedCheckValue: React.Dispatch<
    React.SetStateAction<string | undefined | string[]>
  >;
}

const CheckboxInput: React.FC<ICheckboxInput> = ({
  name,
  options,
  form,
  error,
  layout,
  setSelectedCheckValue,
  isMulti,
  // isMulti = true,
}) => {
  // console.log('check box input ', form, isMulti, name);

  // Handle checkbox change
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const optionValue = e.target.value;
  //   setSelectedCheckValue(optionValue);

  //   console.log('optionValue ', optionValue);

  //   const isChecked = e.target.checked;

  //   // Ensure the value is initialized as an array if it's a multi-select checkbox
  //   const currentValues = form?.values[name] || (isMulti ? [] : '');

  //   console.log('currentValues >>> ', currentValues);

  //   if (isMulti) {
  //     console.log('here multi ', isMulti, isChecked);

  //     if (isChecked) {
  //       form?.setFieldValue(name, [...currentValues, optionValue]);
  //       // setSelectedCheckValue(name, [...currentValues, optionValue]);

  //     } else {
  //       form?.setFieldValue(
  //         name,
  //         currentValues.filter((value: string) => value !== optionValue),
  //       );
  //     }
  //   } else {
  //     form?.setFieldValue(name, optionValue);
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    const isChecked = e.target.checked;

    // Ensure the value is initialized correctly
    const currentValues = Array.isArray(form?.values[name])
      ? form?.values[name]
      : [];

    if (isMulti) {
      let updatedValues;

      if (isChecked) {
        updatedValues = [...currentValues, optionValue]; // Add new selection
      } else {
        updatedValues = currentValues.filter(
          (value: string) => value !== optionValue,
        ); // Remove unchecked value
      }

      form?.setFieldValue(name, updatedValues);
      setSelectedCheckValue(updatedValues); // Keep track of selected values
    } else {
      form?.setFieldValue(name, optionValue);
      setSelectedCheckValue(optionValue); // Replace with single value NOT in an array but string
    }
  };

  return (
    <div className={`flex w-full ${layout || 'flex-col'} gap-4`}>
      {options?.map(
        (option: {
          value: Key | null | undefined;
          logo: string | StaticImport;
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
          // <label
          //   // className="flex w-full flex-col gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"

          //   className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"
          //   key={option.value}
          // >
          //   {/* <div className="flex flex-col gap-2"> */}
          //   <div className=' items-center justify-between gap-4'>
          //   <div className="flex items-center gap-4">
          //     {option?.logo && (
          //       <Image
          //         width={24}
          //         height={24}
          //         src={option?.logo}
          //         alt="left-icon"
          //       />
          //     )}
          //     <Field
          //       className="hidden"
          //       type="checkbox"
          //       name={name}
          //       value={option.value}
          //       checked={
          //         isMulti
          //           ? form?.values[name]?.includes(option.value)
          //           : form?.values[name] === option.value
          //       }
          //       onChange={handleChange}
          //     />
          //     <H7 medium={true}>{option.label}</H7>
          //   </div>
          //   </div>
          //   {form?.values[name]?.includes(option.value) ? (
          //     <div className="flex h-6 w-6 justify-center rounded-full bg-primary-base px-[7px] py-2">
          //       <div className="h-[8px] w-[10px]">
          //         <Image
          //           src={TickIcon}
          //           width={100}
          //           height={100}
          //           alt="tick-icon"
          //         />
          //       </div>
          //     </div>

          //   ) : (
          //     <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
          //       <div className="h-[8px] w-[10px]"></div>
          //     </div>
          //   )}
          // </label>

          <label
            className="flex w-full flex-col gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4"
            key={option.value}
          >
            <div className="flex items-center justify-between gap-4">
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
                  checked={
                    isMulti
                      ? form?.values[name]?.includes(option.value)
                      : form?.values[name] === option.value
                  }
                  onChange={handleChange}
                />
                <H7 medium={true}>{option.label}</H7>
              </div>

              {form?.values[name]?.includes(option.value) ? (
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
                <div
                  className={`flex h-6 w-6 justify-center rounded-full border-2 ${
                    error ? 'border-danger-base' : 'border-border-dark'
                  } px-[7px] py-2`}
                >
                  <div className="h-[8px] w-[10px]"></div>
                </div>
              )}
            </div>

            {form?.values[name] === 'corporatePortal' &&
              option.value === 'corporatePortal' && (
                <>
                  <div className="my-2 w-full border-t-[0.5px] border-border-dark"></div>

                  <p className="text-sm font-medium text-secondary-base">
                    An easypaisa Corporate Account is required to get access to
                    the following easypaisa Corporate Products and Services:
                  </p>
                  <ol className="ml-5 list-decimal text-sm font-medium text-secondary-base ">
                    <li>Self-Serve Salary & Bulk Disbursement Portal</li>
                    <li>Managed Salary & Bulk Disbursements</li>
                    <li>Corporate Current Account</li>
                    <li>Corporate Savings Account</li>
                    <li>Payment Collection from Easypaisa App</li>
                    <li>Bulk Disbursement API</li>
                    <li>Online Payment Gateway</li>
                  </ol>
                </>
              )}
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

export default CheckboxInput;
