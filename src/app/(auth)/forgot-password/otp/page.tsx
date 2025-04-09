'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';

const OtpInputWithValidation = () => {
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState('');
  const emailAddress = useSearchParams().get('email');

  const handleVerify = async () => {
    try {
      // merchant verify otp
      setIsLoading(true);
      const response = await apiClient.post('merchant/verifyEmailOtpMerchant', {
        email: emailAddress,
        emailOtp: emailOtp.join(''),
      });
      setShowModal(true);
      console.log(response);
      // merchant verify otp success
      if (response.data.responseCode === '009') {
        setTitle(response.data.responseMessage);
        setDescription(response.data.responseDescription);
        setRoute('/login');
      } else {
        // merchant verify otp failure
        setTitle(response.data.responseMessage);
        setDescription(response.data.responseDescription);
      }
    } catch (e: any) {
      // merchant verify otp request failure
      setTitle('Network Failed');
      setDescription(e.responseDescription);
      console.log(e, 'Merchant verification Failed');
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      {isLoading && (
        <p className="bg-primary-base p-4 font-semibold">LOADING....</p>
      )}
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={route}
      />
      <div className="flex flex-col gap-6 pb-[52px]">
        <HeaderWrapper
          heading={'Enter One Time Password (OTP)'}
          description={`We've sent verification to your email address (${emailAddress})
            `}
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
            <div className="flex justify-center">
              <Button
                label="Verify"
                isDisabled={isLoading}
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
