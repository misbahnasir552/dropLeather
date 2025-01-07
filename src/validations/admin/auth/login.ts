import * as Yup from 'yup';

export const loginInitialValues = {
  Username: '',
  Password: '',
};

const login = Yup.object().shape({
  Username: Yup.string().required('Username is required'),
  Password: Yup.string().required('Password is required'),
});

export default login;
