'use client';

import Image from 'next/image';

import DownloadIcon from '@/assets/icons/Download-Table-Icon.svg';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';

interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  data: any;
}

function ReviewFormData({ isEditable, data, merchant }: IRevieFormData) {
  // console.log('hereee', data);

  const handleDownload = (filename: any, email: any) => {
    console.log('email and file name is', email, filename);
    // const response = apiClient.get(`/api/files/download?filename=${filename}&email=${email}`)
    const downloadUrl = `http://merchant-service-opsdev.telenorbank.pk/api/files/download?filename=${filename}&email=${encodeURIComponent(
      email,
    )}`;

    window.open(downloadUrl, '_blank');
  };

  return (
    <>
      {merchant ? (
        <>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Activity Information"
              active="activity-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Merchant Personal Details">
              <ReviewInput
                label="Father Name"
                value={data?.activityInformation?.fatherName}
              />
              <ReviewInput
                label="Gender"
                value={data?.activityInformation?.gender}
              />
              <ReviewInput
                label="Purpose of Your Account"
                value={data?.activityInformation?.purposeOfAccount}
              />
              <ReviewInput
                label="Citizenship"
                value={data?.activityInformation?.citizenship}
              />
              <ReviewInput
                label="Country of residency"
                value={data?.activityInformation?.countryOfResidency}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Details">
              <ReviewInput
                label="Name of Business Owner as per CNIC"
                value={data?.activityInformation?.nameOfBusinessOwner}
              />
              <ReviewInput
                label="Business Name"
                value={data?.activityInformation?.businessName}
              />
              <ReviewInput
                label="Legal Name of Business"
                value={data?.activityInformation?.legalNameOfBusiness}
              />
              <ReviewInput
                label="Date of Incorporation"
                value={data?.activityInformation?.dateOfIncorporation}
              />
              <ReviewInput
                label="Terror Financing"
                value={data?.activityInformation?.terrorFinancing}
              />
              <ReviewInput
                label="Politically Exposed"
                value={data?.activityInformation?.politicallyExposed}
              />
              <ReviewInput
                label="NTN Number"
                value={data?.activityInformation?.accountHolder}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Contact Details">
              <ReviewInput
                label="Email Address"
                value={data?.activityInformation?.emailAddress}
              />
              <ReviewInput
                label="City"
                value={data?.activityInformation?.city}
              />
              <ReviewInput
                label="Business Address"
                value={data?.activityInformation?.businessAddress}
              />
              <ReviewInput
                label="Correspondence Address"
                value={data?.activityInformation?.correspondenceAddress}
              />
              <ReviewInput
                label="Are you an Account Holder?"
                value={data?.activityInformation?.accountHolder}
              />
              <ReviewInput
                label="Primary Phone Number"
                value={data?.activityInformation?.primaryPhoneNumber}
              />
              <ReviewInput
                label="Other Phone Number"
                value={data?.activityInformation?.otherPhoneNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Business Details"
              active="business-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Business Particulars">
              <ReviewInput
                label="Business Documentation Type"
                value={data?.businessDetails?.businessDocumentationType}
              />
              <ReviewInput
                label="Merchant Category"
                value={data?.businessDetails?.merchantCategory}
              />
              <ReviewInput
                label="Business Mode"
                value={data?.businessDetails?.businessMode}
              />
              <ReviewInput
                label="Established Since"
                value={data?.businessDetails?.establishedSince}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Payment Modes Required">
              {/* {data?.businessDetails?.paymentModes?.map((item: any, index: any) => (
            <ReviewInput
              key={index}
              label={`Payment Mode ${index + 1}`}
              value={item}
            />
          ))} */}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Type (Sole Proprietor only)">
              <ReviewInput
                label="Business Type"
                value={data?.businessDetails?.businessType}
              />
              <ReviewInput
                label="Is Your Business Registered"
                value={data?.businessDetails?.isBusinessRegistered}
              />
              <ReviewInput
                label="Special Customer"
                value={data?.businessDetails?.specialCustomer}
              />
              <ReviewInput
                label="Nature of Activity"
                value={data?.businessDetails?.natureOfActivity}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Customer Details">
              <ReviewInput
                label="Do you get an income from salary?"
                value={data?.businessDetails?.incomeFromSalary}
              />
              <ReviewInput
                label="Current Daily Transactions (in PKR)"
                value={data?.businessDetails?.currentDailyTransactions}
              />
              <ReviewInput
                label="Association to High Risk Business "
                value={data?.businessDetails?.associationToHighRiskBusiness}
              />
              <ReviewInput
                label="Source of Funds"
                value={data?.businessDetails?.sourceOfFunds}
              />
              <ReviewInput
                label="Current Monthly Transactions (in PKR)"
                value={data?.businessDetails?.currentMonthlyTransactions}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Transaction Activity">
              <ReviewInput
                label="Expected No. of Transactions per Month"
                value={data?.businessDetails?.expectedNoOfTransactionMonth}
              />
              <ReviewInput
                label="Expected Sales Volume per Month"
                value={data?.businessDetails?.expectedSalesVolumeMonth}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Settlement Details"
              active="settlement-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Settlement Details">
              <ReviewInput
                label="Bank Account"
                value={data?.settlementDetails?.account}
              />
              <ReviewInput
                label="Bank Name"
                value={data?.settlementDetails?.bankName}
              />
              <ReviewInput
                label="Bank Account Number"
                value={data?.settlementDetails?.accountNumber}
              />
              <ReviewInput
                label="Bank Account Title"
                value={data?.settlementDetails?.accountTitle}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Integration"
              active="integration-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Integration Methods (What would you like to integrate)">
              <ReviewInput
                label="Your Website"
                value={data?.integration?.integrationMethod}
              />
              <ReviewInput
                label="Your Facebook Page "
                value={data?.integration?.integrationMode}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Integration Methods (Select your mode of integration)">
              <ReviewInput
                label="Plugin"
                value={data?.integration?.integrationMethod}
              />
              <ReviewInput
                label="API"
                value={data?.integration?.integrationMode}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Developer’s Details">
              <ReviewInput
                label="Full Name"
                value={data?.integration?.fullName}
              />
              <ReviewInput
                label="Email Address"
                value={data?.integration?.emailAddress}
              />
              <ReviewInput
                label="Mobile Number"
                value={data?.integration?.mobileNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Attachments"
              active="attachments-information"
              isEditable={isEditable}
            />
            <div className="flex justify-end gap-3">
              <div>Download All</div>

              <Image
                className="cursor-pointer"
                src={DownloadIcon}
                height={39}
                width={24}
                alt="download-icon"
              />
            </div>

            <ReviewFormDataGrid heading="Upload Documents">
              <div className="flex gap-3">
                <ReviewInput
                  label="Account Maintenance Certificate"
                  // value={data?.documents?.documentNames[0]}
                  value={data?.documents?.fileRecord[0]?.filename}
                  image={FileIcon}
                />
                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    handleDownload(
                      data?.documents?.fileRecord[0]?.filename,
                      data?.documents?.fileRecord[0]?.merchantEmail,
                    )
                  }
                >
                  <Image
                    className="cursor-pointer"
                    src={DownloadIcon}
                    height={39}
                    width={24}
                    alt="download-icon"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <ReviewInput
                  label="Your External Bank"
                  value={data?.documents?.fileRecord[1]?.filename}
                  image={FileIcon}
                />
                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    handleDownload(
                      data?.documents?.fileRecord[1]?.filename,
                      data?.documents?.fileRecord[1]?.merchantEmail,
                    )
                  }
                >
                  <Image
                    className="cursor-pointer"
                    src={DownloadIcon}
                    height={39}
                    width={24}
                    alt="download-icon"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <ReviewInput
                  label="Live Picture or Digital Photo"
                  value={data?.documents?.fileRecord[2]?.filename}
                  image={FileIcon}
                />
                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    handleDownload(
                      data?.documents?.fileRecord[2]?.filename,
                      data?.documents?.fileRecord[2]?.merchantEmail,
                    )
                  }
                >
                  <Image
                    className="cursor-pointer"
                    src={DownloadIcon}
                    height={39}
                    width={24}
                    alt="download-icon"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <ReviewInput
                  label="CNIC Front"
                  value={data?.documents?.fileRecord[3]?.filename}
                  image={FileIcon}
                />
                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    handleDownload(
                      data?.documents?.fileRecord[3]?.filename,
                      data?.documents?.fileRecord[3]?.merchantEmail,
                    )
                  }
                >
                  <Image
                    className="cursor-pointer"
                    src={DownloadIcon}
                    height={39}
                    width={24}
                    alt="download-icon"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <ReviewInput
                  label="CNIC Back"
                  value={data?.documents?.fileRecord[4]?.filename}
                  image={FileIcon}
                />
                <div
                  className="flex items-center justify-center"
                  onClick={() =>
                    handleDownload(
                      data?.documents?.fileRecord[4]?.filename,
                      data?.documents?.fileRecord[4]?.merchantEmail,
                    )
                  }
                >
                  <Image
                    className="cursor-pointer"
                    src={DownloadIcon}
                    height={39}
                    width={24}
                    alt="download-icon"
                  />
                </div>
              </div>
            </ReviewFormDataGrid>
          </ReviewFormLayout>
        </>
      ) : (
        <>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Activity Information"
              active="activity-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Merchant Personal Details">
              <ReviewInput
                label="Father Name"
                value={data?.activityInformation?.fatherName}
              />
              <ReviewInput
                label="Gender"
                value={data?.activityInformation?.gender}
              />
              <ReviewInput
                label="Purpose of Your Account"
                value={data?.activityInformation?.purposeOfAccount}
              />
              <ReviewInput
                label="Citizenship"
                value={data?.activityInformation?.citizenship}
              />
              <ReviewInput
                label="Country of residency"
                value={data?.activityInformation?.countryOfResidency}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Details">
              <ReviewInput
                label="Name of Business Owner as per CNIC"
                value={data?.activityInformation?.nameOfBusinessOwner}
              />
              <ReviewInput
                label="Business Name"
                value={data?.activityInformation?.businessName}
              />
              <ReviewInput
                label="Legal Name of Business"
                value={data?.activityInformation?.legalNameOfBusiness}
              />
              <ReviewInput
                label="Date of Incorporation"
                value={data?.activityInformation?.dateOfIncorporation}
              />
              <ReviewInput
                label="Terror Financing"
                value={data?.activityInformation?.terrorFinancing}
              />
              <ReviewInput
                label="Politically Exposed"
                value={data?.activityInformation?.politicallyExposed}
              />
              <ReviewInput
                label="NTN Number"
                value={data?.activityInformation?.accountHolder}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Contact Details">
              <ReviewInput
                label="Email Address"
                value={data?.activityInformation?.emailAddress}
              />
              <ReviewInput
                label="City"
                value={data?.activityInformation?.city}
              />
              <ReviewInput
                label="Business Address"
                value={data?.activityInformation?.businessAddress}
              />
              <ReviewInput
                label="Correspondence Address"
                value={data?.activityInformation?.correspondenceAddress}
              />
              <ReviewInput
                label="Are you an Account Holder?"
                value={data?.activityInformation?.accountHolder}
              />
              <ReviewInput
                label="Primary Phone Number"
                value={data?.activityInformation?.primaryPhoneNumber}
              />
              <ReviewInput
                label="Other Phone Number"
                value={data?.activityInformation?.otherPhoneNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Business Details"
              active="business-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Business Particulars">
              <ReviewInput
                label="Business Documentation Type"
                value={data?.businessDetails?.businessDocumentationType}
              />
              <ReviewInput
                label="Merchant Category"
                value={data?.businessDetails?.merchantCategory}
              />
              <ReviewInput
                label="Business Mode"
                value={data?.businessDetails?.businessMode}
              />
              <ReviewInput
                label="Established Since"
                value={data?.businessDetails?.establishedSince}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Payment Modes Required">
              {/* {data?.businessDetails?.paymentModes?.map((item: any, index: any) => (
            <ReviewInput
              key={index}
              label={`Payment Mode ${index + 1}`}
              value={item}
            />
          ))} */}
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Business Type (Sole Proprietor only)">
              <ReviewInput
                label="Business Type"
                value={data?.businessDetails?.businessType}
              />
              <ReviewInput
                label="Is Your Business Registered"
                value={data?.businessDetails?.isBusinessRegistered}
              />
              <ReviewInput
                label="Special Customer"
                value={data?.businessDetails?.specialCustomer}
              />
              <ReviewInput
                label="Nature of Activity"
                value={data?.businessDetails?.natureOfActivity}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Customer Details">
              <ReviewInput
                label="Do you get an income from salary?"
                value={data?.businessDetails?.incomeFromSalary}
              />
              <ReviewInput
                label="Current Daily Transactions (in PKR)"
                value={data?.businessDetails?.currentDailyTransactions}
              />
              <ReviewInput
                label="Association to High Risk Business "
                value={data?.businessDetails?.associationToHighRiskBusiness}
              />
              <ReviewInput
                label="Source of Funds"
                value={data?.businessDetails?.sourceOfFunds}
              />
              <ReviewInput
                label="Current Monthly Transactions (in PKR)"
                value={data?.businessDetails?.currentMonthlyTransactions}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Transaction Activity">
              <ReviewInput
                label="Expected No. of Transactions per Month"
                value={data?.businessDetails?.expectedNoOfTransactionMonth}
              />
              <ReviewInput
                label="Expected Sales Volume per Month"
                value={data?.businessDetails?.expectedSalesVolumeMonth}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          {/* <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Additional Details"
          active="additional-information"
          isEditable={isEditable}
        />
        <ReviewFormDataGrid heading="Next of Kin">
          <ReviewInput
            label="Nominee Name"
            value={data?.additionalDetail?.nomineeName}
          />
          <ReviewInput
            label="Nominee CNIC"
            value={data?.additionalDetail?.nomineeCNIC}
          />
          <ReviewInput
            label="Relationship with Holder"
            value={data?.additionalDetail?.relationWithHolder}
          />
          <ReviewInput
            label="Contact Number of Nominee"
            value={data?.additionalDetail?.contactNumberOfNominee}
          />
        </ReviewFormDataGrid>
        <div className="border-t-px border border-border-light" />
        <ReviewFormDataGrid heading="For Legal Agreements">
          <ReviewInput
            label="Company Postal Address"
            value={data?.additionalDetail?.companyPortalAddress}
          />
        </ReviewFormDataGrid>
        <div className="border-t-px border border-border-light" />
        <ReviewFormDataGrid heading="Optional Information">
          <ReviewInput
            label="Authorised Signatory Name  "
            value={data?.additionalDetail?.authorizedSignatoryName}
          />
          <ReviewInput
            label="Designation of Authorised Signatory"
            value={data?.additionalDetail?.designationOfAuthorizedSignatory}
          />
          <ReviewInput
            label="CNIC of Authorised Signatory"
            value={data?.additionalDetail?.cnicofAuthorizedSignatory}
          />
          <ReviewInput
            label="Mobile Number of Authorised Signatory"
            value={data?.additionalDetail?.mobileNumberOfAuthorizedSignatory}
          />
          <ReviewInput
            label="Land line  Number of Authorized Signatory"
            value={data?.additionalDetail?.landlineNumberOfAuthorizedSignatory}
          />
          <ReviewInput
            label="Company Registration Address"
            value={data?.additionalDetail?.companyRegistrationAddress}
          />
        </ReviewFormDataGrid>
      </ReviewFormLayout> */}
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Settlement Details"
              active="settlement-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Settlement Details">
              <ReviewInput
                label="Bank Account"
                value={data?.settlementDetails?.account}
              />
              <ReviewInput
                label="Bank Name"
                value={data?.settlementDetails?.bankName}
              />
              <ReviewInput
                label="Bank Account Number"
                value={data?.settlementDetails?.accountNumber}
              />
              <ReviewInput
                label="Bank Account Title"
                value={data?.settlementDetails?.accountTitle}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Integration"
              active="integration-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Integration Methods (What would you like to integrate)">
              <ReviewInput
                label="Your Website"
                value={data?.integration?.integrationMethod}
              />
              <ReviewInput
                label="Your Facebook Page "
                value={data?.integration?.integrationMode}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Integration Methods (Select your mode of integration)">
              <ReviewInput
                label="Plugin"
                value={data?.integration?.integrationMethod}
              />
              <ReviewInput
                label="API"
                value={data?.integration?.integrationMode}
              />
            </ReviewFormDataGrid>
            <div className="border-t-px border border-border-light" />
            <ReviewFormDataGrid heading="Developer’s Details">
              <ReviewInput
                label="Full Name"
                value={data?.integration?.fullName}
              />
              <ReviewInput
                label="Email Address"
                value={data?.integration?.emailAddress}
              />
              <ReviewInput
                label="Mobile Number"
                value={data?.integration?.mobileNumber}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
          <ReviewFormLayout>
            <ReviewFormMetaData
              heading="Attachments"
              active="attachments-information"
              isEditable={isEditable}
            />
            <ReviewFormDataGrid heading="Upload Documents">
              {/* {data?.documents?.documentNames.map((item, index)=>{

          })} */}
              <ReviewInput
                label="Account Maintenance Certificate"
                value={data?.documents?.documentNames[0]}
                image={FileIcon}
              />
              <ReviewInput
                label="Your External Bank"
                value={data?.documents?.documentNames[0]}
                image={FileIcon}
              />
              <ReviewInput
                label="Live Picture or Digital Photo"
                value={data?.documents?.documentNames[1]}
                image={FileIcon}
              />
              <ReviewInput
                label="CNIC Front"
                value={data?.documents?.documentNames[2]}
                image={FileIcon}
              />
              <ReviewInput
                label="CNIC Back"
                value={data?.documents?.documentNames[3]}
                image={FileIcon}
              />
            </ReviewFormDataGrid>
          </ReviewFormLayout>
        </>
      )}
    </>
  );
}

export default ReviewFormData;
