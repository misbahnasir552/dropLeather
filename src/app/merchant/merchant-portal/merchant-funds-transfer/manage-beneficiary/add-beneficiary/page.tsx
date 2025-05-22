'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import DisabledField from '@/components/UI/Inputs/DisabledField';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
import Input from '@/components/UI/Inputs/Input';
import ErrorModal from '@/components/UI/Modal/ErrorModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBeneficiaryData } from '@/redux/features/merchantSlice/addBeneficiary';
import { downloadEncryptedFile, generateMD5Hash } from '@/utils/helper';
import {
  addBeneficiaryInitialValues,
  addBeneficiarySchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/add-beneficiary';

function AddBeneficiary() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedError, setCheckedError] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('');
  const [bankName, setBankName] = useState<any[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
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
        `merchant/sendOtpMerchant?actionType=addbeneficiary`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      if (response.data.responseCode === '009') {
        return true;
      }
      setDescription(response?.data?.responseDescription);
      setShowErrorModal(true);
      return false;
    } catch (e: any) {
      setDescription(e.message);
      setShowErrorModal(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchTitle = async (formik: any) => {
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
      if (response?.data.responseCode === '009') {
        formik?.setFieldValue('accountTitle', response?.data?.accountTitle);
      } else {
        setApierror(response?.data?.responseDescription);
        // setShowModal(true);
      }
    } catch (e: any) {
      setApierror(e?.message);
      // setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    setApierror('');
    if (!isChecked) {
      setCheckedError('Select Terms & Conditions to continue');
    } else {
      dispatch(addBeneficiaryData(values));
      const res = await fetchOTP();
      if (res) {
        router.push('otp?expiry=2');
      }
      // const additionalValues = {
      //   ...values,
      //   managerMobile: userData?.managerMobile,
      // };
      // const mdRequest = {
      //   ...additionalValues,
      //   apisecret: userData?.apiSecret,
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
      //   if (response?.data.responseCode === '009') {
      //     setTitle('Beneficiary Added Successfully');
      //     setDescription(response?.data?.responseDescription);
      //     // setRoute(
      //     //   '/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/',
      //     // );
      //     setShowModal(true);
      //     // router.push("")
      //   } else {
      //     setSubmitError(response?.data?.responseMessage);
      //   }
      // } catch (e: any) {
      //   setSubmitError(e?.message);
      // } finally {
      //   setIsLoading(false);
      // }
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
  // const handleTermsAndConditionsChange = () => {
  //   const EncryptedFile = generateAESEncryption(
  //     'Online Payment Services Agreement.pdf',
  //   );
  //   const EncryptedEmmail = generateAESEncryption(
  //     'termsandconditions@gmail.com',
  //   );
  //   // const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${filename}&email=${email}&type=${type}`;
  //   const downloadUrl = `http://api-gateway-opsdev.telenorbank.pk/corporate/downloadCorporateFile?filename=${EncryptedFile}&email=${EncryptedEmmail}&type=${'merchant'}`;

  //   window.open(downloadUrl, '_blank');
  // };

  const handleTermsAndConditionsChange = () => {
    downloadEncryptedFile({
      filename: 'Online Payment Services Agreement.pdf',
      email: 'termsandconditions@gmail.com',
      type: 'merchant',
    });
  };
  const getBankNames = async () => {
    try {
      const response: any = await apiClient.get(`merchant/getBankNames`);
      if (response.data.responseCode === '009') {
        setBankName(
          response?.data?.bankNames?.map((item: any) => ({
            label: item.label,
            value: item.value,
          })),
        );
      } else if (response?.data?.responseCode === '000') {
        setApierror(response?.data?.responseDescription);
      } else {
        setApierror(response?.data?.responseMessage);
      }
    } catch (e: any) {
      setApierror(e?.message);
    }
  };
  useEffect(() => {
    getBankNames();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {isLoading && <BarLoader color="#21B25F" />}
      {showErrorModal && (
        <ErrorModal
          title={''}
          description={description}
          show={showErrorModal}
          setShow={setShowErrorModal}
        />
      )}
      <HeaderWrapper heading="Add Beneficiary" />
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
                <DropdownNew
                  label="Bank Name"
                  name={'bankName'}
                  asterik={true}
                  error={formik.errors.bankName}
                  touched={formik.touched.bankName}
                  formik={formik}
                  options={bankName || []}
                />
                <Input
                  label="Account Number"
                  name={'mobileNumber'}
                  type="text"
                  error={formik.errors.mobileNumber}
                  touched={formik.touched.mobileNumber}
                  asterik={true}
                />
                {/* <div className="flex w-full justify-end">
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
                  isDisabled
                /> */}
                <div className="relative w-full">
                  <DisabledField
                    data={[
                      {
                        label: 'Account Title',
                        value: formik.values.accountTitle,
                      },
                    ]}
                    touched={formik.touched.accountTitle}
                    error={formik.errors.accountTitle}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 absolute right-2 top-1/2 -translate-y-1/2 rounded px-3 py-1 text-[#21b25f]"
                    disabled={!formik.values.mobileNumber}
                    onClick={() => handleFetchTitle(formik)}
                  >
                    Fetch Title
                  </button>
                </div>
                {formik.touched.accountTitle && (
                  <div className="flex w-full justify-start px-3 text-xs text-danger-base">
                    {formik.errors.accountTitle}
                  </div>
                )}
                {apierror && (
                  <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                    {apierror}
                  </div>
                )}
                <Input
                  label="Beneficiary Name"
                  name={'beneficiaryName'}
                  type="text"
                  error={formik.errors.beneficiaryName}
                  asterik={true}
                  touched={formik.touched.beneficiaryName}
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
                description="I agree to these"
                span="Terms & Conditions"
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
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
                className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
              <Button
                label="Next"
                type="submit"
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
