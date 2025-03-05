'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
// import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import DynamicQRModal from '@/components/UI/Modal/QR/DynamicQRModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import type { IQrPayments } from '@/validations/merchant/merchant-portal/qr-payments/interfaces';
import {
  qrPaymentsInitialValues,
  qrPaymentsSchema,
} from '@/validations/merchant/merchant-portal/qr-payments/qr-payments';
// import QRModal from '@/components/UI/Modal/QR/QRModal';

function StaticQr() {
  const userData = useAppSelector((state: any) => state.auth);
  // const { apiSecret } = userData;

  const [imageUrl, setImageUrl] = useState('');
  const [storeName, setStoreName] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stores, setStores] = useState([]);
  // const [route, setRoute] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const base64ToJpg = (base64String: any) => {
    console.log('base 64 is', base64String);
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
        const cleanBase64String = base64String.replace(/[^A-Za-z0-9+/=]/g, '');
        byteString = atob(cleanBase64String);
        // byteString = atob(base64String); // Assume it’s already clean Base64
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
  const handleView = (qrCode: string, name: string) => {
    base64ToJpg(qrCode);
    setStoreName(name);
  };

  const fetchStores = async () => {
    setIsloading(true);
    try {
      const response = await apiClient.get('/merchant/stores', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      // setTitle('merchantPortalProfile');

      if (response.data.responseCode === '009') {
        const filterValues = response?.data?.merchantStores.map(
          (item: any) => item,
        );
        setStores(filterValues);
      } else if (response.data.responseCode === '000') {
        setTitle('Error');
        setDescription(response.data.responseDescription);
        setShowModal(true);
      } else {
        setTitle('Error');
        setDescription(response.data.responseDescription);
        setShowModal(true);
      }
    } catch (error: any) {
      console.error('Error fetching merchant stores:', error);
      setTitle('Network Error');
      setDescription(error.message);
      setShowModal(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (userData?.email) {
      fetchStores();
    }
  }, [userData?.email]);
  const qrPaymentsTableHeadings: string[] = [
    'Store ID',
    'Store Name',
    'Website URL',
    'Payment Enabled',
    'Status',
    'Actions',
  ];
  // const qrPaymentsTableData: any =
  //   // : TableData[]
  //   [
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '1',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: '03345674415',
  //       // actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '1',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: '03345674415',
  //       // actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '1',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: '03345674415',
  //       // actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '1',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: '03345674415',
  //       // actions: 'Images',
  //     },
  //   ];
  const onSubmit = (values: IQrPayments) => {
    console.log('StaticQr', values);
  };
  const handleReset = (Formik: any) => {
    console.log('RESET', Formik);

    Formik.resetForm();
  };
  return (
    <div>
      <>
        {isLoading && <BarLoader color="#21B25F" />}
        {!imageUrl && (
          <CustomModal
            title={title}
            description={description}
            show={showModal}
            setShowModal={setShowModal}
            // routeName="/merchant/merchant-portal/qr-payments/dynamic-qr/"
          />
        )}
        {imageUrl && showModal && (
          <DynamicQRModal
            title={storeName}
            description="Your static QR Code has been created. You can now share the below QR code to receive money."
            show={showModal}
            setShowModal={setShowModal}
            imageUrl={imageUrl} // Pass the QR code image URL here
            // amount={amount}
            // expirationTime={expirationTime}
          />
        )}
        <div className="flex flex-col gap-6">
          <HeaderWrapper
            heading="View QR"
            // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
          />
          <MerchantFormLayout>
            <Formik
              initialValues={qrPaymentsInitialValues}
              validationSchema={qrPaymentsSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="bg-screen-grey">
                  <div className="mb-9 grid gap-5 bg-screen-grey sm:grid-cols-1 md:grid-cols-3 ">
                    {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
                    {/* <DateInputNew
                      formik={formik}
                      label="QR Generation Date Between"
                      name="qrDateBetween"
                      error={formik.errors.qrDateBetween}
                      touched={formik.touched.qrDateBetween}
                    /> */}
                    <Input
                      label="Store Name"
                      name="storeName"
                      type="text"
                      // error={"hi"}
                      formik={formik}
                      // touched={formik.touched.CardNumber}
                    />
                    {/* <Input
                      label="Transaction Point Number"
                      name="transactionPointNumber"
                      formik={formik}
                      type="text"
                      error={'hi'}
                      touched={false}
                    /> */}
                    <Input
                      label="Store ID"
                      name="storeId"
                      type="text"
                      // error={"hi"}
                      formik={formik}
                      // touched={formik.touched.CardNumber}
                    />
                    <DropdownInput
                      label="Status"
                      options={[
                        { label: 'Active', value: 'Active' },
                        { label: 'In-Active', value: 'InActive' },
                      ]}
                      name="status"
                      formik={formik}
                    />
                  </div>
                  <div className="flex w-full justify-start gap-6">
                    <Button
                      label="Search"
                      type="submit"
                      className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                    />
                    {/* <Button
                      label="Export"
                      routeName="/login"
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    /> */}
                    <Button
                      label="Reset"
                      // routeName="/login"
                      onClickHandler={() => handleReset(formik)}
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    />
                  </div>
                </Form>
              )}
            </Formik>
            {/* <Input name="asd" label="ASD" formik='xyz'/> */}
          </MerchantFormLayout>
          {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
        </div>
        <div className="flex pt-[40px]">
          <IconTable
            tableHeadings={qrPaymentsTableHeadings}
            tableData={stores}
            // hasEdit
            handleView={handleView}
            hasShare
          />
        </div>
      </>
    </div>
  );
}

export default StaticQr;
