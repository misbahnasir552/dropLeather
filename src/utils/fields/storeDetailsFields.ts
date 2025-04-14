// Do NOt Remove Commented Fields

export const storeFields = [
  {
    label: 'Store Type *',
    name: 'storeType',
    type: 'checkbox',
    options: [
      // { value: 'Online', label: 'Online' },
      { value: 'Retail', label: 'Retail' },
    ],
  },
  // {
  //   label: 'Web Store Name *',
  //   name: 'webstoreName',
  //   type: 'text',
  //   show: ['Online'],
  // },
  {
    label: 'Store Name *',
    name: 'storeName',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  // {
  //   label: 'Website URL *',
  //   name: 'webstoreURL',
  //   type: 'text',
  //   show: ['Online'],
  // },

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
    label: 'Country Code *',
    name: 'countryCode',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'State *',
    name: 'state',
    type: 'text',
    show: ['Online', 'Retail'],
  },
  {
    label: 'POS Country Code *',
    name: 'posCountryCode',
    type: 'text',
    show: ['Online', 'Retail'],
  },
];
