'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import eyeIcon from '@/assets/icons/eye.svg';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';

import Button from '../UI/Button/PrimaryButton';
import ReviewFormDataGrid from '../UI/Wrappers/ReviewFormDataGrid';

interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  ticketId?: string | null;
  data: any;
  admin?: boolean;
  status?: string | null;
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

function DynamicReviewForm({
  isEditable,
  data,
  admin,
  ticketId,
}: IRevieFormData) {
  // console.log('hereee', data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusTicket = searchParams.get('status');
  const emailTicket = searchParams.get('email') || '';

  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;

  const handleDownload = (filename: any, email: any, type: any) => {
    console.log('email and file name is', email, filename);
    const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${filename}&email=${email}&type=${type}`;

    window.open(downloadUrl, '_blank');
  };

  const handleDecision = (emailTicket: any) => {
    console.log('adminRole is', adminRole);
    console.log('emailTicket is', emailTicket);

    router.push(
      `/admin/corporate/change-account-request/decision?email=${emailTicket}&status=${statusTicket}&ticketId=${ticketId}`,
    );
  };

  return (
    <div className="w-full pt-[50px]">
      <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Attachments"
          active="attachments-information"
          isEditable={isEditable}
        />
        <ReviewFormDataGrid heading="Corporate Products">
          {data?.mulipleApplicantsData?.corporateProducts?.map(
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
                      productLabelMap[corporateProduct] || corporateProduct
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
        {admin ? (
          <>
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
          </>
        ) : null}
        {/* <H7 textColor="text-secondary-600">Corporate Documents</H7> */}
        <div>Corporate Documents</div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {/* <div className="grid grid-cols-1 gap-4"></div> */}
          {data?.corporateDocuments?.map((document: any, index: any) => (
            <div
              key={index}
              className=" grid grid-cols-12 justify-between gap-3"
            >
              <div className="col-span-9">
                <ReviewInput
                  label={document.documentLabel}
                  value={document.filename}
                  image={FileIcon}
                />
              </div>
              <div
                className="col-span-3 flex items-center justify-end"
                onClick={() =>
                  handleDownload(
                    document.filename,
                    document.corporateEmail,
                    'changerequest',
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
        {/* </ReviewFormDataGrid> */}
      </ReviewFormLayout>
      {/* {corporateStatus === 'Pending' ? ( */}
      {statusTicket === 'Pending' ? (
        <div className="flex justify-end pt-[20px]">
          <Button
            // routeName="/login"
            label="Next"
            className="button-primary w-[270px] px-3 py-[19px]"
            onClickHandler={() => handleDecision(emailTicket)}
          />
        </div>
      ) : null}

      {/* ) : null} */}
    </div>
  );
}

export default DynamicReviewForm;
