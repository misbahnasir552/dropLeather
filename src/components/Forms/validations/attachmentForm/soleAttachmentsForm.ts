import * as Yup from 'yup';

export const soleAttachmentFormInitialValues = {
  cnicFront: null,
  cnicBack: null,
  selfie: null,
  certificate: null,
};

const soleAttachmentFormSchema = Yup.object().shape({
  cnicFront: Yup.mixed().required('CNIC Front is required'),
  cnicBack: Yup.mixed().required('CNIC Back is required'),
  selfie: Yup.mixed().required('Selfie is required'),
  certificate: Yup.mixed().required('Certificate is required'),
});

export default soleAttachmentFormSchema;
