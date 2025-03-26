import * as Yup from 'yup';

const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

export const merchantHomeInitialValues: any = {
  graphType: 'transaction',
  graphDuration: 'daily',
  fromDate: currentDate,
  toDate: '',
  year: '',
  month: '',
};

export const merchantHomeSchema = Yup.object().shape({
  graphType: Yup.string().required('Graph type is required'),
  graphDuration: Yup.string().required('Graph Duration is required'),
  fromDate: Yup.date().when('graphDuration', (graphDuration: any, schema) =>
    ['daily', 'weekly'].includes(graphDuration[0])
      ? schema
          .required('Date is required')
          .max(new Date(), 'From Date cannot be in the future')
      : schema.nullable(),
  ),
  toDate: Yup.date().when('graphDuration', (graphDuration: any, schema) =>
    graphDuration[0] === 'weekly'
      ? schema
          .required('To Date is required.')
          .min(Yup.ref('fromDate'), 'To Date cannot be before From Date')
          .test(
            'min-7-days',
            'There should be 7 days between From Date and To Date',
            function (toDate) {
              const { fromDate } = this.parent;
              if (fromDate && toDate) {
                const diff =
                  (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
                  (1000 * 60 * 60 * 24);
                return diff === 7;
              }
              return true;
            },
          )
      : schema.nullable(),
  ),
  month: Yup.string().when('graphDuration', (graphDuration: any, schema) =>
    graphDuration[0] === 'monthly'
      ? schema.required('Month is required')
      : schema.nullable(),
  ),

  year: Yup.string().when('graphDuration', (graphDuration: any, schema) =>
    ['monthly', 'yearly'].includes(graphDuration[0])
      ? schema.required('Year is required')
      : schema.nullable(),
  ),
});
