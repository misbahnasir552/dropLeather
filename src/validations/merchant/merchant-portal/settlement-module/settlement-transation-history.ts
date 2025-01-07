import * as Yup from 'yup';

import type { ISettlementTransactionHistory } from './interfaces';

export const settlementTransactionHistoryInitialValues: ISettlementTransactionHistory =
  {
    orderId: '',
    opsId: '',
    settlementDateBetween: '',
    status: '',
  };

export const settlementTransactionHistorySchema = Yup.object().shape({
  orderId: Yup.string(),
  opsId: Yup.string(),
  settlementDateBetween: Yup.string(),
  status: Yup.string(),
});
