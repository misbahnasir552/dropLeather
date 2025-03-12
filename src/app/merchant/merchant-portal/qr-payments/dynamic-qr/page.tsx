'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import ErrorModal from '@/components/UI/Modal/ErrorModal';
import QRModal from '@/components/UI/Modal/QR/QRModal';
// import DynamicQRModal from '@/components/UI/Modal/QR/DynamicQRModal';
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
  const [stores, setStores] = useState([]);
  const [amount, setAmount] = useState('');
  const [qrExpirationTime, setQrExpirationTime] = useState(0);
  const [tillNum, setTillNum] = useState<string>('');
  const { apiSecret } = userData;

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const base64ToJpg = (base64String: any) => {
    if (!base64String) {
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

  const fetchStores = async () => {
    try {
      const response = await apiClient.get('/merchant/stores', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      // setTitle('merchantPortalProfile');

      if (response?.data?.responseCode === '009') {
        const filterValues = response?.data?.merchantStores.map(
          (item: any) => ({
            label: item.storeName,
            value: item.storeId,
          }),
        );
        setStores(filterValues);
      } else if (response?.data?.responseCode === '000') {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      } else {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      }
    } catch (error: any) {
      console.error('Error fetching merchant stores:', error);
      setDescription(error?.message);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (userData?.email) {
      fetchStores();
    }
  }, [userData?.email]);

  const onSubmit = async (values: IDynamicQR) => {
    console.log('AddDynamicQR', values);
    const {
      storeId,
      // categoryCode,
      ...rest
    } = values;

    const outlet: any = stores.find((store: any) => store.label === storeId);
    const additionalValues = {
      ...rest,
      storeId: outlet.value,
      // categoryCode: categoryNum.categoryCode,
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
      if (response?.data.responseCode === '009') {
        setAmount(values.amount);
        setQrExpirationTime(values?.qrExpirationTime);
        base64ToJpg(response?.data.qrCode);
        setTillNum(response?.data?.transactionPointNum);
        // setTitle("Success");
        // setDescription(response?.data.responseDescription);
      } else if (response?.data.responseCode === '000') {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data.responseDescription);
        setImageUrl('');
        setShowErrorModal(true);
        // setShowModal(true);
      } else {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setShowErrorModal(true);
      }
    } catch (e: any) {
      console.log('Network Failure!', e);
      setTitle(e?.code);
      setDescription(e?.message);
      setImageUrl('');
      setShowErrorModal(true);
      // setShowModal(true);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      {showModal && (
        <CustomModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          // routeName="/merchant/merchant-portal/qr-payments/dynamic-qr/"
        />
      )}
      {showErrorModal && (
        <ErrorModal
          title={title}
          description={description}
          show={showErrorModal}
          setShow={setShowErrorModal}
        />
      )}
      <HeaderWrapper
        heading="Dynamic QR"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={dynamicQRInitialValues}
        validationSchema={dynamicQRSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Add Product Details">
              <div className="flex flex-col gap-5">
                <Input
                  asterik
                  label="Product Name"
                  name="productName"
                  type="text"
                  error={formik.errors.productName}
                  touched={formik.touched.productName}
                />
                <Input
                  asterik
                  label="Amount"
                  name="amount"
                  type="text"
                  error={formik.errors.amount}
                  touched={formik.touched.amount}
                />
                <Input
                  asterik
                  label="Expiration Time (in seconds)"
                  name="qrExpirationTime"
                  type="number"
                  error={formik.errors.qrExpirationTime}
                  touched={formik.touched.qrExpirationTime}
                />
                <Input
                  asterik
                  label="Product Details"
                  name="productDetails"
                  type="text"
                  error={formik.errors.productDetails}
                  touched={formik.touched.productDetails}
                />
                <Input
                  asterik
                  label="Product Number"
                  name="productNumber"
                  type="text"
                  error={formik.errors.productNumber}
                  touched={formik.touched.productNumber}
                />
                <DropdownInput
                  asterik
                  label="Store Name"
                  name="storeId"
                  formik={formik}
                  error={formik.errors.storeId}
                  touched={formik.touched.storeId}
                  options={
                    stores.length > 0
                      ? stores
                      : [
                          {
                            value: '',
                            label: '',
                          },
                        ]
                  }
                />
              </div>
            </FormLayout>
            <div className="flex w-full justify-end gap-6">
              <Button
                label="Reset"
                onClickHandler={() => formik.resetForm()}
                className="button-secondary h-14 w-[270px] px-2 py-[11px] text-xs leading-tight"
              />
              <Button
                label="Save"
                type="submit"
                // isDisabled={formik.isValid}
                className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
      {imageUrl && showModal && (
        <QRModal
          title="Your Custom QR"
          description="Your custom QR Code has been created. You can now share the below QR code to receive money."
          show={showModal}
          setShowModal={setShowModal}
          imageUrl={imageUrl}
          amount={amount}
          expirationTime={qrExpirationTime}
          tilNum={tillNum}
        />
      )}
    </div>
  );
}

export default AddDynamicQR;
