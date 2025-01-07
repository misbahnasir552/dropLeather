import CryptoJS from 'crypto-js';
import Image from 'next/image';
import React from 'react';

import home from '@/assets/icons/home-sign-up.svg';

export const getHeaderTextForSegment = (segment: string) => {
  const lowercasedSegment = segment.toLowerCase();
  // console.log('LOWER SEGMENT: ', lowercasedSegment);

  switch (lowercasedSegment) {
    case 'sign-up':
      return (
        <span className="flex gap-1">
          <Image src={home} alt={home} width={15} height={15} />
          <span>Sign up</span>
        </span>
      );
    case 'home':
      return (
        <span className="flex gap-1">
          <Image src={home} alt={home} width={15} height={15} />
          <span>Home</span>
        </span>
      );
    case 'personal-info':
      return <span>Personal Information</span>;
    case 'otp':
      return <span>OTP</span>;
    case 'business-nature':
      return <span>Business Nature</span>;
    case 'account-information':
      return <span>Account Information</span>;
    default:
      return null;
  }
};

// function convertObjectToUpperCase(obj) {
//   const newObj = {};
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key.toUpperCase()] =
//         typeof obj[key] === "string" ? obj[key].toUpperCase() : obj[key];
//     }
//   }
//   return newObj;
// }
interface MyObject {
  [key: string]: any; // Define the interface with index signature
}

// function convertObjectToUpperCase(obj: MyObject) {
//   const newObj: Record<string, any> = {};
//   Object.keys(obj).forEach((key) => {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       if (Array.isArray(obj[key])) {
//         newObj[key.toUpperCase()] = obj[key].map((item: string) =>
//           typeof item === 'string' ? item.toUpperCase() : item,
//         );
//       } else {
//         newObj[key.toUpperCase()] =
//           typeof obj[key] === 'string' ? obj[key].toUpperCase() : obj[key];
//       }
//     }
//   });
//   return newObj;
// }
function convertObjectToUpperCase(obj: MyObject) {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Check if the value is an array
      if (Array.isArray(obj[key])) {
        newObj[key.toUpperCase()] = obj[key].map((item: any) => {
          if (typeof item === 'string') {
            // Capitalize string items in the array
            return item.toUpperCase();
          }
          if (typeof item === 'object' && item !== null) {
            // If item is an object, recursively call the function
            return convertObjectToUpperCase(item);
          }
          // Leave non-string, non-object items unchanged
          return item;
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If the value is an object, recursively call the function
        newObj[key.toUpperCase()] = convertObjectToUpperCase(obj[key]);
      } else {
        // For string or other types, capitalize if it's a string
        newObj[key.toUpperCase()] =
          typeof obj[key] === 'string' ? obj[key].toUpperCase() : obj[key];
      }
    }
  });

  return newObj;
}

export const generateMD5Hash = (bodyRequest: any) => {
  const body = convertObjectToUpperCase(bodyRequest);
  // console.log('CAPITAL BODY', body);
  const bodyString = JSON.stringify(body);
  console.log(bodyString, 'BODYSTRING MD5');

  // console.log(body, 'BODYJSON MD5');

  // const hashBODY = CryptoJS.MD5(bodyString).toString();
  // console.log(hashBODY, 'JSON MD5 HAshhhhhh');

  // Combine body with API secret
  // const combinedData = bodyString;

  // Generate MD5 hash
  const hash = CryptoJS.MD5(bodyString).toString();
  // console.log(hash, 'MD5 HASHhhhhh');

  return hash;
};

export function replaceCountryCodeWithZero(phoneNumber: string) {
  // Regular expression to check if the phone number starts with 92
  const regExp = /^92/;

  // Replace '92' at the beginning with '0'
  const updatedPhoneNumber = phoneNumber.replace(regExp, '0');

  return updatedPhoneNumber;
}
