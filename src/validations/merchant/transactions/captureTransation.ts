import * as Yup from 'yup';

export const captureTransactionsInitialValues: any = {
  CardNumber: '',
  MerchantName: '',
  OrderId: '',
  SellerCode: '',
};

export const captureTransactionsSchema = Yup.object().shape({
  OutletName: Yup.string(),
  MerchantName: Yup.string(),
  OrderId: Yup.string(),
  SellerCode: Yup.string(),
});
