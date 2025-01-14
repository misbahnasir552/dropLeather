// 'use client';

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// import apiClient from '@/api/apiClient';
// import ActivityInformation from '@/components/Forms/ActivityInformation';
// import AttachmentsForm from '@/components/Forms/Attachments';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import IntegrationForm from '@/components/Forms/IntegrationForm';
// import ReviewForm from '@/components/Forms/ReviewForm';
// import SettlementDetailsStatic from '@/components/Forms/SettlementDetails';
// import {
//   ActivityInformationIcon,
//   AttachmentsIcon,
//   BusinessDetailsIcon,
//   IntegrationsIcon,
//   ReviewFormIcon,
//   SettlementDetailsIcon,
// } from '@/components/Timeline/TimelineIcons/Timelineicons';
// import { useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';

// const Timeline = () => {
//   const userData = useAppSelector((state: any) => state.auth);
//   const [data, setData] = useState<any>(null);
//   const { currentTab } = useCurrentTab();
//   const activeTab = currentTab;

//   const getDetails = async () => {
//     try {
//       const response: any = await apiClient.get(
//         `merchant/getdetails/${userData.email}`,
//       );
//       setData(response.data);
//       console.log('GET DETAILS:', response.data);

//       return null;
//     } catch (error) {
//       console.log(error, 'error from onboarding forms');
//       return null;
//     }
//   };

//   useEffect(() => {
//     getDetails();
//   }, []);

//   const tabs = [
//     {
//       name: 'activity-information',
//       label: 'Activity Information',
//       component: <ActivityInformation />,
//       status: data?.activityInformation?.status,
//       svg: (
//         <ActivityInformationIcon
//           color={
//             activeTab === 'activity-information'
//               ? '#21B25F'
//               : activeTab !== 'activity-information' &&
//                 data?.activityInformation?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//     },
//     {
//       name: 'business-details',
//       label: 'Business Details',
//       component: <BusinessInformation />,
//       svg: (
//         <BusinessDetailsIcon
//           color={
//             activeTab === 'business-details'
//               ? '#21B25F'
//               : activeTab !== 'business-details' &&
//                 data?.businessDetails?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.businessDetails?.status,
//       // status: data?.businessDetails?.status,
//     },
//     // {
//     //   name: "additional-detail",
//     //   label: "Additional Details",
//     //   component: <AdditionalInformation />,
//     //   svg: (
//     //     <AdditionalDetailsIcon
//     //       color={
//     //         activeTab === "additional-details"
//     //           ? "#21B25F"
//     //           : activeTab !== "additional-details" &&
//     //             data?.additionalDetail?.status === "Completed"
//     //           ? "#000000"
//     //           : "#6F6B76"
//     //       }
//     //     />
//     //   ),
//     //   status: data?.additionalDetail?.status,
//     // },
//     {
//       name: 'settlement-details',
//       label: 'Settlement Details',
//       component: <SettlementDetailsStatic />,
//       svg: (
//         <SettlementDetailsIcon
//           color={
//             activeTab === 'settlement-details'
//               ? '#21B25F'
//               : activeTab !== 'settlement-details' &&
//                 data?.settlementDetails?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.settlementDetails?.status,
//     },
//     {
//       name: 'integration',
//       label: 'Integration',
//       component: <IntegrationForm />,
//       svg: (
//         <IntegrationsIcon
//           color={
//             activeTab === 'integration'
//               ? '#21B25F'
//               : activeTab !== 'integration' &&
//                 data?.integration?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.integration?.status,
//     },
//     {
//       name: 'attachments',
//       label: 'Attachments',
//       component: <AttachmentsForm />,
//       svg: (
//         <AttachmentsIcon
//           color={
//             activeTab === 'attachments'
//               ? '#21B25F'
//               : activeTab !== 'attachments' &&
//                 data?.documents?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.documents?.status,
//     },
//     {
//       name: 'review-form',
//       label: 'Review Form',
//       component: <ReviewForm />,
//       svg: (
//         <ReviewFormIcon
//           color={
//             activeTab === 'review-form'
//               ? '#21B25F'
//               : activeTab !== 'review-form' &&
//                 data?.documents?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.reviewForm?.status,
//     },
//   ];

