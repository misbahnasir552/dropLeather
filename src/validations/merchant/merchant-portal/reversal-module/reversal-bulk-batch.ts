import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

// import type { ISearchBulk } from '@/interfaces/interface';

export const searchBulkInitialValues: any = {
  batchId: '',
  file: '',
  fromDate: '',
  toDate: '',
  status: '',
};
export const searchBulkSchema = Yup.object().shape({
  batchId: Yup.string(),
  file: Yup.string(),
  fromDate: Yup.string().required('From Date is required'),
  toDate: Yup.string()
    .required('To Date is required')
    .test(
      'toDate-required',
      'To Date is required',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;
        return !fromDate || (fromDate && value);
      },
    )
    .test(
      'toDate-max-30-days',
      'To Date should not be more than 30 days from From Date',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;

        if (!fromDate || !value) return true;

        const fromDates = parseISO(fromDate);
        const toDate = parseISO(value);

        if (!isValid(fromDates) || !isValid(toDate)) return true;

        return differenceInDays(toDate, fromDates) <= 30;
      },
    ),
  status: Yup.string(),
});
