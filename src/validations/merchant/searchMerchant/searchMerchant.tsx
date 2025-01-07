import * as Yup from 'yup';

export const searchMerchantInitialValues: any = {
  merchantName: '',
  websiteAddress: '',
  dateOfApplication: '',
  merchantEmail: '',
  sellerCode: '',
  merchantMobileNumber: '',
  registrationRequestStatus: '',
  businessMode: '',
};

export const searchMerchantSchema = Yup.object().shape({
  merchantName: Yup.string(),
  websiteAddress: Yup.string(),
  dateOfApplication: Yup.string(),
  merchantEmail: Yup.string().email(),
  sellerCode: Yup.string(),
  merchantMobileNumber: Yup.string(),
  registrationRequestStatus: Yup.string(),
  businessMode: Yup.string(),
});