//   // const apiData = await getDetails();
//   // const isAccessible = async(apiData2, tabName) => {
//   const isAccessible = (tabName: string): boolean => {
//     if (tabName === 'activity-info') {
//       return true;
//     }
//     if (data?.activityInformation?.status === 'Completed') {
//       return true;
//     }
//     if (data?.businessDetails?.status === 'Completed') {
//       return true;
//     }
//     if (data?.additionalDetail?.status === 'Completed') {
//       return true;
//     }
//     if (data?.settlementDetails?.status === 'Completed') {
//       return true;
//     }
//     if (data?.integration?.status === 'Completed') {
//       return true;
//     }
//     if (data?.documents?.status === 'Completed') {
//       return true;
//     }
//     return false;
//   };
//   // console.log("API GET DETAILS DAAATAAA", apiData2);
//   // if (apiData2[tabName] && apiData2[tabName].status !== 'Completed') {
//   //   return false
//   // }
//   // another approach
//   // if (data?.activityInformation?.status === 'Completed') {
//   //   if (data?.businessDetails?.status == "Completed") {
//   //     if (data?.settlementDetails?.status == "Completed") {
//   //       return true
//   //     } return true;
//   //   } return true;
//   // }
//   // return false
//   // old approach
//   // const tabOrder = [
//   //   "activityInformation",
//   //   "businessDetails",
//   //   "additionalDetail",
//   //   "settlementDetails",
//   //   "integration",
//   //   "documents",
//   // ];

//   // const currentTabIndex = tabOrder.indexOf(tabName);
//   // console.log("TEBNAME TIMELINE & CURRENT INDEX:", tabName, currentTabIndex);

//   // // If the current tab is not found in the order list, return false
//   // if (currentTabIndex === -1) {
//   //   return false;
//   // }
//   // // console.log("DATAAAA: ", data[tabName]);

//   // // Check if all previous tabs are completed
//   // for (let i = 0; i < currentTabIndex; i++) {
//   //   const prevTabName = tabOrder[i];
//   //   console.log("TESTTTTTT ", prevTabName, data);

//   //   if (data[prevTabName] && data?.activityInformation?.status !== "Completed" ) {
//   //     console.log("INCOMPLETE STATUS", data[prevTabName]);

//   //     return false;
//   //   }
//   // }

//   // return true;
//   // };

//   return (
//     <>
//       <div className="flex flex-col justify-between py-2">
//         <div className="flex w-full justify-between">
//           {tabs.map((tab, index) => (
//             <React.Fragment key={index}>
//               <div className="flex flex-col">
//                 {activeTab && isAccessible(activeTab) ? (
//                   <Link
//                     key={index}
//                     href={`/merchant/home/business-nature/${tab.name}`}
//                     className={
//                       tab.name === activeTab
//                         ? 'text-primary-base'
//                         : 'text-danger-base'
//                     }
//                   >
//                     <div className="flex justify-center px-[14px] pb-[8px]">
//                       <div
//                         key={index}
//                         className={`flex w-max rounded-lg border-[1px] ${
//                           tab.name === activeTab
//                             ? 'border-border-green'
//                             : tab.status === 'Completed'
//                             ? 'border-secondary-base bg-screen-grey'
//                             : 'border-border-light'
//                         } p-[12px]`}
//                       >
//                         {tab.svg}
//                       </div>
//                     </div>
//                     <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
//                       {tab.label}
//                     </div>
//                   </Link>
//                 ) : (
//                   <div className="cursor-not-allowed" key={index}>
//                     <div className="flex cursor-not-allowed justify-center px-[14px] pb-[8px]">
//                       <div
//                         className={`flex w-max rounded-lg border-[1px] border-border-light p-[12px]`}
//                       >
//                         {tab.svg}
//                       </div>
//                     </div>
//                     <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
//                       {tab.label}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               {index < tabs.length - 1 && (
//                 <div className="w-full py-[24px]">
//                   <div className="h-[1px] w-full bg-border-light"></div>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Timeline;

// 'use client';

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// import apiClient from '@/api/apiClient';
// import ActivityInformation from '@/components/Forms/ActivityInformation';
// import AttachmentsForm from '@/components/Forms/Attachments';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import IntegrationForm from '@/components/Forms/IntegrationForm';
// import ReviewForm from '@/components/Forms/ReviewForm';
// import SettlementDetailsStatic from '@/components/Forms/SettlementDetails';
// import {
//   ActivityInformationIcon,
//   AttachmentsIcon,
//   BusinessDetailsIcon,
//   IntegrationsIcon,
//   ReviewFormIcon,
//   SettlementDetailsIcon,
// } from '@/components/Timeline/TimelineIcons/Timelineicons';
// import { useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';

// const Timeline = () => {
//   const userData = useAppSelector((state: any) => state.auth);
//   const [data, setData] = useState<any>(null);
//   const { currentTab } = useCurrentTab();
//   const activeTab = currentTab;

