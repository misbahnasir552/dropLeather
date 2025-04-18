import * as Yup from 'yup';

import type { ISettlementReport } from './interfaces';

export const settlementReportInitialValues: ISettlementReport = {
  transferDateFrom: '',
  transferDateTo: '',
};

export const settlementReportSchema = Yup.object().shape({
  transferDateFrom: Yup.string(),
  transferDateTo: Yup.string().test(
    'transferDateTo-required',
    'To Date is required',
    // eslint-disable-next-line func-names
    function (value) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { transferDateFrom } = this?.parent;
      return !transferDateFrom || (transferDateFrom && value); // If transferDateFrom exists, transferDateTo must also exist
    },
  ),
});
