'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import eyeIcon from '@/assets/icons/eye.svg';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';

import Button from '../UI/Button/PrimaryButton';
import H7 from '../UI/Headings/H7';
import ReviewFormDataGridBold from '../UI/Wrappers/ReviewFormDataGridBold';

interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  data: any;
  admin?: boolean;
  status?: string | null;
}

function DynamicDetailsForm({ isEditable, data, admin }: IRevieFormData) {
  // console.log('hereee', data);
  const router = useRouter();

  const corporateAccountDetails = useAppSelector(
    (state: any) => state.corporateAccountDetails,
  );
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;
  const corporateEmail = corporateAccountDetails.emailAddress;
  const corporateStatus = corporateAccountDetails.requestStatus;
  console.log('data on review form is,', data);
  console.log('admin Role is Review Form', adminRole);

  const handleDownload = (filename: any, email: any, type: any) => {
    console.log('email and file name is', email, filename);
    const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${filename}&email=${email}&type=${type}`;

    window.open(downloadUrl, '_blank');
  };

  const handleDecision = () => {
    console.log('adminRole is', adminRole);

    if (adminRole === 'RM') {
      if (data?.regionalManagerDocuments.length === 0) {
        // If user role is RM and regionalManagerDocuments is an empty array
        router.push(`/admin/corporate/documents?email=${corporateEmail}`);
      } else {
        // If user role is RM and regionalManagerDocuments is not an empty array
        router.push(`/admin/corporate/decision?email=${corporateEmail}`);
      }
    } else {
      router.push(`/admin/corporate/decision?email=${corporateEmail}`);
    }
  };

  return (
    <>
      <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Application Form"
          active="activity-information"
          isEditable={isEditable}
        />

        <ReviewFormDataGrid heading="Corporate Products">
          {data?.mulipleApplicantsData?.corporateProducts?.map(
            (corporateProduct: any, index: number) => (
              <div key={index} className="">
                <ReviewInput
                  label={`Product ${index + 1}`}
                  value={corporateProduct}
                />
              </div>
            ),
          )}
          <ReviewInput
            label={`Required Cheque Book`}
            value={data?.mulipleApplicantsData?.chequeBookRequired}
          />
        </ReviewFormDataGrid>
        <div className="border-t-px border border-border-light " />
        <ReviewFormDataGrid heading="Corporate Entity">
          <ReviewInput
            label={'Corporate Entity Name'}
            value={data?.mulipleApplicantsData?.corporateEntity}
          />
        </ReviewFormDataGrid>

        <div className="border-t-px border border-border-light " />
        <ReviewFormDataGrid heading="Company / Business Details">
          <ReviewInput
            label="Account Title / Business Name"
            value={data?.mulipleApplicantsData?.accountTitle}
          />
          <ReviewInput
            label="Business / Comapny NTN Number"
            value={data?.mulipleApplicantsData?.businessNtnNumber}
          />
          <ReviewInput
            label="Registered Business / Company Address"
            value={data?.mulipleApplicantsData?.requiredBusiness}
          />
        </ReviewFormDataGrid>
        <div className="border-t-px border border-border-light " />
        {/* <ReviewFormDataGrid heading="Applicant Details"> */}

        <H7 textColor="text-secondary-600">Applicant Details</H7>
        <div className="">
          {data?.mulipleApplicantsData.applicants?.map(
            (applicant: any, index: number) => (
              <div key={index} className="pt-[10px]">
                {/* <ReviewFormDataGrid heading={`Applicant ${index + 1} Details`}> */}
                <ReviewFormDataGridBold
                  heading={`Applicant ${index + 1} Details`}
                >
                  {/* <div >{`Applicant ${index + 1} Details`}</div> */}
                  <ReviewInput
                    label="Full Name"
                    value={applicant.applicantFullName}
                  />
                  <ReviewInput
                    label="Father / Husband / Spouse Name"
                    value={applicant.fatherFullName}
                  />
                  <ReviewInput
                    label="Date of Birth"
                    value={applicant.dateOfBirth}
                  />
                  <ReviewInput label="Gender" value={applicant.gender} />
                  {/* <ReviewInput
                    label="Type of Identification"
                    value={applicant.typeOfIdentification}
                  /> */}
                  <ReviewInput
                    label="Identification Number"
                    // value={applicant.identificationNumber}
                    value={applicant.identificationNumberCnic}
                  />
                  <ReviewInput
                    label="Mobile Account Number"
                    value={applicant.mobileAccountNumber}
                  />
                  <ReviewInput
                    label="Contact Number"
                    value={applicant.contactNumber}
                  />
                  <ReviewInput label="City" value={applicant.city} />
                  <ReviewInput
                    label="Mailing Address"
                    value={applicant.mailingAddress}
                  />
                </ReviewFormDataGridBold>
                <div className="border-t-px border border-border-light " />

                {index === 0 ? (
                  <div className="flex pt-12">
                    <ReviewFormDataGrid heading="Next of Kin">
                      <ReviewInput
                        label="Relationship"
                        value={applicant.relationship}
                      />
                      <ReviewInput label="Name" value={applicant.fullName} />
                      {/* <ReviewInput
            label="Type of Identification"
            value={applicant.typeOfIdentificationNextOfKin}
          /> */}
                      <ReviewInput
                        label="Identification Number"
                        value={applicant.identificationNumberNextOfKin}
                      />
                      <ReviewInput
                        label="Contact Number"
                        value={applicant.contactNumberNextOfKin}
                      />
                      <ReviewInput
                        label="Address"
                        value={applicant.addressNextOfKin}
                      />
                    </ReviewFormDataGrid>
                  </div>
                ) : null}
                <div className="border-t-px border border-border-light " />
                {index === 0 ? (
                  <div className="flex pt-12">
                    <ReviewFormDataGrid heading="CRS Declaration ">
                      <ReviewInput
                        label="Tax Residency of any Country"
                        value={applicant.taxResidencyCountry}
                      />
                      <ReviewInput
                        label="Country / Jurisdiction of Tax Residence"
                        value={applicant.taxJurisdictionForResidency}
                      />
                      <ReviewInput
                        label="TIN / Jurisdiction of Tax Residence"
                        value={applicant.taxJurisdictionForTin}
                      />
                      <ReviewInput
                        label="TIN Tax Identification Number"
                        value={applicant.taxIdentificationNumber}
                      />
                      <ReviewInput
                        label="If no tin, provide reason"
                        value={applicant.noTinReason}
                      />
                    </ReviewFormDataGrid>
                  </div>
                ) : null}
                <div className="border-t-px border border-border-light " />
                {index === 0 ? (
                  <div className="flex pt-12">
                    <ReviewFormDataGrid heading="FATCA Declaration (Foreign Account Tax Compliance Act)">
                      <ReviewInput
                        label="Primary Nationality"
                        value={applicant.primaryNationality}
                      />
                      <ReviewInput
                        label="Secondary Nationality"
                        value={applicant.secondaryNationality}
                      />
                      <ReviewInput
                        label="Country Code"
                        value={applicant.countryCode}
                      />
                      <ReviewInput
                        label="Home Address (other than Pak)"
                        value={applicant.homeAddressOther}
                      />
                      {/* <ReviewInput
                    label="Contact Number (other than Pak)"
                    value={applicant.homeAddressOther}
                  /> */}
                      <ReviewInput
                        label="Tax Payer Identification Number"
                        value={applicant.taxpayerIdentificationNumber}
                      />

                      <ReviewInput
                        label="Tax Payer Identification Number"
                        value={applicant.residentStatusInPakistan}
                      />
                      <ReviewInput
                        label="US Citizen"
                        value={applicant.isUsCitizen}
                      />
                      <ReviewInput
                        label="US Born"
                        value={applicant.bornCityUs}
                      />
                      <ReviewInput
                        label="US Address or Telephone"
                        value={applicant.haveUsAddress}
                      />
                      <ReviewInput
                        label="Assigning Authority"
                        value={applicant.hasAssigningAuthorityForSignatory}
                      />
                      <ReviewInput
                        label="Assigning Authority for Standing Instructions"
                        value={
                          applicant.hasAssigningAuthorityForStandingInstructions
                        }
                      />
                    </ReviewFormDataGrid>
                  </div>
                ) : null}
                {/* <div className="border-t-px mt-[50px] border border-border-light" /> */}
                <div className="border-t-px border border-border-light " />
              </div>
            ),
          )}
        </div>
      </ReviewFormLayout>

      <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Live Picture"
          active="attachments-information"
          isEditable={isEditable}
        />
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {(data?.livePictures || []).map((livePictures: any, index: any) => (
            <div className="flex flex-row gap-3" key={index}>
              <ReviewInput
                label={livePictures?.documentLabel}
                value={livePictures?.filename}
                image={FileIcon}
              />
              <div
                className="flex h-10 w-10 items-center justify-center"
                onClick={() =>
                  handleDownload(
                    livePictures?.filename,
                    livePictures?.corporate_email,
                    'livepicture',
                  )
                }
              >
                <Image
                  className="cursor-pointer"
                  src={eyeIcon}
                  height={39}
                  width={24}
                  alt="download-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </ReviewFormLayout>

      <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Attachments"
          active="attachments-information"
          isEditable={isEditable}
        />
        {/* <ReviewFormDataGrid heading="Upload Documents"> */}
        <H7 textColor="text-secondary-600">{'Upload Documents'}</H7>
        {/* {data.regionalManagerDocuments?.documentNames.map((item, index)=>{

          })} */}
        {admin ? (
          <>
            {adminRole !== 'RM' && (
              <>
                <div>Relational Manager Documents</div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                  {data?.regionalManagerDocuments?.map(
                    (doc: any, index: any) => (
                      <div
                        key={index}
                        className=" grid grid-cols-12 justify-between gap-3"
                      >
                        <div className="col-span-9">
                          <ReviewInput
                            label={doc?.documentLabel}
                            value={doc?.filename}
                            image={FileIcon}
                          />
                        </div>
                        <div
                          className="col-span-3 flex items-center justify-end"
                          onClick={() =>
                            handleDownload(
                              doc?.filename,
                              doc?.corporate_email,
                              'regional',
                            )
                          }
                        >
                          <Image
                            className="cursor-pointer"
                            src={eyeIcon}
                            height={39}
                            width={24}
                            alt="download-icon"
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </>
            )}
          </>
        ) : null}
        {/* </ReviewFormDataGrid> */}
        <div>Corporate Documents</div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {(data?.corporateDocuments || []).map((doc: any, index: any) => (
            <div
              className=" grid grid-cols-12 justify-between gap-3"
              key={index}
            >
              <div className="col-span-9">
                <ReviewInput
                  label={doc?.documentLabel}
                  value={doc?.filename}
                  image={FileIcon}
                />
              </div>
              <div
                className="col-span-3 flex items-center justify-end"
                onClick={() =>
                  handleDownload(
                    doc?.filename,
                    doc?.corporate_email,
                    'corporate',
                  )
                }
              >
                {/* <div className='flex'> */}
                <Image
                  className="cursor-pointer"
                  src={eyeIcon}
                  height={39}
                  width={24}
                  alt="download-icon"
                />
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </ReviewFormLayout>
      {corporateStatus === 'Pending' ? (
        <div className="flex justify-end">
          <Button
            // routeName="/login"
            label="Next"
            className="button-primary w-[270px] px-3 py-[19px]"
            onClickHandler={handleDecision}
          />
        </div>
      ) : null}
    </>
  );
}

export default DynamicDetailsForm;
