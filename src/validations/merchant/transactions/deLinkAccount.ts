import * as Yup from 'yup';

export const deLinkAccountInitialValues: any = {
  CustomerMobile: '',
  TokenNumber: '',
  OrderId: '',
};

export const deLinkAccountSchema = Yup.object().shape({
  CustomerMobile: Yup.string(),
  TokenNumber: Yup.string(),
  StoreName: Yup.string(),
});
