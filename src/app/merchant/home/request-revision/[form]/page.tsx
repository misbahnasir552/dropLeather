'use client';

import React from 'react';

import ActivityInformationReqRevision from '@/components/Forms/RequestRevision/ActivityInformationReqRevision';
import AttachmentsReqRevision from '@/components/Forms/RequestRevision/AttachmentsReqRevision';
import BusinessInformationReqRevision from '@/components/Forms/RequestRevision/BusinessDetailsReqRevision';
import IntegrationFormReqRevision from '@/components/Forms/RequestRevision/IntegrationFormReqRevision';
import ReviewFormReqRevision from '@/components/Forms/RequestRevision/ReviewFormReqRevision';
import SettlementDetailsReqRevision from '@/components/Forms/RequestRevision/SettlementDetailReqRevision';
import StoreDetailReqRevision from '@/components/Forms/RequestRevision/StoreDetailReqRevision';
import H6 from '@/components/UI/Headings/H6';
import useCurrentTab from '@/hooks/useCurrentTab';

function RequestRevision() {
  const { currentTab } = useCurrentTab();

  return (
    <div>
      {currentTab === 'attachments' ? (
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
          <div className="flex w-full justify-center">
            <H6>No Page Found</H6>
          </div>
        </>
      )}
    </div>
  );
}

export default RequestRevision;
