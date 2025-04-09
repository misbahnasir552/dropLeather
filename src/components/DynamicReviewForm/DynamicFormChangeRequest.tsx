'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';

import Button from '../UI/Button/PrimaryButton';
import H7 from '../UI/Headings/H7';
import ReviewFormDataGrid from '../UI/Wrappers/ReviewFormDataGrid';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusTicket = searchParams.get('status');
  const emailTicket = searchParams.get('email') || '';

  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;

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
