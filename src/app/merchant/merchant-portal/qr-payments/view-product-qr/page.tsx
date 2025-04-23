'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import * as XLSX from 'xlsx';

import apiClient from '@/api/apiClient';
import Pagination from '@/components/Pagination/Pagination';
import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import ErrorModal from '@/components/UI/Modal/ErrorModal';
import QRModal from '@/components/UI/Modal/QR/QRModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import { formatDateTime } from '@/utils/helper';
import type { IViewProductQr } from '@/validations/merchant/merchant-portal/qr-payments/interfaces';
import {
  viewProductQrInitialValues,
  viewProductQrSchema,
} from '@/validations/merchant/merchant-portal/qr-payments/view-product-qr';

function ViewProductQR() {
  const userData = useAppSelector((state: any) => state.auth);
  const [qrFilteredData, setQrFilteredData] = useState([]);
  const [filteredParams, setFilteredParams] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [storeName, setStoreName] = useState('');
  const [tillNum, setTillNum] = useState<string>('');
  const [apierror, setApierror] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const envPageSize = process.env.NEXT_PUBLIC_PAGE_SIZE || 10;
  const [totalPages, setTotalPages] = useState<number>(+envPageSize);
  const [expirationTime, setExpirationTime] = useState('');
  const [qrAmount, setQrAmount] = useState('');
  const [qrString, setQrString] = useState('');
  const viewProductQrTableHeadings: string[] = [
    'Product Name',
    'Amount (Rs.)',
    'Product Number',
    'Store Name',
    'Store ID',
    'QR Generation Date/Time',
    'QR Expiry Date/Time',
    'Actions',
  ];

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/merchantportal/searchDynamicQr?email=${userData?.email}`,
        {
          params: {
            ...(filteredParams && typeof filteredParams === 'object'
              ? filteredParams
              : {}), // Spread existing filtered data
            page: pageNumber,
            size: +envPageSize,
          },
        },
      );
      const filteredValues = response?.data?.dynamicQrResponse?.map(
        ({
          // id,
          isDeleted,
          qrFormatIndicator,
          branchCode,
          productDetails,
          // qrCode,
          // tillNumber,
          // createdAt,
          // storeName,
          updatedAt,
          ...rest
        }: any) => rest,
      );

      setQrFilteredData(
        filteredValues?.map((item: any) => ({
          ...item,
          expirationTime: formatDateTime(item?.expirationTime),
          createdAt: formatDateTime(item?.createdAt),
        })),
      );
      setTotalPages(response?.data?.totalPages);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log('Error in fetching dynamic QR list', e);
    }
  };
  const exportToExcel = () => {
    if (!qrFilteredData) {
      return;
    }

    // Create a worksheet from the response data
    const ws = XLSX?.utils?.json_to_sheet(qrFilteredData);

    // Create a new workbook and append the worksheet
    const wb = XLSX?.utils?.book_new();
    XLSX?.utils?.book_append_sheet(wb, ws, 'Dynamic QR Report');

    // Generate an Excel file and download it
    XLSX.writeFile(wb, 'Dynamic-QR-Report.xlsx');
  };
  const handleDelete = async (id: any) => {
    setApierror('');
    try {
      const response = await apiClient.get('/merchantportal/removeDynamicQr', {
        params: { id },
      });
      if (response?.data?.responseCode === '009') {
        setTitle('Deleted Successfully');
        setDescription(response?.data?.responseMessage);
        setShowModal(true);
        fetchRecords();
      } else if (response?.data?.responseCode === '000') {
        setTitle('Failure!');
        setDescription(response?.data?.responseDescription);
        setShowErrorModal(true);
      } else {
        setTitle('Failure!');
        setDescription(response?.data?.responseDescription);
        setShowErrorModal(true);
      }
    } catch (e: any) {
      setTitle('Network Failure!');
      setDescription(e?.message);
      setShowErrorModal(true);
    } finally {
      // setShowModal(true);
    }
  };

  const onSubmit = async (values: IViewProductQr) => {
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    if (Object.keys(filteredValues)?.length === 0) {
      return;
    }
    setFilteredParams(filteredValues);
  };
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
  const handleView = (
    qrCode: string,
    name: string,
    tillId?: string,
    amount?: string,
    expTime?: string,
  ) => {
    setTillNum(tillId || '');
    base64ToJpg(qrCode);
    setQrString(qrCode);
    setStoreName(name);
    setQrAmount(amount || '');
    setExpirationTime(expTime || '');
  };
  const handleReset = (formik: any) => {
    formik.resetForm();
    setPageNumber(0);
    fetchRecords();
  };
  const showNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const showPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };
  useEffect(() => {
    fetchRecords();
  }, [filteredParams, pageNumber]);
  return (
    <div>
      <>
        <div className="flex flex-col gap-6">
          {showModal && (
            <CustomModal
              title={title}
              description={description}
              show={showModal}
              setShowModal={setShowModal}
              // routeName="/merchant/merchant-portal/configuration/add-transaction-point/"
            />
          )}
          {showErrorModal && (
            <ErrorModal
              title={title}
              description={description}
              show={showErrorModal}
              setShow={setShowErrorModal}
              // routeName="/merchant/merchant-portal/configuration/add-transaction-point/"
            />
          )}
          {imageUrl && showModal && (
            <QRModal
              title={storeName}
              description="Your QR Code has been created. You can now share the below QR code to receive payments."
              show={showModal}
              setShowModal={setShowModal}
              imageUrl={imageUrl} // Pass the QR code image URL here
              tilNum={tillNum}
              qrString={qrString}
              amount={qrAmount}
              // amount={amount}
              expirationTime={expirationTime}
              isDynamic={true}
            />
          )}
          <HeaderWrapper
            heading="View Product QR"
            // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
          />
          <MerchantFormLayout>
            <Formik
              initialValues={viewProductQrInitialValues}
              validationSchema={viewProductQrSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className=" bg-screen-grey">
                  <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
                    <Input
                      label="Product Name"
                      name="productName"
                      type="text"
                      error={formik.errors.productName}
                    />
                    <Input
                      label="Product Number"
                      name="productNumber"
                      type="text"
                      error={formik.errors.productNumber}
                    />
                    <Input
                      label="Store ID"
                      name="storeId"
                      type="text"
                      error={formik.errors.storeId}
                    />
                  </div>
                  <div className="flex w-full justify-start gap-6">
                    <Button
                      label="Search"
                      type="submit"
                      className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
                    />
                    <Button
                      label="Export"
                      className="button-secondary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={exportToExcel} // Export button click handler
                    />
                    <Button
                      label="Reset"
                      onClickHandler={() => {
                        handleReset(formik);
                        setFilteredParams(undefined);
                      }}
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </MerchantFormLayout>
        </div>
        {apierror && (
          <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
            {apierror}
          </div>
        )}
        <div className="flex flex-col justify-center gap-3 pt-[30px]">
          {loading ? (
            <BarLoader color="#21B25F" />
          ) : (
            <>
              {qrFilteredData?.length > 0 ? (
                <>
                  <IconTable
                    tableHeadings={viewProductQrTableHeadings}
                    tableData={qrFilteredData}
                    hasShare
                    hasDelete
                    // hasIcons
                    handleDelete={handleDelete}
                    handleView={handleView}
                    isDynamicQr={true}
                  />
                  <Pagination
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                    onNext={showNextPage}
                    onPrev={showPrevPage}
                  />
                </>
              ) : (
                <H4>No Records Found</H4>
              )}
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default ViewProductQR;
