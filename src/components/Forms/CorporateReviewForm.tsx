'use client';

import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import CorporateReviewFormDataGrid from '@/components/UI/Wrappers/CorporateReviewFormDataGrid';
import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { resetFields } from '@/redux/features/formSlices/fieldSlice';
import { setLogoutOnboarding } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';

import B3 from '../UI/Body/B3';
import Button from '../UI/Button/PrimaryButton';
import type { FieldsData } from './validations/types';

interface IRevieFormData {
  isEditable: boolean;
  corporate: boolean;
  data: any;
}

interface Applicant {
  [x: string]: string | undefined;
  primaryNationality: string | undefined;
  secondaryNationality: string | undefined;
  relationship: string | undefined;
  applicantFullName: string | undefined;
  typeOfIdentificationNextOfKin: string | undefined;
  identificationNumberNextOfKin: string | undefined;
  contactNumberNextOfKin: string | undefined;
  addressNextOfKin: string | undefined;
  fullName: string;
  fatherFullName: string;
  dateOfBirth: string;
  gender: string;
  typeOfIdentification: string;
  identificationNumber: string;
  mobileAccountNumber: string;
  contactNumber: string;
  city: string;
  mailingAddress: string;
}

interface LivePictures {
  filename: string | undefined;
  documentLabel: string;
}

type ProductType =
  | 'currentAccount'
  | 'savingAccount'
  | 'managed_salaryDisbursement'
  | 'managed_bulkTransactions'
  | 'self_salaryDisbursement'
  | 'self_bulkTransactions'
  | 'Payment Collection'
  | 'Disbursement API'
  | 'Payment Gateway'
  | 'In-App Integration'
  | 'Easypaisa QR'
  | 'Easypaisa Till Payment';

// Create the product-label map
const productLabelMap: Record<ProductType, string> = {
  currentAccount: 'Current Account',
  savingAccount: 'Savings Account',
  managed_salaryDisbursement: 'Salary Disbursement',
  managed_bulkTransactions: 'Bulk Transactions',
  self_salaryDisbursement: 'Salary Disbursement',
  self_bulkTransactions: 'Bulk Transactions',
  'Payment Collection': 'Payment Collection',
  'Disbursement API': 'Disbursement API',
  'Payment Gateway': 'Online Payment Gateway',
  'In-App Integration': 'In-App Integration',
  'Easypaisa QR': 'Easypaisa QR',
  'Easypaisa Till Payment': 'Easypaisa Till Payment',
};

