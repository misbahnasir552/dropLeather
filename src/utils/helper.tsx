import CryptoJS from 'crypto-js';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import home from '@/assets/icons/home-sign-up.svg';

export const getHeaderTextForSegment = (segment: string) => {
  const lowercasedSegment = segment.toLowerCase();

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
  const bodyString = JSON.stringify(body);
  const hash = CryptoJS.MD5(bodyString).toString();
  console.log('my body signature', body);
  console.log('my bodyString signature', bodyString);
  return hash;
};

export function replaceCountryCodeWithZero(phoneNumber: string) {
  // Regular expression to check if the phone number starts with 92
  const regExp = /^92/;

  // Replace '92' at the beginning with '0'
  const updatedPhoneNumber = phoneNumber.replace(regExp, '0');

  return updatedPhoneNumber;
}

export const generateExpiryTime = (timeInMinutes: number) => {
  const jwtExpirationTime = timeInMinutes * 60 * 1000; // 15 minutes in milliseconds
  const expirationDate = new Date(Date.now() + jwtExpirationTime);
  return expirationDate;
};

export const generateAESEncryption = (inputString: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || '';
  const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV_KEY || '');

  // Encrypt the string using AES with the secret key and IV
  const encrypted = CryptoJS.AES.encrypt(
    inputString,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv,
      mode: CryptoJS.mode.CBC, // CBC mode
      padding: CryptoJS.pad.Pkcs7, // PKCS7 padding (compatible with PKCS5)
    },
  ).toString();

  const encoded = encodeURIComponent(encrypted);

  return encoded;
};
export const formatDateTime = (isoDateString: string) => {
  if (!isoDateString) return 'N/A';
  try {
    const parsedDate = parseISO(isoDateString);
    return format(parsedDate, 'dd-MM-yyyy, hh:mma');
  } catch (error) {
    console.error('Invalid date:', error);
    return '';
  }
};

export const downloadEncryptedFile = ({
  filename,
  email,
  type = 'merchant',
}: {
  filename: string;
  email: string;
  type?: string;
}) => {
  const EncryptedFile = generateAESEncryption(filename);
  const EncryptedEmail = generateAESEncryption(email);

  const downloadUrl = `http://api-gateway-opsdev.telenorbank.pk/corporate/downloadCorporateFile?filename=${EncryptedFile}&email=${EncryptedEmail}&type=${type}`;

  window.open(downloadUrl, '_blank');
};
