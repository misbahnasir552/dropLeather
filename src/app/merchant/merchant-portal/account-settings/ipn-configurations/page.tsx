'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import type { IInitialDataMerchant } from '@/components/MerchantDualListTable';
import MerchantDualListTable from '@/components/MerchantDualListTable';
// import DualListTable, { IInitialData } from '@/components/DualListTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H6 from '@/components/UI/Headings/H6';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  ipnConfigurationInitialValues,
  ipnConfigurationSchema,
} from '@/validations/merchant/merchant-portal/account-settings/IPNConfiguration';

// interface IInitialData {
//   // id: number;
//   name: string;
//   category: string;
// }

export default function IPNConfig() {
  const userData = useAppSelector((state) => state.auth);
  const [initialData, setInitialData] = useState<any[]>([]);

  const [selectedItems, setSelectedItems] = useState<IInitialDataMerchant[]>(
    [],
  );

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading, 'isloading');

  const fetchFields = async () => {
    try {
      const response = await apiClient.get('/merchant/getAllIPNFields', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
      });
      console.log(response, 'RESPONSE FIELDS');
      setInitialData(response?.data);
    } catch (e) {
      console.log(e, 'failed field fetch');
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const onSubmit = async (values: any) => {
    console.log(values, 'vlssssssssssss');
    const ids = selectedItems?.map((item: any) => item?.id);

    const additionalValues = {
      // ...values,
      fieldIds: ids,
      managerMobile: userData?.managerMobile,
    };
    const mdRequest = {
      ...additionalValues,
      apisecret: userData?.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const requestBody = { request: additionalValues, signature: md5Hash };
    try {
      // setIsLoading(true);
      const response = await apiClient.post(
        '/merchant/createIpnConfiguration',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
          params: { url: values.url },
        },
      );
      console.log('Added Successfully', response);
      if (response?.data.responseCode === '00') {
        setTitle(response?.data.responseCode);
        setDescription(response?.data.url);
      } else {
        setTitle(response.data.errorDescription);
        setDescription(response.data.errorDescription);
      }
    } catch (e: any) {
      setTitle(e.code);
      setDescription(e.message);
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
      />
      <HeaderWrapper
        heading="IPN Configurations"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={ipnConfigurationInitialValues}
        validationSchema={ipnConfigurationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout>
              <div className="flex flex-col gap-4">
                <H6>IPN Handler URL</H6>
                <Input
                  label="IPN Handler URL"
                  name="url"
                  type="text"
                  error={formik.errors.url}
                  touched={formik.touched.url}
                />
              </div>
            </FormLayout>
            <MerchantFormLayout>
              <MerchantDualListTable
                headingLeft="Available Parameters"
                headingRight="Selected Parameters"
                title={'ipnConfiguration'}
                initialData={initialData}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
              />
            </MerchantFormLayout>
            <div className="flex w-full justify-end gap-6">
              <Button
                label="Cancel"
                routeName="/login"
                className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
              />
              <Button
                label="Save"
                type="submit"
                className="button-primary w-[270px] py-[19px] text-sm leading-tight"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
