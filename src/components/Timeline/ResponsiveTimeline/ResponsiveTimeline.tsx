'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import ArrowTimeline from '@/assets/icons/Arrow-timeline.svg';
// import ActivityInformation from '@/components/Forms/ActivityInformationOLD';
// import AttachmentsForm from '@/components/Forms/AttachmentsOLD';
// import BusinessInformation from '@/components/Forms/BusinessDetailsOLD';
// import IntegrationForm from '@/components/Forms/IntegrationFormOLD';
import ReviewForm from '@/components/Forms/ReviewForm';
// import SettlementDetails from '@/components/Forms/SettlementDetailsOLD';
import {
  ActivityInformationIcon,
  AttachmentsIcon,
  BusinessDetailsIcon,
  IntegrationsIcon,
  ReviewFormIcon,
  SettlementDetailsIcon,
} from '@/components/Timeline/TimelineIcons/Timelineicons';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';

const ResponsiveTimeline = ({ activeStep }: any) => {
  const userData = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const { currentTab } = useCurrentTab();
  const activeTab = currentTab;
  console.log('activestep', activeStep);

  const isAccessible = (tabName: string): boolean => {
    if (tabName === 'activity-info') {
      return true;
    }
    if (data?.activityInformation?.status === 'Completed') {
      return true;
    }
    if (data?.businessDetails?.status === 'Completed') {
      return true;
    }
    if (data?.additionalDetail?.status === 'Completed') {
      return true;
    }
    if (data?.settlementDetails?.status === 'Completed') {
      return true;
    }
    if (data?.integration?.status === 'Completed') {
      return true;
    }
    if (data?.documents?.status === 'Completed') {
      return true;
    }
    return false;
  };

  // useEffect(() => {
  // });

  // Define handleNavigation function
  const handleNavigation = (tab: any, activeTab: any) => {
    console.log('here I am ');
    if (activeTab && isAccessible(tab.name)) {
      router.push(`/on-boarding/${tab.name}`);
    } else {
      console.log('Tab is not accessible');
    }
  };

  const getDetails = async () => {
    try {
      const response: any = await apiClient.get(
        `merchant/getdetails/${userData?.email}`,
      );
      console.log('RESPONSIVE USEEFFECT GET DEATILS CHECK:', response?.data);

      setData(response.data);
      // return null;
    } catch (error) {
      console.log(error, 'error from onboarding forms');
      // return null;
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const tabs = [
    {
      name: 'activity-info',
      label: 'Activity Information',
      // component: <ActivityInformation />,
      status: data?.activityInformation?.status,
      svg: (
        <ActivityInformationIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'activity-info'
              ? '#21B25F'
              : activeTab !== 'activity-info' &&
                data?.activityInformation?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
    },
    {
      name: 'business-details',
      label: 'Business Details',
      // component: <BusinessInformation />,
      svg: (
        <BusinessDetailsIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'business-details'
              ? '#21B25F'
              : activeTab !== 'business-details' &&
                data?.businessDetails?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
      status: data?.businessDetails?.status,
      // status: data?.businessDetails?.status,
    },

    {
      name: 'settlement-information',
      label: 'Settlement Details',
      // component: <SettlementDetails />,
      svg: (
        <SettlementDetailsIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'settlement-information'
              ? '#21B25F'
              : activeTab !== 'settlement-information' &&
                data?.settlementDetails?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
      status: data?.settlementDetails?.status,
    },
    {
      name: 'integration-information',
      label: 'Integration',
      // component: <IntegrationForm />,
      svg: (
        <IntegrationsIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'integration-information'
              ? '#21B25F'
              : activeTab !== 'integration-information' &&
                data?.integration?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
      status: data?.integration?.status,
    },
    {
      name: 'attachments-information',
      label: 'Attachments',
      // component: <AttachmentsForm />,
      svg: (
        <AttachmentsIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'attachments-information'
              ? '#21B25F'
              : activeTab !== 'attachments-information' &&
                data?.documents?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
      status: data?.documents?.status,
    },
    {
      name: 'review-form',
      label: 'Review Form',
      component: <ReviewForm />,
      svg: (
        <ReviewFormIcon
          // color={"#6F6B76"}
          color={
            activeTab === 'review-form'
              ? '#21B25F'
              : // ? 'bg-red-600'
              activeTab !== 'review-form' &&
                data?.reviewForm?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
      status: data?.reviewForm?.status,
    },
  ];

  //   const isAccessible = (tabName: string): boolean => {
  //   if (tabName === 'activity-info') {
  //     return true;
  //   }
  //   if (data?.activityInformation?.status === 'Completed') {
  //     return true;
  //   }
  //   if (data?.businessDetails?.status === 'Completed') {
  //     return true;
  //   }
  //   if (data?.additionalDetail?.status === 'Completed') {
  //     return true;
  //   }
  //   if (data?.settlementDetails?.status === 'Completed') {
  //     return true;
  //   }
  //   if (data?.integration?.status === 'Completed') {
  //     return true;
  //   }
  //   if (data?.documents?.status === 'Completed') {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <div className="flex sm:max-md:px-[24px] sm:max-md:py-[48px]">
      <div className="flex w-full flex-col gap-4">
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            {activeTab && isAccessible(tab.name) ? (
              <div
                className="flex w-full cursor-pointer justify-between rounded-lg border-[1px] px-4 py-[15px]"
                onClick={() => handleNavigation(tab, activeTab)}
              >
                <div className="flex gap-3">
                  <div className="">{tab.svg}</div>
                  <div>{tab.label}</div>
                </div>
                <div className="tickicon"></div>
                <Image src={ArrowTimeline} alt="arrow" />
              </div>
            ) : (
              <div className="flex w-full cursor-not-allowed justify-between rounded-lg border-[1px] px-4 py-[15px]">
                <div className="flex gap-3">
                  <div className="">{tab.svg}</div>
                  <div>{tab.label}</div>
                </div>
                <div className="tickicon"></div>
                <Image src={ArrowTimeline} alt="arrow" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTimeline;
