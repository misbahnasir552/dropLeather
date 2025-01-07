import * as Yup from 'yup';

export const searchProfileInitialValues: any = {
  profileName: '',
  profileType: '',
  status: '',
};

export const searchProfileSchema = Yup.object().shape({
  profileName: Yup.string(),
  profileType: Yup.string(),
  status: Yup.string(),
});
