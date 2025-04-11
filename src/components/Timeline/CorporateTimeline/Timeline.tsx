'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Checklist from '@/components/Forms/Checklist';
// import AttachmentsForm from '@/components/Forms/CorporateAttachments';
import ReviewForm from '@/components/Forms/ReviewForm';
import type { FieldsData } from '@/components/Forms/validations/types';
import PhotoCapture from '@/components/LivePhotoCapture/PhotoCapture';
import {
  CheckListIcon,
  LivePictureIcon,
  ReviewFormIcon,
} from '@/components/Timeline/CorporateTimeline/TimelineIcons/TimelineIcons';
import { useAppSelector } from '@/hooks/redux';
// import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';

interface Tab {
  name: string;
  label: string;
  component: JSX.Element;
  status?: string;
  svg: JSX.Element;
}

interface CorporateData {
  documents?: { status: string };
  corporateAccountOpening?: { status: string };
  livePicture?: { status: string };
  checklist?: { status: string };
  attachments?: { status: string };
  reviewForm?: { status: string };
  mulipleApplicantsData?: { status: string };
  corporateDocuments?: any;
  livePictures?: any;
}

const Timeline: React.FC = () => {
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  console.log('TIMELINE ', fieldData);

  const fetchedPages = fieldData.pages.page || [];

  const appStatus = useAppSelector(
    (state: any) => state.onBoardingForms.applicationForm?.status,
  );
  console.log('APPP STATUS ', appStatus);

  const userData = useAppSelector((state) => state.auth);
  const [data, setData] = useState<CorporateData | null>(null);
  const { currentTab } = useCurrentTab();
  const activeTab = currentTab;

  const requestRevisionRequired = userData?.isrequestRevision;
  const getDetails = async () => {
    try {
      const response = await apiClient.get(`corporate/corporateFormReview`, {
        params: { email: userData?.email },
      });
      setData(response.data);
    } catch (error) {
      console.log(error, 'error from onboarding forms');
    }
  };
  const corporateAttachmentsStatus =
    data?.corporateDocuments?.[0]?.documentStatus;
  const corporateChecklistStatus = data?.livePictures?.[0]?.livePictureStatus;
  const corporateLivePictureStatus = data?.livePictures?.[0]?.livePictureStatus;
  // const applicationFormStatus = data?.mulipleApplicantsData?.status
  //   ? data?.mulipleApplicantsData?.status
  //   : appStatus;

  const getFilteredTabs = (fetchedPages: { name: string }[], tabs: Tab[]) => {
    // const getFilteredTabs = (backendPages: { name: string }[], tabs: Tab[]) => {

    const nameToLabelMapping: Record<string, string> = {
      'Application Form': 'Application Form',
      Documents: 'Attachments',
      'Corporate Sole Attachments': 'Attachments',
    };

    return fetchedPages
      .map((page) => {
        console.log('IN MAP ', page.name);

        const labelToMatch = nameToLabelMapping[page.name];
        console.log('TTTTTT ', tabs);

        return tabs.find((tab) => tab.label === labelToMatch);
      })
      .filter((tab) => tab !== undefined)
      .sort((a, b) => {
        if (a?.label === 'Application Form') return -1;
        if (b?.label === 'Application Form') return 1;
        return 0;
      }) as Tab[];
  };

  useEffect(() => {
    getDetails();
  }, []);

  const tabs: Tab[] = [
    {
      name: 'live-picture',
      label: 'Live Picture',
      component: <PhotoCapture />,
      status: corporateLivePictureStatus ?? corporateLivePictureStatus,
      svg: (
        <LivePictureIcon
          color={
            activeTab === 'live-picture'
              ? '#21B25F'
              : activeTab !== 'live-picture' &&
                (corporateLivePictureStatus == 'Completed' ||
                  corporateLivePictureStatus == 'completed')
              ? '#322C3C'
              : '#6F6B76'
          }
        />
      ),
    },

    {
      name: 'checklist',
      label: 'Checklist',
      component: <Checklist />,
      status: corporateChecklistStatus ?? corporateChecklistStatus,
      svg: (
        <CheckListIcon
          color={
            activeTab === 'checklist'
              ? '#21B25F'
              : activeTab !== 'checklist' &&
                (corporateChecklistStatus == 'Completed' ||
                  corporateChecklistStatus == 'completed')
              ? '#322C3C'
              : '#6F6B76'
          }
        />
      ),
    },

    // {
    //   name: 'attachments',
    //   label: 'Attachments',
    //   component: <AttachmentsForm />,
    //   status: corporateAttachmentsStatus ?? corporateAttachmentsStatus,
    //   svg: (
    //     <AttachmentsIcon
    //       color={
    //         activeTab === 'attachments'
    //           ? '#21B25F'
    //           : activeTab !== 'attachments' &&
    //             corporateAttachmentsStatus === 'Completed'
    //           ? '#322C3C'
    //           : '#6F6B76'
    //       }
    //     />
    //   ),
    // },
    {
      name: 'review-form',
      label: 'Review Form',
      component: <ReviewForm />,
      status: corporateAttachmentsStatus,
      svg: (
        <ReviewFormIcon
          color={
            activeTab === 'review-form'
              ? '#21B25F'
              : activeTab !== 'review-form' &&
                corporateAttachmentsStatus === 'Completed'
              ? '#322C3C'
              : '#6F6B76'
          }
        />
      ),
    },
  ];

  const newTabs = getFilteredTabs(fetchedPages, tabs);

  // Function to check if a tab is accessible based on previous tab statuses
  const isAccessible = (tabIndex: number): boolean => {
    if (tabs[tabIndex]?.name === 'review-form') {
      return tabs.every((tab) => tab.status === 'Completed');
    }

    // Check if all previous tabs are completed
    if (tabs[tabIndex]?.status !== 'Completed') {
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex w-full justify-between">
        {requestRevisionRequired === true
          ? newTabs?.map((tab, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col">
                  {/* {isAccessible(index) ? ( */}
                  <Link
                    key={index}
                    href={`/merchant/home/business-nature/${tab.name}`}
                    className={
                      tab.name === activeTab
                        ? 'text-primary-base'
                        : 'text-danger-base'
                    }
                  >
                    <div className="flex justify-center px-[14px] pb-[8px]">
                      <div
                        key={index}
                        className={`flex w-max rounded-lg border-[1px] ${
                          tab.name === activeTab
                            ? 'border-border-green'
                            : tab.status === 'Completed'
                            ? 'border-secondary-base bg-screen-grey'
                            : 'border-border-light'
                        } p-[12px]`}
                      >
                        {tab.svg}
                      </div>
                    </div>
                    <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
                      {tab.label}
                    </div>
                  </Link>
                  {/* ) 
                    } */}
                </div>
                {index < newTabs.length - 1 && (
                  <div className="w-full py-[24px]">
                    <div className="h-[1px] w-full bg-border-light"></div>
                  </div>
                )}
              </React.Fragment>
            ))
          : tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col">
                  {isAccessible(index) ? (
                    <Link
                      key={index}
                      href={`/merchant/home/business-nature/${tab.name}`}
                      className={
                        tab.name === activeTab
                          ? 'text-primary-base'
                          : 'text-danger-base'
                      }
                    >
                      <div className="flex justify-center px-[14px] pb-[8px]">
                        <div
                          key={index}
                          className={`flex w-max rounded-lg border-[1px] ${
                            tab.name === activeTab
                              ? 'border-border-green'
                              : tab.status === 'Completed'
                              ? 'border-secondary-base bg-screen-grey'
                              : 'border-border-light'
                          } p-[12px]`}
                        >
                          {tab.svg}
                        </div>
                      </div>
                      <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
                        {tab.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="cursor-not-allowed" key={index}>
                      <div className="flex cursor-not-allowed justify-center px-[14px] pb-[8px]">
                        <div
                          key={index}
                          className={`flex w-max rounded-lg border-[1px] ${
                            tab.name === activeTab
                              ? 'border-border-green'
                              : tab.status === 'Completed'
                              ? 'border-secondary-base bg-screen-grey'
                              : 'border-border-light'
                          } p-[12px]`}
                        >
                          {tab.svg}
                        </div>
                      </div>
                      <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
                        {tab.label}
                      </div>
                    </div>
                  )}
                </div>
                {index < tabs.length - 1 && (
                  <div className="w-full py-[24px]">
                    <div className="h-[1px] w-full bg-border-light"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
      </div>
    </div>
  );
};

export default Timeline;
