'use client';

import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import ReviewFormData from '@/components/Forms/ReviewFormData';
import { useAppSelector } from '@/hooks/redux';
// import { setBusinessNature } from '@/redux/features/formSlices/onBoardingForms';
// import FormControlButtons from '@/components/UI/Button/FormControlButtons';

function ReviewForm() {
  const userData = useAppSelector((state) => state.auth);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [apierror, setApierror] = useState('');
  // const [soleProprietorData, setSoleProprietorData] = useState(null);
  const [businessNatureActivity, setBusinessNatureActivity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`merchant/getDynamicReviewForm`, {
          headers: {
            username: userData?.email,
          },
        });
        console.log(response, 'view/get details RESPONSE');

        if (response?.data.responseCode === '009') {
          // setOnboardingData(response?.data);
          console.log('response data is', response?.data);
          if (
            response?.data?.activityInformation?.businessNature ===
            'soleProprietor'
          ) {
            setOnboardingData(response?.data);
            setBusinessNatureActivity('soleProprietor');
          } else {
            setOnboardingData(response?.data);
            setBusinessNatureActivity('other');
          }
        } else if (response?.data?.responseMessage === '000') {
          setApierror(response?.data?.responseMessage);
        } else {
          setApierror('an unexpected error occcured');
        }
        // console.log(data, "view/get details Data");
      } catch (e: any) {
        setApierror(e);
        console.log(e, 'error fetching');
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await apiClient.get(
  //         `merchant/getdetails/${userData?.email}`,
  //       );
  //       console.log(response, 'view/get details RESPONSE');

  //       if (response?.data.responseCode === '009') {
  //         // setOnboardingData(response?.data);
  //         console.log('response data is', response?.data);
  //         if (
  //           response?.data?.activityInformation?.businessNature ===
  //           'soleProprietor'
  //         ) {

  //           setOnboardingData(response?.data);
  //           setBusinessNatureActivity('soleProprietor');
  //         } else {
  //           setOnboardingData(response?.data);
  //           setBusinessNatureActivity('other');
  //         }
  //       } else if (response?.data?.responseMessage === '000') {
  //         setApierror(response?.data?.responseMessage);
  //       } else {
  //         setApierror('an unexpected error occcured');
  //       }
  //       // console.log(data, "view/get details Data");
  //     } catch (e: any) {
  //       setApierror(e);
  //       console.log(e, 'error fetching');
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
        {' '}
        REVIEW FORM{' '}
      </div>
      <div className="flex flex-col gap-9 pb-[120px]">
        {/* <div>hiiiiiiiiiii</div> */}
        {apierror == '' ? (
          <ReviewFormData
            onboardingData={onboardingData}
            businessNatureType={businessNatureActivity}
            isEditable={true}
            merchant={false}
          />
        ) : (
          <div>{apierror}</div>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
