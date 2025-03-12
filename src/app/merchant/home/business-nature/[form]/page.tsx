'use client';

import React from 'react';

// import ActivityInformation from '@/components/Forms/ActivityInformationOLD';
import ActivityInformation from '@/components/Forms/ActivityInformation';
import Attachments from '@/components/Forms/Attachments';
import BusinessInformation from '@/components/Forms/BusinessDetails';
import Checklist from '@/components/Forms/Checklist';
import IntegrationForm from '@/components/Forms/IntegrationForm';
import ReviewForm from '@/components/Forms/ReviewForm';
import SettlementDetails from '@/components/Forms/SettlementDetails';
import StoreDetails from '@/components/Forms/StoreDetails';
import LivePicture from '@/components/LivePhotoCapture/PhotoCapture';
import H6 from '@/components/UI/Headings/H6';
// import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';

function FormDynamic() {
  // const userData = useAppSelector((state: any) => state.auth);
  const { currentTab } = useCurrentTab();

  // useAppSelector;

  return (
    <div>
      {currentTab === 'live-picture' ? (
        <LivePicture />
      ) : currentTab === 'checklist' ? (
        <Checklist />
      ) : currentTab === 'attachments' ? (
        <Attachments />
      ) : currentTab === 'settlement-details' ? (
        <SettlementDetails />
      ) : currentTab === 'activity-information' ? (
        <ActivityInformation />
      ) : currentTab === 'integration' ? (
        <IntegrationForm />
      ) : currentTab === 'business-details' ? (
        <BusinessInformation />
      ) : currentTab === 'store-details' ? (
        <StoreDetails />
      ) : currentTab === 'review-form' ? (
        <ReviewForm />
      ) : (
        // : currentTab === 'review-form' ? (
        // <ReviewForm />
        // )

        <>
          {/* <DynamicForm /> */}
          <div className="flex w-full justify-center">
            <H6>No Page Found</H6>
          </div>
        </>
      )}
    </div>
  );
}

export default FormDynamic;
