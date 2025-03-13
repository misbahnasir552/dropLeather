'use client';

import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

const OtpInputWithValidation = () => {
  const userData = useAppSelector((state) => state.auth);
  const addBeneficiaryForm = useAppSelector((state) => state.addBeneficiary);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [smsOtp, setSmsOtp] = useState(new Array(6).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('');

  const handleVerify = async () => {
    try {
      setIsLoading(true);

      const response = await apiClient.post('merchant/verifyotp', {
        // rewuest: {
        managerMobile: userData?.managerMobile,
        // email: userData?.email,
        numberOtp: smsOtp.join(''),
        emailOtp: emailOtp.join(''),
        // },
      });
      console.log(response);

      if (response?.data?.responseCode === '009') {
        const additionalValues = {
          ...addBeneficiaryForm,
          managerMobile: userData?.managerMobile,
        };
        const mdRequest = {
          ...additionalValues,
          apisecret: userData?.apiSecret,
        };
        const md5Hash = generateMD5Hash(mdRequest);
        const requestBody = { request: additionalValues, signature: md5Hash };
        try {
          setIsLoading(true);
          const response = await apiClient.post(
            '/merchant/addBeneficiary',
            requestBody,
            {
              headers: { Authorization: `Bearer ${userData?.jwt}` },
              params: { merchantEmail: userData?.email },
            },
          );
          console.log('Added Successfully', response);
          if (response?.data.responseCode === '009') {
            setTitle('Beneficiary Added Successfully');
            setDescription(response?.data.responseDescription);
            setShowModal(true);
            // router.push("")
          } else {
            setTitle(response?.data?.errorMessage);
            setDescription(response?.data?.errorDescription);
            setApierror(response?.data?.errorDescription);
          }
        } catch (e: any) {
          setDescription(e?.message);
          setApierror(e?.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseMessage);
        setApierror(response?.data?.responseMessage);
      }
    } catch (e: any) {
      console.log(e);
      setDescription(e?.message);
      setApierror(e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <BarLoader color="#21B25F" />
        // <p className="bg-primary-base p-4 font-semibold">LOADING....</p>
      )}
      {showModal && (
        <SuccessModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          routeName={
            '/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/'
          }
          isVisible={true}
        />
      )}
      <div className="flex flex-col gap-6 pb-[52px]">
        <HeaderWrapper
          heading={'Enter One Time Password (OTP)'}
          description={`we've sent verification on your email address (${userData?.email}) and your mobile number (+${userData?.managerMobile})`}
          show={true}
        />
        <FormLayout>
          <div className="flex flex-col gap-12">
            <OTP
              description="Enter Email OTP here"
              setOtp={setEmailOtp}
              otp={emailOtp}
              medium="email"
            />
            <OTP
              description="Enter SMS OTP here"
              setOtp={setSmsOtp}
              otp={smsOtp}
              medium="sms"
            />
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
            <div className="flex justify-center">
              <Button
                // routeName="/login"
                label="Verify"
                className="button-primary w-[270px] px-3 py-[19px]"
                onClickHandler={handleVerify}
              />
            </div>
          </div>
        </FormLayout>
      </div>
    </>
  );
};

export default OtpInputWithValidation;
