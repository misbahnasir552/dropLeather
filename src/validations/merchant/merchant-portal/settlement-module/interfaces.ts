export interface ISettlementTransactionHistory {
  orderId: string;
  opsId: string;
  settlementDateBetween: string;
  status: string;
}
export interface ISettlementReport {
  settlementDateFrom: string;
  settlementDateTo: string;
}
