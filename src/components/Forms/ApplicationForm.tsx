// // 'use client';

// // import type { FormikHelpers } from 'formik';
// // import { Form, Formik } from 'formik';
// // import { useRouter } from 'next/navigation';
// // import React, { useEffect, useState } from 'react';
// // import { BarLoader } from 'react-spinners';

// // import apiClient from '@/api/apiClient';
// // import Button from '@/components/UI/Button/PrimaryButton';
// // import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
// // import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// // import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// // import Input from '@/components/UI/Inputs/Input';
// // import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// // import useCurrentTab from '@/hooks/useCurrentTab';
// // import { setApplicationForm } from '@/redux/features/formSlices/onBoardingForms';
// // import { convertSlugToTitle } from '@/services/urlService/slugServices';
// // import { generateMD5Hash } from '@/utils/helper';

// // import CheckboxInput from '../UI/Inputs/CheckboxInput';
// // import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// // import { buildValidationSchema } from './validations/helper';
// // import type { FieldsData } from './validations/types';
// // // import { addApplicantData } from '@/redux/features/formSlices/fieldSlice';

// // let fetchedData: { [x: string]: string; applicationForm: any };

// // const ApplicationForm = () => {
// //   const userData = useAppSelector((state: any) => state.auth);

// //   const dispatch = useAppDispatch();

// //   const formData = useAppSelector((state: any) => state.onBoardingForms);

// //   const businessData = formData?.businessNature;

// //   const applicationFormData = useAppSelector(
// //     (state: any) => state.onBoardingForms?.applicationForm,
// //   );

// //   const fieldData: FieldsData = useAppSelector((state: any) => state.fields);

// //   const [isChecked, setChecked] = useState(false);
// //   const [filteredData, setFilteredData] = useState<any[]>();

// //   const [pageTitle, setPageTitle] = useState('');

// //   const [validationSchemaState, setValidationSchemaState] = useState<any>();
// //   const { currentTab } = useCurrentTab();
// //   const [selectedCheckValue, setSelectedCheckValue] = useState<
// //     string | undefined | string[]
// //   >(undefined);

// //   const { apiSecret } = userData;
// //   const router = useRouter();

// //   useEffect(() => {
// //     const initialValues: { [key: string]: any } = {};

// //     const fetchData = async () => {
// //       try {
// //         // const response = await apiClient.get(`corporate/corporateFormReview`, {
// //         //   params: { email: userData?.email },
// //         // });
// //         const response = await apiClient.get(
// //           `/corporate/corporateFormReview`,
// //           { params: { email: userData?.email } },
// //           // ?email=john.doe123%40example.com`,
// //         );
// //         fetchedData = response?.data;
// //         dispatch(
// //           setApplicationForm(
// //             response?.data?.mulipleApplicantsData ?? initialValues,
// //           ),
// //         );
// //       } catch (e) {
// //         console.log(e, 'error fetching');
// //       }
// //     };

// //     fetchData();
// //     if (currentTab) {
// //       const title = convertSlugToTitle(currentTab);
// //       console.log('TITLE', title);
// //       console.log('FIELD DATA', fieldData);

// //       setPageTitle(title);
// //       const fData = fieldData.pages?.page?.filter((item) => {
// //         return convertSlugToTitle(item.name) === title;
// //       });
// //       setFilteredData(fData);

// //       fData?.forEach((item) => {
// //         item.categories.forEach((category) => {
// //           category.fields.forEach((field) => {
// //             if (field?.type !== 'checkItem') {
// //               initialValues[field?.name] = '';
// //             }
// //           });
// //         });

// //         if (!applicationFormData) {
// //           dispatch(setApplicationForm(initialValues));
// //         }
// //       });

// //       const validationSchema = buildValidationSchema(fData);
// //       setValidationSchemaState(validationSchema);
// //     }

// //     filteredData?.forEach((pageItem) => {
// //       pageItem.categories.forEach(
// //         (category: { fields: { name: string | number }[] }) => {
// //           category.fields.forEach((field: { name: string | number }) => {
// //             initialValues[field?.name] = fetchedData?.applicationForm ?? '';
// //           });
// //         },
// //       );
// //     });
// //   }, [currentTab]);

