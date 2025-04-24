import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

import type { ISettlementReport } from './interfaces';

export const settlementReportInitialValues: ISettlementReport = {
  transferDateFrom: '',
  transferDateTo: '',
};

export const settlementReportSchema = Yup.object().shape({
  transferDateFrom: Yup.string().required('From Date is required'),
  transferDateTo: Yup.string()
    .required('To Date is required')
    .test(
      'transferDateTo-required',
      'To Date is required',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;
        return !transferDateFrom || (transferDateFrom && value);
      },
    )
    .test(
      'transferDateTo-max-30-days',
      'To Date should not be more than 30 days from From Date',
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;

        if (!transferDateFrom || !value) return true;

        const fromDate = parseISO(transferDateFrom);
        const toDate = parseISO(value);

        if (!isValid(fromDate) || !isValid(toDate)) return true;

        return differenceInDays(toDate, fromDate) <= 30;
      },
    ),
});
