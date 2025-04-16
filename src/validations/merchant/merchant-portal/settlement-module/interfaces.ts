export interface ISettlementTransactionHistory {
  orderId: string;
  opsId: string;
  settlementDateBetween: string;
  status: string;
}
export interface ISettlementReport {
  transferDateFrom: string;
  transferDateTo: string;
}