// //   console.log('filteredData application form', filteredData);

// //   if (!filteredData) {
// //     return (
// //       <div className="flex w-full flex-col justify-center">
// //         <BarLoader color="#21B25F" height={25} />
// //       </div>
// //     );
// //   }
// //   const saveAndContinue = async (
// //     values: any,
// //     { setSubmitting }: FormikHelpers<any>,
// //   ) => {
// //     try {
// //       const response: any = await apiClient.post(
// //         `corporate/saveApplicationForm/${userData.email}`,
// //         { ...values },
// //         {
// //           headers: { Authorization: `Bearer ${userData.jwt}` },
// //         },
// //       );

// //       console.log('SAVE RESP ', response);

// //       if (response.data.responseCode === '000') {
// //         // router.push('/business-details');
// //         // router.push('/merchant/home/business-nature/live-picture');
// //       } else {
// //         // router.push('/login');
// //         console.log('Data submission failure');
// //       }
// //     } catch (e) {
// //       console.log(e, 'Error');
// //     }

// //     setSubmitting(false);
// //   };

// //   const onSubmit = async (
// //     values: any,
// //     { setSubmitting }: FormikHelpers<any>,
// //   ) => {
// //     // let AppValues = {
// //     //   accountTitle: "Corporate Account",
// //     //   businessNtnNumber: "123456789",
// //     //   requiredBusiness: "Yes",
// //     //   applicantFullName: "John Doe",
// //     //   fatherFullName: "Richard Doe",
// //     //   dateOfBirth: "1980-01-01",
// //     //   gender: "Male",
// //     //   typeOfIdentification: "Passport",
// //     //   identificationNumber: "P123456789",
// //     //   mobileAccountNumber: "9876543210",
// //     //   contactNumber: "1234567890",
// //     //   city: "Sample City",
// //     //   mailingAddress: "123 Sample St, Sample City, SC 12345",
// //     //   relationship: "Self",
// //     //   fullName: "John Doe",
// //     //   typeOfIdentificationNextOfKin: "National ID",
// //     //   identificationNumberNextOfKin: "NID123456789",
// //     //   contactNumberNextOfKin: "0987654321",
// //     //   addressNextOfKin: "456 Kin St, Sample City, SC 12345",
// //     //   primaryNationality: "American",
// //     //   secondaryNationality: "Canadian",
// //     //   passportNumber: "P987654321",
// //     //   taxpayerIdentificationNumber: "TIN123456789",
// //     //   residentStatusInPakistan: "Resident",
// //     //   isUsCitizen: "Yes",
// //     //   bornCityUs: "New York",
// //     //   haveUsAddress: "Yes",
// //     //   hasAssigningAuthorityForSignatory: "Yes",
// //     //   hasAssigningAuthorityForStandingInstructions: "No",
// //     //   taxResidencyCountry: "USA",
// //     //   taxJurisdictionForResidency: "US",
// //     //   taxJurisdictionForTin: "US",
// //     //   taxIdentificationNumber: "TIN987654321",
// //     //   noTinReason: "N/A",
// //     //   status: "Pending"
// //     // }

// //     // router.push('?activeTab=additional-information');
// //     const endpointArray = [
// //       {
// //         tab: 'application-form',
// //         endpoint: `/corporate/saveApplicationFormMultipleApplicants/${userData.email}`,
// //         // endpoint: `/corporate/saveApplicationForm/${userData.email}`,
// //       },
// //       {
// //         tab: 'live-picture',
// //         endpoint: `/corporate/livePicture/${userData.email}`,
// //       },
// //       {
// //         tab: 'checklist',
// //         endpoint: `/corporate/checklist/${userData.email}`,
// //       },
// //       { tab: 'attachments', endpoint: `/corporate/upload/${userData.email}` },
// //     ];

// //     const currentIndex = endpointArray.findIndex(
// //       (item) => item.tab === currentTab,
// //     );

// //     if (currentIndex !== -1) {
// //       const currentEndpoint = endpointArray[currentIndex]?.endpoint;

