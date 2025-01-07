import * as Yup from 'yup';

export const loginInitialValues = {
  Username: '',
  Password: '',
};

const loginSchema = Yup.object().shape({
  Username: Yup.string()
    .required('Username is required')
    .matches(/^\S.*$/, 'Username cannot consist of only spaces'),
  Password: Yup.string().required('Password is required'),
});

export default loginSchema;
