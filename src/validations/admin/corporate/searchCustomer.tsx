import * as Yup from 'yup';

export const searchCustomerInitialValues: any = {
  customerName: '',
  businessName: '',
  dateOfApplication: '',
  customerEmail: '',
  customerCnic: '',
  customerMobileNumber: '',
  ntnNumber: '',
  applicationStatus: '',
};

export const searchCustomerSchema = Yup.object().shape({
  customerName: Yup.string(),
  businessName: Yup.string(),
  dateOfApplication: Yup.string(),
  customerEmail: Yup.string().email(),
  customerCnic: Yup.string(),
  customerMobileNumber: Yup.string(),
  ntnNumber: Yup.string(),
  applicationStatus: Yup.string(),
});