// //       const {
// //         corporateEntity,
// //         corporateProducts,
// //         accountTitle,
// //         applicants,
// //         businessNtnNumber,
// //         requiredBusiness,
// //         status,
// //         ...rest
// //       } = values;

// //       console.log(rest);

// //       const selectedProducts = [
// //         businessData?.corporateProducts,
// //         businessData?.managedDisbursementProducts,
// //         businessData?.othersProducts,
// //         businessData?.selfServeProducts,
// //       ];

// //       const additionalValues = {
// //         ...values,
// //         // ...values,

// //         corporateEntity: businessData?.businessNature,
// //         // corporateProducts: ['Product 1', 'Product 2', 'Product 3'],
// //         corporateProducts: selectedProducts,

// //         username: userData?.email,
// //         // managerMobile: userData?.managerMobile,
// //         businessNature: businessData?.businessTypeNature,
// //         // businessNature: 'soleProprietor',

// //         status: 'Completed',
// //       };
// //       const mdRequest = {
// //         ...additionalValues,
// //         apisecret: apiSecret,
// //       };
// //       const md5Hash = generateMD5Hash(mdRequest);
// //       const requestBody = {
// //         request: additionalValues,
// //         signature: md5Hash,
// //       };
// //       try {
// //         if (currentEndpoint) {
// //           const response = await apiClient.post(currentEndpoint, requestBody, {
// //             headers: { Authorization: `Bearer ${userData.jwt}` },
// //           });
// //           console.log(response);
// //         }

// //         // Navigate to the next tab after successful submission
// //         const nextTab = endpointArray[currentIndex + 1]?.tab;

// //         if (nextTab) {
// //           router.push(`/merchant/home/business-nature/${nextTab}`);
// //         } else {
// //           console.log('Form submission completed, no more tabs to navigate.');
// //         }
// //       } catch (e) {
// //         console.log('Error in submitting dynamic form', e);
// //       } finally {
// //         setSubmitting(false);
// //       }
// //     }
// //   };

// //   const handleCheckboxChange = () => {
// //     setChecked(!isChecked);
// //   };

// //   if (selectedCheckValue) {
// //     console.log(selectedCheckValue);
// //   }

// //   return (
// //     <>
// //       <Formik
// //         initialValues={applicationFormData}
// //         validationSchema={validationSchemaState}
// //         onSubmit={onSubmit}
// //       >
// //         {(formik) => (
// //           <Form className="flex flex-col gap-5">
// //             <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
// //               {pageTitle}
// //             </div>

// //             <div className="flex flex-col justify-end gap-9">
// //               {filteredData?.map(
// //                 (pageItem) => (
// //                   <React.Fragment key={pageItem.name}>
// //                     {pageItem?.categories.map(
// //                       (
// //                         item: { categoryName: any; fields: any[] },
// //                         itemIndex: number,
// //                       ) => (
// //                         <FormLayoutDynamic
// //                           key={itemIndex}
// //                           heading={item.categoryName}
// //                         >
// //                           {[...item.fields]
// //                             .sort((a, b) => a.priority - b.priority)
// //                             .map((field, fieldIndex) => {
// //                               return field?.type === 'text' ? (
// //                                 <Input
// //                                   key={fieldIndex}
// //                                   label={field?.label}
// //                                   name={field?.name}
// //                                   type={field?.type}
// //                                   error={field?.validation.errorMessage}
// //                                 />
// //                               ) : field?.type === 'dropDown' ? (
// //                                 <DropdownInput
// //                                   key={fieldIndex} // Add a key prop to DropdownInput as well
// //                                   label={field?.label}
// //                                   name={field?.name}
// //                                   options={field?.validation?.options?.map(
// //                                     (option: string) => ({
// //                                       label: option,
// //                                       value: option
// //                                         .toLowerCase()
// //                                         .replace(/\s+/g, ''),
// //                                     }),
// //                                   )}
// //                                   formik={formik}
// //                                   error={field?.validation.errorMessage}
// //                                 />
// //                               ) : field?.type === 'date' ? (
// //                                 <DateInputNew
// //                                   key={fieldIndex}
// //                                   formik={formik}
// //                                   label={field?.label}
// //                                   name={field?.name}
// //                                   error={field?.validation.errorMessage}
// //                                 />
// //                               ) : field?.type === 'checkItem' ? (
// //                                 <CheckboxItem
// //                                   key={fieldIndex}
// //                                   description={field?.label}
// //                                   isChecked={isChecked}
// //                                   handleCheckboxChange={handleCheckboxChange}
// //                                 />
// //                               ) : field?.type === 'checkBoxInput' ? (
// //                                 <CheckboxInput
// //                                   key={fieldIndex}
// //                                   name={field?.name}
// //                                   error={field?.validation.errorMessage}
// //                                   options={field?.validation.options}
// //                                   form={formik}
// //                                   setSelectedCheckValue={setSelectedCheckValue}
// //                                 />
// //                               ) : (
// //                                 <p key={fieldIndex}>nothing to show field</p>
// //                               );
// //                             })}
// //                         </FormLayoutDynamic>
// //                       ),
// //                     )}
// //                   </React.Fragment>
// //                 ),
// //                 // )
// //               )}

