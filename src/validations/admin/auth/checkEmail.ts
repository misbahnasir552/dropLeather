import * as Yup from 'yup';

export const checkEmailInitialValues = {
  email: '',
};

const checkEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default checkEmailSchema;
