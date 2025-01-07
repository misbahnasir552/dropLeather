import * as Yup from 'yup';

// import type { ActivityFormInfo } from "@/interfaces/interface";

interface AdminDashboardQueue {
  merchantName: string;
  websiteAddress: string;
  dateOfApplication: Date;
  merchantEmail: string;
  sellerCode: string;
  merchantPhoneNumber: string;
  registrationRequestStatus: string;
  businessMode: string;
}

export const AdminDashboardInitialValues: AdminDashboardQueue = {
  merchantName: '',
  websiteAddress: '',
  dateOfApplication: new Date(),
  merchantEmail: '',
  sellerCode: '',
  merchantPhoneNumber: '',
  registrationRequestStatus: '',
  businessMode: '',
};

export const AdminDashboardInfoSchema = Yup.object().shape({
  merchantName: Yup.string().required('Father name is required'),
  websiteAddress: Yup.string().required('Business Owner Name is required'),
  dateOfApplication: Yup.date().required('Please select a valid date'),
  merchantEmail: Yup.string().required('Email Address is required'),
  sellerCode: Yup.string().required('City is required'),
  merchantPhoneNumber: Yup.string().required(
    'Primary Phone Number is required',
  ),
  registrationRequestStatus: Yup.string().required('Gender is required'),
  businessMode: Yup.string().required('Purpose is required'),
});
