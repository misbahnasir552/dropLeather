export const SettlementDetailsFormData = {
  pageName: 'Settlement Details',
  categories: [
    {
      categoryName:
        'Settlement Details(Select the account you would like to have)',
      fields: [
        {
          name: 'bank',
          label: 'Bank',
          type: 'checkBoxInput',
          required: 'true',
          options: [
            { label: 'Easypaisa Bank Limited', value: 'easypaisaBankLimited' },
            { label: 'Other Banks', value: 'otherBanks' },
          ],
        },
        {
          name: 'bankName',
          label: 'Bank Name',
          type: 'dropdown',
          required: 'true',
          options: [
            { label: 'Bank Name1', value: 'Bank Name1' },
            { label: 'Bank Name2', value: 'Bank Name2' },
          ],
        },

        {
          name: 'accountNumber',
          label: 'Account Number',
          type: 'text',
          required: 'true',
        },
        {
          name: 'accountTitle',
          label: 'Account Title',
          type: 'imageInput',
          required: 'true',
          image: 'Fetch Title',
        },
      ],
    },
  ],
};
