import * as Yup from 'yup';

export const pnpAttachmentsFormInitialValues = {
  certifiedCopyOfLatestFormAformBOrFormII: null,
  commencementOfBusinessCertificateForPublicLTD: null,
  fatcaForm: null,
  memorandumOfAssociationAllPagesScan: null,
  certificateOfIncorporation: null,
  boardResolutionAuthorizingAnIndividualDirectorManager: null,
  certifiedCopyOfForm29AllPagesScans: null,
  accountMaintainanceCerificateFromYourExternalBank: null,
  crsEntityForm: null,
  cnicsOfAllDirectorsAuthorizedSignatories: null,
};

const pnpAttachmentsFormSchema = Yup.object().shape({
  certifiedCopyOfLatestFormAformBOrFormII: Yup.mixed().required(
    'Certified copy of Latest Form A form B or Form II is required',
  ),
  commencementOfBusinessCertificateForPublicLTD: Yup.mixed().required(
    'Commencement of business certificate for Public LTD is required',
  ),
  fatcaForm: Yup.mixed().required('FATCA Form is required'),
  memorandumOfAssociationAllPagesScan: Yup.mixed().required(
    'Memorandum of Association All Pages Scan is required',
  ),
  certificateOfIncorporation: Yup.mixed().nullable(), // Since it's not required
  boardResolutionAuthorizingAnIndividualDirectorManager: Yup.mixed().nullable(),
  certifiedCopyOfForm29AllPagesScans: Yup.mixed().nullable(),
  accountMaintainanceCerificateFromYourExternalBank: Yup.mixed().nullable(),
  crsEntityForm: Yup.mixed().nullable(),
  cnicsOfAllDirectorsAuthorizedSignatories: Yup.mixed().nullable(),
});

export default pnpAttachmentsFormSchema;
