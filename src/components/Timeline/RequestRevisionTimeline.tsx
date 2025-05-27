import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import ActivityInformationReqRevision from '@/components/Forms/RequestRevision/ActivityInformationReqRevision';
import AttachmentsReqRevision from '@/components/Forms/RequestRevision/AttachmentsReqRevision';
import BusinessInformationReqRevision from '@/components/Forms/RequestRevision/BusinessDetailsReqRevision';
import IntegrationFormReqRevision from '@/components/Forms/RequestRevision/IntegrationFormReqRevision';
import ReviewFormReqRevision from '@/components/Forms/RequestRevision/ReviewFormReqRevision';
import SettlementDetailsReqRevision from '@/components/Forms/RequestRevision/SettlementDetailReqRevision';
import StoreDetailReqRevision from '@/components/Forms/RequestRevision/StoreDetailReqRevision';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';

import {
  ActivityInformationIcon,
  AttachmentsIcon,
  BusinessDetailsIcon,
  IntegrationsIcon,
  SettlementDetailsIcon,
} from '../../assets/icons/TimelineIcons/Timelineicons';
import { ReviewFormIcon } from './CorporateTimeline/TimelineIcons/TimelineIcons';

interface Tab {
  name: string;
  label: string;
  component: JSX.Element;
  status: string | null;
  svg: JSX.Element;
}

interface UserData {
  email: string;
}

interface MerchantData {
  page: { pageName: string }[];
}

const nameToLabelMapping: Record<string, string> = {
  'Activity Information': 'Activity Information',
  'Business Details': 'Business Details',
  'Store Details': 'Store Details',
  'Settlement Details': 'Settlement Details',
  Integration: 'Integration',
  // Documents: 'Attachments',
  'Review Form': 'Review Form',
  Attachments: 'Attachments',
};

const allTabs: Tab[] = [
  {
    name: 'activity-information',
    label: 'Activity Information',
    component: <ActivityInformationReqRevision />,
    svg: <ActivityInformationIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'business-details',
    label: 'Business Details',
    component: <BusinessInformationReqRevision />,
    svg: <BusinessDetailsIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'store-details',
    label: 'Store Details',
    component: <StoreDetailReqRevision />,
    svg: <BusinessDetailsIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'settlement-details',
    label: 'Settlement Details',
    component: <SettlementDetailsReqRevision />,
    svg: <SettlementDetailsIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'integration',
    label: 'Integration',
    component: <IntegrationFormReqRevision />,
    svg: <IntegrationsIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'Attachments',
    label: 'Attachments',
    component: <AttachmentsReqRevision />,
    svg: <AttachmentsIcon color="#6F6B76" />,
    status: null,
  },
  {
    name: 'review-form',
    label: 'Review Form',
    component: <ReviewFormReqRevision />,
    svg: <ReviewFormIcon color="#6F6B76" />,
    status: null,
  },
];

// Function to get filtered tabs based on status
const getFilteredTabs = (
  fetchedPages: { pageName: string }[],
  tabs: Tab[],
  statusMap: any,
) => {
  // Fixed tab order, excluding Review Form from the "last tab" logic
  const fixedTabOrder = [
    'activity-information',
    'business-details',
    'store-details',
    'settlement-details',
    'integration',
    'Attachments',
  ];

  const filteredTabs = fetchedPages
    .map((page) => {
      const matchedTab = tabs.find(
        (tab) => tab.label === nameToLabelMapping[page.pageName],
      );
      if (matchedTab) {
        const status = statusMap[matchedTab.name];
        return {
          ...matchedTab,
          status: status !== null ? status : 'Not Completed',
        };
      }
      return undefined;
    })
    .filter((tab): tab is Tab => tab !== undefined);

  // Sort the tabs based on fixed tab order
  const sortedTabs = filteredTabs.sort((a, b) => {
    return fixedTabOrder.indexOf(a.name) - fixedTabOrder.indexOf(b.name);
  });

  console.log('sorted tabs', sortedTabs);
  return sortedTabs;
};

const RequestRevisionTimeline: React.FC = () => {
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const { currentTab } = useCurrentTab();
  const activeTab = currentTab;
  const [data, setData] = useState<MerchantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMap, setStatusMap] = useState<any>({});

  const dispatch = useDispatch();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await apiClient.get(
          `merchant/fieldsForRevision?email=${userData?.email}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${userData.email}`,
          //   },
          // },
        );
        if (response?.data) {
          setData(response?.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPageStatus = async () => {
      try {
        const response: any = await apiClient.get(
          `/merchant/getOnboardingPageStatus?requestRevision=Completed'`,
          {
            headers: {
              username: userData.email,
            },
          },
        );

        const statusResponse = response?.data || {};
        const statusMapResponse = {
          'activity-information': statusResponse.activityInformationStatus,
          'business-details': statusResponse.businessDetailsStatus,
          'store-details': statusResponse.storeDetailsStatus,
          'settlement-details': statusResponse.settlementDetailsStatus,
          integration: statusResponse.integrationStatus,
          attachments: statusResponse.attachmentsStatus,
        };
        setStatusMap(statusMapResponse);
      } catch (error) {
        console.log(error, 'Error from onboarding forms');
      }
    };

    getDetails();
    getPageStatus();
  }, [userData?.email]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  if (!data || !data.page) {
    return <div>No data available.</div>;
  }

  const filteredTabs = getFilteredTabs(data.page, allTabs, statusMap);

  // Add the Review Form tab manually if it's not in the fetched data
  if (!filteredTabs.find((tab) => tab.name === 'review-form')) {
    filteredTabs.push(allTabs.find((tab) => tab.name === 'review-form')!);
  }

  // Determine if the current tab is the last tab, excluding Review Form
  const filteredTabsWithoutReviewForm = filteredTabs.filter(
    (tab) => tab.name !== 'review-form',
  );

  const currentTabIndex = filteredTabsWithoutReviewForm.findIndex(
    (tab) => tab.name === activeTab,
  );
  const isLastTab =
    currentTabIndex === filteredTabsWithoutReviewForm.length - 1;

  if (isLastTab) {
    dispatch(setIsLastTab(true));
  } else {
    dispatch(setIsLastTab(false));
  }

  const finalTabs = filteredTabs.map((tab) => ({
    ...tab,
    component: React.cloneElement(tab.component, { isLastTab }),
  }));

  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex w-full justify-between overflow-auto px-4">
        {finalTabs.map((tab, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col">
              <Link
                href={
                  tab.status === 'Completed'
                    ? `/merchant/home/request-revision/${tab.name}`
                    : '#'
                }
                className={`${
                  tab.status === 'Completed'
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex justify-center px-[14px] pb-[8px]">
                  <div
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
            </div>

            {index < finalTabs.length - 1 && (
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

export default RequestRevisionTimeline;
