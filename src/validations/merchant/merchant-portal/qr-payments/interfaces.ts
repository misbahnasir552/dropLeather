export interface IViewProductQr {
  productNumber: string;
  storeId: string;
  productName: string;
}

export interface IQrPayments {
  storeName: string;
  transactionPointNumber: string;
  storeId: string;
}

export interface IDynamicQR {
  // productName: string;
  amount: string;
  // productDetails: string;
  productNumber: string;
  storeId: string;
  // categoryCode: string;
  qrExpirationTime: string;
}
