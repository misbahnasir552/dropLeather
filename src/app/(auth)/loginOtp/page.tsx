'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginSuccess } from '@/redux/features/authSlice';
import { clearApplicants } from '@/redux/features/formSlices/onBoardingForms';

const OtpLogin = () => {
  const [apierror, setApierror] = useState('');
  const [smsOtp, setSmsOtp] = useState(new Array(6).fill(''));
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const credentials = useAppSelector((state: any) => state.loginCredentials);
  const dispatch = useAppDispatch();

  const isOtpComplete = () => {
    const isEmailOtpFilled = emailOtp.every((digit) => digit !== '');
    const isSmsOtpFilled = smsOtp.every((digit) => digit !== '');

    return isEmailOtpFilled && isSmsOtpFilled;
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiClient.post(
        'auth/login',
        {},
        {
          params: {
            channel: 'merchant',
          },
          headers: {
            username: credentials.username,
            password: credentials.password,
            otp: emailOtp.join(''),
            messageOtp: smsOtp.join(''),
          },
        },
      );

      console.log('LOGIN API response TESTTT:', response);

      if (response?.data?.responseCode === '000') {
        dispatch(loginSuccess(response?.data));
        Cookies.set('jwt', response?.data?.jwt, {
          expires: 1,
          path: '/',
        });
        Cookies.set('browser_number', response?.data?.apiSecret, {
          expires: 1,
          path: '/',
        });
        Cookies.set('username', response?.data?.email, {
          expires: 1,
          path: '/',
        });
        dispatch(clearApplicants());
        router.push('/merchant/home');
      }
      // else if (response?.data?.responseCode == '010') {
      //   console.log('here');

      //   router.push(`/reset-password?email=${credentials.username}`);
      // }
      else {
        console.log('Login failure');
        console.log('Login failure');
        setApierror(response?.data?.responseMessage);
        throw new Error('Login failed');
      }
    } catch (e: any) {
      console.log(e);
      setTitle(e.code);
      setDescription(e.message);
    } finally {
      setIsLoading(false);
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
      />
      <div className="flex flex-col gap-6 pb-[52px]">
        <HeaderWrapper
          heading={'Enter One Time Password (OTP)'}
          description={`We've sent verification to your email address (${credentials?.username}) and mobile number (${credentials?.mobileNumber})`}
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
                isDisabled={!isOtpComplete() || isLoading}
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

export default OtpLogin;
