// Do NOt Remove Commented Fields

export const storeDetailsFormData = {
  pageName: 'Store Details',
  categories: [
    {
      categoryName: '',
      fields: [
        {
          label: 'Store Type',
          name: 'storeType',
          type: 'checkBoxInputMulti',
          options: [
            // { value: 'Online', label: 'Online' },
            { value: 'Retail', label: 'Retail' },
          ],
          required: true,
        },
        // {
        //   label: 'Web Store Name *',
        //   name: 'webstoreName',
        //   type: 'text',
        //   show: ['Online'],
        // },
        {
          label: 'Store Name',
          name: 'storeName',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
        // {
        //   label: 'Website URL *',
        //   name: 'webstoreURL',
        //   type: 'text',
        //   show: ['Online'],
        // },

        {
          label: 'Street Address',
          name: 'streetAddress',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
        {
          label: 'City',
          name: 'city',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
        {
          label: 'Store Category',
          name: 'category',
          type: 'dropdown',
          show: ['Online', 'Retail'],
          options: [
            // { value: 'Online', label: 'Online' },
            { value: 'Retail', label: 'Retail' },
          ],
          required: true,
        },
        {
          label: 'Country Code',
          name: 'countryCode',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
        {
          label: 'State',
          name: 'state',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
        {
          label: 'POS Country Code',
          name: 'posCountryCode',
          type: 'text',
          show: ['Online', 'Retail'],
          required: true,
        },
      ],
    },
  ],
};
