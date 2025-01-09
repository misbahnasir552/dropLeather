import { useAppSelector } from '@/hooks/redux';

export const CorporateOnBoardingStatusInitialValues: any = {
  checklistStatus: '',
  attachmentStatus: '',
};

export const GetCorporateOnBoardingStatus = () => {
  const corporateOnBoardingStatusDetails = useAppSelector(
    (state: any) => state.onBoardingForms?.corporateChecklistStatus,
    (state: any) => state.onBoardingForms?.corporateAttachmentsStatus,
  );
  const updatedValues = {
    checklistStatus: corporateOnBoardingStatusDetails?.checklistStatus,
    attachmentStatus: corporateOnBoardingStatusDetails?.attachmentStatus,
  };

  return updatedValues;
};
