export interface IManageFundsTransfer {
  accountType: string;
  msisdn: string;
  availableBalance: string;
  currentBalance: string;
  beneficiaryName: string;
  transferDateTo: string;
  transferDateFrom: string;
  status: string;
  transferAmount: string;
}

export interface IBulkUpload {
  bulkFile: File | null;
}

export interface IFundsTransfer {
  transferFrom: string;
  // beneficiaryName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBank: string;
  transferAmount: number;
  transferPurpose: string;
  // transferTo: '';
}

export interface IAddBeneficiary {
  accountType: string;
  mobileNumber: string;
  bankName: string;
  accountTitle: string;
  beneficiaryName: string;
  beneficiaryEmail: string;
}
export interface IManageBulkTransfer {
  beneficiaryName: string;
  dateBetween: string;
}