//   const getDetails = async () => {
//     try {
//       const response: any = await apiClient.get(
//         `merchant/getdetails/${userData.email}`,
//       );
//       setData(response.data);
//       console.log('GET DETAILS:', response.data);

//       return null;
//     } catch (error) {
//       console.log(error, 'error from onboarding forms');
//       return null;
//     }
//   };

//   useEffect(() => {
//     getDetails();
//   }, []);

//   const tabs = [
//     {
//       name: 'activity-information',
//       label: 'Activity Information',
//       component: <ActivityInformation />,
//       status: data?.activityInformation?.status,
//       svg: (
//         <ActivityInformationIcon
//           color={
//             activeTab === 'activity-information'
//               ? '#21B25F'
//               : activeTab !== 'activity-information' &&
//                 data?.activityInformation?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//     },
//     {
//       name: 'business-details',
//       label: 'Business Details',
//       component: <BusinessInformation />,
//       svg: (
//         <BusinessDetailsIcon
//           color={
//             activeTab === 'business-details'
//               ? '#21B25F'
//               : activeTab !== 'business-details' &&
//                 data?.businessDetails?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.businessDetails?.status,
//     },
//     {
//       name: 'settlement-details',
//       label: 'Settlement Details',
//       component: <SettlementDetailsStatic />,
//       svg: (
//         <SettlementDetailsIcon
//           color={
//             activeTab === 'settlement-details'
//               ? '#21B25F'
//               : activeTab !== 'settlement-details' &&
//                 data?.settlementDetails?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.settlementDetails?.status,
//     },
//     {
//       name: 'integration',
//       label: 'Integration',
//       component: <IntegrationForm />,
//       svg: (
//         <IntegrationsIcon
//           color={
//             activeTab === 'integration'
//               ? '#21B25F'
//               : activeTab !== 'integration' &&
//                 data?.integration?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.integration?.status,
//     },
//     {
//       name: 'attachments',
//       label: 'Attachments',
//       component: <AttachmentsForm />,
//       svg: (
//         <AttachmentsIcon
//           color={
//             activeTab === 'attachments'
//               ? '#21B25F'
//               : activeTab !== 'attachments' &&
//                 data?.documents?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.documents?.status,
//     },
//     {
//       name: 'review-form',
//       label: 'Review Form',
//       component: <ReviewForm />,
//       svg: (
//         <ReviewFormIcon
//           color={
//             activeTab === 'review-form'
//               ? '#21B25F'
//               : activeTab !== 'review-form' &&
//                 data?.documents?.status === 'Completed'
//               ? '#000000'
//               : '#6F6B76'
//           }
//         />
//       ),
//       status: data?.reviewForm?.status,
//     },
//   ];

//   // Function to check if a tab is accessible based on previous tab statuses
//   const isAccessible = (tabIndex: number): boolean => {
//     // Review form should only be accessible if all other tabs are completed
//     if (tabs[tabIndex].name === 'review-form') {
//       return tabs.every(tab => tab.status === 'Completed');
//     }

//     // Check if all previous tabs are completed
//     for (let i = 0; i < tabIndex; i+1) {
//       console.log("tab data", tabs[i]);

//       if (tabs[i].status !== 'Completed') {
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     <div className="flex flex-col justify-between py-2">
//       <div className="flex w-full justify-between">
//         {tabs.map((tab, index) => (
//           <React.Fragment key={index}>
//             <div className="flex flex-col">
//               {isAccessible(index) ? (
//                 <Link
//                   key={index}
//                   href={`/merchant/home/business-nature/${tab.name}`}
//                   className={
//                     tab.name === activeTab
//                       ? 'text-primary-base'
//                       : 'text-danger-base'
//                   }
//                 >
//                   <div className="flex justify-center px-[14px] pb-[8px]">
//                     <div
//                       key={index}
//                       className={`flex w-max rounded-lg border-[1px] ${
//                         tab.name === activeTab
//                           ? 'border-border-green'
//                           : tab.status === 'Completed'
//                           ? 'border-secondary-base bg-screen-grey'
//                           : 'border-border-light'
//                       } p-[12px]`}
//                     >
//                       {tab.svg}
//                     </div>
//                   </div>
//                   <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
//                     {tab.label}
//                   </div>
//                 </Link>
//               ) : (
//                 <div className="cursor-not-allowed" key={index}>
//                   <div className="flex cursor-not-allowed justify-center px-[14px] pb-[8px]">
//                     <div
//                       className={`flex w-max rounded-lg border-[1px] border-border-light p-[12px]`}
//                     >
//                       {tab.svg}
//                     </div>
//                   </div>
//                   <div className="flex w-full justify-center text-center text-xs font-semibold leading-[14px] text-secondary-base">
//                     {tab.label}
//                   </div>
//                 </div>
//               )}
//             </div>
//             {index < tabs.length - 1 && (
//               <div className="w-full py-[24px]">
//                 <div className="h-[1px] w-full bg-border-light"></div>
//               </div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Timeline;

