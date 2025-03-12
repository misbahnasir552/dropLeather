export const IntegrationFormData = {
  pageName: 'Integration',
  categories: [
    {
      categoryName: 'Integration Methods (What would you like to integrate)',
      fields: [
        {
          name: 'integrationMethods',
          label: 'Integration Methods',
          type: 'checkBoxInputMulti',
          options: [
            { label: 'Website', value: 'Website' },
            { label: 'Facebook Page', value: 'Facebook Page' },
          ],
          required: 'false',
        },
      ],
    },
    {
      categoryName: 'Integration Modes (Select your mode of integrate)',
      fields: [
        {
          name: 'integrationModes',
          label: 'Integration Modes',
          type: 'checkBoxInputMulti',
          options: [{ label: 'API', value: 'API' }],
          required: 'false',
        },
      ],
    },
    {
      categoryName: "Developer's Details",
      fields: [
        {
          name: 'email',
          label: 'Email Address',
          type: 'text',
          required: 'true',
        },
        {
          name: 'mobileNo',
          label: 'Mobile No',
          type: 'text',
          required: 'true',
        },
      ],
    },
  ],
};
