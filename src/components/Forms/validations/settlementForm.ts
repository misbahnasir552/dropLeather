import * as Yup from 'yup';

export const settlementDetailsInitialValues = {
  bank: [],
  bankName: '',
  accountNumber: '',
  accountTitle: '',
};

const settlementDetailsSchema = Yup.object().shape({
  bank: Yup.array()
    .min(1, 'Please select at least one option')
    .required('Bank selection is required'),
  bankName: Yup.string()
    .oneOf(['Bank Name1', 'Bank Name2'], 'Invalid bank name')
    .required('Bank Name is required'),
  accountNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid account number')
    .required('Account Number is required'),
  accountTitle: Yup.string().required('Account Title is required'),
});

export default settlementDetailsSchema;
