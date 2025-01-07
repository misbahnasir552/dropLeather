import * as Yup from 'yup';

export const addProfileInitialValues = {
  profileName: '',
  profileType: '',
  //   createdBy: '',
  // modifiedBy: '',
  //   approveDate: '',
  // adminRole: '',
  // status: '',
  pages: [],
  //  e.g:  "pages":["page 1","page 2"]
};

export const addProfileSchema = Yup.object().shape({
  profileName: Yup.string().required('profileName is required'),
  profileType: Yup.string().required('profileType is required'),
  //  createdBy: Yup.string().required('createdBy is required'),
  // modifiedBy: Yup.string().required('modifiedBy is required'),
  //  approveDate: Yup.string().required('Approval Date is required'),
  // status: Yup.string().required('Status is required'),
  // adminRole: Yup.string().required('Admin Role is required'),
  pages: Yup.array().required('Pages is required'),
});
