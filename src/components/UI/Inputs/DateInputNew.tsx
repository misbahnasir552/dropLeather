'use client';

import React from 'react';

import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
import H7 from '@/components/UI/Headings/H7';
import type { IDate } from '@/interfaces/interface';

const DateInputNew = ({
  label,
  name,
  formik,
  error,
  touched,
  asterik,
  isDisabled,
  minDate,
}: IDate) => {
  const handleDateChange = (event: any) => {
    const selectedDate = event.target.value;
    formik?.setFieldValue(name, selectedDate);
    // console.log ("name and date", name, selectedDate)
  };

  const handleDateClick = () => {
    const dateElement = document.getElementsByName(name)[0];
    if (dateElement) {
      dateElement.setAttribute('type', 'date');
      dateElement.addEventListener('change', handleDateChange);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[6px]">
      <div
        className={`floating-input relative w-full rounded-lg border border-border-light
          focus-within:border-primary-base hover:border-primary-base
          hover:shadow-sm focus:shadow-sm focus:outline-none ${
            touched && error ? 'border-danger-base' : ''
          }`}
      >
        <input
          type="date"
          name={name}
          value={formik?.values?.[name] || ''}
          placeholder=" "
          onClick={handleDateClick}
          onChange={handleDateChange}
          disabled={isDisabled}
          min={minDate}
          // onBlur={handleBlur}
          // className="h-[60px] w-full rounded-lg p-5 font-medium text-neutral-black-base focus:outline-none"
          className={`
    h-[60px] w-full rounded-lg p-5 font-medium focus:outline-none
    ${
      isDisabled
        ? 'cursor-not-allowed bg-screen-white text-secondary-200'
        : 'bg-white text-neutral-black-base'
    }
  `}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-[18px] text-secondary-base transition-all duration-100 ease-in-out"
        >
          <div className="flex gap-2">
            {label}
            {asterik && <H7 textColor="text-danger-base">*</H7>}
          </div>
          {/* {label} */}
        </label>
      </div>
      <FormikErrorMessage name={name} />
    </div>
  );
};

export default DateInputNew;

// "use client";
// import React, { useState } from "react";
// import { ErrorMessage, Field, useFormikContext } from "formik";
// import type { IDate, date } from "@/interfaces/interface";

// const DateInputNew = ({ label, name, formik }: IDate) => {
//   // const formik = useFormikContext<date>();
//   const [isFocused, setIsFocused] = useState(false);

//   const handleBlur = () => {
//     setIsFocused(false);
//   };
//   const handleDateChange = (event: any) => {
//     const selectedDate = event.target.value;
//     console.log("Selected Date:", selectedDate);
//     formik.setFieldValue(name, selectedDate);
//     // console.log ("name and date", name, selectedDate)
//   };

//   const handleDateClick = () => {
//     const dateElement = document.getElementsByName("date")[0];
//     if (dateElement) {
//       dateElement.setAttribute("type", "date");
//       dateElement.addEventListener("change", handleDateChange);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="floating-input relative w-full rounded-lg border border-border-light
//           focus-within:border-primary-base hover:border-primary-base
//           hover:shadow-sm focus:shadow-sm focus:outline-none"
//       >
//         <input
//           type="date"
//           name={name}
//           placeholder=" "
//           onClick={handleDateClick}
//           // onChange={handleDateChange}
//           onBlur={handleBlur}
//           className="font-medium text-neutral-black-base w-full h-[60px] rounded-lg p-5 focus:outline-none"
//         />
//         <label
//           htmlFor="date"
//           className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-[18px] text-secondary-base transition-all duration-100 ease-in-out"
//         >
//           {label}
//         </label>
//       </div>
//       {/* <ErrorMessage
//         name={"date"}
//         component="span"
//         className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base"
//       /> */}
//     </div>
//   );
// };

// export default DateInputNew;
