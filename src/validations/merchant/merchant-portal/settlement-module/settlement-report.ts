import * as Yup from 'yup';

import type { ISettlementReport } from './interfaces';

export const settlementReportInitialValues: ISettlementReport = {
  settlementDateFrom: '',
  settlementDateTo: '',
};

export const settlementReportSchema = Yup.object().shape({
  settlementDateFrom: Yup.string(),
  settlementDateTo: Yup.string().test(
    'settlementDateTo-required',
    'To Date is required',
    // eslint-disable-next-line func-names
    function (value) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { settlementDateFrom } = this?.parent;
      return !settlementDateFrom || (settlementDateFrom && value); // If settlementDateFrom exists, settlementDateTo must also exist
    },
  ),
});
