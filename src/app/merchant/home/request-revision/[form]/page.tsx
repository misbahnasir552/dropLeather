'use client';

import React from 'react';

import ActivityInformationReqRevision from '@/components/Forms/RequestRevision/ActivityInformationReqRevision';
import AttachmentsReqRevision from '@/components/Forms/RequestRevision/AttachmentsReqRevision';
import BusinessInformationReqRevision from '@/components/Forms/RequestRevision/BusinessDetailsReqRevision';
import IntegrationFormReqRevision from '@/components/Forms/RequestRevision/IntegrationFormReqRevision';
// import ReviewForm from '@/components/Forms/ReviewForm';
import ReviewFormReqRevision from '@/components/Forms/RequestRevision/ReviewFormReqRevision';
// import ReviewForm from '@/components/Forms/ReviewForm';
import SettlementDetailsReqRevision from '@/components/Forms/RequestRevision/SettlementDetailReqRevision';
// import { useAppSelector } from "@/hooks/redux";
import StoreDetailReqRevision from '@/components/Forms/RequestRevision/StoreDetailReqRevision';
// import LivePicture from '@/components/LivePhotoCapture/PhotoCapture';
import H6 from '@/components/UI/Headings/H6';
// import { useAppSelector } from '@/hooks/redux';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import DynamicForm from "@/components/Forms/DynamicForm";
import useCurrentTab from '@/hooks/useCurrentTab';

function RequestRevision() {
  // const userData = useAppSelector((state: any) => state.auth);
  const { currentTab } = useCurrentTab();

  return (
    <div>
      {
        // currentTab === 'live-picture' ? (
        //   <LivePicture />
        // ) : currentTab === 'checklist' ? (
        //   <Checklist />
        // ) :
        currentTab === 'attachments' ? (
          // userData?.userType === 'Corporate' ? (
          //   <CorporateAttachmentForm />
          // ) :
          <AttachmentsReqRevision />
        ) : currentTab === 'settlement-details' ? (
          <SettlementDetailsReqRevision />
        ) : currentTab === 'activity-information' ? (
          <ActivityInformationReqRevision />
        ) : currentTab === 'integration' ? (
          <IntegrationFormReqRevision />
        ) : currentTab === 'business-details' ? (
          <BusinessInformationReqRevision />
        ) : currentTab === 'store-details' ? (
          <StoreDetailReqRevision />
        ) : currentTab === 'review-form' ? (
          <ReviewFormReqRevision />
        ) : (
          <>
            {/* <DynamicForm /> */}
            <div className="flex w-full justify-center">
              <H6>No Page Found</H6>
            </div>
          </>
        )
      }
    </div>
  );
}

export default RequestRevision;
