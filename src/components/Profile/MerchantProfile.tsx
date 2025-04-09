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
import CustomModal from '../UI/Modal/CustomModal';

const MerchantProfile = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const [response, setResponse] = useState(null);
  const [merchantTitle, setMerchantTitle] = useState<
    'merchantPortalProfile' | 'merchantPortalTransactionProfile'
  >('merchantPortalProfile');
  // State for active tab (either 'stores' or 'transactionPoints')
  const [activeTab, setActiveTab] = useState<'stores' | 'transactionPoints'>(
    'stores',
  );

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // API Call for Merchant Stores
  const fetchMerchantStores = async () => {
    console.log('User1 ', userData);
    try {
      const response = await apiClient.get('/merchant/stores', {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      setMerchantTitle('merchantPortalProfile');
      if (response?.data.responseCode === '009') {
        setResponse(response.data);
      } else if (response?.data.responseCode === '000') {
        setTitle('Failure');
        setDescription(response?.data.responseDescription);
        setShowModal(true);
      } else {
        setTitle('Failure');
        setDescription(response.data.errorDescription);
        setShowModal(true);
      }
    } catch (error: any) {
      setTitle('Network Failure');
      setDescription(error.message);
      setShowModal(true);

      console.error('Error fetching merchant stores:', error);
    }
  };

  // API Call for Merchant Transaction Points
  const fetchMerchantTransactionPoints = async () => {
    console.log('User2 ', userData);

    try {
      const response = await apiClient.get(`/merchant/transactionPoints`, {
        headers: { Authorization: `Bearer ${userData?.jwt}` },
        params: { merchantEmail: userData?.email },
      });
      setMerchantTitle('merchantPortalTransactionProfile');
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching transaction points:', error);
    }
  };

  useEffect(() => {
    if (userData.email) {
      setMerchantTitle('merchantPortalProfile');
      fetchMerchantStores();
    }
  }, [userData.email]);

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
    <div className="text-gray-700 flex flex-col px-[150px] ">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/merchant/merchant-portal/qr-payments/dynamic-qr/"
      />
      <div className="flex flex-col pb-4 pt-[60px]">
        <H1 className="text-primary-dark">{userData?.name}</H1>
      </div>
      <div className="flex w-full flex-row border-[1px] border-border-light "></div>
      <div className="flex flex-row py-6">
        <div className="flex flex-row gap-6">
          <div className="flex h-[16px] w-[2px] bg-border-dark" />
        </div>

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
      <div className="flex flex-row py-6">
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
      </div>

      <div className="flex w-full border-b border-border-light"></div>

      {/* Dynamic Tab section */}
      <div className="flex w-full pt-6">
        <div className="relative flex flex-row items-center  gap-6">
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
          {/* <div className="flex h-[16px] w-[2px] bg-border-dark" />

        <div
          onClick={() => handleTabClick('transactionPoints')}
            className={`cursor-pointer py-2  transition-all ${
            activeTab === 'transactionPoints'
              ? 'border-b-2 border-primary-base text-primary-base'
              : 'text-secondary-500'
          }`}
        >
          Merchant Transaction Points
        </div> */}
        </div>
      </div>
      <div className="relative  bottom-0 left-0 h-[1px] w-full border-[1px] border-border-light" />

      <div className="table">
        <div className="overflow-x-auto">
          <div className="flex pt-6">
            <MerchantPortalProfileTable
              response={response}
              title={merchantTitle}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full border-[1px] border-border-light "></div>
    </div>
  );
};

export default MerchantProfile;
