'use client';

import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import ReviewFormData from '@/components/Forms/ReviewFormData';
import { useAppSelector } from '@/hooks/redux';
// import FormControlButtons from '@/components/UI/Button/FormControlButtons';

function ReviewForm() {
  const userData = useAppSelector((state) => state.auth);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `merchant/getdetails/${userData?.email}`,
        );
        console.log(response, 'view/get details RESPONSE');
        setData(response?.data);

        // console.log(data, "view/get details Data");
      } catch (e) {
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
        {/* <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Activity Information"
            active="activity-information"
            isEditable
          />
          <ReviewFormDataGrid heading="Merchant Personal Details">
            <ReviewInput
              label="Father Name"
              value={data?.activityInformation.fatherName}
            />
            <ReviewInput
              label="Gender"
              value={data?.activityInformation.gender}
            />
            <ReviewInput
              label="Purpose of Your Account"
              value={data?.activityInformation.purposeOfAccount}
            />
            <ReviewInput
              label="Citizenship"
              value={data?.activityInformation.citizenship}
            />
            <ReviewInput
              label="Country of residency"
              value={data?.activityInformation.residency}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Business Details">
            <ReviewInput
              label="Name of Business Owner as per CNIC"
              value={data?.activityInformation.businessOwner}
            />
            <ReviewInput
              label="Business Name"
              value={data?.activityInformation.businessName}
            />
            <ReviewInput
              label="Legal Name of Business"
              value={data?.activityInformation.legalName}
            />
            <ReviewInput
              label="Date of Incorporation"
              value={data?.activityInformation.incorporationDate}
            />
            <ReviewInput
              label="Terror Financing"
              value={data?.activityInformation.terrorFinancing}
            />
            <ReviewInput
              label="Politically Exposed"
              value={data?.activityInformation.politicallyExposed}
            />
            <ReviewInput
              label="NTN Number"
              value={data?.activityInformation.accountHolder}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Contact Details">
            <ReviewInput
              label="Email Address"
              value={data?.activityInformation.emailAddress}
            />
            <ReviewInput label="City" value={data?.activityInformation.city} />
            <ReviewInput
              label="Business Address"
              value={data?.activityInformation.businessAddress}
            />
            <ReviewInput
              label="Correspondence Address"
              value={data?.activityInformation.correspondenceAddress}
            />
            <ReviewInput
              label="Are you an Account Holder?"
              value={data?.activityInformation.accountHolder}
            />
            <ReviewInput
              label="Primary Phone Number"
              value={data?.activityInformation.primaryPhoneNumber}
            />
            <ReviewInput
              label="Other Phone Number"
              value={data?.activityInformation.otherPhoneNumber}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout>
        <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Business Details"
            active="business-information"
            isEditable
          />
          <ReviewFormDataGrid heading="Business Particulars">
            <ReviewInput
              label="Business Documentation Type"
              value={data?.businessDetails.businessDocumentationType}
            />
            <ReviewInput
              label="Merchant Category"
              value={data?.businessDetails.merchantCategory}
            />
            <ReviewInput
              label="Business Mode"
              value={data?.businessDetails.businessMode}
            />
            <ReviewInput
              label="Established Since"
              value={data?.businessDetails.establishedSince}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Payment Modes Required">
            {data?.businessDetails.paymentModes?.map((item: any, index: any) => (
              <ReviewInput key={index} label="Option 1" value={item} />
            ))}
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Business Type (Sole Proprietor only)">
            <ReviewInput
              label="Business Type"
              value={data?.businessDetails.businessType}
            />
            <ReviewInput
              label="Is Your Business Registered"
              value={data?.businessDetails.isBusinessRegistered}
            />
            <ReviewInput
              label="Special Customer"
              value={data?.businessDetails.specialCustomer}
            />
            <ReviewInput
              label="Nature of Activity"
              value={data?.businessDetails.natureOfActivity}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Customer Details">
            <ReviewInput
              label="Do you get an income from salary?"
              value={data?.businessDetails.incomeFromSalary}
            />
            <ReviewInput
              label="Current Daily Transactions (in PKR)"
              value={data?.businessDetails.currentDailyTransactions}
            />
            <ReviewInput
              label="Association to High Risk Business "
              value={data?.businessDetails.associationToHighRiskBusiness}
            />
            <ReviewInput
              label="Source of Funds"
              value={data?.businessDetails.sourceOfFunds}
            />
            <ReviewInput
              label="Current Monthly Transactions (in PKR)"
              value={data?.businessDetails.currentMonthlyTransactions}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Transaction Activity">
            <ReviewInput
              label="Expected No. of Transactions per Month"
              value={data?.businessDetails.expectedNoOfTransactionMonth}
            />
            <ReviewInput
              label="Expected Sales Volume per Month"
              value={data?.businessDetails.expectedSalesVolumeMonth}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout>
        <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Additional Details"
            active="additional-informatio
            isEditablen"
          />
          <ReviewFormDataGrid heading="Next of Kin">
            <ReviewInput
              label="Nominee Name"
              value={data?.additionalDetails.nomineeName}
            />
            <ReviewInput
              label="Nominee CNIC"
              value={data?.additionalDetails.nomineeCNIC}
            />
            <ReviewInput
              label="Relationship with Holder"
              value={data?.additionalDetails.relationWithHolder}
            />
            <ReviewInput
              label="Contact Number of Nominee"
              value={data?.additionalDetails.contactNumberOfNominee}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="For Legal Agreements">
            <ReviewInput
              label="Company Postal Address"
              value={data?.additionalDetails.companyPortalAddress}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Optional Information">
            <ReviewInput
              label="Authorised Signatory Name  "
              value={data?.additionalDetails.authorizedSignatoryName}
            />
            <ReviewInput
              label="Designation of Authorised Signatory"
              value={data?.additionalDetails.designationOfAuthorizedSignatory}
            />
            <ReviewInput
              label="CNIC of Authorised Signatory"
              value={data?.additionalDetails.cnicofAuthorizedSignatory}
            />
            <ReviewInput
              label="Mobile Number of Authorised Signatory"
              value={data?.additionalDetails.mobileNumberOfAuthorizedSignatory}
            />
            <ReviewInput
              label="Land line  Number of Authorized Signatory"
              value={
                data?.additionalDetails.landlineNumberOfAuthorizedSignatory
              }
            />
            <ReviewInput
              label="Company Registration Address"
              value={data?.additionalDetails.companyRegistrationAddress}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout>
        <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Settlement Details"
            active="settlement-informatio
            isEditablen"
          />
          <ReviewFormDataGrid heading="Settlement Details">
            <ReviewInput
              label="Bank Account"
              value={data?.settlementDetails.account}
            />
            <ReviewInput
              label="Bank Name"
              value={data?.settlementDetails.bankName}
            />
            <ReviewInput
              label="Bank Account Number"
              value={data?.settlementDetails.accountNumber}
            />
            <ReviewInput
              label="Bank Account Title"
              value={data?.settlementDetails.accountTitle}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout>
        <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Integration"
            active="integration-informati
            isEditableon"
          />
          <ReviewFormDataGrid heading="Integration Methods (What would you like to integrate)">
            <ReviewInput
              label="Your Website"
              value={data?.integration.integrationMethod}
            />
            <ReviewInput
              label="Your Facebook Page "
              value={data?.integration.integrationMode}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Integration Methods (Select your mode of integration)">
            <ReviewInput
              label="Plugin"
              value={data?.integration.integrationMethod}
            />
            <ReviewInput
              label="API"
              value={data?.integration.integrationMode}
            />
          </ReviewFormDataGrid>
          <div className="border-t-px border border-border-dark" />
          <ReviewFormDataGrid heading="Developer’s Details">
            <ReviewInput label="Full Name" value={data?.integration.fullName} />
            <ReviewInput
              label="Email Address"
              value={data?.integration.emailAddress}
            />
            <ReviewInput
              label="Mobile Number"
              value={data?.integration.mobileNumber}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout>
        <ReviewFormLayout>
          <ReviewFormMetaData
            heading="Attachments"
            active="attachments-informati
            isEditableon"
          />
          <ReviewFormDataGrid heading="Upload Documents">
            <ReviewInput
              label="Account Maintenance Certificate"
              value={data?.integration.integrationMethod}
              image={FileIcon}
            />
            <ReviewInput
              label="Your External Bank"
              value={data?.integration.integrationMode}
              image={FileIcon}
            />
            <ReviewInput
              label="Live Picture or Digital Photo"
              value={data?.integration.integrationMode}
              image={FileIcon}
            />
            <ReviewInput
              label="CNIC Front"
              value={data?.integration.integrationMode}
              image={FileIcon}
            />
            <ReviewInput
              label="CNIC Back"
              value={data?.integration.integrationMode}
              image={FileIcon}
            />
          </ReviewFormDataGrid>
        </ReviewFormLayout> */}
        <ReviewFormData data={data} isEditable={true} merchant={false} />
        {/* <FormControlButtons
          saveAndContinue={() => console.log('save n continue')}
        /> */}
      </div>
    </div>
  );
}

export default ReviewForm;
