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

// import TickIcon from '@/assets/icons/tick-icon.svg';
// import H7 from '@/components/UI/Headings/H7';

// interface ICheckboxInput {
//   name: string;
//   options: any;
//   error?: string;
//   form?: FormikProps<any>;
//   layout?: string;
//   isMulti?: boolean;
//   setSelectedCheckValue: React.Dispatch<
//     React.SetStateAction<string | undefined | string[]>
//   >;
// }

// const CheckboxInput: React.FC<ICheckboxInput> = ({
//   name,
//   options,
//   form,
//   error,
//   // layout,
//   setSelectedCheckValue,
//   isMulti,
//   // isMulti = false,
// }) => {
//   // Handle checkbox change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const optionValue = e.target.value;
//     setSelectedCheckValue(optionValue);

//     const isChecked = e.target.checked;

//     // Ensure the value is initialized as an array if it's a multi-select checkbox
//     const currentValues = form?.values[name] || (isMulti ? [] : '');

//     if (isMulti) {
//       if (isChecked) {
//         form?.setFieldValue(name, [...currentValues, optionValue]);
//       } else {
//         form?.setFieldValue(
//           name,
//           currentValues.filter((value: string) => value !== optionValue),
//         );
//       }
//     } else {
//       form?.setFieldValue(name, optionValue);
//     }
//   };

//   return (
//     <div className={`grid w-full grid-cols-2 gap-4`}>
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
//                 checked={
//                   isMulti
//                     ? form?.values[name]?.includes(option.value)
//                     : form?.values[name] === option.value
//                 }
//                 onChange={handleChange}
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
//       {error && (
//         <ErrorMessage
//           name={name}
//           component="div"
//           className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
//         />
//       )}
//     </div>
//   );
// };

// export default CheckboxInput;

// new logic with PIPE

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
  error?: string;
  form?: FormikProps<any>;
  layout?: string;
  isMulti?: boolean;
  setSelectedCheckValue: React.Dispatch<
    React.SetStateAction<string | undefined | string[]>
  >;
}

// const CheckboxInput: React.FC<ICheckboxInput> = ({
//   name,
//   options,
//   form,
//   error,
//   // layout,
//   setSelectedCheckValue,
//   isMulti,
//   // isMulti = false,
// }) => {
//   // Handle checkbox change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const optionValue = e.target.value;
//     setSelectedCheckValue(optionValue);

//     const isChecked = e.target.checked;

//     // Ensure the value is initialized as an array if it's a multi-select checkbox
//     const currentValues = form?.values[name] || (isMulti ? [] : '');

//     if (isMulti) {
//       if (isChecked) {
//         form?.setFieldValue(name, [...currentValues, optionValue]);
//       } else {
//         form?.setFieldValue(
//           name,
//           currentValues.filter((value: string) => value !== optionValue),
//         );
//       }
//     } else {
//       form?.setFieldValue(name, optionValue);
//     }
//   };

//   return (
//     <div className={`grid w-full grid-cols-2 gap-4`}>
//       {options?.map(
// (option: {
//   value: Key | null | undefined;
//   logo: string | StaticImport;
//   label:
//     | string
//     | number
//     | boolean
//     | ReactElement<any, string | JSXElementConstructor<any>>
//     | Iterable<ReactNode>
//     | ReactPortal
//     | PromiseLikeOfReactNode
//     | null
//     | undefined;
// }) => (
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
//                 checked={
//                   isMulti
//                     ? form?.values[name]?.includes(option.value)
//                     : form?.values[name] === option.value
//                 }
//                 onChange={handleChange}
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
//       {error && (
//         <ErrorMessage
//           name={name}
//           component="div"
//           className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
//         />
//       )}
//     </div>
//   );
// };
const CheckboxInput: React.FC<ICheckboxInput> = ({
  name,
  options,
  form,
  error,
  setSelectedCheckValue,
  isMulti,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    const isChecked = e.target.checked;

    // Get the current values as a string or initialize with "N/A"
    const currentValues = form?.values[name];
    console.log(currentValues, 'currentValues');

    if (isMulti) {
      const selectedValuesArray =
        currentValues === 'N/A'
          ? [] // Initialize as empty if the current value is "N/A"
          : currentValues.split(' | ');

      // Update the values based on whether the checkbox was checked or unchecked
      const updatedValuesArray = isChecked
        ? [...selectedValuesArray, optionValue]
        : selectedValuesArray.filter((value: any) => value !== optionValue);

      // If no options are selected, default to "N/A"; otherwise, join the values
      const updatedValuesString =
        updatedValuesArray.length > 0 ? updatedValuesArray.join(' | ') : 'N/A';

      // Update Formik's field value with the concatenated string
      form?.setFieldValue(name, updatedValuesString);

      // Update the selected check value for external use
      setSelectedCheckValue(updatedValuesString);
    } else {
      // Single select case
      const updatedValue = isChecked ? optionValue : 'N/A';
      form?.setFieldValue(name, updatedValue);
      setSelectedCheckValue(updatedValue);
    }
  };

  return (
    <div className={`grid w-full grid-cols-2 gap-4`}>
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
          <label
            className={`flex w-full flex-row items-center justify-between gap-4 rounded-lg border-[0.5px] border-border-light bg-neutral-white-base px-5 py-4 ${
              (isMulti
                ? form?.values[name]?.includes(option.value)
                : form?.values[name] === option.value) && 'border-primary-base'
            }`}
            key={option.value}
          >
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
            {form?.values[name]?.includes(option.value) ||
            form?.values[name] === option.value ? (
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
              <div className="flex h-6 w-6 justify-center rounded-full border-2 border-border-dark px-[7px] py-2">
                <div className="h-[8px] w-[10px]"></div>
              </div>
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
