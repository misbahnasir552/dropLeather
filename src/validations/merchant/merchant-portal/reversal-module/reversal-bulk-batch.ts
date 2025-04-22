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
  toDate: Yup.string().test(
    'toDate-required',
    'To Date is required',
    // eslint-disable-next-line func-names
    function (value) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { fromDate } = this?.parent;
      return !fromDate || (fromDate && value); // If fromDate exists, toDate must also exist
    },
  ),
  status: Yup.string(),
});
