'use client';

import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

function MerchantFundsTransfer() {
  const userData = useAppSelector((state) => state.auth);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isOtpComplete = () => {
    // const isEmailOtpFilled = emailOtp.every((digit) => digit !== '');
    const isSmsOtpFilled = otp.every((digit) => digit !== '');

    return isSmsOtpFilled;
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
        'merchant/sendOtpMerchant',
        requestBody,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );
      setShowModal(true);
      console.log(response);

      if (response.data.responseCode === '009') {
        setTitle('Success');
        setDescription(response.data.responseDescription);
        setShowModal(true);
      } else {
        setTitle('Failure');
        setDescription(response.data.errorDescription);
        setShowModal(true);
      }
    } catch (e: any) {
      console.log(e);
      setTitle('Network Failure');
      setDescription(e.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
      // setShowModal(true);
    }
  };

  useEffect(() => {
    fetchOTP();
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-9">
      {isLoading && <BarLoader color="#21B25F" />}
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/login"
      />
      <HeaderWrapper
        heading="Enter One Time Password (OTP)"
        description={`We have sent the OTP Verification number to +(${userData?.managerMobile})`}
      />
      <FormLayout>
        <div className="flex flex-col items-center justify-center gap-12">
          <OTP
            otp={otp}
            setOtp={setOtp}
            medium="sms"
            description="OTP Verification Code"
            numberOfDigits={6}
          />
          <Button
            isDisabled={!isOtpComplete() || isLoading}
            label="Verify"
            className="button-primary w-[270px] px-3 py-[19px]"
          />
        </div>
      </FormLayout>
    </div>
  );
}

export default MerchantFundsTransfer;
