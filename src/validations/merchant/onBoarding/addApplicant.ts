import * as Yup from 'yup';

// import { useAppSelector } from '@/hooks/redux';
// import type { addApplicant } from '@/interfaces/interface';

export const addApplicantInitialValues: any = {
  // export const addApplicantInitialValues: addApplicant = {
  applicantFullName: '',
  fatherFullName: '',
  dateOfBirth: '',
  gender: '',
  identificationNumberCnic: '',
  mobileAccountNumber: '',
  contactNumber: '',
  city: '',
  mailingAddress: '',
  // status: '',
};

const today = new Date();
const minAgeDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);
const maxAgeDate = new Date(
  today.getFullYear() - 120,
  today.getMonth(),
  today.getDate(),
);

export const addApplicantFormSchema = Yup.object().shape({
  applicantFullName: Yup.string().required('Applicant Name is required'),
  fatherFullName: Yup.string().required('Father Name is required'),

  dateOfBirth: Yup.date()
    .required('Date Of Birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(maxAgeDate, 'Date of birth cannot be more than 120 years ago')
    .max(minAgeDate, 'You must be at least 18 years old'),

  gender: Yup.string().required('Gender is required'),
  identificationNumberCnic: Yup.string()
    .required('Identification Number is required')
    .matches(
      /^\d{13}$/,
      'Identification Number must be a 13-digit numeric value',
    ),
  mobileAccountNumber: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^0\d{10}$/,
      'Contact Number must start with 0 and be 11 digits long',
    ),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .matches(
      /^0\d{10}$/,
      'Contact Number must start with 0 and be 11 digits long',
    ),
  city: Yup.string().required('City is required'),
  mailingAddress: Yup.string().required('Mailing Address is required'),
});
