'use client';

// import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// import eyeIcon from '@/assets/icons/Download-Table-Icon.svg';
// import eyeIcon from '@/assets/icons/eye.svg';
import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
// import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';

import Button from '../UI/Button/PrimaryButton';
import H7 from '../UI/Headings/H7';
import ReviewFormDataGrid from '../UI/Wrappers/ReviewFormDataGrid';
// import { useSearchParams } from "next/navigation";
interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  ticketId?: string | null;
  data: any;
  admin?: boolean;
  status?: string | null;
}

function DynamicFormChangeRequest({
  isEditable,
  data,
  admin,
  ticketId,
}: IRevieFormData) {
  // console.log('hereee', data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusTicket = searchParams.get('status');
  // const emailTicket = searchParams.get('email');
  const emailTicket = searchParams.get('email') || '';
  // const corporateAccountDetails = useAppSelector(
  //   (state: any) => state.corporateAccountDetails,
  // );
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;
  // const corporateEmail = corporateAccountDetails.emailAddress;
  // const corporateStatus = corporateAccountDetails.requestStatus;

  // const corporateEmail = searchParams.get('email');
  // const corporateStatus = searchParams.get('status');

  // const handleDownload = (filename: any, email: any, type: any) => {
  //   console.log('email and file name is', email, filename);
  //   // const response = apiClient.get(`/api/files/download?filename=${filename}&email=${email}`)
  //   const downloadUrl = `https://api-gateway-opsprod.easypaisa.com.pk/corporate/downloadCorporateFile?filename=${filename}&email=${email}&type=${type}`;

  //   window.open(downloadUrl, '_blank');
  // };

  const handleDecision = (emailTicket: any) => {
    console.log('adminRole is', adminRole);
    console.log('emailTicket is', emailTicket);

    // if (adminRole == 'RM') {
    //   router.push(`/admin/corporate/documents?email=${corporateEmail}`);
    // } else {
    //   router.push(`/admin/corporate/decision?email=${corporateEmail}`);
    // }
    // router.push(`/merchant/home`);
    router.push(
      `/admin/corporate/change-account-request/decision?email=${emailTicket}&status=${statusTicket}&ticketId=${ticketId}`,
    );
  };

  return (
    <div className="w-full pt-[50px]">
      {/* <ReviewFormLayout>
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
          <ReviewInput label="Corporate Account" value={corProd?.label} />
          <ReviewInput label="Self Serve" value={selfProd?.label} />
          <ReviewInput
            label="Managed Disbursement"
            value={managedProd?.label}
          />
          <ReviewInput label="Others" value={otherProd?.label} />

          <ReviewInput
            label="Cheque Book or RTGS Services"
            value={businessData?.chequeBookRequired}
          />
        </ReviewFormDataGrid>
   
      </ReviewFormLayout> */}
      <ReviewFormLayout>
        <ReviewFormMetaData
          heading="Attachments"
          active="attachments-information"
          isEditable={isEditable}
        />

        {/* <ReviewFormDataGrid heading="Upload Documents"> */}
        <H7 textColor="text-secondary-600">{'Upload Documents'}</H7>
        <ReviewFormDataGrid heading="Corporate Products">
          {data?.productsList?.map((corporateProduct: any, index: number) => (
            <div key={index} className="">
              <ReviewInput
                label={`Product ${index + 1}`}
                value={corporateProduct}
              />
            </div>
          ))}
          <ReviewInput
            label={`Required Cheque Book`}
            value={data?.isCheckbookRequired}
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
                            {/* <div
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
                            </div> */}
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
              {/* <div
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
              </div> */}
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

export default DynamicFormChangeRequest;
