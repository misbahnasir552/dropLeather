export interface IFailedTransactionsReport {
  storeId: string;
  customerMSISDN: string;
  storeName: string;
  orderID: string;
  orderDateBetween: string;
  failureReason: string;
  channel: string;
}

export interface IIPNConfiguration {
  url: string;
}

export interface ISuspiciousTransactionForm {
  storeName: string;
  orderDateBetween: string;
  opsId: string;
  orderID: string;
  customerMSISDN: string;
  cardNo: string;
}

export interface ITransactionFeedbackReportForm {
  orderDateBetween: string;
  transactionId: string;
  orderID: string;
  review: string;
  customerMSISDN: string;
  customerEmail: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