'use client';

import Link from 'next/link';
import React, {
  useEffect,
  // useEffect,
  useState,
} from 'react';

import apiClient from '@/api/apiClient';
import ActivityInformation from '@/components/Forms/ActivityInformation';
import AttachmentsForm from '@/components/Forms/Attachments';
import BusinessInformation from '@/components/Forms/BusinessDetails';
import IntegrationForm from '@/components/Forms/IntegrationForm';
import ReviewForm from '@/components/Forms/ReviewForm';
import SettlementDetailsStatic from '@/components/Forms/SettlementDetails';
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

interface Tab {
  name: string;
  label: string;
  component: JSX.Element;
  status?: string;
  svg: JSX.Element;
}

interface UserData {
  email: string;
  // Add other properties if needed
}

interface MerchantData {
  activityInformation?: { status: string };
  businessDetails?: { status: string };
  settlementDetails?: { status: string };
  integration?: { status: string };
  documents?: { status: string };
  reviewForm?: { status: string };
}

const Timeline: React.FC = () => {
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const [data, setData] = useState<MerchantData | null>(null);
  const { currentTab } = useCurrentTab();
  const activeTab = currentTab;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log('Fetching details...');
        const response = await apiClient.get(
          `merchant/getdetails/${userData?.email}`,
        );
        console.log('Response received:', response?.data);

        if (response?.data) {
          setData(response?.data); // Call setData only after receiving a response
          console.log('Data set successfully.');
        } else {
          console.error('Empty response data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    getDetails();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loader while waiting for the response
  }

  if (!data) {
    return <div>No data available.</div>; // Handle case where data is null
  }
  // useEffect(() => {
  //   const getDetails = async () => {
  //     try {
  //       const response = await apiClient.get(
  //         `merchant/getdetails/${userData?.email}`,
  //       );
  //       console.log('GET DETAILS CHECKINGG:', response?.data);
  //       //debugger
  //       setData(response?.data);
  //     } catch (error) {
  //       console.log(error, 'error from onboarding forms');
  //     }
  //   };
  //   getDetails();
  // }, []);

  const tabs: Tab[] = [
    {
      name: 'activity-information',
      label: 'Activity Information',
      component: <ActivityInformation />,
      status: data?.activityInformation?.status,
      svg: (
        <ActivityInformationIcon
          color={
            activeTab === 'activity-information'
              ? '#21B25F'
              : activeTab !== 'activity-information' &&
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
      component: <BusinessInformation />,
      status: data?.businessDetails?.status,
      svg: (
        <BusinessDetailsIcon
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
    },
    {
      name: 'settlement-details',
      label: 'Settlement Details',
      component: <SettlementDetailsStatic />,
      status: data?.settlementDetails?.status,
      svg: (
        <SettlementDetailsIcon
          color={
            activeTab === 'settlement-details'
              ? '#21B25F'
              : activeTab !== 'settlement-details' &&
                data?.settlementDetails?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
    },
    {
      name: 'integration',
      label: 'Integration',
      component: <IntegrationForm />,
      status: data?.integration?.status,
      svg: (
        <IntegrationsIcon
          color={
            activeTab === 'integration'
              ? '#21B25F'
              : activeTab !== 'integration' &&
                data?.integration?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
    },
    {
      name: 'attachments',
      label: 'Attachments',
      component: <AttachmentsForm />,
      status: data?.documents?.status,
      svg: (
        <AttachmentsIcon
          color={
            activeTab === 'attachments'
              ? '#21B25F'
              : activeTab !== 'attachments' &&
                data?.documents?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
    },
    {
      name: 'review-form',
      label: 'Review Form',
      component: <ReviewForm />,
      status: data?.reviewForm?.status,
      svg: (
        <ReviewFormIcon
          color={
            activeTab === 'review-form'
              ? '#21B25F'
              : activeTab !== 'review-form' &&
                data?.reviewForm?.status === 'Completed'
              ? '#000000'
              : '#6F6B76'
          }
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-between py-2">
      <div className="flex w-full justify-between">
        {tabs?.map((tab, index) => (
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
