'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import ErrorModal from '@/components/UI/Modal/ErrorModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { otpSuccess } from '@/redux/features/merchantSlice/FundsTransfer';
import { generateMD5Hash } from '@/utils/helper';

function MerchantFundsTransfer() {
  const userData = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isOtpComplete = () => {
    const isSmsOtpFilled = otp.every((digit) => digit !== '');
    const isEmailOtpFilled = emailOtp.every((digit) => digit !== '');

    return isSmsOtpFilled && isEmailOtpFilled;
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('merchant/verifyotp', {
        managerMobile: userData?.managerMobile,
        numberOtp: otp.join(''),
        emailOtp: emailOtp.join(''),
      });
      if (response.data.responseCode === '009') {
        dispatch(otpSuccess({ isAuthenticated: true }));
        router.push(
          '/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/',
        );
      } else {
        setDescription(response?.data?.errorDescription);
        setShowErrorModal(true);
      }
    } catch (e: any) {
      setDescription(e?.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
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
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      const response = await apiClient.post(
        `merchant/sendOtpMerchant?actionType=managefundtransfer`,
        requestBody,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );

      if (response.data.responseCode === '009') {
        // setTitle('Success');
        // setDescription(response.data.responseDescription);
        // setShowModal(true);
      } else {
        setDescription(response?.data?.errorDescription);
        setShowErrorModal(true);
      }
    } catch (e: any) {
      setDescription(e?.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOTP();
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-9">
      {showErrorModal && (
        <ErrorModal
          title={''}
          description={description}
          show={showErrorModal}
          setShow={setShowErrorModal}
        />
      )}
      <HeaderWrapper
        heading="Enter One Time Password (OTP)"
        description={`We have sent the OTP Verification number to email (${userData?.email}) and mobile number (${userData?.managerMobile})`}
      />
      <FormLayout>
        <div className="flex flex-col items-center justify-center gap-12">
          <OTP
            otp={emailOtp}
            setOtp={setEmailOtp}
            medium="email"
            description="Email OTP Verification Code"
            numberOfDigits={6}
          />
          <OTP
            otp={otp}
            setOtp={setOtp}
            medium="sms"
            description="Mobile Number OTP Verification Code"
            numberOfDigits={6}
          />
          <Button
            isDisabled={!isOtpComplete() || isLoading}
            label="Verify"
            className="button-primary w-[270px] px-3 py-[19px]"
            onClickHandler={handleVerify}
          />
        </div>
      </FormLayout>
    </div>
  );
}

export default MerchantFundsTransfer;
