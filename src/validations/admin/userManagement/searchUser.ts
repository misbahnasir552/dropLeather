import * as Yup from 'yup';

export const searchUserInitialValues: any = {
  email: '',
  firstName: '',
  status: '',
};

export const searchUserSchema = Yup.object().shape({
  email: Yup.string(),
  firstName: Yup.string(),
  status: Yup.string(),
});
