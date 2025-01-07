'use client';

import React from 'react';

import ActivityInformation from '@/components/Forms/ActivityInformation';
import Attachments from '@/components/Forms/Attachments';
import BusinessInformation from '@/components/Forms/BusinessDetails';
import IntegrationForm from '@/components/Forms/IntegrationForm';
import ReviewForm from '@/components/Forms/ReviewForm';
// import { useAppSelector } from "@/hooks/redux";
import SettlementDetails from '@/components/Forms/SettlementDetails';
import H6 from '@/components/UI/Headings/H6';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import DynamicForm from "@/components/Forms/DynamicForm";
import useCurrentTab from '@/hooks/useCurrentTab';

function FormDynamic() {
  const { currentTab } = useCurrentTab();
  // useAppSelector;

  return (
    <div>
      {currentTab === 'settlement-details' ? (
        <SettlementDetails />
      ) : currentTab === 'attachments' ? (
        <Attachments />
      ) : currentTab === 'activity-information' ? (
        <ActivityInformation />
      ) : currentTab === 'integration' ? (
        <IntegrationForm />
      ) : currentTab === 'business-details' ? (
        <BusinessInformation />
      ) : currentTab === 'review-form' ? (
        <ReviewForm />
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

export default FormDynamic;
