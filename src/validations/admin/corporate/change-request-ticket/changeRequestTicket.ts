import * as Yup from 'yup';

export const changeRequestInitialValues: any = {
  // documentNumber: '',
  ticketId: '',
  email: '',
};

export const changeRequestSchema = Yup.object().shape({
  // documentNumber: Yup.string(),
  ticketId: Yup.string(),
  email: Yup.string(),
});
