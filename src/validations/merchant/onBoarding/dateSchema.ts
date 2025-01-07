import * as Yup from 'yup';

export const initialDateValues = {
  date: '',
};

export const validationDateSchema = Yup.object().shape({
  date: Yup.date().required('Please select a date'),
});
