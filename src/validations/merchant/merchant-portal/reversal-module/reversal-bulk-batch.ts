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
  fromDate: Yup.string(),
  toDate: Yup.string()
    // .required('To Date is required')
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
      `toDate-max-${process.env.NEXT_PUBLIC_DAYS_RANGE}-days`,
      `To Date should not be more than ${process.env.NEXT_PUBLIC_DAYS_RANGE} days from From Date`,
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fromDate } = this?.parent;

        if (!fromDate || !value) return true;

        const fromDates = parseISO(fromDate);
        const toDate = parseISO(value);

        if (!isValid(fromDates) || !isValid(toDate)) return true;

        return (
          differenceInDays(toDate, fromDates) <=
          Number(process.env.NEXT_PUBLIC_DAYS_RANGE)
        );
      },
    ),
  status: Yup.string(),
});
