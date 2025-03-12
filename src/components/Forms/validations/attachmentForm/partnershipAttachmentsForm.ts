import * as Yup from 'yup';

export const partnershipAttachmentsFormInitialValues = {
  cnicsOfAllPartnersAndBeneficialOwners: null,
  attestedCopyOfPartnershipDeedignedByAllPartners: null,
  accountMaintainanceCertificateFromYourExternalBank: null,
  attestedRegistrationCertificateWithRegistrarofFirms: null,
  other: null,
};

const partnershipAttachmentsFormSchema = Yup.object().shape({
  cnicsOfAllPartnersAndBeneficialOwners: Yup.mixed().required(
    'CNICs of all partners and beneficial owners are required',
  ),
  attestedCopyOfPartnershipDeedignedByAllPartners: Yup.mixed().required(
    'Attested Copy of Partnership Deed signed by All Partners is required',
  ),
  accountMaintainanceCertificateFromYourExternalBank: Yup.mixed().required(
    'Account Maintenance Certificate from Your External Bank is required',
  ),
  attestedRegistrationCertificateWithRegistrarofFirms: Yup.mixed().required(
    'Attested Registration Certificate with Registrar of Firms is required',
  ),
  other: Yup.mixed().nullable(), // Since it's not required
});

export default partnershipAttachmentsFormSchema;
