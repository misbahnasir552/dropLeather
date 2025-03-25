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
  { value: 'Online Payments', text: 'Online Payments' },
  { value: 'Other', text: 'Other' },
];

export const businessTypeArray: TSelect[] = [
  { value: 'Sole Proprietor', text: 'Sole Proprietor' },
  { value: 'Public & Private Ltd', text: 'Public & Private Ltd' },
  { value: 'Partnership', text: 'Partnership' },
  { value: 'Other', text: 'Other' },
  { value: 'Trusts', text: 'Trusts' },
  {
    value: 'Club, Societies, Associations',
    text: 'Club, Societies, Associations',
  },
  { value: 'NGO, NPO, Charities', text: 'NGO, NPO, Charities' },
];

export const businessNatureArray: TSelect[] = [
  { value: 'Insurance Payments ', text: 'Insurance Payments' },
  { value: 'Public & Private Ltd', text: 'Public & Private Ltd' },
  { value: 'Partnership', text: 'Partnership' },
  { value: 'Other', text: 'Other' },
  { value: 'Trusts', text: 'Trusts' },
  {
    value: 'Club, Societies, Associations',
    text: 'Club, Societies, Associations',
  },
  { value: 'NGO, NPO, Charities', text: 'NGO, NPO, Charities' },
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

export const yearOptions = [
  { label: '2000', value: '2000' },
  { label: '2001', value: '2001' },
  { label: '2002', value: '2002' },
  { label: '2003', value: '2003' },
  { label: '2004', value: '2004' },
  { label: '2005', value: '2005' },
  { label: '2006', value: '2006' },
  { label: '2007', value: '2007' },
  { label: '2008', value: '2008' },
  { label: '2009', value: '2009' },
  { label: '2010', value: '2010' },
  { label: '2011', value: '2011' },
  { label: '2012', value: '2012' },
  { label: '2013', value: '2013' },
  { label: '2014', value: '2014' },
  { label: '2015', value: '2015' },
  { label: '2016', value: '2016' },
  { label: '2017', value: '2017' },
  { label: '2018', value: '2018' },
  { label: '2019', value: '2019' },
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
];

export const transactionOptions = [
  { label: 'By Transactions Volume', value: 'transaction' },
  { label: 'By Revenue', value: 'revenue' },
];
