'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import type { IViewProductQr } from '@/validations/merchant/merchant-portal/qr-payments/interfaces';
import {
  viewProductQrInitialValues,
  viewProductQrSchema,
} from '@/validations/merchant/merchant-portal/qr-payments/view-product-qr';

function ViewProductQR() {
  const [qrFilteredData, setQrFilteredData] = useState([]);
  const [filteredParams, setFilteredParams] = useState();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const viewProductQrTableHeadings: string[] = [
    'Product Name',
    'Amount (Rs.)',
    'Product Details',
    'Product Number',
    'Store ID',
    'Actions',
  ];

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        // setData(['Item 1', 'Item 2', 'Item 3']);
        setLoading(false);
      }, 2000);
      const response = await apiClient.get('/merchantportal/searchDynamicQr', {
        params: filteredParams,
      });
      console.log(response.data.dynamicQrResponse, 'RESPONSE');
      const filteredValues = response?.data?.dynamicQrResponse.map(
        ({
          id,
          qrFormatIndicator,
          branchCode,
          qrCode,
          createdAt,
          updatedAt,
          ...rest
        }: any) => rest,
      );
      setQrFilteredData(filteredValues);
      // setLoading(false);
    } catch (e) {
      console.log('Error in fetching dynamic QR list', e);
    }
  };

  const handleDelete = async (id: any) => {
    console.log('Delete row with id:', id);
    try {
      const response = await apiClient.delete(
        '/merchantportal/removeDynamicQr',
        {
          params: { storeId: id },
        },
      );
      console.log(response, 'Deleted response');
      if (response?.data?.responseCode === '009') {
        setTitle('Deleted Successfully');
        setDescription(response?.data?.responseMessage);
        fetchRecords();
      } else if (response?.data?.responseCode === '000') {
        setTitle('Failure!');
        setDescription(response?.data?.responseMessage);
      } else {
        setTitle('Failure!');
        setDescription(response?.data?.responseMessage);
      }
    } catch (e: any) {
      setTitle('Network Failure!');
      setDescription(e.message);
      console.log('Error in fetching dynamic QR list', e);
    }

    // setRows(rows.filter((row) => row.id !== id));
  };

  useEffect(() => {
    fetchRecords();
  }, [filteredParams]);

  // const viewProductQrTableData: any =
  //   // : TableData[]
  //   [
  //     {
  //       productNumber: '001123',
  //       productName: 'Shampoo',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       amount: '1000',
  //       actions: 'Images',
  //     },
  //     {
  //       productNumber: '001123',
  //       productName: 'Shampoo',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       amount: '1000',
  //       actions: 'Images',
  //     },
  //     {
  //       productNumber: '001123',
  //       productName: 'Shampoo',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       amount: '1000',
  //       actions: 'Images',
  //     },
  //     {
  //       productNumber: '001123',
  //       productName: 'Shampoo',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       amount: '1000',
  //       actions: 'Images',
  //     },
  //   ];
  const onSubmit = async (values: IViewProductQr) => {
    console.log('i am VIEW PRODUCT QR ViewProductQR', values);
    const filteredValues: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        filteredValues[key] = value;
      }
    });
    setFilteredParams(filteredValues);
  };

  return (
    <div>
      <>
        <div className="flex flex-col gap-6">
          <CustomModal
            title={title}
            description={description}
            show={showModal}
            setShowModal={setShowModal}
            // routeName="/merchant/merchant-portal/configuration/add-transaction-point/"
          />
          <HeaderWrapper
            heading="View Product QR"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
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
                    {/* <Button
                      label="Export"
                      routeName="/login"
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    /> */}
                    <Button
                      label="Reset"
                      routeName="/login"
                      className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </MerchantFormLayout>
        </div>
        <div className="flex flex-col items-center justify-center pt-[40px]">
          {loading ? (
            <BarLoader color="#21B25F" />
          ) : (
            <>
              {qrFilteredData.length > 0 ? (
                <IconTable
                  tableHeadings={viewProductQrTableHeadings}
                  tableData={qrFilteredData}
                  hasEdit
                  hasShare
                  hasDelete
                  // hasIcons
                  handleDelete={handleDelete}
                />
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