// //               <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
// //                 <Button
// //                   label={`Save & Continue Later`}
// //                   onClickHandler={() => saveAndContinue}
// //                   type="button"
// //                   className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
// //                 />
// //                 <Button
// //                   label={`Next`}
// //                   type="submit"
// //                   className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
// //                 />
// //               </div>
// //             </div>
// //           </Form>
// //           // </div>
// //         )}
// //       </Formik>
// //     </>
// //   );
// // };

// // export default ApplicationForm;

// // // {/* {formData.businessNature === "Sole Propreitor" && ( */}
// // // <button
// // // // onClick={() => {
// // // //   filteredData?.forEach(pageItem => {
// // // //     pageItem.categories.forEach((category) => {
// // // //       // Dispatch the addApplicantData for each category
// // // //       dispatch(addApplicantData(category));
// // // //     });
// // // //   });
// // // // }}

// // // // dispatch(addApplicantData(filteredData))}
// // // >
// // //   Add Applicant
// // // </button>
// // // {/* // label="Add Applicant"
// // //     // className="text-secondary-base" */}
// // // {/* onClick={() => dispatch(addApplicantData(filteredData))} */}
// // // {/* /> */}
// // // {/* // )} */}

// //= ====OLD CODE====

// 'use client';

// import type { FormikHelpers } from 'formik';
// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { BarLoader } from 'react-spinners';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
// import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import Input from '@/components/UI/Inputs/Input';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';
// import { setApplicationForm } from '@/redux/features/formSlices/onBoardingForms';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { generateMD5Hash } from '@/utils/helper';

// import CheckboxInput from '../UI/Inputs/CheckboxInput';
// // import AddApplicant from './AddApplicant';
// import CustomModal from '../UI/Modal/CustomModal';
// import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import { buildValidationSchema } from './validations/helper';
// import type { FieldsData } from './validations/types';
// // import H7 from '../UI/Headings/H7';
// let fetchedData: { [x: string]: string; applicationForm: any };

// const ApplicationForm = () => {
//   const userData = useAppSelector((state: any) => state.auth);

//   const dispatch = useAppDispatch();

//   const formData = useAppSelector((state: any) => state.onBoardingForms);

//   const businessData = formData?.businessNature;

//   const applicationFormData = useAppSelector(
//     (state: any) => state.onBoardingForms?.applicationForm,
//   );

//   const fieldData: FieldsData = useAppSelector((state: any) => state.fields);

//   const [isChecked, setChecked] = useState(false);
//   const [filteredData, setFilteredData] = useState<any[]>();

//   const [pageTitle, setPageTitle] = useState('');

//   const [validationSchemaState, setValidationSchemaState] = useState<any>();
//   const { currentTab } = useCurrentTab();
//   const [selectedCheckValue, setSelectedCheckValue] = useState<
//     string | undefined | string[]
//   >(undefined);

