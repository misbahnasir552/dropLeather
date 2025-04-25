'use client';

import React from 'react';

import ActivityInformationReqRevision from '@/components/Forms/ActivityInformationReqRevision';
// import ApplicationFormStatic from '@/components/Forms/ApplicationFormStatic';
// import ApplicationForm from '@/components/Forms/ApplicationForm';
// import Attachments from '@/components/Forms/Attachments';
import AttachmentsReqRevision from '@/components/Forms/AttachmentsReqRevision';
import BusinessInformationReqRevision from '@/components/Forms/BusinessDetailsReqRevision';
import Checklist from '@/components/Forms/Checklist';
// import CorporateAttachmentForm from '@/components/Forms/CorporateAttachments';
// import CorporateReviewForm from '@/components/Forms/CorporateReviewForm';
import IntegrationFormReqRevision from '@/components/Forms/IntegrationFormReqRevision';
// import ReviewForm from '@/components/Forms/ReviewForm';
import ReviewFormReqRevision from '@/components/Forms/ReviewFormReqRevision';
// import ReviewForm from '@/components/Forms/ReviewForm';
import SettlementDetailsReqRevision from '@/components/Forms/SettlementDetailReqRevision';
// import { useAppSelector } from "@/hooks/redux";
import StoreDetailReqRevision from '@/components/Forms/StoreDetailReqRevision';
import LivePicture from '@/components/LivePhotoCapture/PhotoCapture';
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
      {currentTab === 'live-picture' ? (
        <LivePicture />
      ) : currentTab === 'checklist' ? (
        <Checklist />
      ) : currentTab === 'attachments' ? (
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
      )}
    </div>
  );
}

export default RequestRevision;
