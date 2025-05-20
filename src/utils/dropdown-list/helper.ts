import type { TSelect } from '@/types/static/static';

export const booleanArray: TSelect[] = [
  { value: 'yes', text: 'yes' },
  { value: 'no', text: 'no' },
];

export const genderArray: TSelect[] = [
  { value: 'Male', text: 'Male' },
  { value: 'Female', text: 'Female' },
];

export const purposeAccountArray: TSelect[] = [
  { value: 'Retail Payments', text: 'Retail Payments' },
  // { value: 'Online Payments', text: 'Online Payments' },
  { value: 'Other', text: 'Other' },
];

export const monthOptions = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export const graphDurationOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

const currentYear = new Date().getFullYear();
const startYear = 2000;

export const yearOptions = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => {
    const year = (startYear + i).toString();
    return { label: year, value: year };
  },
);

export const transactionOptions = [
  { label: 'By Transactions Volume', value: 'transaction' },
  { label: 'By Revenue', value: 'revenue' },
];