//   const selectedProducts = [
//     businessData?.corporateProducts,
//     businessData?.managedDisbursementProducts,
//     businessData?.othersProducts,
//     businessData?.selfServeProducts,
//   ];

//   const { apiSecret } = userData;
//   const router = useRouter();
//   // const dispatch = useAppDispatch();
//   console.log(selectedCheckValue);

//   // let applicationFormInitialValues: any;
//   const applicationFormInitialValues = GetApplicationForm();
//   console.log('applicationFormInitialValues ', applicationFormInitialValues);

//   // const ActivityFormInfoInitialValues = GetActivityInfoDetails();

//   // const initialValues = {
//   //   fieldName1: '',
//   //   fieldName2: '',

//   // } as { [key: string]: string };

//   // let initialValues: ApplicationForm = fetchedData?.applicationForm || {}
//   // let initialValues: ApplicationForm = {};
//   useEffect(() => {
//     const initialValues: { [key: string]: any } = {};

//     const fetchData = async () => {
//       try {
//         // const response = await apiClient.get(`corporate/corporateFormReview`, {
//         //   params: { email: userData?.email },
//         // });
//         const response = await apiClient.get(
//           `/corporate/corporateFormReview`,
//           { params: { email: userData?.email } },
//           // ?email=john.doe123%40example.com`,
//         );
//         fetchedData = response?.data;
//         dispatch(
//           setApplicationForm(
//             response?.data?.mulipleApplicantsData ?? initialValues,
//           ),
//         );
//       } catch (e) {
//         console.log(e, 'error fetching');
//       }
//     };

//     fetchData();
//     if (currentTab) {
//       const title = convertSlugToTitle(currentTab);
//       // console.log('TITLE', title);
//       // console.log('FIELD DATA', fieldData);

//       setPageTitle(title);
//       const fData = fieldData.pages?.page?.filter((item) => {
//         return convertSlugToTitle(item.name) === title;
//       });
//       setFilteredData(fData);

//       fData?.forEach((item) => {
//         item.categories.forEach((category) => {
//           category.fields.forEach((field) => {
//             if (field?.type !== 'checkItem') {
//               initialValues[field?.name] = '';
//             }
//           });
//         });

//         if (!applicationFormData) {
//           dispatch(setApplicationForm(initialValues));
//         }
//       });

//       const validationSchema = buildValidationSchema(fData);
//       setValidationSchemaState(validationSchema);
//     }

//     filteredData?.forEach((pageItem) => {
//       pageItem.categories.forEach(
//         (category: { fields: { name: string | number }[] }) => {
//           category.fields.forEach((field: { name: string | number }) => {
//             initialValues[field?.name] = fetchedData?.applicationForm ?? '';
//           });
//         },
//       );
//     });
//   }, [currentTab]);

//   // console.log('filteredData application form', filteredData);

//   if (!filteredData) {
//     return (
//       <div className="flex w-full flex-col justify-center">
//         <BarLoader color="#21B25F" height={25} />
//       </div>
//     );
//   }
//   const saveAndContinue = async (
//     values: any,
//     { setSubmitting }: FormikHelpers<any>,
//   ) => {
//     try {
//       const response: any = await apiClient.post(
//         `corporate/saveApplicationForm/${userData.email}`,
//         { ...values },
//         {
//           headers: { Authorization: `Bearer ${userData.jwt}` },
//         },
//       );

//       console.log('SAVE RESP ', response);

//       if (response.data.responseCode === '000') {
//         // router.push('/business-details');
//         // router.push('/merchant/home/business-nature/live-picture');
//       } else {
//         // router.push('/login');
//         console.log('Data submission failure');
//       }
//     } catch (e) {
//       console.log(e, 'Error');
//     }

//     setSubmitting(false);
//   };

