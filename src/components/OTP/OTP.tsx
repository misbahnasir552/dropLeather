// 'use client';

// // import axios from 'axios';
// import { useSearchParams } from 'next/navigation';
// import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
// import React, { useEffect, useRef, useState } from 'react';

// import apiClient from '@/api/apiClient';
// import { useAppSelector } from '@/hooks/redux';
// import useCounter from '@/hooks/useCounter';

// function OTP({
//   numberOfDigits = 6,
//   description,
//   otp,
//   setOtp,
//   medium,
// }: {
//   numberOfDigits?: number;
//   description: string;
//   otp: any[];
//   medium: string;
//   setOtp: Dispatch<SetStateAction<any[]>>;
// }) {
//   const [otpError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const [expiryTime, setExpiryTime] = useState<number>();
//   const { formattedCount, count, resetCounter } = useCounter({
//     initialCount: expiryTime,
//   });
//   const signupForm = useAppSelector((state: any) => state.signup);

//   useEffect(() => {
//     const expiryQueryParam = searchParams.get('expiry');
//     if (expiryQueryParam) {
//       console.log('expiry time', expiryQueryParam);
//       const expTime = Number(expiryQueryParam) * 60;
//       setExpiryTime(expTime);
//     }
//   }, [expiryTime]);

//   const otpBoxReference = useRef<HTMLInputElement[]>([]);

//   const handleResendOTP = async () => {
//     resetCounter();
//     try {
//       if (medium === 'sms') {
//         const response = await apiClient.post('merchant/mobileotp', {
//           managerMobile: signupForm.managerMobile,
//         });
//         // apiClient.post('merchant/mobileotp', {
//         //   managerMobile: signupForm.managerMobile,
//         // });
//         console.log('sms otp response is', response);
//       } else {
//         const response = await apiClient.post('merchant/emailotp', {
//           managerMobile: signupForm.managerMobile,
//           email: signupForm.email,
//         });
//         // apiClient.post('merchant/emailotp', {
//         //   managerMobile: signupForm.managerMobile,
//         //   email: signupForm.email,
//         // });
//         console.log('email otp response is', response);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   function handleChange(value: string, index: number) {
//     const newArr = [...otp];
//     newArr[index] = value;
//     setOtp(newArr);

//     if (value && index < numberOfDigits - 1) {
//       otpBoxReference.current[index + 1]?.focus();
//     }
//   }

//   function handleBackspaceAndEnter(
//     e: KeyboardEvent<HTMLInputElement>,
//     index: number,
//   ) {
//     if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
//       otpBoxReference.current[index - 1]?.focus();
//     }
//     if (
//       e.key === 'Enter' &&
//       e.currentTarget.value &&
//       index < numberOfDigits - 1
//     ) {
//       otpBoxReference.current[index + 1]?.focus();
//     }
//   }

//   return (
//     <article className="flex flex-col gap-4 ">
//       <p className="text-base font-semibold text-secondary-base">
//         {description}
//       </p>

//       <div className="sm:max-md:gap-[10px] flex w-full gap-9 text-lg text-secondary-900">
//         {/* <div className='flex rounded-md border-[1px] border-border-light'> */}
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             value={digit}
//             maxLength={1}
//             onChange={(e) => handleChange(e.target.value, index)}
//             onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
//             ref={(ref: HTMLInputElement | null) => {
//               otpBoxReference.current[index] = ref!;
//               return null;
//             }}
//             // className={`text-blue bg-black w-full block appearance-none  p-3 text-center text-2xl focus:border-2 focus:outline-none sm:max-md:max-h-[48px] sm:max-md:max-w-[48px]`}
//             className={`text-blue bg-black sm:max-md:max-h-[48px] sm:max-md:max-w-[48px] block h-[60px] w-[60px] appearance-none rounded-md border-[1px] border-border-light p-3 text-center text-2xl focus:border-2 focus:outline-none`}
//           />
//         ))}
//         {/* </div> */}
//       </div>
//       {otpError ? (
//         <p
//           className={`mt-4 text-lg text-neutral-white-base ${
//             otpError ? 'error-show' : ''
//           }`}
//         >
//           {otpError}
//         </p>
//       ) : null}

