export const storeFields = [
  {
    label: 'Store Type *',
    name: 'storeType',
    type: 'checkbox',
    options: [
      { value: 'Online', label: 'Online' },
      { value: 'Retail', label: 'Retail' },
    ],
  },
  {
    label: 'Web Store Name *',
    name: 'webstoreName',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'Website URL *',
    name: 'webstoreURL',
    type: 'text',
    show: ['Online'],
  },
  {
    label: 'Payment Enable ',
    name: 'paymentEnable',
    type: 'dropdown',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
    show: ['Online', 'Retail'],
  },

  {
    label: 'Merchant Addendum ID *',
    name: 'merchantAddendumID',
    type: 'text',
    show: ['Online', 'Retail'],
  },

  {
    label: 'Merchant Addendum Name *',
    name: 'merchantAddendumName',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'Street Address *',
    name: 'streetAddress',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'City *',
    name: 'city',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'Store Category *',
    name: 'category',
    type: 'dropdown',
    show: ['Online', 'Retail'],
    // options: storeCategoryList,
  },

  {
    label: 'Sub - Merchant State *',
    name: 'subMerchantState',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'Country Code *',
    name: 'countryCode',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'POS Country Code *',
    name: 'posCountryCode',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'Postal Code *',
    name: 'postalCode',
    type: 'text',
    show: ['Online', 'Retail'],
  },

  {
    label: 'Manager Name',
    name: 'managerName',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'Manager Mobile Phone Number',
    name: 'managerMobilePhoneNumber',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'Commercial Name *',
    name: 'commercialName',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'No. of Transaction Points *',
    name: 'noOfTransactionPoints',
    type: 'text',
    show: ['Retail'],
  },

  {
    label: 'Region *',
    name: 'region',
    type: 'dropdown',
    show: ['Retail'],
  },
  {
    label: 'POC Name *',
    name: 'pocName',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'POC Contact Number *',
    name: 'pocContactNumber',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'POC Email',
    name: 'pocEmail',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'Longitude, Latitude',
    name: 'longLat',
    type: 'text',
    show: ['Retail'],
  },
  {
    label: 'Cash In Allowed ',
    name: 'cashInAllowed',
    type: 'dropdown',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
  {
    label: 'Cash Out Allowed ',
    name: 'cashOutAllowed',
    type: 'dropdown',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
];
