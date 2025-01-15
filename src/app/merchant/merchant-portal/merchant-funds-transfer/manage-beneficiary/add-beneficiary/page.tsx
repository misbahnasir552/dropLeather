'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBeneficiaryData } from '@/redux/features/merchantSlice/addBeneficiary';
import type { BankAccountDTO } from '@/utils/dropdown-list/bankList';
import { bankAccountsDTO } from '@/utils/dropdown-list/bankList';
import { generateMD5Hash } from '@/utils/helper';
import {
  addBeneficiaryInitialValues,
  addBeneficiarySchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/add-beneficiary';
// import ImageInput from '@/components/UI/Inputs/ImageInput';

function AddBeneficiary() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state: any) => state.auth);
  // const { apiSecret } = userData;
  const [isChecked, setIsChecked] = useState(false);

  // const [showModal, setShowModal] = useState(false);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFetchTitle = async (formik: any) => {
    try {
      const additionalValues = {
        bankName: formik.values.bankName,
        accNumber: formik.values.accountNumber,
        managerMobile: userData?.managerMobile,
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      const response = await apiClient.post(
        '/merchant/fetchTitleOtherBanks',
        requestBody,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );
      console.log(response, 'FETCH OTHER BANK TITLE');
      console.log(response?.data?.accountTitle, 'accountTitle');

      formik?.setFieldValue('accountTitle', response?.data?.accountTitle);
      console.log(formik.values, 'After values');
    } catch (e) {
      console.log('Fetch details failed', e);
    }
  };

  const onSubmit = async (values: any) => {
    console.log('Add beneficiary values', values);

    dispatch(addBeneficiaryData(values));

    router.push('otp');

    // const additionalValues = {
    //   ...values,
    //   managerMobile: userData?.managerMobile,
    // };
    // const mdRequest = {
    //   ...additionalValues,
    //   apisecret: apiSecret,
    // };
    // const md5Hash = generateMD5Hash(mdRequest);
    // const requestBody = { request: additionalValues, signature: md5Hash };
    // try {
    //   setIsLoading(true);
    //   const response = await apiClient.post(
    //     '/merchant/addBeneficiary',
    //     requestBody,
    //     {
    //       headers: { Authorization: `Bearer ${userData?.jwt}` },
    //       params: { merchantEmail: userData?.email },
    //     },
    //   );
    //   console.log('Added Successfully', response);
    //   if (response?.data.responseCode === '00') {
    //     setTitle(response?.data.responseCode);
    //     setDescription(response?.data.responseDescription);
    //   } else {
    //     setTitle(response.data.errorDescription);
    //     setDescription(response.data.errorDescription);
    //   }
    // } catch (e: any) {
    //   setTitle(e.code);
    //   setDescription(e.message);
    // } finally {
    //   setIsLoading(false);
    //   setShowModal(true);
    // }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
      /> */}

      <HeaderWrapper
        heading="Add Beneficiary"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={addBeneficiaryInitialValues}
        validationSchema={addBeneficiarySchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Beneficiary Details">
              <div className="flex flex-col gap-4">
                <DropdownInput
                  formik={formik}
                  label="Account Type"
                  name={'accountType'}
                  options={[
                    { value: 'Savings', label: 'Savings' },
                    { value: 'Current', label: 'Current' },
                  ]}
                  error={formik.errors.accountType}
                  touched={formik.touched.accountType}
                />

                <Input
                  label="Account Number"
                  name={'mobileNumber'}
                  type="text"
                  error={formik.errors.mobileNumber}
                  touched={false}
                />
                {/* <Input
                  label="Bank Name"
                  name={'bankName'}
                  type="text"
                  error={'hi'}
                  touched={false}
                /> */}
                <DropdownInput
                  label="Bank Name"
                  name={'bankName'}
                  error={formik.errors.bankName}
                  touched={formik.touched.bankName}
                  formik={formik}
                  options={bankAccountsDTO.map((option: BankAccountDTO) => ({
                    label: option.bankName,
                    value: option.bankPrefix,
                  }))}
                />
                <div className="flex w-full justify-end">
                  <Button
                    label="Fetch Title"
                    isDisabled={!!formik.values.mobileNumber}
                    className="button-secondary h-[14px] w-[120px] px-3 py-[19px] text-xs"
                    onClickHandler={() => handleFetchTitle(formik)}
                  />
                </div>
                <Input
                  label="Account Title"
                  name={'accountTitle'}
                  type="text"
                  value={formik.values.accountTitle}
                  // error={formik.errors.accountTitle}
                  // touched={formik.touched.accountTitle}
                  isDisabled
                />
                <Input
                  label="Beneficiary Name"
                  name={'beneficiaryName'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
                <Input
                  label="Beneficiary Email"
                  name={'beneficiaryEmail'}
                  type="text"
                  error={'hi'}
                  touched={false}
                />
              </div>
              <CheckboxItem
                description="I agree to easypaisa Terms & Conditions"
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              />
            </FormLayout>
            {/* {isLoading && (
              <div className="flex w-full justify-center">
                <BarLoader color="#21B25F" />
              </div>
            )} */}
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                type="submit"
                className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
              <Button
                label="Next"
                type="submit"
                // routeName="/login"
                className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBeneficiary;
