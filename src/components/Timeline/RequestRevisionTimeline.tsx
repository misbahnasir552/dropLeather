'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';

import ActivityInformationReqRevision from '../Forms/ActivityInformationReqRevision';
import BusinessInformationReqRevision from '../Forms/BusinessDetailsReqRevision';
import IntegrationFormReqRevision from '../Forms/IntegrationFormReqRevision';
import SettlementDetailsReqRevision from '../Forms/SettlementDetailReqRevision';
import StoreDetailReqRevision from '../Forms/StoreDetailReqRevision';
import {
  ActivityInformationIcon,
  BusinessDetailsIcon,
  IntegrationsIcon,
  SettlementDetailsIcon,
} from './TimelineIcons/Timelineicons';

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
  Documents: 'Attachments',
  'Review Form': 'Review Form',
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
];

const getFilteredTabs = (
  fetchedPages: { pageName: string }[],
  tabs: Tab[],
  statusMap: any,
) => {
  // Fixed tab order
  const fixedTabOrder = [
    'activity-information',
    'business-details',
    'store-details',
    'settlement-details',
    'integration',
  ];

  // Map over the fetchedPages to match tabs and their statuses
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

  // Now, sort the filteredTabs based on the fixedTabOrder
  const sortedTabs = filteredTabs.sort((a, b) => {
    return fixedTabOrder.indexOf(a.name) - fixedTabOrder.indexOf(b.name);
  });

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
        console.log('Fetching details...');
        const response = await apiClient.get(
          `merchant/fieldsForRevision?email=${userData?.email}`,
          {
            headers: {
              Authorization: `Bearer ${userData.email}`,
            },
          },
        );
        console.log('Response received:', response?.data);

        if (response?.data) {
          setData(response?.data);
          console.log('Data set successfully.');
        } else {
          console.error('Empty response data.');
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
          `/merchant/getOnboardingPageStatus`,
          {
            headers: {
              username: userData.email, // You can send email in the Authorization header, or another header as needed
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
        };
        setStatusMap(statusMapResponse);

        return null;
      } catch (error) {
        console.log(error, 'error from onboarding forms');
        return null;
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

  const currentTabIndex = filteredTabs.findIndex(
    (tab) => tab.name === activeTab,
  );
  const isLastTab = currentTabIndex === filteredTabs.length - 1;
  console.log('isLastTab', isLastTab);

  if (isLastTab) {
    dispatch(setIsLastTab(true)); // Dispatch the action to set isLastTab to true
  }

  if (!isLastTab) {
    dispatch(setIsLastTab(false)); // Dispatch the action to set isLastTab to false
  }

  const finalTabs = filteredTabs.map((tab) => ({
    ...tab,
    component: React.cloneElement(tab.component, { isLastTab }),
  }));

  console.log('filtered tabs', filteredTabs);
  console.log('updated tabs', finalTabs);

  return (
    <div className="mx-4 flex flex-col justify-between py-2">
      {/* Margin on left and right for the outer div */}
      <div className="flex w-full justify-between overflow-auto px-4">
        {' '}
        {/* Added px-4 for space at both ends */}
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RequestRevisionTimeline;
