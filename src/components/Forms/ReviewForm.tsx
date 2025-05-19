'use client';

import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import ReviewFormData from '@/components/Forms/ReviewFormData';
import ApiError from '@/components/UI/Error/Error';
import { useAppSelector } from '@/hooks/redux';

function ReviewForm() {
  const userData = useAppSelector((state) => state.auth);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [apierror, setApierror] = useState('');

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
          setOnboardingData(response?.data);
        } else if (response?.data?.responseCode === '000') {
          setApierror(response?.data?.responseMessage);
        } else {
          setApierror('an unexpected error occcured');
        }
        // console.log(data, "view/get details Data");
      } catch (e: any) {
        setApierror(e?.message);
        console.log(e, 'error fetching');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
        {' '}
        REVIEW FORM{' '}
      </div>
      <div className="flex flex-col gap-9 pb-[120px]">
        {apierror == '' ? (
          <ReviewFormData
            onboardingData={onboardingData}
            isEditable={false}
            merchant={false}
          />
        ) : (
          <ApiError apiError={apierror} />
          // <div>{apierror}</div>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
