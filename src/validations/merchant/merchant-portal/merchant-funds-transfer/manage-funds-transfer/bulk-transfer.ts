import * as Yup from 'yup';

import type { IManageBulkTransfer } from './interfaces';

export const manageBulkTransferInitialValues: IManageBulkTransfer = {
  beneficiaryName: '',
  dateBetween: '',
};
export const manageBulkTransferSchema = Yup.object().shape({
  beneficiaryName: Yup.string(),
  dateBetween: Yup.string(),
});
