'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import locationIcon from '@/assets/icons/location-icon.svg';
import mailIcon from '@/assets/icons/mail-inbox-app-icon.svg';
import telephoneIcon from '@/assets/icons/number-icon.svg';
import H1 from '@/components/UI/Headings/H1';
import { useAppSelector } from '@/hooks/redux';

import MerchantPortalProfileTable from '../Table/MerchantPortalProfileTable';
import H6 from '../UI/Headings/H6';

const MerchantProfile = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const [response, setResponse] = useState(null);
  const [merchantTitle, setTitle] = useState<
    'merchantPortalProfile' | 'merchantPortalTransactionProfile'
  >('merchantPortalProfile');
  // State for active tab (either 'stores' or 'transactionPoints')
  const [activeTab, setActiveTab] = useState<'stores' | 'transactionPoints'>(
    'stores',
  );

  // API Call for Merchant Stores
  const fetchMerchantStores = async (userData?: any) => {
    console.log('User1 ', userData);

    try {
      const response = await apiClient.get('/merchant/stores', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.jwt },
      });
      setTitle('merchantPortalProfile');
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching merchant stores:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      setTitle('merchantPortalProfile');
      fetchMerchantStores(userData);
    }
  }, [userData]);
  // API Call for Merchant Transaction Points
  const fetchMerchantTransactionPoints = async () => {
    console.log('User2 ', userData);

    try {
      const response = await apiClient.get(`/merchant/transactionPoints`, {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      setTitle('merchantPortalTransactionProfile');
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching transaction points:', error);
    }
  };

  // Handle tab click and make respective API call
  const handleTabClick = (tab: 'stores' | 'transactionPoints') => {
    setActiveTab(tab);
    if (tab === 'stores') {
      fetchMerchantStores();
    } else {
      fetchMerchantTransactionPoints();
    }
  };

  return (
    <div className="text-gray-700 flex flex-col gap-10 px-[150px] pt-12">
      <div className="flex flex-col">
        <H1 className="text-primary-dark">{userData?.name}</H1>
      </div>
      <div className="flex w-full flex-row border-[1px] border-border-light "></div>

      <div className="flex flex-row gap-6">
        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <Image
          src={telephoneIcon}
          alt="phone"
          className="left-[170px] top-[306px]  h-[20px] w-[20px] gap-[12px]"
        />

        <div className="flex w-[170px]">{userData?.managerMobile}</div>

        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <Image src={mailIcon} alt="phone" className="h-[23px] w-[23px]" />

        <div className="flex w-[170px]">{userData?.email}</div>

        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <Image src={locationIcon} alt="phone" className="h-[24px] w-[24px]" />

        <div className="flex w-[170px]">{userData?.email}</div>
      </div>
      <div className="flex w-full border-[1px] border-border-light "></div>
      <div className="flex flex-row gap-4">
        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <div className="flex h-[20px] w-[270px] text-sm leading-[20px] text-secondary-600">
          Payment Method MA: <H6>No</H6>
        </div>

        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <div className="flex h-[20px] w-[270px] text-sm leading-[20px] text-secondary-600">
          Payment Method QR: <H6>No</H6>
        </div>

        <div className="flex h-[16px] w-[2px] bg-border-dark" />
        <div className="flex h-[20px] w-[270px] text-sm leading-[20px] text-secondary-600">
          Payment Via RAAST: <H6>Yes</H6>
        </div>

        <div className="flex h-[16px] w-[2px] bg-border-dark" />
        <div className="flex h-[20px] w-[270px] text-sm leading-[20px] text-secondary-600">
          Payment Via Link: <H6>Yes</H6>
        </div>
      </div>

      <div className="flex w-full border-b border-border-light"></div>

      {/* Dynamic Tab section */}
      <div className="relative flex flex-row gap-6">
        {/* Merchant Stores Tab */}
        <div
          onClick={() => handleTabClick('stores')}
          className={`cursor-pointer py-2 transition-all ${
            activeTab === 'stores'
              ? 'border-b-2 border-primary-base text-primary-base'
              : 'text-gray-500'
          }`}
        >
          Merchant Stores
        </div>
        <div className="flex h-[16px] w-[2px] bg-border-dark" />

        {/* Merchant Transaction Points Tab */}
        <div
          onClick={() => handleTabClick('transactionPoints')}
          className={`cursor-pointer py-2  transition-all ${
            activeTab === 'transactionPoints'
              ? 'border-b-2 border-primary-base text-primary-base'
              : 'text-secondary-500'
          }`}
        >
          Merchant Transaction Points
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-full border-[1px] border-border-light" />
      </div>

      <div className="table">
        <div className="overflow-x-auto">
          <MerchantPortalProfileTable
            response={response}
            title={merchantTitle}
          />
        </div>
      </div>

      <div className="flex w-full border-[1px] border-border-light "></div>
    </div>
  );
};

export default MerchantProfile;
