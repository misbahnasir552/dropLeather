import * as Yup from 'yup';

import { useAppSelector } from '@/hooks/redux';
import type { AdditionalFormInfo } from '@/interfaces/interface';
// import { stat } from 'fs';

export const AdditionalInfoInitialValues: AdditionalFormInfo = {
  nomineeName: '',
  nomineeCNIC: '',
  relationShipWithHolder: '',
  nomineeContactNumber: '',
  companyPostalAddress: '',
  authorisedSignatoryName: '',
  designationOfAuthorisedSignatory: '',
  cnicOfAuthorisedSignatory: '',
  mobileNumberOfAuthorisedSignatory: '',
  landLineNumberOfAuthorizedSignatory: '',
  companyRegistrationAddress: '',
};

// const phoneRegExp = /^(?:\92)?[3456789]\d{9}$/;

export const GetAdditionalDetails = () => {
  const AdditionalForm = useAppSelector(
    (state: any) => state.onBoardingForms.additionalForm,
  );
  console.log('from additional details redux', AdditionalForm);
  const updatedValues = {
    nomineeName: AdditionalForm.nomineeName,
    nomineeCNIC: AdditionalForm.nomineeCNIC,
    relationShipWithHolder: AdditionalForm.relationShipWithHolder,
    nomineeContactNumber: AdditionalForm.nomineeContactNumber,

    companyPostalAddress: AdditionalForm.companyPostalAddress,
    authorisedSignatoryName: AdditionalForm.authorisedSignatoryName,
    designationOfAuthorisedSignatory:
      AdditionalForm.designationOfAuthorisedSignatory,
    cnicOfAuthorisedSignatory: AdditionalForm.cnicOfAuthorisedSignatory,
    mobileNumberOfAuthorisedSignatory:
      AdditionalForm.mobileNumberOfAuthorisedSignatory,
    landLineNumberOfAuthorizedSignatory:
      AdditionalForm.landLineNumberOfAuthorizedSignatory,
    companyRegistrationAddress: AdditionalForm.companyRegistrationAddress,
  };
  // console.log('activity form indfo detr', AdditionalForm);

  return updatedValues;
};

const cnicRegExp = /^\d{13}$/;

export const additionalInfoSchema = Yup.object().shape({
  nomineeName: Yup.string().required('Nominee Name is required'),
  nomineeCNIC: Yup.string()
    .matches(cnicRegExp, 'Invalid CNIC')
    .required('CNIC is required')
    .min(13, 'Invalid CNIC, you entered less than 13 characters')
    .max(13, 'Invalid CNIC, you entered more than 13 characters'),
  relationShipWithHolder: Yup.string().required(
    'Relation Ship With Holder is required',
  ),
  nomineeContactNumber: Yup.string().required(
    'Nominee Contact Number name is required',
  ),
  companyPostalAddress: Yup.string().required(
    'Company Postal Address is required',
  ),
  authorisedSignatoryName: Yup.string(),
  // .required(
  //   'Authorised Signatory Name is required',
  // ),
  designationOfAuthorisedSignatory: Yup.string(),
  // .required(
  //   'Designation Of Authorised Signatory is required',
  // ),
  cnicOfAuthorisedSignatory: Yup.string(),
  // .required(
  //   'CNIC Of Authorised Signatory is required',
  // ),
  mobileNumberOfAuthorisedSignatory: Yup.string(),
  // .required(
  //   'Mobile Number Of Authorised Signatory is required',
  // ),
  landLineNumberOfAuthorizedSignatory: Yup.string(),
  // .required(
  //   'Land LineNumber Of Authorized Signatory is required',
  // ),
  companyRegistrationAddress: Yup.string(),
  // .required(
  //   'Company Registration Address is required',
  // ),
});
