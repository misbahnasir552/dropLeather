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
  toDate: Yup.string(),
  status: Yup.string(),
});
