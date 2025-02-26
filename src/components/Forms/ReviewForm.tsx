'use client';

import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import ReviewFormData from '@/components/Forms/ReviewFormData';
import { useAppSelector } from '@/hooks/redux';
// import FormControlButtons from '@/components/UI/Button/FormControlButtons';

function ReviewForm() {
  const userData = useAppSelector((state) => state.auth);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [apierror, setApierror] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `merchant/getdetails/${userData?.email}`,
        );
        console.log(response, 'view/get details RESPONSE');

        if (response?.data.responseCode === '009') {
          setOnboardingData(response?.data);
          console.log('response data is', onboardingData);
          // if (onboardingData?.activityInformation?.businessNatureData==="soleProprietor")
          // const soleProprietorData = [
          //   {
          //     pageName: "Activity Information",
          //     sections: [
          //       {
          //         sectionName: "Merchant's Detail",
          //         fields: [
          //           { label: "Business Owner Name (Signatory name as per CNIC)", value: "abc" },
          //           { label: "Owner of CNIC/Signatory CNIC", value: "abc" },
          //           { label: "Father/Spouse Name", value: "abc" },
          //           { label: "Gender", value: "abc" },
          //           { label: "Purpose of Account", value: "abc" },
          //           { label: "Citizenship", value: "abc" },
          //           { label: "Business Name", value: "abc" },
          //           { label: "Legal Name", value: "abc" },
          //           { label: "NTN No", value: "abc" },
          //           { label: "Date of Corporation", value: "abc" },
          //           { label: "Terror Financing", value: "abc" },
          //           { label: "Political Exposed", value: "abc" },
          //           { label: "Residency", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Contact Detail",
          //         fields: [
          //           { label: "Email Address", value: "abc" },
          //           { label: "City", value: "abc" },
          //           { label: "Business Address", value: "abc" },
          //           { label: "Correspondence Address", value: "abc" },
          //           { label: "Account Handler is different from Owner/Account Holder", value: "abc" },
          //           { label: "Primary Phone No", value: "abc" },
          //           { label: "Secondary Phone No", value: "abc" },
          //         ],
          //       },
          //     ],
          //   },
          //   {
          //     pageName: "Business Details",
          //     sections: [
          //       {
          //         sectionName: "Business Particulars",
          //         fields: [
          //           { label: "Account/Business Documentation Type", value: "abc" },
          //           { label: "Limit Category", value: "abc" },
          //           { label: "Nature of Business", value: "abc" },
          //           { label: "RAAST Enabled", value: "abc" },
          //           { label: "Established since", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Business Mode",
          //         fields: [
          //           { label: "Retail Payment", value: "abc" },
          //           { label: "Online Payment", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Payment Modes",
          //         fields: [
          //           { label: "Mobile Account", value: "abc" },
          //           { label: "Easypaisa shop", value: "abc" },
          //           { label: "QR", value: "abc" },
          //           { label: "TILL", value: "abc" },
          //           { label: "Direct Debit", value: "abc" },
          //           { label: "Debit/Credit Card", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Business Type Details",
          //         fields: [
          //           { label: "FATCA status", value: "abc" },
          //           { label: "CRS status", value: "abc" },
          //           { label: "Mandate Name", value: "abc" },
          //           { label: "Mandate Id Card Number", value: "abc" },
          //           { label: "Mandate relationship with account holder", value: "abc" },
          //           { label: "Date of issuance of applicable identity document", value: "abc" },
          //           { label: "Beneficial Owner/Controlling Rights", value: "abc" },
          //           { label: "Mandate Date of Birth", value: "abc" },
          //           { label: "Mandate Place of Birth", value: "abc" },
          //           { label: "City and Country", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Nature of Activity",
          //         fields: [
          //           { label: "Payment to Suppliers/Vendors", value: "abc" },
          //           { label: "Receiving & Payments From / To Customers", value: "abc" },
          //           { label: "Any Other Details", value: "abc" },
          //           { label: "Association to High Risk Business", value: "abc" },
          //           { label: "Source of Funds", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Customer Details",
          //         fields: [
          //           { label: "Income Status (Salaried)", value: "abc" },
          //           { label: "Current Salar/Income", value: "abc" },
          //           { label: "Current Daily Transaction (PKR)", value: "abc" },
          //           { label: "Current Monthly Transaction (PKR)", value: "abc" },
          //           { label: "Next of KIN CNIC", value: "abc" },
          //           { label: "Next of KIN Relationship", value: "abc" },
          //           { label: "Next of Kin Name", value: "abc" },
          //           { label: "Date Of Birth", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Account Profile / Transaction Activity",
          //         fields: [
          //           { label: "Expected monthly Debit turnover (No. of transactions)", value: "abc" },
          //           { label: "Expected monthly Debit turnover (amount)", value: "abc" },
          //           { label: "Expected monthly credit turnover (No. of transactions)", value: "abc" },
          //           { label: "Expected monthly credit turnover (amount)", value: "abc" },
          //           { label: "Annual Turnover (Credit)", value: "abc" },
          //           { label: "Annual Turnover (Debit)", value: "abc" },
          //           { label: "Register/UnRegister", value: "abc" },
          //           { label: "Special Customer", value: "abc" },
          //           { label: "Registration/Incorporation No", value: "abc" },
          //           { label: "Place of Incorporation or Registration", value: "abc" },
          //           { label: "Geographies Involved", value: "abc" },
          //           { label: "Expected Type of Counter-Parties", value: "abc" },
          //           { label: "Intended nature of business relations", value: "abc" },
          //           { label: "Expected modes of transactions/ delivery channels", value: "abc" },
          //           { label: "Industry/Segment", value: "abc" },
          //           { label: "Product", value: "abc" },
          //           { label: "Nationality", value: "abc" },
          //         ],
          //       },
          //     ],
          //   },
          //   {
          //     pageName: "Settlement Details",
          //     sections: [
          //       {
          //         sectionName: "Settlement Details",
          //         fields: [
          //           { label: "Easypaisa Bank Limited", value: "abc" },
          //           { label: "Other Banks", value: "abc" },
          //           { label: "Bank Name", value: "abc" },
          //           { label: "Account Number", value: "abc" },
          //           { label: "Account Title", value: "abc" },
          //         ],
          //       },
          //     ],
          //   },
          //   {
          //     pageName: "Integration",
          //     sections: [
          //       {
          //         sectionName: "Integration Methods",
          //         fields: [
          //           { label: "Website", value: "abc" },
          //           { label: "Facebook Page", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Integration Modes",
          //         fields: [
          //           { label: "API", value: "abc" },
          //         ],
          //       },
          //       {
          //         sectionName: "Developers' Details",
          //         fields: [
          //           { label: "Email Address", value: "abc" },
          //           { label: "Mobile No", value: "abc" },
          //         ],
          //       },
          //     ],
          //   },

          // ];
        } else if (response?.data?.responseMessage === '000') {
          setApierror(response?.data?.responseMessage);
        } else {
          setApierror('an unexpected error occcured');
        }
        // console.log(data, "view/get details Data");
      } catch (e: any) {
        setApierror(e);
        console.log(e, 'error fetching');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
        {' '}
        REVIEW FORM{' '}
      </div>
      <div className="flex flex-col gap-9 pb-[120px]">
        {/* <div>hiiiiiiiiiii</div> */}
        {apierror == '' ? (
          <ReviewFormData
            onboardingData={onboardingData}
            isEditable={true}
            merchant={false}
          />
        ) : (
          <div>{apierror}</div>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