function ReviewFormData({ isEditable, corporate }: IRevieFormData) {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fieldsData: FieldsData = useAppSelector((state: any) => state.fields);

  const formData = useAppSelector((state: any) => state.onBoardingForms);

  const businessData = formData?.businessNature;
  console.log(businessData);

  const [data, setData] = useState<any>(null);
  const [multipleApplicants, setMultipleApplicantsData] = useState<any>(null);
  const [livePicturesData, setmultiplePictures] = useState<any>(null);

  // const [checklistDocLabels, setDocLabels] = useState<string[]>([]);

  const userData = useAppSelector((state) => state.auth);
  useEffect(() => {
    const initialLabel: { [key: string]: any } = {};
    const docLabels: string[] = [];
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`corporate/corporateFormReview`, {
          params: { email: userData?.email },
        });
        // const response = await apiClient.get(
        //   `/corporate/corporateFormReview?email=john.doe123%40example.com`,
        // );
        setData(response?.data);

        if (response?.data?.mulipleApplicantsData?.applicants.length > 1) {
          setMultipleApplicantsData(
            response?.data?.mulipleApplicantsData?.applicants,
          );
        } else {
          setMultipleApplicantsData(
            response?.data?.mulipleApplicantsData?.applicants,
          );
        }
        setmultiplePictures(response?.data?.livePictures);

        return true;
        // console.log(data, "view/get details Data");
      } catch (e) {
        return true;
      }
    };

    const fData = fieldsData.pages?.page?.filter((item) => {
      if (item.name === 'Documents') {
        return convertSlugToTitle(item.name);
      }
      return true;
    });

    fData?.forEach((item: any) => {
      item.categories.forEach((category: any) => {
        if (
          category?.categoryName ===
          'Upload Documents(What would you like to integrate)'
        ) {
          category.fields.forEach((field: any) => {
            initialLabel[field.name] = field?.label;
            docLabels.push(field.label);
          });
        }
      });
    });

    // setDocLabels(docLabels);
    fetchData();
  }, [fieldsData]);

  console.log('DATA ', data);

  const onSubmit = async () => {
    // const onSubmit = async ( { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      const response = await apiClient.get(
        `corporate/makeCorporateStatusPending?email=${userData.email}`,
      );

      if (response.data.responseCode === '009') {
        // success case

        dispatch(resetFields());
        dispatch(setLogoutOnboarding());

        setShowModal(true);
        setTitle('Application Submitted Successfully');
        setDescription(
          // `Congratulations! You have successfully submitted application ${userData?.name}.`,
          `Congratulation! You have successfully submitted application to open an easypaisa Corporate Account. You'll hear back from us in 7 working days. `,
        );
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
      setIsSubmitting(false);
      // setShowModal(true);
    }
  };

  const appData = data?.mulipleApplicantsData;

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
      <div className="flex flex-col justify-end gap-9">
        {corporate ? (
          <>
            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Business Nature"
                active="business-nature"
                // isEditable={isEditable}
              />
              <ReviewFormDataGrid>
                <ReviewInput
                  label="Corporate Entity"
                  value={appData?.corporateEntity}
                />
              </ReviewFormDataGrid>

              <ReviewFormDataGrid heading="Corporate Products">
                {/* {data?.mulipleApplicantsData?.corporateProducts?.map(
                  (corporateProduct: any, index: number) => (
                    <div key={index} className="">
                      <ReviewInput
                        label={`Product ${index + 1}`}
                        value={corporateProduct}
                      />
                    </div>
                  ),
                )} */}

                {appData?.corporateProducts?.map(
                  (corporateProduct: ProductType, index: number) => {
                    let label = '';
                    if (
                      corporateProduct === 'self_salaryDisbursement' ||
                      corporateProduct === 'self_bulkTransactions'
                    ) {
                      label = `Self Serve Product ${index + 1}`;
                    } else if (
                      corporateProduct === 'managed_salaryDisbursement' ||
                      corporateProduct === 'managed_bulkTransactions'
                    ) {
                      label = `Managed Disbursement Product ${index + 1}`;
                    } else {
                      label = `Product ${index + 1}`;
                    }

                    return (
                      <div key={index} className="">
                        <ReviewInput
                          label={label}
                          value={
                            productLabelMap[corporateProduct] ||
                            corporateProduct
                          }
                        />
                      </div>
                    );
                  },
                )}

                <ReviewInput
                  label={`Required Cheque Book`}
                  value={data?.mulipleApplicantsData?.chequeBookRequired}
                />
              </ReviewFormDataGrid>
              {/* <div className="border-t-px border border-border-light" /> */}
            </ReviewFormLayout>

            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Application Form"
                active="application-form"
                isEditable={isEditable}
              />
              <ReviewFormDataGrid heading="Company / Business Details">
                <ReviewInput
                  label="Account Title / Business Name"
                  value={appData?.accountTitle}
                />
                <ReviewInput
                  label="Business Company NTN Number"
                  value={appData?.businessNtnNumber}
                />
                <ReviewInput
                  label="Registered Business / Company Address"
                  value={appData?.requiredBusiness}
                />
              </ReviewFormDataGrid>
              {/* <div className="border-t-px border border-border-light" /> */}

              {multipleApplicants?.length > 1
                ? multipleApplicants?.map(
                    (applicant: Applicant, index: number) => (
                      <>
                        <div className="border-t-px border border-border-light" />
                        <CorporateReviewFormDataGrid
                          heading={`Applicant (${index + 1}) Details`}
                        >
                          <div
                            key={index}
                            className=" grid w-full gap-4 sm:grid-cols-1 md:grid-cols-3"
                          >
                            <ReviewInput
                              label="Full Name"
                              value={applicant?.applicantFullName}
                            />
                            <ReviewInput
                              label="Father / Spouse Name"
                              value={applicant?.fatherFullName}
                            />
                            <ReviewInput
                              label="Date of Birth"
                              value={applicant?.dateOfBirth}
                            />
                            <ReviewInput
                              label="Gender"
                              value={applicant?.gender}
                            />

                            <ReviewInput
                              label="Identification Number"
                              value={applicant?.identificationNumberCnic}
                            />
                            <ReviewInput
                              label="Mobile Account Number"
                              value={applicant?.mobileAccountNumber}
                            />
                            <ReviewInput
                              label="Contact Number"
                              value={applicant?.contactNumber}
                            />
                            <ReviewInput label="City" value={applicant?.city} />
                            <ReviewInput
                              label="Mailing Address"
                              value={applicant?.mailingAddress || 'N/A'}
                            />
                          </div>
                        </CorporateReviewFormDataGrid>
                      </>
                    ),
                  )
                : multipleApplicants?.map(
                    (applicant: Applicant, index: number) => (
                      <>
                        <div className="border-t-px border border-border-light" />
                        <CorporateReviewFormDataGrid
                          heading={`Applicant Details`}
                        >
                          <div
                            key={index}
                            className=" grid w-full gap-4 sm:grid-cols-1 md:grid-cols-3"
                          >
                            <ReviewInput
                              label="Full Name"
                              value={applicant?.applicantFullName}
                            />
                            <ReviewInput
                              label="Father / Spouse Name"
                              value={applicant?.fatherFullName}
                            />
                            <ReviewInput
                              label="Date of Birth"
                              value={applicant?.dateOfBirth}
                            />
                            <ReviewInput
                              label="Gender"
                              value={applicant?.gender}
                            />
                            <ReviewInput
                              label="Identification Number"
                              value={applicant?.identificationNumberCnic}
                            />
                            <ReviewInput
                              label="Mobile Account Number"
                              value={applicant?.mobileAccountNumber}
                            />
                            <ReviewInput
                              label="Contact Number"
                              value={applicant?.contactNumber}
                            />
                            <ReviewInput label="City" value={applicant?.city} />
                            <ReviewInput
                              label="Mailing Address"
                              value={applicant?.mailingAddress || 'N/A'}
                            />
                          </div>
                        </CorporateReviewFormDataGrid>
                      </>
                    ),
                  )}

              <div className="border-t-px border border-border-light" />

              <ReviewFormDataGrid heading="Next of Kin">
                <ReviewInput
                  label="Relationship"
                  value={multipleApplicants?.[0]?.relationship}
                />
                <ReviewInput
                  label="Name"
                  value={multipleApplicants?.[0]?.fullName}
                />
                {/* <ReviewInput
                  label="Type of Identification"
                  value={multipleApplicants?.[0]?.typeOfIdentificationNextOfKin}
                /> */}
                <ReviewInput
                  label="Identification Number"
                  value={multipleApplicants?.[0]?.identificationNumberNextOfKin}
                />
                <ReviewInput
                  label="Contact Number"
                  value={multipleApplicants?.[0]?.contactNumberNextOfKin}
                />
                <ReviewInput
                  label="Address"
                  value={multipleApplicants?.[0]?.addressNextOfKin}
                />
              </ReviewFormDataGrid>

              <div className="border-t-px border border-border-light" />

              <ReviewFormDataGrid heading="FATCA Declaration (Foreign Account Tax Compilance Act)">
                <ReviewInput
                  label="Primary Nationality"
                  value={multipleApplicants?.[0]?.primaryNationality}
                />
                <ReviewInput
                  label="Secondary Nationality"
                  value={
                    multipleApplicants?.[0]?.secondaryNationality || 'None'
                  }
                />

                <ReviewInput
                  label="Country Code"
                  value={multipleApplicants?.[0]?.countryCode}
                />
                <ReviewInput
                  label="Home Address (Other than Pakistan)"
                  value={multipleApplicants?.[0]?.homeAddressOther || 'N/A'}
                />
                <ReviewInput
                  label="TaxPayer Identification Number (TIN)"
                  value={
                    multipleApplicants?.[0]?.taxIdentificationNumber || 'N/A'
                  }
                />
                <ReviewInput
                  label="Resident Status in Pakistan"
                  value={multipleApplicants?.[0]?.residentStatusInPakistan}
                />
                <ReviewInput
                  label="US Citizen"
                  value={multipleApplicants?.[0]?.isUsCitizen}
                />
                <ReviewInput
                  label="US Born"
                  value={multipleApplicants?.[0]?.bornCityUs}
                />
                <ReviewInput
                  label="US Address or Telephone"
                  value={multipleApplicants?.[0]?.haveUsAddress}
                />
                <ReviewInput
                  label="Assigning Authority"
                  value={
                    multipleApplicants?.[0]?.hasAssigningAuthorityForSignatory
                  }
                />
                <ReviewInput
                  label="Assigning Authority for Standing Instructions"
                  value={
                    multipleApplicants?.[0]
                      ?.hasAssigningAuthorityForStandingInstructions
                  }
                />
              </ReviewFormDataGrid>
            </ReviewFormLayout>

            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Live Picture"
                active="live-picture"
                isEditable={false}
              />
              <ReviewFormDataGrid>
                {livePicturesData?.length > 1
                  ? livePicturesData?.map(
                      (picture: LivePictures, index: number) => (
                        <ReviewInput
                          key={index}
                          label={picture.documentLabel}
                          value={picture?.filename}
                          image={FileIcon}
                        />
                      ),
                    )
                  : livePicturesData?.map(
                      (picture: LivePictures, index: number) => (
                        <>
                          <ReviewInput
                            key={index}
                            label={picture.documentLabel}
                            value={picture?.filename}
                            image={FileIcon}
                          />
                        </>
                      ),
                    )}
              </ReviewFormDataGrid>
            </ReviewFormLayout>

            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Attachments"
                active="attachments"
                isEditable={false}
              />

              <ReviewFormDataGrid>
                <>
                  {Array.isArray(data?.corporateDocuments) &&
                    (
                      Object.entries(
                        data.corporateDocuments.reduce(
                          (
                            acc: { [key: string]: any[] },
                            doc: { documentLabel: string; filename: string },
                          ) => {
                            const label = doc.documentLabel || 'Unknown Label';
                            // if (!acc[label]) acc[label] = [];
                            // acc[label] = acc[label] || []
                            // acc[label].push(doc.filename);
                            // return acc;
                            if (!acc[label]) {
                              acc[label] = []; // Ensure it's initialized
                            }
                            acc[label]!.push(doc.filename); // Non-null assertion after initialization
                            return acc;
                          },
                          {} as { [key: string]: string[] },
                        ),
                      ) as [string, string[]][]
                    ).map(([label, filenames], index) => (
                      <div key={index} className="flex w-full flex-col gap-1">
                        <B3 textColor="text-secondary-600">{label}</B3>
                        {filenames?.map(
                          (filename: string, fileIndex: number) => (
                            <div key={fileIndex}>
                              <ReviewInput value={filename} image={FileIcon} />
                            </div>
                          ),
                        )}
                      </div>
                    ))}
                  {!Array.isArray(data?.corporateDocuments) && (
                    <p>No documents to display.</p>
                  )}
                </>
              </ReviewFormDataGrid>
            </ReviewFormLayout>
          </>
        ) : (
          <>
            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Application Form"
                active="application-form"
                isEditable={isEditable}
              />
              <ReviewFormDataGrid heading="Company / Business Details">
                <ReviewInput
                  label="Account Title / Business Name"
                  value={data?.applicationForm?.accountTitle}
                />
                <ReviewInput
                  label="Business Company NTN Number"
                  value={data?.applicationForm?.businessNtnNumber}
                />
                <ReviewInput
                  label="Registered Business / Company Address"
                  value={data?.applicationForm?.mailingAddress}
                />
              </ReviewFormDataGrid>
              <div className="border-t-px border border-border-light" />

              <ReviewFormDataGrid heading="Applicant Details">
                <ReviewInput
                  label="Full Name"
                  value={data?.applicationForm?.fullName}
                />
                <ReviewInput
                  label="Father / Spouse Name"
                  value={data?.applicationForm?.fatherFullName}
                />
                <ReviewInput
                  label="Date of Birth"
                  value={data?.applicationForm?.dateOfBirth}
                />
                <ReviewInput
                  label="Gender"
                  value={data?.applicationForm?.gender}
                />
                <ReviewInput
                  label="Type of identification"
                  value={data?.applicationForm?.typeOfIdentification}
                />
                <ReviewInput
                  label="Identification Number"
                  value={data?.applicationForm?.identificationNumber}
                />
                <ReviewInput
                  label="Mobile Account Number"
                  value={data?.applicationForm?.mobileAccountNumber}
                />
                <ReviewInput
                  label="Contact Number"
                  value={data?.applicationForm?.contactNumber}
                />
                <ReviewInput label="City" value={data?.applicationForm?.city} />
                <ReviewInput
                  label="Mailing Address"
                  value={data?.applicationForm?.mailingAddress}
                />
              </ReviewFormDataGrid>
              <div className="border-t-px border border-border-light" />
              <ReviewFormDataGrid heading="Next of Kin">
                <ReviewInput
                  label="Relationship"
                  value={data?.applicationForm?.relationship}
                />
                <ReviewInput
                  label="Name"
                  value={data?.applicationForm?.applicantFullName}
                />
                <ReviewInput
                  label="Type of Identification"
                  value={data?.applicationForm?.typeOfIdentificationNextOfKin}
                />
                <ReviewInput
                  label="Identification Number"
                  value={data?.applicationForm?.identificationNumberNextOfKin}
                />
                <ReviewInput
                  label="Contact Number"
                  value={data?.applicationForm?.contactNumberNextOfKin}
                />
                <ReviewInput
                  label="Address"
                  value={data?.applicationForm?.addressNextOfKin}
                />
              </ReviewFormDataGrid>
              <div className="border-t-px border border-border-light" />
              <ReviewFormDataGrid heading="FATCA Declaration (Foreign Account Tax Compilance Act)">
                <ReviewInput
                  label="Primary Nationality"
                  value={data?.applicationForm?.primaryNationality}
                />
                <ReviewInput
                  label="Secondary Nationality"
                  value={data?.applicationForm?.secondaryNationality}
                />
              </ReviewFormDataGrid>
            </ReviewFormLayout>

            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Live Picture"
                active="live-picture"
                isEditable={isEditable}
              />
              <ReviewFormDataGrid>
                <ReviewInput
                  label="Applicant Picture"
                  value={data?.livePicture?.photo}
                />
              </ReviewFormDataGrid>
              <div className="border-t-px border border-border-light" />
            </ReviewFormLayout>

            <ReviewFormLayout>
              <ReviewFormMetaData
                heading="Attachments"
                active="attachments"
                isEditable={isEditable}
              />

              <ReviewFormDataGrid heading="Upload Documents">
                <div className="flex gap-3">
                  <ReviewInput
                    label="FW8BN"
                    // value={data?.documents?.documentNames[0]}
                    value={data?.corporateDocuments?.[0]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="FATCA-W8 BEN"
                    value={data?.corporateDocuments?.[1]}
                    image={FileIcon}
                  />
                </div>

                <div className="flex gap-3">
                  <ReviewInput
                    label="CNIC Front"
                    value={data?.corporateDocuments?.[2]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="CNIC Back"
                    value={data?.corporateDocuments?.[4]}
                    image={FileIcon}
                  />
                </div>

                <div className="flex gap-3">
                  <ReviewInput
                    label="CRS Individual Tax Residency"
                    value={data?.corporateDocuments?.[5]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="CRS Entity-Organization"
                    value={data?.corporateDocuments?.[6]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="Corporate ACC Request Letter"
                    value={data?.corporateDocuments?.[7]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="CDD Form"
                    value={data?.corporateDocuments?.[8]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="Beneficial Owner Certificate"
                    value={data?.corporateDocuments?.[15]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="Undertaking"
                    value={data?.corporateDocuments?.[10]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="Operating Authority"
                    value={data?.corporateDocuments?.[11]}
                    image={FileIcon}
                  />
                </div>
                <div className="flex gap-3">
                  <ReviewInput
                    label="KYC Form"
                    value={data?.corporateDocuments?.[12]}
                    image={FileIcon}
                  />
                </div>
              </ReviewFormDataGrid>
            </ReviewFormLayout>
          </>
        )}
        <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
          {/* <Button
            label={`Save & Continue Later`}
            type="button"
            className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
          /> */}
          <Button
            label={`Submit`}
            isDisabled={isSubmitting}
            type="submit"
            onClickHandler={onSubmit}
            className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
          />
        </div>
      </div>
    </>
  );
}

export default ReviewFormData;
