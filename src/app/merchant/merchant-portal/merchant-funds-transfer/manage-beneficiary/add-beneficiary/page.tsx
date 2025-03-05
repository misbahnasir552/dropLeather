'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
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
  const [checkedError, setCheckedError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('');

  const handleCheckboxChange = () => {
    setCheckedError('');
    setIsChecked(!isChecked);
  };

  const fetchOTP = async () => {
    try {
      setIsLoading(true);
      const additionalValues = {
        managerMobile: userData?.managerMobile,
        email: userData?.email,
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = { request: additionalValues, signature: md5Hash };
      const response = await apiClient.post(
        'merchant/sendOtpMerchant',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      console.log(response, 'FETCH OTP RESPONSE');
      if (response.data.responseCode === '009') {
        return true;
      }
      setTitle('Error fetching OTP');
      setShowModal(true);
      return false;
    } catch (e: any) {
      console.log(e);
      setTitle('Network Failed');
      setDescription(e.message);
      setShowModal(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchTitle = async (formik: any) => {
    console.log('FETCH TITLEeeee');
    setApierror('');
    try {
      setIsLoading(true);
      const additionalValues = {
        bankName: formik.values.bankName,
        accNumber: formik.values.mobileNumber,
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
      if (response?.data.responseCode === '009') {
        formik?.setFieldValue('accountTitle', response?.data?.accountTitle);
      } else {
        setTitle('Error fetching Title');
        setDescription(response.data.responseDescription);
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      }
    } catch (e) {
      console.log('Fetch details failed', e);
      setTitle('Network Failed');
      setApierror('Network Failed');
      // setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    console.log('Add beneficiary values', values);
    if (!isChecked) {
      setCheckedError('Select Terms & Conditions to continue');
    } else {
      dispatch(addBeneficiaryData(values));
      const res = await fetchOTP();
      if (res) {
        router.push('otp');
      }
    }
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
  const handleTermsAndConditionsChange = () => {
    const downloadUrl = `http://api-gateway-opsdev.telenorbank.pk/corporate/downloadCorporateFile?filename=Online%20Payment%20Services%20Agreement.pdf&email=termsandconditions@gmail.com&type=merchant`;
    window.open(downloadUrl, '_blank');
  };
  return (
    <div className="flex flex-col gap-6">
      {isLoading && <BarLoader color="#21B25F" />}
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
      />

      <HeaderWrapper
        heading="Add Beneficiary"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
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
                  asterik={true}
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
                  asterik={true}
                />
                {/* <Input
                  label="Bank Name"
                  name={'bankName'}
                  type="text"
                  error={'hi'}
                  touched={false}
                /> */}
                <DropdownNew
                  label="Bank Name"
                  name={'bankName'}
                  asterik={true}
                  error={formik.errors.bankName}
                  touched={formik.touched.bankName}
                  formik={formik}
                  options={bankAccountsDTO.map((option: BankAccountDTO) => ({
                    label: option.bankName,
                    value: option.bankPrefix,
                  }))}
                />
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {apierror}
                </div>
                <div className="flex w-full justify-end">
                  <Button
                    label="Fetch Title"
                    // isDisabled={!!formik.values.mobileNumber}
                    className="button-secondary h-[14px] w-[120px] px-3 py-[19px] text-xs"
                    isDisabled={!formik.values.mobileNumber}
                    onClickHandler={() => handleFetchTitle(formik)}
                  />
                </div>
                <Input
                  label="Account Title"
                  name={'accountTitle'}
                  type="text"
                  asterik={true}
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
                  asterik={true}
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
              {/* <CheckboxItem
                description="I agree to easypaisa Terms & Conditions"
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              /> */}
              <CheckboxItem
                description="I agree to easypaisa"
                span="terms & conditions"
                handleTermsAndConditionsChange={handleTermsAndConditionsChange}
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
              />
              {checkedError && (
                <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                  {checkedError}
                </div>
              )}
            </FormLayout>
            {/* {isLoading && (
              <div className="flex w-full justify-center">
                <BarLoader color="#21B25F" />
              </div>
            )} */}
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
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
