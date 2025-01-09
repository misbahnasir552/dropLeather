'use client';

import React from 'react';

import ActivityInformation from '@/components/Forms/ActivityInformation';
import ApplicationFormStatic from '@/components/Forms/ApplicationFormStatic';
// import ApplicationForm from '@/components/Forms/ApplicationForm';
import Attachments from '@/components/Forms/Attachments';
import BusinessInformation from '@/components/Forms/BusinessDetails';
import Checklist from '@/components/Forms/Checklist';
import CorporateAttachmentForm from '@/components/Forms/CorporateAttachments';
import CorporateReviewForm from '@/components/Forms/CorporateReviewForm';
import IntegrationForm from '@/components/Forms/IntegrationForm';
import ReviewForm from '@/components/Forms/ReviewForm';
// import { useAppSelector } from "@/hooks/redux";
import SettlementDetails from '@/components/Forms/SettlementDetails';
import LivePicture from '@/components/LivePhotoCapture/PhotoCapture';
import H6 from '@/components/UI/Headings/H6';
import { useAppSelector } from '@/hooks/redux';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import DynamicForm from "@/components/Forms/DynamicForm";
import useCurrentTab from '@/hooks/useCurrentTab';

function FormDynamic() {
  const userData = useAppSelector((state: any) => state.auth);
  const { currentTab } = useCurrentTab();

  // useAppSelector;

  return (
    <div>
      {currentTab === 'application-form' ? (
        // <ApplicationForm />
        <ApplicationFormStatic />
      ) : currentTab === 'live-picture' ? (
        <LivePicture />
      ) : currentTab === 'checklist' ? (
        <Checklist />
      ) : currentTab === 'attachments' ? (
        userData?.userType === 'Corporate' ? (
          <CorporateAttachmentForm />
        ) : (
          <Attachments />
        )
      ) : //  currentTab === 'attachments' ? (
      //         <CorporateAttachmentForm />
      // )
      currentTab === 'settlement-details' ? (
        <SettlementDetails />
      ) : // : currentTab === 'attachments' ? (
      //   <Attachments />
      // )

      currentTab === 'activity-information' ? (
        <ActivityInformation />
      ) : currentTab === 'integration' ? (
        <IntegrationForm />
      ) : currentTab === 'business-details' ? (
        <BusinessInformation />
      ) : currentTab === 'review-form' ? (
        userData?.userType === 'Corporate' ? (
          <CorporateReviewForm
            isEditable={true}
            corporate={true}
            data={undefined}
          />
        ) : (
          <ReviewForm />
        )
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
