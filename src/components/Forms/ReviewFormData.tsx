'use client';

// import Image from 'next/image';

// import DownloadIcon from '@/assets/icons/Download-Table-Icon.svg';
import { useState } from 'react';

import apiClient from '@/api/apiClient';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';

import B3 from '../UI/Body/B3';
import Button from '../UI/Button/PrimaryButton';

interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  onboardingData: any;
  businessNatureType?: any;
}

function ReviewFormData({
  isEditable,
  onboardingData,
  businessNatureType,
}: IRevieFormData) {
  console.log('reviewformonboardingdata', onboardingData);
  const userData = useAppSelector((state: any) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const options = [
    {
      value: 'soleProprietor',
      label: 'Sole-Proprietorship',
      endpoint: 'soleBusinessDetails',
    },
    {
      value: 'publicAndPrivateLtd',
      label: 'Private Limited / Public Limited / SMC - Private Limited',
      endpoint: 'pnpBusinessDetails',
    },
    {
      value: 'partnership',
      label:
        'Partnership (Registered / Unregistered) / Limited Liability Partnerships',
      endpoint: 'partnershipBusinessDetails',
    },
    {
      value: 'g2p',
      label: 'Government Accounts / Autonomous Body',
      endpoint: 'otherBusinessDetails',
    },
    {
      value: 'ngoNpoCharities',
      label:
        'NGO / INGO / Trust / Club / Societies and Associations Limited by Guarantee',
      endpoint: 'nncBusinessDetails',
    },
  ];

  console.log('onboarding ', onboardingData);
  console.log('businessnaturetype', businessNatureType);

  const onSubmit = async () => {
    // const onSubmit = async ( { resetForm }: any) => {
    // setIsSubmitting(true);
    console.log('user data ', userData);

    try {
      const response = await apiClient.get(`merchant/markApplicationForm`, {
        params: { email: userData?.email },
      });

      if (response.data.responseCode === '009') {
        // success case

        setShowModal(true);
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
      } else {
        setTitle('Failed Submission');
        setDescription(`Please, try again later!`);
      }

      console.log(response);
      // resetForm();
    } catch (e: any) {
      setTitle(e.code);
      setDescription(e.message);
      setShowModal(true);
    } finally {
      // setIsSubmitting(false);
      // setShowModal(true);
    }
  };

  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName="/merchant/home"
        // routeName={route}
      />
      {businessNatureType == 'soleProprietor' ? (
        <div>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Activity Information"
              active="activity-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Merchant's Detail">
              <ReviewInput
                label="Business Owner Name"
                value={onboardingData?.activityInformation?.businessOwnerName}
              />
              <ReviewInput
                label="Owner of CNIC/Signatory CNIC"
                value={onboardingData?.activityInformation?.ownerOfCnic}
              />
              <ReviewInput
                label="Father/Spouse Name"
                value={onboardingData?.activityInformation?.fatherSpouseName}
              />
              <ReviewInput
                label="Gender"
                value={onboardingData?.activityInformation?.gender}
              />
              <ReviewInput
                label="Purpose of Account"
                value={onboardingData?.activityInformation?.purposeOfAccount}
              />
              <ReviewInput
                label="Citizenship"
                value={onboardingData?.activityInformation?.citizenship}
              />
              <ReviewInput
                label="Business Name"
                value={onboardingData?.activityInformation?.businessName}
              />
              <ReviewInput
                label="Legal Name"
                value={onboardingData?.activityInformation?.legalName}
              />
              <ReviewInput
                label="NTN No"
                value={onboardingData?.activityInformation?.ntnNo}
              />
              <ReviewInput
                label="Date of Corporation"
                value={onboardingData?.activityInformation?.dateOfCorporation}
              />
              <ReviewInput
                label="Terror Financing"
                value={onboardingData?.activityInformation?.terrorFinancing}
              />
              <ReviewInput
                label="Political Exposed"
                value={onboardingData?.activityInformation?.politicalExposed}
              />
              <ReviewInput
                label="Residency"
                value={onboardingData?.activityInformation?.residency}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Contact Detail">
              <ReviewInput
                label="Email Address"
                value={onboardingData?.activityInformation?.emailAddress}
              />
              <ReviewInput
                label="City"
                value={onboardingData?.activityInformation?.city}
              />
              <ReviewInput
                label="Business Address"
                value={onboardingData?.activityInformation?.businessAddress}
              />
              <ReviewInput
                label="Correspondence Address"
                value={
                  onboardingData?.activityInformation?.correspondenceAddress
                }
              />
              <ReviewInput
                label="Account Handler is different from Owner/Account Holder"
                value={
                  onboardingData?.activityInformation?.isAccountHandlerDifferent
                }
              />
              <ReviewInput
                label="Primary Phone No"
                value={onboardingData?.activityInformation?.primaryPhoneNo}
              />
              <ReviewInput
                label="Secondary Phone No"
                value={onboardingData?.activityInformation?.secondaryPhoneNo}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>

          {/* Business details */}
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Business Details"
              active="business-details"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Business Particulars">
              <ReviewInput
                label="Account / Business Documentation Type"
                value={
                  onboardingData?.businessDetails?.businessDocumentationType
                }
              />

              <ReviewInput
                label="Limit Category"
                value={onboardingData?.businessDetails?.limitCategory}
              />
              <ReviewInput
                label="Nature of Business"
                value={onboardingData?.businessDetails?.natureOfBusiness}
              />
              <ReviewInput
                label="RAAST Enabled"
                value={onboardingData?.businessDetails?.raastEnabled}
              />
              <ReviewInput
                label="Established since"
                value={onboardingData?.businessDetails?.establishedSince}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />

            <ReviewFormDataGrid heading="Business Mode">
              {onboardingData?.businessDetails?.businessMode?.map(
                (item: any, index: any) => (
                  <ReviewInput
                    key={index}
                    label={`Business Mode ${index + 1}`}
                    value={item}
                  />
                ),
              )}
            </ReviewFormDataGrid>
            <ReviewFormDataGrid heading="Payment Modes">
              {onboardingData?.businessDetails?.paymentModes?.map(
                (item: any, index: any) => (
                  <ReviewInput
                    key={index}
                    label={`Payment Mode ${index + 1}`}
                    value={item}
                  />
                ),
              )}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Type Details">
              <ReviewInput
                label={`Permanent Address`}
                value={onboardingData?.businessDetails?.permanentAddress}
              />
              <ReviewInput
                label={`FATCA status`}
                value={onboardingData?.businessDetails?.fatcaStatus}
              />
              <ReviewInput
                label={`CRS status`}
                value={onboardingData?.businessDetails?.crsStatus}
              />
              <ReviewInput
                label={`Mandate Name`}
                value={onboardingData?.businessDetails?.mandateName}
              />
              <ReviewInput
                label={`Mandate Id Card Number`}
                value={onboardingData?.businessDetails?.mandateIdCardNum}
              />

              <ReviewInput
                label={`Mandate relationship with account holder`}
                value={
                  onboardingData?.businessDetails
                    ?.mandateRelationshipWithAccountHolder
                }
              />
              <ReviewInput
                label={`Date of issuance of applicable identity document`}
                value={
                  onboardingData?.businessDetails
                    ?.dateOfIssuanceOfApplicableIdentityDocument
                }
              />

              <ReviewInput
                label={`Beneficial Owner/Controlling Rights`}
                value={
                  onboardingData?.businessDetails
                    ?.beneficialOwnerControllingRights
                }
              />
              <ReviewInput
                label={`Mandate Date of Birth`}
                value={onboardingData?.businessDetails?.mandateDateOfBirth}
              />
              <ReviewInput
                label={`Mandate Place of Birth`}
                value={onboardingData?.businessDetails?.mandatePlaceOfBirth}
              />
              <ReviewInput
                label={`City and Country`}
                value={onboardingData?.businessDetails?.cityAndCountry}
              />
              <ReviewInput
                label={`Next of KIN CNIC`}
                value={onboardingData?.businessDetails?.nextOfKinCNIC}
              />
              <ReviewInput
                label={`Next of KIN Relationship`}
                value={onboardingData?.businessDetails?.nextOfKinRelationship}
              />
              <ReviewInput
                label={`Next of KIN Name`}
                value={onboardingData?.businessDetails?.nextOfKinName}
              />
              {/* <ReviewInput
                    label={`Next of KIN Name`}
                    value={onboardingData?.businessDetails?.establishedSince}
                  /> */}

              <ReviewInput
                label={`Date of Birth`}
                value={onboardingData?.businessDetails?.dateOfBirth}
              />
              <ReviewInput
                label="Register/UnRegister"
                value={onboardingData?.businessDetails?.registerUnRegister}
              />
              <ReviewInput
                label="Special Customer"
                value={onboardingData?.businessDetails?.specialCustomer}
              />
              <ReviewInput
                label="Registration/Incorporation No"
                value={
                  onboardingData?.businessDetails?.registrationIncorporationNo
                }
              />
              <ReviewInput
                label="Place of Incorporation or Registration"
                value={
                  onboardingData?.businessDetails
                    ?.placeOfIncorporationOrRegistration
                }
              />
              <ReviewInput
                label="Geographies Involved"
                value={onboardingData?.businessDetails?.pGeographiesInvolved}
              />
              <ReviewInput
                label="Expected Type of Counter-Parties"
                value={
                  onboardingData?.businessDetails?.expectedTypeOfCounterParties
                }
              />
              <ReviewInput
                label="Intended nature of business relations"
                value={
                  onboardingData?.businessDetails
                    ?.intendedNatureOfBusinessRelations
                }
              />
              <ReviewInput
                label="Expected modes of transactions/ delivery channels"
                value={
                  onboardingData?.businessDetails
                    ?.expectedModesOfTransactionsDeliveryChannels
                }
              />
              <ReviewInput
                label="Industry/Segment"
                value={onboardingData?.businessDetails?.industrySegment}
              />
              <ReviewInput
                label="Product"
                value={onboardingData?.businessDetails?.product}
              />
              <ReviewInput
                label="Nationality"
                value={onboardingData?.businessDetails?.nationality}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Nature of Activity">
              <ReviewInput
                label="Nature of Activity"
                value={onboardingData?.businessDetails?.natureOfActivity}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Customer Details">
              <ReviewInput
                label="Income Status (Salaried)"
                value={onboardingData?.businessDetails?.incomeStatus}
              />
              <ReviewInput
                label="Current Salary/Income"
                value={onboardingData?.businessDetails?.currentSalary}
              />
              <ReviewInput
                label="Current Daily Transaction (PKR)"
                value={onboardingData?.businessDetails?.currentDailyTransaction}
              />
              <ReviewInput
                label="Any Other Details"
                value={onboardingData?.businessDetails?.anyOtherDetails}
              />
              <ReviewInput
                label="Association to High Risk Business"
                // value={onboardingData?.businessDetails?.natureOfActivity?.join(" | ") || ""}
                value={
                  onboardingData?.businessDetails?.associationToHighRiskBusiness
                }
              />
              <ReviewInput
                label=" Source of Funds"
                // value={onboardingData?.businessDetails?.natureOfActivity?.join(" | ") || ""}
                value={onboardingData?.businessDetails?.sourceOfFunds}
              />
              <ReviewInput
                label="Current Monthly Transaction (PKR)"
                // value={onboardingData?.businessDetails?.natureOfActivity?.join(" | ") || ""}
                value={
                  onboardingData?.businessDetails?.currentMonthlyTransaction
                }
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Account Profile / Transaction Activity">
              <ReviewInput
                label="Expected monthly Debit turnover (No. of transactions)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyDebitTurnoverTransactions
                }
              />
              <ReviewInput
                label="Expected monthly Debit turnover (amount)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyDebitTurnoverAmount
                }
              />
              <ReviewInput
                label="Expected monthly credit turnover (No. of transactions)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyCreditTurnoverTransactions
                }
              />
              <ReviewInput
                label="Expected monthly credit turnover (amount)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyCreditTurnoverAmount
                }
              />
              <ReviewInput
                label="Annual Turnover( Credit)"
                value={onboardingData?.businessDetails?.annualTurnoverCredit}
              />
              <ReviewInput
                label="Annual Turnover( Debit)"
                value={onboardingData?.businessDetails?.annualTurnoverDebit}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Settlement Details"
              active="activity-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Settlement Details">
              <ReviewInput
                label="Bank Name"
                value={onboardingData?.settlementDetails?.bankName}
              />
              <ReviewInput
                label="Account Number"
                value={onboardingData?.settlementDetails?.accountNumber}
              />
              <ReviewInput
                label="Account Title"
                value={onboardingData?.settlementDetails?.accountTitle}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Integration">
              <ReviewInput
                label="Integration Methods"
                value={onboardingData?.integration?.integrationMethod?.map(
                  (item: any, index: any) => (
                    <ReviewInput
                      key={index}
                      // label={`Integration Method ${index + 1}`}
                      value={item}
                    />
                  ),
                )}
              />
              <ReviewInput
                label="Integration Modes"
                value={onboardingData?.integration?.integrationMode?.map(
                  (item: any, index: any) => (
                    <ReviewInput
                      key={index}
                      // label={`Integration Mode ${index + 1}`}
                      value={item}
                    />
                  ),
                )}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Developers' Details">
              <ReviewInput
                label="Email Address"
                value={onboardingData?.integration?.emailAddress}
              />
              <ReviewInput
                label="Mobile No"
                value={onboardingData?.integration?.mobileNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          {/* business details */}

          {/* Attachments */}
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Attachments"
              active="attachments"
              isEditable={isEditable}
            />

            <ReviewFormDataGrid heading="Upload Documents">
              {Array.isArray(onboardingData?.merchantDocuments) &&
                (
                  Object.entries(
                    onboardingData?.merchantDocuments.reduce(
                      (
                        acc: { [key: string]: any[] },
                        doc: { documentLabel: string; filename: string },
                      ) => {
                        const label = doc.documentLabel || 'Unknown Label';

                        if (!acc[label]) {
                          acc[label] = [];
                        }
                        acc[label]!.push(doc.filename);
                        return acc;
                      },
                      {} as { [key: string]: string[] },
                    ),
                  ) as [string, string[]][]
                )?.map(([label, filenames], index) => (
                  <div key={index} className="flex w-full flex-col gap-1">
                    <B3 textColor="text-secondary-600">{label}</B3>
                    {filenames?.map((filename: string, fileIndex: number) => (
                      <div key={fileIndex}>
                        <ReviewInput value={filename} image={FileIcon} />
                      </div>
                    ))}
                  </div>
                ))}
              {!Array.isArray(onboardingData?.merchantDocuments) && (
                <p>No documents to display.</p>
              )}
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          {/*  */}
        </div>
      ) : (
        <div>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Activity Information"
              active="activity-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Merchant Personal Details">
              <ReviewInput
                label="Father Name"
                value={onboardingData?.activityInformation?.fatherSpouseName}
              />
              <ReviewInput
                label="Gender"
                value={onboardingData?.activityInformation?.gender}
              />
              <ReviewInput
                label="Purpose of Your Account"
                value={onboardingData?.activityInformation?.purposeOfAccount}
              />
              <ReviewInput
                label="Citizenship"
                value={onboardingData?.activityInformation?.citizenship}
              />
              <ReviewInput
                label="Country of residency"
                value={onboardingData?.activityInformation?.residency}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Details">
              <ReviewInput
                label="Name of Business Owner as per CNIC"
                value={onboardingData?.activityInformation?.businessOwnerName}
              />
              <ReviewInput
                label="Business Name"
                value={onboardingData?.activityInformation?.businessName}
              />
              <ReviewInput
                label="Legal Name of Business"
                value={onboardingData?.activityInformation?.legalName}
              />
              <ReviewInput
                label="Date of Incorporation"
                value={onboardingData?.activityInformation?.dateOfCorporation}
              />
              <ReviewInput
                label="Terror Financing"
                value={onboardingData?.activityInformation?.terrorFinancing}
              />
              <ReviewInput
                label="Politically Exposed"
                value={onboardingData?.activityInformation?.politicalExposed}
              />
              <ReviewInput
                label="NTN Number"
                value={onboardingData?.activityInformation?.ntnNo}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Contact Details">
              <ReviewInput
                label="Email Address"
                value={onboardingData?.activityInformation?.emailAddress}
              />
              <ReviewInput
                label="City"
                value={onboardingData?.activityInformation?.city}
              />
              <ReviewInput
                label="Business Address"
                value={onboardingData?.activityInformation?.businessAddress}
              />
              <ReviewInput
                label="Correspondence Address"
                value={
                  onboardingData?.activityInformation?.correspondenceAddress
                }
              />
              <ReviewInput
                label="Are you an Account Holder?"
                value={
                  onboardingData?.activityInformation?.isAccountHandlerDifferent
                }
              />
              <ReviewInput
                label="Primary Phone Number"
                value={onboardingData?.activityInformation?.primaryPhoneNo}
              />
              <ReviewInput
                label="Other Phone Number"
                value={onboardingData?.activityInformation?.secondaryPhoneNo}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Business Details"
              active="business-details"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Business Particulars">
              <ReviewInput
                label="Business Documentation Type"
                value={
                  onboardingData?.businessDetails?.businessDocumentationType
                }
              />
              {/* <ReviewInput
            label="Merchant Category"
            value={onboardingData?.businessDetails?.merchantCategory}
          /> */}
              <ReviewInput
                label="Business Mode"
                value={onboardingData?.businessDetails?.businessMode}
              />
              <ReviewInput
                label="Established Since"
                value={onboardingData?.businessDetails?.establishedSince}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Payment Modes Required">
              {onboardingData?.businessDetails?.paymentModes?.map(
                (item: any, index: any) => (
                  <ReviewInput
                    key={index}
                    label={`Payment Mode ${index + 1}`}
                    value={item}
                  />
                ),
              )}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Type ">
              <ReviewInput
                label="Business Type"
                value={
                  options.find(
                    (option) =>
                      option.value ===
                      onboardingData?.activityInformation?.businessNature,
                  )?.label || 'N/A'
                }
              />
              <ReviewInput
                label="Is Your Business Registered"
                value={onboardingData?.businessDetails?.registerUnRegister}
              />
              <ReviewInput
                label="Special Customer"
                value={onboardingData?.businessDetails?.specialCustomer}
              />
              <ReviewInput
                label="Nature of Activity"
                // value={onboardingData?.businessDetails?.natureOfActivity?.join(" | ") || ""}
                value={onboardingData?.businessDetails?.natureOfActivity?.map(
                  (item: any, index: any) => (
                    <div
                      key={index}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      {item}
                    </div>
                  ),
                )}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Customer Details">
              <ReviewInput
                label="Do you get an income from salary?"
                value={onboardingData?.businessDetails?.incomeStatus}
              />
              <ReviewInput
                label="Current Daily Transactions (in PKR)"
                value={onboardingData?.businessDetails?.currentDailyTransaction}
              />
              <ReviewInput
                label="Association to High Risk Business "
                value={
                  onboardingData?.businessDetails?.associationToHighRiskBusiness
                }
              />
              <ReviewInput
                label="Source of Funds"
                value={onboardingData?.businessDetails?.sourceOfFunds}
              />
              <ReviewInput
                label="Current Monthly Transactions (in PKR)"
                value={
                  onboardingData?.businessDetails?.currentMonthlyTransaction
                }
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Account Profile / Transaction Activity">
              <ReviewInput
                label="Expected monthly Debit turnover (No. of transactions)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyCreditTurnoverTransactions
                }
              />
              <ReviewInput
                label="Expected monthly Debit turnover (amount)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyCreditTurnoverAmount
                }
              />
              <ReviewInput
                label="Expected monthly credit turnover (No. of transactions)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyDebitTurnoverTransactions
                }
              />
              <ReviewInput
                label="Expected monthly credit turnover (amount)"
                value={
                  onboardingData?.businessDetails
                    ?.expectedMonthlyCreditTurnoverAmount
                }
              />
              <ReviewInput
                label="Annual Turnover( Credit)"
                value={onboardingData?.businessDetails?.annualTurnoverCredit}
              />
              <ReviewInput
                label="Annual Turnover( Debit)"
                value={onboardingData?.businessDetails?.annualTurnoverDebit}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Settlement Details"
              active="settlement-details"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Settlement Details">
              <ReviewInput
                label="Bank Name"
                value={onboardingData?.settlementDetails?.bankName}
              />
              <ReviewInput
                label="Bank Account Number"
                value={onboardingData?.settlementDetails?.accountNumber}
              />
              <ReviewInput
                label="Bank Account Title"
                value={onboardingData?.settlementDetails?.accountTitle}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Integration"
              active="integration"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Integration Methods">
              {onboardingData?.integration?.integrationMethod?.map(
                (item: string, index: number) => (
                  <ReviewInput key={index} value={item} />
                ),
              )}

              {/* <ReviewInput
            // label="Website"
            // value={onboardingData?.integration?.integrationMethod}
            value={onboardingData?.integration?.integrationMethod?.map(
              (item: any, index: any) => 
              <div key={index}>{item}</div>,
            )}
          /> */}
              {/* <ReviewInput
            label="Facebook Page "
            value={data?.integration?.integrationMethod}
          /> */}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Integration Modes">
              {onboardingData?.integration?.integrationMode?.map(
                (item: string, index: number) => (
                  <ReviewInput key={index} value={item} />
                ),
              )}
              {/* <ReviewInput
            value={onboardingData?.integration?.integrationMode?.map(
              (item: any, index: any) => <div key={index}>{item}</div>,
            )}
          /> */}
              {/* <ReviewInput
            label="Plugin"
            value={onboardingData?.integration?.integrationMode}
          />
          <ReviewInput label="API" value={onboardingData?.integration?.integrationMode} /> */}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Developer’s Details">
              <ReviewInput
                label="Email Address"
                value={onboardingData?.integration?.emailAddress}
              />
              <ReviewInput
                label="Mobile Number"
                value={onboardingData?.integration?.mobileNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Attachments"
              active="attachments"
              isEditable={isEditable}
            />

            <ReviewFormDataGrid heading="Upload Documents">
              {Array.isArray(onboardingData?.merchantDocuments) &&
                (
                  Object.entries(
                    onboardingData?.merchantDocuments.reduce(
                      (
                        acc: { [key: string]: any[] },
                        doc: { documentLabel: string; filename: string },
                      ) => {
                        const label = doc.documentLabel || 'Unknown Label';

                        if (!acc[label]) {
                          acc[label] = [];
                        }
                        acc[label]!.push(doc.filename);
                        return acc;
                      },
                      {} as { [key: string]: string[] },
                    ),
                  ) as [string, string[]][]
                )?.map(([label, filenames], index) => (
                  <div key={index} className="flex w-full flex-col gap-1">
                    <B3 textColor="text-secondary-600">{label}</B3>
                    {filenames?.map((filename: string, fileIndex: number) => (
                      <div key={fileIndex}>
                        <ReviewInput value={filename} image={FileIcon} />
                      </div>
                    ))}
                  </div>
                ))}
              {!Array.isArray(onboardingData?.merchantDocuments) && (
                <p>No documents to display.</p>
              )}
            </ReviewFormDataGrid>
          </ReviewFormLayout>
        </div>
      )}

      <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
        <Button
          label={`Submit`}
          // isDisabled={isSubmitting}
          type="submit"
          onClickHandler={onSubmit}
          className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
        />
      </div>
    </>
  );
}

export default ReviewFormData;
