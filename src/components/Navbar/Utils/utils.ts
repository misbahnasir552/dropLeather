import Coin from '@/assets/icons/card-coin.svg';
import Money from '@/assets/icons/money-nav.svg';
import Scanner from '@/assets/icons/scanner-nav.svg';
import Shop from '@/assets/icons/shop-nav.svg';
import SubscriptionIcon from '@/assets/icons/subscription-icon.svg';

export const getNavMenu = () => [
  { title: 'Home', link: '/', name: '' },
  {
    title: 'Accept Payments',
    link: '/accept-payments',
    name: 'accept-payments',
  },
  { title: 'Developer', link: '/developer', name: 'developer' },
  { title: 'FAQs', link: '/faq', name: 'faq' },
];
export const getOnBoardingNavMenu = () => [
  { title: 'Home', link: '/merchant/home', name: '' },
  {
    title: 'Dashboard',
    link: '/merchant/home',
    name: 'merchant-portal',
  },
  // { title: 'Developer', link: '/developer', name: 'developer' },
  // { title: 'FAQs', link: '/faq', name: 'faq' },
];

export const getDropDownMenu = () => [
  { title: 'Payment Gateway', link: 'payment-gateway', icon: Coin },
  { title: 'QR Payments', link: 'qr-payments', icon: Scanner },
  { title: 'Mini Apps', link: 'mini-apps', icon: Shop },
  { title: 'Payment Link', link: 'payment-link', icon: Money },
  { title: 'Subscription', link: 'subscription', icon: SubscriptionIcon },
];

export const getConfigurationDropDownMenu = () => [
  {
    title: 'Transaction History Preferences',
    link: 'configuration/transaction-history-prefereneces',
  },
  { title: 'Upload Documents', link: 'configuration/upload-documents' },
  { title: 'Add Outlet', link: 'configuration/add-outlet' },
  // { title: "Add Transaction Point", link: "payment-link", icon: Money },
  {
    title: 'Add Transaction Point',
    link: 'configuration/add-transaction-point',
  },
  {
    title: 'Capture Transaction',
    link: 'configuration/capture-transaction',
  },
  {
    title: 'De-Link MA Relationship',
    link: 'configuration/de-Link-ma-relationship',
  },
  {
    title: 'De-Link Account Report',
    link: 'configuration/deLink-report',
  },
];

export const getAccountSettingsDropDownMenu = () => [
  {
    title: 'Change Password',
    link: 'account-settings/change-password',
  },
  {
    title: 'IPN Attribute Configurations',
    link: 'account-settings/ipn-configurations',
  },
  { title: 'Generate Hash Key', link: 'account-settings/hash-generator' },
  // { title: "Add Transaction Point", link: "payment-link", icon: Money },
  {
    title: 'Public Key Configuration',
    link: 'add-transaction-point',
  },
  {
    title: 'Suspicious Transaction Report',
    link: 'capture-transaction',
  },
  {
    title: 'Failed Transaction Report',
    link: 'de-Link-ma-relationship',
  },
  {
    title: 'Transaction Feedback Report',
    link: 'deLink-report',
  },
];

export const getQRPaymentsDropDownMenu = () => [
  {
    title: 'View QR',
    link: 'qr-payments/view-qr',
  },
  {
    title: 'Dynamic QR',
    link: 'qr-payments/dynamic-qr',
  },
  { title: 'View Product QR', link: 'qr-payments/view-product-qr' },
];
