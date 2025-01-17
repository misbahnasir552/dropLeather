'use client';

import { Form, Formik } from 'formik';
// import Image from 'next/image';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import H2 from '@/components/UI/Headings/H2';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import DynamicQRModal from '@/components/UI/Modal/QR/DynamicQRModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  dynamicQRInitialValues,
  dynamicQRSchema,
} from '@/validations/merchant/merchant-portal/qr-payments/dynamic-qr';
import type { IDynamicQR } from '@/validations/merchant/merchant-portal/qr-payments/interfaces';

function AddDynamicQR() {
  const [imageUrl, setImageUrl] = useState('');
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const base64ToJpg = (base64String: any) => {
    if (!base64String) {
      console.error('Base64 string is undefined or null.');
      return;
    }

    let byteString;

    // Check if the Base64 string contains the header
    if (base64String.includes('base64,')) {
      // Ensure the Base64 string is correctly formatted and split
      try {
        [, byteString] = base64String.split(','); // Use array destructuring
      } catch (error) {
        console.error('Error decoding Base64 string:', error);
        return;
      }
    } else {
      try {
        byteString = atob(base64String); // Assume it’s already clean Base64
      } catch (error) {
        console.error('Error decoding Base64 string:', error);
        return;
      }
    }

    // Extract MIME type from the string if available
    let mimeString = 'image/jpeg'; // Default to JPEG
    if (base64String.includes('data:')) {
      [mimeString] = base64String.split(',')[0].split(':')[1].split(';'); // Use array destructuring
    }

    // Convert the Base64 string to an ArrayBuffer and create a Blob
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i += 1) {
      // Replace ++ with i += 1
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeString });
    const imageUrl = URL.createObjectURL(blob);

    setImageUrl(imageUrl); // Update the state to display the image
    setShowModal(true);
  };

  // useEffect(() => {
  //   base64ToJpg(base64String);
  //   console.log('Image URL', imageUrl);
  // }, []);
  const onSubmit = async (values: IDynamicQR) => {
    console.log('i am dynamic qr AddDynamicQR', values);

    const additionalValues = {
      ...values,
      managerMobile: userData?.managerMobile,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const requestBody = { request: additionalValues, signature: md5Hash };

    try {
      const response = await apiClient.post(
        '/merchantportal/generateDynamicQR',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      console.log(response, 'Dynamic QR Added');
      if (response?.data.responseCode === '009') {
        base64ToJpg(response?.data.qrCode);
        // setTitle("Success");
        // setDescription(response?.data.responseDescription);
      } else if (response?.data.responseCode === '000') {
        setTitle('Failure');
        setDescription(response?.data.responseDescription);
        setImageUrl('');
        setShowModal(true);
      }
      // else {
      //   setTitle("Failure");
      //   setDescription(response.data.errorDescription);
      // }
    } catch (e: any) {
      console.log('Network Failure!', e);
      setTitle(e.code);
      setDescription(e.message);
      setImageUrl('');
      setShowModal(true);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/merchant/merchant-portal/qr-payments/dynamic-qr/"
      />
      <HeaderWrapper
        heading="Dynamic QR"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={dynamicQRInitialValues}
        validationSchema={dynamicQRSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Add Product Details">
              <div className="flex flex-col gap-5">
                <Input
                  label="Product Name"
                  name="productName"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Amount"
                  name="amount"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Product Details"
                  name="productDetails"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Product Number"
                  name="productNumber"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Store Name/ID"
                  name="storeId"
                  type="text"
                  error={'hi'}
                  touched={false}
                />
              </div>
            </FormLayout>
            <div className="flex w-full justify-end gap-6">
              <Button
                label="Cancel"
                // routeName="/login"
                className="button-secondary h-14 w-[270px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Save"
                type="submit"
                className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
      {imageUrl && showModal && (
        <DynamicQRModal
          title="DYNAMIC QR"
          description="Scan this QR code to proceed."
          show={showModal}
          setShowModal={setShowModal}
          imageUrl={imageUrl} // Pass the QR code image URL here
        />
      )}
    </div>
  );
}

export default AddDynamicQR;
