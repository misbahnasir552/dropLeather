import * as Yup from 'yup';

export const merchantHomeInitialValues: any = {
  graphType: '',
  ReggraphDurationion: '',
};

export const merchantHomeSchema = Yup.object().shape({
  graphType: Yup.string(),
  graphDuration: Yup.string(),
});
