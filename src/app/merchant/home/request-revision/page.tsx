'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';

interface UserData {
  email: string;
}

interface MerchantData {
  activityInformation?: { status: string };
  businessDetails?: { status: string };
  settlementDetails?: { status: string };
  integration?: { status: string };
  documents?: { status: string };
  reviewForm?: { status: string };
}

const RequestRevisionPage = () => {
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const [data, setData] = useState<MerchantData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `/merchant/fieldsForRevision?email=${userData.email}`,
      );
      if (response?.data) {
        setData(response.data);
        console.log(data);
        dispatch(setPageData(response.data));
        router.push('/merchant/home/request-revision/activity-information');
      } else {
        console.error('Empty response data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    getDetails();
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Request Revision</h1>

      <button
        onClick={handleContinue}
        className="text-white mt-4 rounded bg-primary-base px-6 py-2 disabled:opacity-50"
        disabled={isLoading}
      >
        Continue
      </button>
    </div>
  );
};

export default RequestRevisionPage;