//   // const onSubmit = async (values: any, { setSubmitting }: any) => {
//   const onSubmit = async (
//     values: any,
//     { setSubmitting }: FormikHelpers<any>,
//   ) => {
//     console.log('APP FORM ARRAY SUBMIT ', values);
//     // let AppValues = {
//     //   accountTitle: "Corporate Account",
//     //   businessNtnNumber: "123456789",
//     //   requiredBusiness: "Yes",
//     //   applicantFullName: "John Doe",
//     //   fatherFullName: "Richard Doe",
//     //   dateOfBirth: "1980-01-01",
//     //   gender: "Male",
//     //   typeOfIdentification: "Passport",
//     //   identificationNumber: "P123456789",
//     //   mobileAccountNumber: "9876543210",
//     //   contactNumber: "1234567890",
//     //   city: "Sample City",
//     //   mailingAddress: "123 Sample St, Sample City, SC 12345",
//     //   relationship: "Self",
//     //   fullName: "John Doe",
//     //   typeOfIdentificationNextOfKin: "National ID",
//     //   identificationNumberNextOfKin: "NID123456789",
//     //   contactNumberNextOfKin: "0987654321",
//     //   addressNextOfKin: "456 Kin St, Sample City, SC 12345",
//     //   primaryNationality: "American",
//     //   secondaryNationality: "Canadian",
//     //   passportNumber: "P987654321",
//     //   taxpayerIdentificationNumber: "TIN123456789",
//     //   residentStatusInPakistan: "Resident",
//     //   isUsCitizen: "Yes",
//     //   bornCityUs: "New York",
//     //   haveUsAddress: "Yes",
//     //   hasAssigningAuthorityForSignatory: "Yes",
//     //   hasAssigningAuthorityForStandingInstructions: "No",
//     //   taxResidencyCountry: "USA",
//     //   taxJurisdictionForResidency: "US",
//     //   taxJurisdictionForTin: "US",
//     //   taxIdentificationNumber: "TIN987654321",
//     //   noTinReason: "N/A",
//     //   status: "Pending"
//     // }

//     // router.push('?activeTab=additional-information');

//     const endpointArray = [
//       {
//         tab: 'application-form',
//         endpoint: `/corporate/saveApplicationFormMultipleApplicants/${userData.email}`,
//         // endpoint: `/corporate/saveApplicationForm/${userData.email}`,
//       },
//       {
//         tab: 'live-picture',
//         endpoint: `/corporate/livePicture/${userData.email}`,
//       },
//       {
//         tab: 'checklist',
//         endpoint: `/corporate/checklist/${userData.email}`,
//       },
//       { tab: 'attachments', endpoint: `/corporate/upload/${userData.email}` },
//     ];

//     const currentIndex = endpointArray.findIndex(
//       (item) => item.tab === currentTab,
//     );

//     if (currentIndex !== -1) {
//       const currentEndpoint = endpointArray[currentIndex]?.endpoint;

//       const {
//         corporateEntity,
//         corporateProducts,
//         accountTitle,
//         applicants,
//         businessNtnNumber,
//         requiredBusiness,
//         status,
//         ...rest
//       } = values;

//       const additionalValues = {
//         applicants: [rest],
//         username: userData?.email,
//         requiredBusiness,
//         status: 'Completed',
//       };

//       console.log('additionalValues ARRAY ', additionalValues);
//       const mdRequest = {
//         ...additionalValues,
//         apisecret: apiSecret,
//       };
//       const md5Hash = generateMD5Hash(mdRequest);
//       const requestBody = {
//         request: additionalValues,
//         signature: md5Hash,
//       };
//       try {
//         console.log('CURRENT endpoint', currentEndpoint);
//         if (currentEndpoint) {
//           const response = await apiClient.post(currentEndpoint, requestBody, {
//             headers: { Authorization: `Bearer ${userData.jwt}` },
//           });
//           console.log(response);
//           if (response.data.responseCode === '000') {
//             setShowModal(true);
//             setTitle('Error');
//             setDescription(response?.data.responseDescription);
//           } else {
//             // Navigate to the next tab after successful submission
//             const nextTab = endpointArray[currentIndex + 1]?.tab;

//             if (nextTab) {
//               router.push(`/merchant/home/business-nature/${nextTab}`);
//             } else {
//               console.log(
//                 'Form submission completed, no more tabs to navigate.',
//               );
//             }
//           }
//         }
//       } catch (e) {
//         console.log('Error in submitting dynamic form', e);
//         setShowModal(true);
//         setTitle('Form Submission Failed');
//         setDescription('Network failed! Please try again later.');
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };

