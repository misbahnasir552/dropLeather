'use client';

import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import H7 from '@/components/UI/Headings/H7';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';

import DocumentTable from './table';

export default function Documents() {
  const userData = useAppSelector((state: any) => state.auth);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [apierror, setApierror] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(
          `merchant/getdetails/${userData?.email}`,
        );
        console.log(response, 'view/get details RESPONSE');

        if (response?.data.responseCode === '009') {
          setIsLoading(false);
          setOnboardingData(response?.data);
        } else if (response?.data?.responseMessage === '000') {
          setIsLoading(false);
          setApierror(response?.data?.responseMessage);
        } else {
          setIsLoading(false);
          setApierror('an unexpected error occcured');
        }
      } catch (e: any) {
        setIsLoading(false);
        setApierror(e);
        console.log(e, 'error fetching');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper heading="Documents" />

      {isLoading ? (
        <BarLoader color="#21B25F" />
      ) : (
        <>
          {onboardingData?.merchantDocuments?.length > 0 ? (
            <DocumentTable documents={onboardingData?.merchantDocuments} />
          ) : (
            <H7 className="text-center">No Records found.</H7>
          )}
          <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
            {apierror}
          </div>
        </>
      )}
    </div>
  );
}
