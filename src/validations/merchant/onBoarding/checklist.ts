import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { CorporateChecklistForm } from '@/interfaces/interface';

export const CorporateChecklistFormInitialValues: CorporateChecklistForm = {
  cddForm: null,
  kycForm: null,
  crsEntityOrganization: null,
  beneficialOwnerCertificateForCorporate: null,
  fatcaW8benE: null,
  corporateAccountRequestLetter: null,
  undertaking: null,
  fw8ben: null,
  operatingAuthorityDocument: null,
  crsIndividualTaxResidencySelfCertificate: null,
};
export const GetCorporateChecklistFormDetails = () => {
  const checklistFormDetails = useAppSelector(
    (state: any) => state.onBoardingForms.checklistForm,
  );
  const updatedValues = {
    cddForm: checklistFormDetails.cddForm,
    kycForm: checklistFormDetails.kycForm,
    crsEntityOrganization: checklistFormDetails.kycForm,
    beneficialOwnerCertificateForCorporate:
      checklistFormDetails.beneficialOwnerCertificateForCorporate,
    fatcaW8benE: checklistFormDetails.fatcaW8benE,
    corporateAccountRequestLetter:
      checklistFormDetails.corporateAccountRequestLetter,
    undertaking: checklistFormDetails.undertaking,
    fw8ben: checklistFormDetails.fw8ben,
    operatingAuthorityDocument: checklistFormDetails.operatingAuthorityDocument,
    crsIndividualTaxResidencySelfCertificate:
      checklistFormDetails.crsIndividualTaxResidencySelfCertificate,
  };
  // console.log('activity form indfo detr', activityInfoDetails);

  return updatedValues;
};

export const ChecklistFormSchema = Yup.object().shape({});