//   // const onSubmit = async (
//   //   values: any,
//   //   { setSubmitting }: FormikHelpers<any>,
//   // ) => {
//   //   // Create the applicants array with values at index 0 and addApplicantValues at index 1
//   //   const updatedApplicants = [
//   //     { ...values }, // Place form values at index 0
//   //     ...addApplicantValues, // Spread existing applicants starting from index 1
//   //   ];

//   //   const endpointArray = [
//   //     {
//   //       tab: 'application-form',
//   //       endpoint: `/corporate/saveApplicationFormMultipleApplicants/${userData.email}`,
//   //     },
//   //     {
//   //       tab: 'live-picture',
//   //       endpoint: `/corporate/livePicture/${userData.email}`,
//   //     },
//   //     {
//   //       tab: 'checklist',
//   //       endpoint: `/corporate/checklist/${userData.email}`,
//   //     },
//   //     {
//   //       tab: 'attachments',
//   //       endpoint: `/corporate/upload/${userData.email}`,
//   //     },
//   //   ];

//   //   const currentIndex = endpointArray.findIndex(
//   //     (item) => item.tab === currentTab,
//   //   );

//   //   if (currentIndex !== -1) {
//   //     const currentEndpoint = endpointArray[currentIndex]?.endpoint;

//   //     const selectedProducts = [
//   //       businessData?.corporateProducts,
//   //       businessData?.managedDisbursementProducts,
//   //       businessData?.othersProducts,
//   //       businessData?.selfServeProducts,
//   //     ];

//   //     const additionalValues = {
//   //       applicants: updatedApplicants, // Use the updated applicants structure
//   //       corporateEntity: businessData?.businessNature,
//   //       corporateProducts: selectedProducts,
//   //       username: userData?.email,
//   //       businessNature: businessData?.businessTypeNature,
//   //       status: 'Completed',
//   //     };

//   //     const mdRequest = {
//   //       ...additionalValues,
//   //       apisecret: apiSecret,
//   //     };

//   //     const md5Hash = generateMD5Hash(mdRequest);

//   //     const requestBody = {
//   //       request: additionalValues,
//   //       signature: md5Hash,
//   //     };

//   //     try {
//   //       if (currentEndpoint) {
//   //         const response = await apiClient.post(currentEndpoint, requestBody, {
//   //           headers: { Authorization: `Bearer ${userData.jwt}` },
//   //         });
//   //         console.log(response);
//   //       }

//   //       // Navigate to the next tab after successful submission
//   //       const nextTab = endpointArray[currentIndex + 1]?.tab;

//   //       if (nextTab) {
//   //         router.push(`/merchant/home/business-nature/${nextTab}`);
//   //       } else {
//   //         console.log('Form submission completed, no more tabs to navigate.');
//   //       }
//   //     } catch (e) {
//   //       console.log('Error in submitting dynamic form', e);
//   //     } finally {
//   //       setSubmitting(false);
//   //     }
//   //   }
//   // };

//   const handleCheckboxChange = () => {
//     setChecked(!isChecked);
//   };

//   if (selectedCheckValue) {
//     console.log(selectedCheckValue);
//   }

//   // console.log("APP FORM ARRAY ", applicationFormData);

//   return (
//     <>
//       <CustomModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//       />
//       <Formik
//         initialValues={applicationFormData}
//         validationSchema={validationSchemaState}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form className="flex flex-col gap-5">
//             <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//               {pageTitle}
//             </div>

