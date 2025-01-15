'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import OTP from '@/components/OTP/OTP';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { resetFormData } from '@/redux/features/signUpSlice';
import { replaceCountryCodeWithZero } from '@/utils/helper';

// import apiClient from "@/api/apiClient";

const OtpInputWithValidation = () => {
  const [apierror, setApierror] = useState('');
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [smsOtp, setSmsOtp] = useState(new Array(6).fill(''));

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState('');

  const signUpForm = useAppSelector((state: any) => state.signup);
  const dispatch = useAppDispatch();
  const option = useSearchParams().get('option');

  const isOtpComplete = () => {
    const isEmailOtpFilled = emailOtp.every((digit) => digit !== '');
    const isSmsOtpFilled =
      option === 'corporatePortal' || smsOtp.every((digit) => digit !== '');

    return isEmailOtpFilled && isSmsOtpFilled;
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      if (option === 'corporatePortal') {
        // corporate verify otp
        try {
          const response = await apiClient.post(
            `corporate/verify`,
            {},
            {
              params: {
                email: signUpForm.email,
                otp: emailOtp.join(''),
              },
            },
          );
          console.log(response, 'Verify Corporate');
          // corporate verify otp success
          if (response.data.responseCode === '009') {
            try {
              // corporate register
              const {
                merchantType,
                website,
                managerMobile,
                confirmPassword,
                merchantName,
                email,
                ...rest
              } = signUpForm;
              const res = await apiClient.post('/corporate/registerCorporate', {
                ...rest,
                emailAddress: email,
                accountType: 'Corporate',
              });
              console.log(res, 'Successfull signup corporate');

              // corporate register success
              if (res.data.responseCode == '009') {
                setShowModal(true);
                setTitle(res.data.responseMessage);
                setDescription(res.data.responseDescription);
                dispatch(resetFormData);
                setRoute('/login');
              }
              // corporate register failure
              else if (res.data.responseCode === '000') {
                // setShowModal(true);
                // setTitle(res.data.responseCode);
                // setDescription(res.data.responseDescription);
                setApierror(res.data.responseMessage);
                setRoute('/sign-up/personal-information/');
              }
            } catch (e: any) {
              // corporate register request failure
              // setTitle(e.code);
              // setDescription(e.message);
              setApierror(e.message);
              console.log(e, 'Failed Corporate registraion!');
            }
          } else if (response.data.responseCode === '000') {
            setApierror(response.data.responseMessage);
          }
          // corporate verify otp failure
          else {
            // setShowModal(true);
            // setTitle(response.data.errorDescription);
            // setDescription(response.data.errorDescription);
            console.log('hereeeeeeeee ');
            setApierror(response.data.errorDescription);
            setRoute('/sign-up/personal-information/otp/');
          }
        } catch (e) {
          // corporate verify otp request failure
          console.log(e, 'Corporate verification failed');
          setApierror('Incorrect OTP');
          // setTitle('Incorrect OTP');
          // setDescription('Please enter correct OTP.');
        }
      } else {
        try {
          // merchant verify otp
          const response = await apiClient.post('merchant/verifyotp', {
            managerMobile: signUpForm.managerMobile,
            numberOtp: smsOtp.join(''),
            emailOtp: emailOtp.join(''),
          });
          // setShowModal(true);
          console.log(response);
          // merchant verify otp success
          if (response.data.responseCode === '009') {
            try {
              // merchant register
              const res = await apiClient.post(
                '/merchant/onboard/register',
                signUpForm,
                {
                  params: {
                    channel: 'merchant',
                  },
                },
              );
              // merchant register success
              if (res.data.responseCode == '009') {
                setShowModal(true);
                setTitle(res.data.responseDescription);
                setDescription(
                  'Congratulations! You have signed up successfully for the Sandbox account.',
                );
                dispatch(resetFormData);
                setRoute('/login');
              } else if (res.data.responseCode == '000') {
                // merchant register failure
                setShowModal(true);
                setTitle('Failure!');
                setDescription(res.data.responseDescription);
                setRoute('/sign-up/personal-information/');
              } else {
                setShowModal(true);
                setTitle('Failure!');
                setDescription(res.data.responseDescription);
              }
            } catch (e) {
              // merchant register request failure
              console.log(e, 'Merchant registration failed');
              setShowModal(true);
              setTitle('Network Error');
              setDescription('Merchant registration failed. Please try again!');
            }
          } else {
            // merchant verify otp failure
            setTitle('Failure!');
            setDescription(response.data.errorDescription);
            setShowModal(true);
            // setRoute('/sign-up/personal-information/otp/');
          }
        } catch (e) {
          // merchant verify otp request failure
          console.log(e, 'Merchant OTP Verification Failed');
          setTitle('Network Error');
          setDescription('Merchant OTP Verification Failed');
          setShowModal(true);
        }
      }
    } catch (e: any) {
      console.log(e);
      setTitle(e.code);
      setDescription(e.message);
    } finally {
      setIsLoading(false);
      // setShowModal(true);
    }
  };

  return (
    <>
      {isLoading && (
        <BarLoader color="#21B25F" />
        // <p className="bg-primary-base p-4 font-semibold">LOADING....</p>
      )}
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/login"
        routeName={route}
      />
      <div className="flex flex-col gap-6 pb-[52px]">
        <HeaderWrapper
          heading={'Enter One Time Password (OTP)'}
          // description={`We've sent verification on your email address (${
          //   signUpForm.email
          // }) and your mobile number (${replaceCountryCodeWithZero(
          //   signUpForm?.managerMobile,
          // )})`}
          description={`We've sent verification to your email address (${
            signUpForm.email
          })${
            option !== 'corporatePortal'
              ? ` and your mobile number (${replaceCountryCodeWithZero(
                  signUpForm?.managerMobile,
                )})`
              : ''
          }`}
          // option === 'corporatePortal
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
            {option !== 'corporatePortal' && (
              <OTP
                description="Enter SMS OTP here"
                setOtp={setSmsOtp}
                otp={smsOtp}
                medium="sms"
              />
            )}
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
            <div className="flex justify-center">
              <Button
                // routeName="/login"
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

export default OtpInputWithValidation;
