import { differenceInDays, isValid, parseISO } from 'date-fns';
import * as Yup from 'yup';

import type { ISettlementReport } from './interfaces';

export const settlementReportInitialValues: ISettlementReport = {
  transferDateFrom: '',
  transferDateTo: '',
};

export const settlementReportSchema = Yup.object().shape({
  transferDateFrom: Yup.string(),
  transferDateTo: Yup.string()
    // .required('To Date is required')
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
      `transferDateTo-max-${process.env.NEXT_PUBLIC_DAYS_RANGE}-days`,
      `To Date should not be more than ${process.env.NEXT_PUBLIC_DAYS_RANGE} days from From Date`,
      // eslint-disable-next-line func-names
      function (value) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { transferDateFrom } = this?.parent;

        if (!transferDateFrom || !value) return true;

        const fromDate = parseISO(transferDateFrom);
        const toDate = parseISO(value);

        if (!isValid(fromDate) || !isValid(toDate)) return true;

        return (
          differenceInDays(toDate, fromDate) <=
          Number(process.env.NEXT_PUBLIC_DAYS_RANGE)
        );
      },
    ),
});
