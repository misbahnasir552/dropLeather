'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { transferFundsData } from '@/redux/features/merchantSlice/transferFunds';
// import type { BankAccountDTO } from '@/utils/dropdown-list/bankList';
// import { bankAccountsDTO } from '@/utils/dropdown-list/bankList';
import { generateMD5Hash } from '@/utils/helper';
import {
  fundsTransferInitialValues,
  fundsTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/funds-transfer';

function FundsTranfer() {
  const userData = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [apierror, setApierror] = useState('');

  const fetchBeneficiariesRecords = async () => {
    try {
      const response = await apiClient.get('/merchant/getAllBeneficiaries');
      if (response?.data?.responseCode === '009') {
        setRecords(response?.data?.beneficiaryList);
      } else {
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      setApierror(e?.message);
    }
  };

  useEffect(() => {
    fetchBeneficiariesRecords();
  }, []);

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
  const onSubmit = async (values: any) => {
    const { beneficiaryAccountNumber, beneficiaryBank, ...rest } = values;
    console.log(rest);

    // const splitStringLastPart = values.beneficiaryAccountNumber?.split('-').pop();
    const splitStringLastPart = values.beneficiaryAccountNumber
      ?.split('-')
      .pop()
      ?.trim();

    const selectedOption: any = records?.find(
      (option: any) => option.mobileNumber === splitStringLastPart,
    );
    dispatch(transferFundsData({ ...values, selectedOption }));
    const res = await fetchOTP();
    if (res) {
      router.push('otp');
    }
    // try {
    //   const additionalValues = {
    //     ...rest,
    //     beneficiaryAccountNumber: selectedOption?.mobileNumber,
    //     beneficiaryBank: selectedOption?.bankName,
    //     managerMobile: userData?.managerMobile,
    //   };

    //   const mdRequest = {
    //     ...additionalValues,
    //     apisecret: userData?.apiSecret,
    //   };
    //   const md5Hash = generateMD5Hash(mdRequest);
    //   const requestBody = {
    //     request: additionalValues,
    //     signature: md5Hash,
    //   };
    //   setIsLoading(true);
    //   const response = await apiClient.post(
    //     `/merchant/fundsTransfer?email=${userData?.email}`,
    //     requestBody,
    //     { headers: { Authorization: `Bearer ${userData?.jwt}` } },
    //   );
    //   if (response?.data?.responseCode === '009') {
    //     setShowModal(true);

    //     setTitle(response?.data?.responseMessage);
    //     setDescription(response?.data.responseDescription);
    //     resetForm();
    //   } else {
    //     setTitle('Failure');
    //     setDescription(response.data.responseDescription);
    //     setApierror(response.data.responseDescription);
    //   }
    // } catch (e: any) {
    //   setTitle('Network Failure');
    //   setDescription(e.message);
    //   setApierror(e?.message);
    // } finally {
    //   setIsLoading(false);
    //   // setShowModal(true);
    // }
  };
  const tranferPurposeList = [
    {
      label: 'Supplier/Vendor Payment',
      value: 'Supplier/Vendor Payment',
    },
    {
      label: 'Business',
      value: 'Business',
    },
    {
      label: 'Family Support',
      value: 'Family Support',
    },
    {
      label: 'Investment',
      value: 'Investment',
    },
    {
      label: 'Personal Expense',
      value: 'Personal Expense',
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/"
      />
      <HeaderWrapper heading="Funds Transfer" />
      <Formik
        initialValues={fundsTransferInitialValues}
        validationSchema={fundsTransferSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Account Details">
              <div className="flex flex-col gap-4">
                {/* <Input
                  // isDisabled
                  value={'923458496384'}
                  label="Transfer From"
                  name={'transferFrom'}
                  type="text"
                  error={formik.errors.transferFrom}
                  touched={formik.touched.transferFrom}
                  asterik={true}
                  placeholder={'92XXXXXXXXXX'}
                /> */}
                {/* <Input
                  // isDisabled
                  value={'923458496384'}
                  label="Transfer To"
                  name={'transferTo'}
                  type="text"
                  error={formik.errors.transferTo}
                  touched={formik.touched.transferTo}
                  asterik={true}
                  placeholder={'92XXXXXXXXXX'}
                /> */}
                {/* <Input
                  label="Beneficiary Account Details"
                  name={'beneficiaryAccountNumber'}
                  type="text"
                  error={formik.errors.beneficiaryAccountNumber}
                  touched={formik.touched.beneficiaryAccountNumber}
                /> */}
                <DropdownInput
                  label="Beneficiary Account Details"
                  name={'beneficiaryAccountNumber'}
                  asterik={true}
                  error={formik.errors.beneficiaryAccountNumber}
                  touched={formik.touched.beneficiaryAccountNumber}
                  formik={formik}
                  options={records.map((option: any) => ({
                    label: `${option.bankName} - ${option.beneficiaryName} - ${option.mobileNumber}`,
                    value: `${option.mobileNumber}`,
                  }))}
                />

                {/* <DropdownInput
                  label="Beneficiary Bank"
                  name={'beneficiaryBank'}
                  error={formik.errors.beneficiaryBank}
                  touched={formik.touched.beneficiaryBank}
                  formik={formik}
                  options={bankAccountsDTO.map((option: BankAccountDTO) => ({
                    label: option.bankName,
                    value: option.bankPrefix,
                  }))}
                /> */}
                <Input
                  label="Transfer Amount"
                  name={'transferAmount'}
                  type="number"
                  asterik={true}
                  error={formik.errors.transferAmount}
                  touched={formik.touched.transferAmount}
                />
                {/* <Input
                  label="Transfer Purpose"
                  name={'transferPurpose'}
                  type="text"
                  error={formik.errors.transferPurpose}
                  touched={formik.touched.transferPurpose}
                /> */}
                <DropdownInput
                  label="Transfer Purpose"
                  name={'transferPurpose'}
                  error={formik.errors.transferPurpose}
                  touched={formik.touched.transferPurpose}
                  formik={formik}
                  options={tranferPurposeList}
                />
              </div>
            </FormLayout>
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
            {isLoading && (
              <div className="flex w-full justify-center">
                <BarLoader color="#21B25F" />
              </div>
            )}
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                type="button"
                routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/"
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

export default FundsTranfer;
