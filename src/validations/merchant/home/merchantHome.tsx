import * as Yup from 'yup';

export const merchantHomeInitialValues: any = {
  graphType: 'byTransaction',
  graphDuration: 'Weekly',
};

export const merchantHomeSchema = Yup.object().shape({
  graphType: Yup.string().required('Graph type is required'),
  graphDuration: Yup.string().required('Graph Duration is required'),
});