//             <div className="flex flex-col justify-end gap-9">
//               {filteredData?.map(
//                 (pageItem) => (
//                   <React.Fragment key={pageItem.name}>
//                     {pageItem?.categories.map(
//                       (
//                         item: { categoryName: any; fields: any[] },
//                         itemIndex: number,
//                       ) => (
//                         <FormLayoutDynamic
//                           key={itemIndex}
//                           heading={item.categoryName}
//                         >
//                           {[...item.fields]
//                             .sort((a, b) => a.priority - b.priority)
//                             .map((field, fieldIndex) => {
//                               return field?.type === 'text' ? (
//                                 <Input
//                                   key={fieldIndex}
//                                   label={field?.label}
//                                   name={field?.name}
//                                   type={field?.type}
//                                   error={field?.validation.errorMessage}
//                                 />
//                               ) : field?.type === 'dropDown' ? (
//                                 <DropdownInput
//                                   key={fieldIndex} // Add a key prop to DropdownInput as well
//                                   label={field?.label}
//                                   name={field?.name}
//                                   options={field?.validation?.options?.map(
//                                     (option: string) => ({
//                                       label: option,
//                                       value: option
//                                         .toLowerCase()
//                                         .replace(/\s+/g, ''),
//                                     }),
//                                   )}
//                                   formik={formik}
//                                   error={field?.validation.errorMessage}
//                                 />
//                               ) : field?.type === 'date' ? (
//                                 <DateInputNew
//                                   key={fieldIndex}
//                                   formik={formik}
//                                   label={field?.label}
//                                   name={field?.name}
//                                   error={field?.validation.errorMessage}
//                                 />
//                               ) : field?.type === 'checkItem' ? (
//                                 <CheckboxItem
//                                   key={fieldIndex}
//                                   description={field?.label}
//                                   isChecked={isChecked}
//                                   handleCheckboxChange={handleCheckboxChange}
//                                 />
//                               ) : field?.type === 'checkBoxInput' ? (
//                                 <CheckboxInput
//                                   key={fieldIndex}
//                                   name={field?.name}
//                                   error={field?.validation.errorMessage}
//                                   options={field?.validation.options}
//                                   form={formik}
//                                   setSelectedCheckValue={setSelectedCheckValue}
//                                 />
//                               ) : (
//                                 <p key={fieldIndex}>nothing to show field</p>
//                               );
//                             })}
//                         </FormLayoutDynamic>
//                       ),
//                     )}
//                     {/* {formData.businessNature === "Sole Propreitor" && ( */}

//                     {/* <AddApplicant
//                       addStoresValues={addApplicantValues}
//                       setAddStoresValues={setAddApplicantValues}
//                       // addApplicant={addApplicant}
//                       addApplicant={(currentValues) => addApplicant(currentValues)}
//                     /> */}

//                     {/* //recent code */}
//                     {/* <AddApplicant
//                       addApplicant={(applicantData) => {
//                         const updatedApplicants = [...values.applicants, applicantData];
//                         formik.setFieldValue('applicants', updatedApplicants);
//                       }}
//                     /> */}

//                     {/* <button
//                     // onClick={() => {
//                     //   filteredData?.forEach(pageItem => {
//                     //     pageItem.categories.forEach((category) => {
//                     //       // Dispatch the addApplicantData for each category
//                     //       dispatch(addApplicantData(category));
//                     //     });
//                     //   });
//                     // }}

//                     // dispatch(addApplicantData(filteredData))}
//                     >
//                       Add Applicant
//                     </button> */}
//                     {/* // label="Add Applicant"
//                         // className="text-secondary-base" */}
//                     {/* onClick={() => dispatch(addApplicantData(filteredData))} */}
//                     {/* /> */}
//                     {/* // )} */}
//                   </React.Fragment>
//                 ),
//                 // )
//               )}

//               <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
//                 <Button
//                   label={`Save & Continue Later`}
//                   onClickHandler={() => saveAndContinue}
//                   type="button"
//                   className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                 />
//                 <Button
//                   label={`Next`}
//                   type="submit"
//                   className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                 />
//               </div>
//             </div>
//           </Form>
//           // </div>
//         )}
//       </Formik>
//       <AddApplicant
//         addApplicantValues={addApplicantValues}
//         setAddApplicantValues={setAddApplicantValues}
//         // addApplicant={addApplicant}
//         addApplicant={(currentValues) => addApplicant(currentValues)}
//       />
//     </>
//   );
// };

// export default ApplicationForm;
