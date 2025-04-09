import * as Yup from 'yup';

import type { ISettlementReport } from './interfaces';

export const settlementReportInitialValues: ISettlementReport = {
  date: '',
};

export const settlementReportSchema = Yup.object().shape({
  date: Yup.string(),
});
