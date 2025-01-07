import * as Yup from 'yup';

import type { IReversalBulkBatch } from './interfaces';

export const reversalBulkBatchInitialValues: IReversalBulkBatch = {
  batchId: '',
  reversalDateBetween: '',
  status: '',
};

export const reversalBulkBatchSchema = Yup.object().shape({
  batchId: Yup.string(),
  reversalDateBetween: Yup.string(),
  status: Yup.string(),
});