//       {count > 0 ? (
//         <div className="text-xs font-normal text-secondary-600">
//           Resend OTP in {formattedCount}
//         </div>
//       ) : (
//         <div
//           onClick={handleResendOTP}
//           className="cursor-pointer text-xs font-normal leading-tight text-primary-base underline"
//         >
//           Resend OTP
//         </div>
//       )}
//     </article>
//   );
// }

// export default OTP;

'use client';

import { useSearchParams } from 'next/navigation';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import apiClient from '@/api/apiClient';
import { useAppSelector } from '@/hooks/redux';
import useCounter from '@/hooks/useCounter';

import H7 from '../UI/Headings/H7';

function OTP({
  numberOfDigits = 6,
  description,
  otp,
  setOtp,
  medium,
}: {
  numberOfDigits?: number;
  description: string;
  otp: any[];
  medium: string;
  admin?: boolean;
  setOtp: Dispatch<SetStateAction<any[]>>;
}) {
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const [expiryTime, setExpiryTime] = useState<number>();
  const { formattedCount, count, resetCounter } = useCounter({
    initialCount: expiryTime,
  });
  const signupForm = useAppSelector((state: any) => state.signup);
  const userData = useAppSelector((state: any) => state.auth);

  // const credentials = useAppSelector((state: any) => state.loginCredentials);

  useEffect(() => {
    const expiryQueryParam = searchParams.get('expiry');
    if (expiryQueryParam) {
      console.log('expiry time', expiryQueryParam);
      const expTime = Number(expiryQueryParam) * 60;
      setExpiryTime(expTime);
    }
  }, [expiryTime]);

  const otpBoxReference = useRef<HTMLInputElement[]>([]);
  // const option = searchParams.get('option');

  const handleResendOTP = async () => {
    const paramEmail = searchParams.get('email');
    const paramNumber = searchParams.get('number');
    resetCounter();
    try {
      if (medium === 'sms') {
        const response = await apiClient.post('merchant/mobileotp', {
          managerMobile: signupForm.managerMobile || userData?.managerMobile,
        });
        if (response.data.responseCode === '000') {
          setOtpError(response.data.responseDescription);
        } else if (response.data.responseCode === '009') {
          setOtpSuccess(response.data.responseDescription);
        } else {
          setOtpError(response.data.responseDescription);
        }
        console.log('sms otp response is', response);
      } else {
        console.log('userdata email', userData.email);

        const response = await apiClient.post('merchant/emailotp', {
          managerMobile:
            signupForm.managerMobile || userData?.managerMobile || paramNumber,
          email: signupForm.email || userData?.email || paramEmail,
        });
        console.log('email otp response is', response);
        if (response.data.responseCode === '000') {
          setOtpError(response.data.responseDescription);
        } else if (response.data.responseCode === '009') {
          setOtpSuccess(response.data.responseDescription);
        } else {
          setOtpError(response.data.responseDescription);
        }
      }
    } catch (e: any) {
      console.log(e);
      setOtpError(e.message);
    }
  };

  function handleChange(value: string, index: number) {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    // Only move focus forward if the current input has a value
    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    // Handle Backspace
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
      return;
    }

    // Handle Enter
    if (
      e.key === 'Enter' &&
      e.currentTarget.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  return (
    <article className="flex flex-col gap-4">
      <p className="text-base font-semibold text-secondary-base">
        {description}
      </p>

      <div className="flex w-full gap-9 text-lg text-secondary-900 sm:max-md:gap-[10px]">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspaceAndEnter(e, index)}
            ref={(ref: HTMLInputElement | null) => {
              otpBoxReference.current[index] = ref!;
              return null;
            }}
            className={`text-blue bg-black block h-[60px] w-[60px] appearance-none rounded-md border-[1px] border-border-light p-3 text-center text-2xl focus:border-2 focus:outline-none sm:max-md:max-h-[48px] sm:max-md:max-w-[48px]`}
          />
        ))}
      </div>

      {otpError ? <H7 textColor="text-danger-base">{otpError}</H7> : null}
      {otpSuccess ? <H7 textColor="text-primary-base">{otpSuccess}</H7> : null}

      {count > 0 && !otpError ? (
        <div className="text-xs font-normal text-secondary-600">
          Resend OTP in {formattedCount}
        </div>
      ) : (
        <div
          onClick={handleResendOTP}
          className="cursor-pointer text-xs font-normal leading-tight text-primary-base underline"
        >
          Resend OTP
        </div>
      )}
    </article>
  );
}

export default OTP;
