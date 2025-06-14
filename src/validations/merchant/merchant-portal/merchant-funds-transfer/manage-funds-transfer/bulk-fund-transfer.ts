import * as Yup from 'yup';

import type { IBulkUpload } from './interfaces';

export const bulkUploadInitialValues: IBulkUpload = {
  bulkFile: null,
};

export const bulkUploadSchema = Yup.object().shape({
  bulkFile: Yup.mixed()
    .required('Please attach a file.')
    .test(
      'fileFormat',
      'Only .xlsx and .csv files are allowed.',
      (value: any) =>
        value &&
        (value.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          value.type === 'text/csv' ||
          value.type === 'application/csv'),
    ),
});
