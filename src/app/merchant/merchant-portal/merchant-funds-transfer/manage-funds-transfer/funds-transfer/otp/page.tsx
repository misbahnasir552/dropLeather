'use client';

import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import ErrorModal from '@/components/UI/Modal/ErrorModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { resetTransferFundsFormData } from '@/redux/features/merchantSlice/transferFunds';
import { generateMD5Hash } from '@/utils/helper';

const OtpInputWithValidation = () => {
  const userData = useAppSelector((state) => state.auth);
  const fundsTransferForm = useAppSelector((state) => state.transferFunds);
  const dispatch = useAppDispatch();
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [smsOtp, setSmsOtp] = useState(new Array(6).fill(''));
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setIsLoading(true);

      const response = await apiClient.post('merchant/verifyotp', {
        managerMobile: userData?.managerMobile,
        numberOtp: smsOtp.join(''),
        emailOtp: emailOtp.join(''),
      });

      if (response?.data?.responseCode === '009') {
        try {
          const additionalValues = {
            transferAmount: fundsTransferForm?.transferAmount,
            transferPurpose: fundsTransferForm?.transferPurpose,
            beneficiaryAccountNumber:
              fundsTransferForm?.selectedOption?.mobileNumber,
            beneficiaryBank: fundsTransferForm?.selectedOption?.bankName,
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
          setIsLoading(true);
          const response = await apiClient.post(
            `/merchant/fundsTransfer?email=${userData?.email}`,
            requestBody,
            { headers: { Authorization: `Bearer ${userData?.jwt}` } },
          );
          if (response?.data?.responseCode === '009') {
            setShowModal(true);
            setTitle(response?.data?.responseMessage);
            setDescription(response?.data.responseDescription);
            dispatch(resetTransferFundsFormData());
          } else {
            setDescription(response?.data.responseDescription);
            setShowErrorModal(true);
          }
        } catch (e: any) {
          setTitle(e?.message);
          setShowErrorModal(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setDescription(response?.data.responseDescription);
        setShowErrorModal(true);
      }
    } catch (e: any) {
      setDescription(e?.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <BarLoader color="#21B25F" />}
      {showModal && (
        <SuccessModal
          title={title}
          description={description}
          show={showModal}
          setShowModal={setShowModal}
          isVisible
          routeName={
            '/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/'
          }
        />
      )}
      {showErrorModal && (
        <ErrorModal
          title={title}
          description={description}
          show={showErrorModal}
          setShow={setShowErrorModal}
        />
      )}
      <div className="flex flex-col gap-6 pb-[52px]">
        <HeaderWrapper
          heading={'Enter One Time Password (OTP)'}
          description={`we've sent verification on your email address (${userData?.email}) and your mobile number (${userData?.managerMobile})`}
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
            <div className="flex justify-center">
              <Button
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
