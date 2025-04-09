'use client';

import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import BulkRegisterInput from '@/components/UI/Inputs/BulkRegisterInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import FileInput from '@/components/UI/Inputs/FileInput';s
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import type { AddTransactionPointForm } from '@/interfaces/interface';
import { generateMD5Hash } from '@/utils/helper';
import {
  addTransactionPointInitialValues,
  addTransactionPointSchema,
} from '@/validations/merchant/transactions/addTransactionPoint';

function AddTransactionPoint() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stores, setStores] = useState([]);
  const [route, setRoute] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(
    Array(1).fill(null),
  );

  const fetchStores = async () => {
    setIsloading(true);
    try {
      const response = await apiClient.get('/merchant/stores', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      // setTitle('merchantPortalProfile');

      console.log('STORESS', response?.data);
      if (response.data.responseCode === '009') {
        const filterValues = response?.data?.merchantStores.map(
          (item: any) => ({
            label: item.storeName,
            value: item.storeId,
          }),
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

  const onSubmit = async (values: AddTransactionPointForm) => {
    // console.log('i am add transaction point AddTransactionPoint', values);
    const { letterHeadImage, outletName, ...restValues } = values;
    console.log('DROPDOWN VAL', outletName, stores);

    const outlet: any = stores.find((store: any) => store.label === outletName);
    console.log('OUTLET', outlet);

    const additionalValues = {
      ...restValues,
      managerMobile: userData?.managerMobile,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const req = { request: additionalValues, signature: md5Hash };
    const stringifyRequest = JSON.stringify(req);
    console.log(stringifyRequest, 'STRINGIFY OBJECT');

    const formData = new FormData();
    try {
      setIsloading(true);
      if (letterHeadImage && outlet?.value) {
        formData.append('outletId', outlet?.value);
        formData.append('letterHeadImage', letterHeadImage);
        formData.append('transactionPointDetailsRequestDTO', stringifyRequest);
        const response = await apiClient.post(
          '/merchant/addTransactionPointDetails',
          formData,
          {
            headers: { Authorization: `Bearer ${userData?.jwt}` },
          },
        );
        console.log(response);
        if (response?.data.responseCode === '009') {
          setTitle('Success');
          setDescription(response?.data.responseDescription);
          setRoute('/merchant/merchant-portal/qr-payments/dynamic-qr/');
          // router.push();
        } else if (response?.data.responseCode === '000') {
          setTitle('Failure');
          setDescription(response?.data.responseDescription);
        } else {
          setTitle('Failure');
          setDescription(response.data.errorDescription);
        }
      }
    } catch (e: any) {
      console.log('Network Failure!', e);
      setTitle('Network Failure');
      setDescription(e.message);
    } finally {
      setShowModal(true);
      setIsloading(false);
    }
  };

  if (stores.length < 1) {
    return (
      <div className="flex items-center justify-center">
        <CustomModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          routeName={route}
        />
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <CustomModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          // routeName="/merchant/merchant-portal/qr-payments/dynamic-qr/"
        />
        <HeaderWrapper
          heading="Add Transaction Point"
          // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <H6>Transaction Point Details</H6>
        <Formik
          initialValues={addTransactionPointInitialValues}
          validationSchema={addTransactionPointSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
              <FormLayout formHeading="Transaction Point Details">
                <div className="flex flex-col gap-5">
                  {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
                  <DropdownInput
                    asterik
                    label="Outlet Name"
                    name="outletName"
                    formik={formik}
                    error={formik.errors.outletName}
                    touched={formik.touched.outletName}
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
                  <Input
                    asterik
                    label="SMS Notification Number 1"
                    name="smsNotificationNumber1"
                    placeholder="03XXXXXXXXX"
                    type="text"
                    error={formik.errors.smsNotificationNumber1}
                    touched={formik.touched.smsNotificationNumber1}
                  />
                  <Input
                    label="SMS Notification Number 2"
                    name="smsNotificationNumber2"
                    type="text"
                    error={formik.errors.smsNotificationNumber2}
                    touched={formik.touched.smsNotificationNumber2}
                  />
                  <Input
                    label="SMS Notification Number 3"
                    name="smsNotificationNumber3"
                    type="text"
                    error={formik.errors.smsNotificationNumber3}
                    touched={formik.touched.smsNotificationNumber3}
                  />
                  <Input
                    label="SMS Notification Number 4"
                    name="smsNotificationNumber4"
                    type="text"
                    error={formik.errors.smsNotificationNumber4}
                    touched={formik.touched.smsNotificationNumber4}
                  />
                  <Input
                    label="SMS Notification Number 5"
                    name="smsNotificationNumber5"
                    type="text"
                    error={formik.errors.smsNotificationNumber5}
                    touched={formik.touched.smsNotificationNumber5}
                  />
                  <BulkRegisterInput
                    asterik
                    key="LetterHeadImage"
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    index={0}
                    formik={formik}
                    item={{
                      label: 'Letter Head Image',
                      file: selectedFiles[0],
                      name: 'letterHeadImage',
                      icon: AttachmentsIcon,
                    }}
                  />
                  {/* <Input
                    label="Letter Head Image"
                    name="LetterHeadImage"
                    type="text"
                    error={"hi"}
                    touched={false}
                  /> */}
                </div>
              </FormLayout>
              <div className="flex w-full justify-end gap-6">
                <Button
                  label="Cancel"
                  routeName="/login"
                  className="button-secondary h-14 w-[270px] px-2 py-[11px] text-xs leading-tight"
                />
                <Button
                  label="Save"
                  isDisabled={isLoading}
                  type="submit"
                  className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
                />
              </div>
            </Form>
          )}
        </Formik>
        {/* <Input name="asd" label="ASD" formik='xyz'/> */}

        {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
      </div>
    </>
  );
}

export default AddTransactionPoint;
