// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { BarLoader } from 'react-spinners';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import Input from '@/components/UI/Inputs/Input';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';
// import { setRequestRevision } from '@/redux/features/authSlice';
// import {
//   clearApplicants,
//   setApplicants,
//   setApplicationForm,
//   setSoleName,
// } from '@/redux/features/formSlices/onBoardingForms';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { generateMD5Hash } from '@/utils/helper';
// import { ApplicationFormSchema } from '@/validations/merchant/onBoarding/applicationForm';

// import CheckboxItem from '../UI/Inputs/CheckboxItem';
// import DropdownNew from '../UI/Inputs/DropDownNew';
// import SuccessModal from '../UI/Modal/CustomModal';
// import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import AddApplicant from './AddApplicant';
// import { buildValidationSchema } from './validations/helper';
// import type { FieldsData } from './validations/types';

// const ApplicationFormStatic = () => {
//   const [isChecked, setChecked] = useState(false);

//   // const [childData, setChildData] = useState([]);

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { currentTab } = useCurrentTab();
//   const userData = useAppSelector((state: any) => state.auth);
//   const { apiSecret } = userData;
//   const formData = useAppSelector((state: any) => state.onBoardingForms);
//   console.log('FORM DATA ', formData);

//   const applicantsStore = useAppSelector(
//     (state: any) => state.onBoardingForms.addApplicants,
//   );

//   console.log('APP STORE ', applicantsStore);

//   // const handleChildDataUpdate = (index: string | number, values: any) => {
//   //   console.log("CHHHHH ", values);

//   //   setChildData((prev) => {
//   //     const updatedData:any = [...prev];
//   //     updatedData[index] = values; // Update specific child form data
//   //     return updatedData;
//   //   });
//   // };

//   const saveApplicantParent = (index: number, values: any) => {
//     console.log('Applicant VALUESSSSS PARENT issueee:', values, index);

//     if (values?.id) {
//       dispatch(setApplicants(values));
//     } else {
//       dispatch(
//         setApplicants({
//           ...values,
//           id: index,
//         }),
//       );
//     }
//   };

//   const businessData = formData?.businessNature;
//   console.log(businessData, 'Business Nature');

//   const corporateEntityNature = formData?.corporateEntity;
//   console.log(corporateEntityNature, 'corporateEntityNature');

//   const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
//   console.log('FIELDS ', fieldData);

//   const applicationFormData = useAppSelector(
//     (state: any) => state.onBoardingForms.applicationForm,
//   );

//   const [filteredData, setFilteredData] = useState<any[]>();
//   const [appInitialValuesState, setAppInitialValuesState] = useState<any>();

//   const [validationSchemaState, setValidationSchemaState] = useState<any>(
//     ApplicationFormSchema,
//   );

//   const [pageTitle, setPageTitle] = useState('');

//   const [showModal, setShowModal] = useState(false);
//   const [title, setTitle] = useState('');
//   const [routePush, setRoutePush] = useState('');
//   const [description, setDescription] = useState('');

//   const selectedProducts = [
//     businessData?.corporateProducts ?? businessData?.[0],
//     businessData?.selfServeProducts ?? businessData?.[1],
//     businessData?.managedDisbursementProducts ?? businessData?.[2],
//     businessData?.othersProducts ?? businessData?.[3],
//   ];

//   console.log('Selected Products', selectedProducts);

//   console.log('FILLLLL ', fieldData.pages?.page?.[0]?.name);
//   const [data, setData] = useState<any>();
//   const getDetails = async () => {
//     try {
//       const response = await apiClient.get(`corporate/corporateFormReview`, {
//         params: { email: userData?.email },
//       });
//       setData(response.data);
//       console.log('GET DETAILS:', response.data);
//     } catch (error) {
//       console.log(error, 'error from onboarding forms');
//     }
//   };
//   const applicationFormStatus = data?.mulipleApplicantsData?.status ?? null;

//   useEffect(() => {
//     const initialValues: { [key: string]: any } = {};
//     getDetails();
//     if (userData.isrequestRevision) {
//       dispatch(clearApplicants());
//     }

//     if (currentTab) {
//       const title = convertSlugToTitle(currentTab);
//       setPageTitle(title);
//       const fData = fieldData.pages?.page?.filter((item) => {
//         console.log(item.name, 'ITEM NAME');
//         return convertSlugToTitle(item.name) === title;
//       });
//       setFilteredData(fData);

//       fData?.forEach((item) => {
//         item.categories.forEach((category) => {
//           category.fields.forEach((field) => {
//             if (field?.type !== 'checkItem') {
//               initialValues[field?.name] =
//                 applicationFormData?.[field?.name] ?? '';
//               // applicationFormData[field?.name] ?? '';
//             }
//           });
//         });
//         setAppInitialValuesState(initialValues);
//       });
//       if (userData.isrequestRevision) {
//         console.log(validationSchemaState, 'scheeemaaa');
//         const validationSchema = buildValidationSchema(fData);
//         setValidationSchemaState(validationSchema);
//       }
//     }
//   }, [currentTab, userData.isrequestRevision]);

//   if (!filteredData) {
//     return (
//       <div className="flex w-full flex-col justify-center">
//         <BarLoader color="#21B25F" />
//       </div>
//     );
//   }
//   const handleCheckboxChange = () => {
//     setChecked(!isChecked);
//   };
//   const saveAndContinue = async (values: any) => {
//     console.log('Save and Values:', values);

//     const endpointArray = [
//       {
//         tab: 'application-form',
//         endpoint: `/corporate/saveApplicationFormMultipleApplicants`,
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
//         chequeBookRequired,
//         status,
//         ...rest
//       } = values;

//       console.log(rest);

//       const additionalValues = {
//         applicant: [rest],
//         addApplicants: applicantsStore,
//         corporateEntity: businessData?.businessNature ?? corporateEntityNature,
//         corporateProducts: selectedProducts,
//         chequeBookRequired: businessData?.chequeBookRequired,
//         accountTitle,
//         businessNtnNumber,
//         isRequestRevision: '0',
//         username: userData?.email,
//         requiredBusiness,
//         status: 'Pending',
//         isSaveAndContinue: '1',
//       };

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
//         if (currentEndpoint) {
//           const response = await apiClient.post(currentEndpoint, requestBody, {
//             params: { username: userData.email },
//             headers: { Authorization: `Bearer ${userData?.jwt}` },
//           });
//           console.log(response);
//           if (response.data.responseCode === '000') {
//             setShowModal(true);
//             setTitle('Error');
//             setDescription(response?.data.responseDescription);
//           } else {
//             dispatch(setSoleName(values.applicantFullName));
//             setShowModal(true);
//             setTitle('Form Saved Successfully!');
//             setDescription(response?.data?.responseMessage);
//             setRoutePush('/merchant/home');
//           }
//         }
//       } catch (e) {
//         console.log('Error in submitting dynamic form', e);
//         setShowModal(true);
//         setTitle('Form Submission Failed');
//         setDescription('Network failed! Please try again later.');
//       }
//       //  finally {

//       // }
//     }
//   };

//   const handleSubmit = async (values: any, { setSubmitting, isValid }: any) => {
//     console.log('Submitted Values:', values, isValid);
//     // if(!isValid) {
//     //   setShowModal(true);
//     //   setTitle('Validation Check');
//     //   setDescription('Please check all the field again and try again.');
//     //   setRoutePush('')

//     //   return;
//     // }
//     dispatch(setApplicationForm({}));
//     dispatch(
//       setApplicationForm({
//         ...values,
//         status: 'Completed',
//       }),
//     );

//     setSubmitting(false);
//     // Add further submission logic here

//     const endpointArray = [
//       {
//         tab: 'application-form',
//         endpoint: `/corporate/saveApplicationFormMultipleApplicants`,
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

//     const RequestRevisionEndpointArray = [
//       {
//         tab: 'application-form',
//         endpoint: `/corporate/saveApplicationForm/${userData.email}`,
//       },
//       {
//         tab: 'attachments',
//         endpoint: `/corporate/saveCorporateDocuments/${userData.email}`,
//       },
//     ];

//     const requestCurrentIndex = endpointArray.findIndex(
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
//         chequeBookRequired,
//         status,
//         ...rest
//       } = values;

//       console.log(rest);
//       let additionalValues;
//       if (userData.isrequestRevision) {
//         additionalValues = {
//           applicant: [rest],
//           addApplicants: applicantsStore,
//           corporateEntity:
//             businessData?.businessNature ?? corporateEntityNature,
//           // corporateProducts: selectedProducts,
//           isRequestRevision: '1',
//           chequeBookRequired: businessData?.chequeBookRequired,
//           accountTitle,
//           businessNtnNumber,
//           username: userData?.email,
//           requiredBusiness,
//           status: 'Completed',
//         };
//         // dispatch(setApplicants([]));
//         // dispatch(setRequestRevision(false))
//       } else {
//         additionalValues = {
//           applicant: [rest],
//           addApplicants: applicantsStore,
//           corporateEntity:
//             businessData?.businessNature ?? corporateEntityNature,
//           corporateProducts: selectedProducts,
//           isRequestRevision: '0',
//           chequeBookRequired: businessData?.chequeBookRequired,
//           accountTitle,
//           businessNtnNumber,
//           username: userData?.email,
//           requiredBusiness,
//           status: 'Completed',
//         };
//       }

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
//         if (currentEndpoint) {
//           const response = await apiClient.post(currentEndpoint, requestBody, {
//             params: { username: userData.email },
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

//             const requestNextTab =
//               RequestRevisionEndpointArray[requestCurrentIndex + 1]?.tab;

//             if (nextTab) {
//               dispatch(setSoleName(values.applicantFullName));
//               dispatch(setApplicants([]));
//               dispatch(setApplicants(applicantsStore));

//               if (userData.isrequestRevision) {
//                 dispatch(setApplicants([]));

//                 if (
//                   requestNextTab &&
//                   (fieldData.pages?.page?.[0]?.name ===
//                     'Corporate Sole Attachments' ||
//                     fieldData.pages?.page?.[1]?.name ===
//                       'Corporate Sole Attachments')
//                 ) {
//                   // dispatch(setRequestRevision(false));

//                   router.push(
//                     `/merchant/home/business-nature/${requestNextTab}`,
//                   );
//                 } else {
//                   dispatch(setRequestRevision(false));

//                   // router.push(`/merchant/home/business-nature/${nextTab}`);

//                   setTitle('Form Saved Successfully!');
//                   setDescription(response?.data?.responseMessage);
//                   setShowModal(true);
//                   setRoutePush('/merchant/home');
//                 }

//                 // setRoutePush(`/merchant/home`)
//                 // router.push(`/merchant/home`);
//               } else if (response.data.responseCode === '009') {
//                 router.push(`/merchant/home/business-nature/${nextTab}`);
//               } else {
//                 setShowModal(true);
//                 setTitle('Error');
//                 setDescription(response?.data.responseDescription);
//               }
//               // router.push(`/merchant/home/business-nature/${nextTab}`);
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

//   return (
//     <div>
//       <SuccessModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//         routeName={routePush}
//         // routeName="/merchant/home"
//       />
//       <Formik
//         initialValues={appInitialValuesState}
//         // initialValues={ApplicationFormInfoInitialValues}

//         validationSchema={validationSchemaState}
//         onSubmit={handleSubmit}
//       >
//         {(formik) => (
//           <div className="flex flex-col gap-6 pb-[120px]">
//             <Form className="flex flex-col gap-5">
//               <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//                 {pageTitle}
//               </div>

//               <div className="flex flex-col gap-9">
//                 <div className="flex flex-col gap-6">
//                   {filteredData?.map(
//                     (pageItem) => (
//                       // pageItem.name === "Business Details" && (
//                       <React.Fragment key={pageItem.name}>
//                         {[...pageItem.categories]
//                           .sort((a, b) => a.priority - b.priority) // Sort the categories array by item.priority
//                           .map((item, itemIndex) => (
//                             <FormLayoutDynamic
//                               key={itemIndex}
//                               heading={item.categoryName}
//                             >
//                               {[...item.fields]
//                                 .sort((a, b) => a.priority - b.priority) // Sort fields within the item by field.priority
//                                 .map((field, fieldIndex) => {
//                                   if (field?.type === 'text') {
//                                     return (
//                                       <Input
//                                         key={fieldIndex}
//                                         asterik={field.validation.required}
//                                         label={field.label}
//                                         name={field.name}
//                                         type={field.type}
//                                         error={field.validation.errorMessage}
//                                         placeholder={field?.placeholder}
//                                       />
//                                     );
//                                   }

//                                   if (field?.type === 'dropDownList') {
//                                     return (
//                                       <DropdownNew
//                                         key={fieldIndex}
//                                         asterik={field.validation.required}
//                                         label={field.label}
//                                         name={field.name}
//                                         options={field.validation?.options?.map(
//                                           (option: string) => ({
//                                             label: option,
//                                             value: option
//                                               .toLowerCase()
//                                               .replace(/\s+/g, ''),
//                                           }),
//                                         )}
//                                         formik={formik}
//                                         error={field.validation.errorMessage}
//                                       />
//                                     );
//                                   }

//                                   if (field?.type === 'dropDown') {
//                                     return (
//                                       <DropdownInput
//                                         key={fieldIndex}
//                                         asterik={field.validation.required}
//                                         label={field.label}
//                                         name={field.name}
//                                         options={field.validation?.options?.map(
//                                           (option: string) => ({
//                                             label: option,
//                                             value: option
//                                               .toLowerCase()
//                                               .replace(/\s+/g, ''),
//                                           }),
//                                         )}
//                                         formik={formik}
//                                         error={field.validation.errorMessage}
//                                       />
//                                     );
//                                   }

//                                   if (field?.type === 'date') {
//                                     return (
//                                       <DateInputNew
//                                         key={fieldIndex}
//                                         asterik={field.validation.required}
//                                         formik={formik}
//                                         label={field.label}
//                                         name={field.name}
//                                         error={field.validation.errorMessage}
//                                       />
//                                     );
//                                   }

//                                   return (
//                                     <p key={fieldIndex}>nothing to show</p>
//                                   );
//                                 })}
//                             </FormLayoutDynamic>
//                           ))}
//                       </React.Fragment>
//                     ),
//                     // )
//                   )}
//                 </div>
//               </div>
//             </Form>
//             {corporateEntityNature !== 'Sole-Proprietorship' &&
//               !userData.isrequestRevision && (
//                 <>
//                   <AddApplicant onDataChange={saveApplicantParent} />
//                 </>
//               )}

//             <FormLayoutDynamic heading={`Declaration`}>
//               <div className="flex flex-col items-start justify-center gap-4">
//                 {/* <div className="text-base font-semibold leading-tight text-secondary-base">
//                   Terms & Conditions
//                 </div> */}
//                 <div className="bg-neutral-white-base p-6">
//                   <div className="text-xs leading-tight text-secondary-base">
//                     I hereby confirm that the information provided above is
//                     true, accurate and complete. Subject to applicable local
//                     laws, I hereby consent for Telenor Microfinance Bank Ltd. Or
//                     any of its affiliates, subsidiaries (including
//                     branches/branchless) (Collectively "the Bank") to share my
//                     information with domestic or overseas regulators or tax
//                     authorities where necessary to establish my tax liability in
//                     any Jurisdiction. Where required by domestic or overseas
//                     regulators or tax authorities consent and agree that the
//                     Bank may withhold from my account(s) such amounts as may be
//                     required according to applicable laws, regulations and
//                     directives. I undertake to notify the Bank within 30
//                     calendar days if there is a change in any information which
//                     I have provided to the Bank
//                   </div>
//                 </div>
//                 <CheckboxItem
//                   description="I agree to easypaisa Terms & Conditions"
//                   isChecked={isChecked}
//                   handleCheckboxChange={handleCheckboxChange}
//                 />
//               </div>
//             </FormLayoutDynamic>

//             <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
//               {!userData.isrequestRevision &&
//                 applicationFormStatus !== 'Completed' && (
//                   <Button
//                     label={`Save & Continue Later`}
//                     onClickHandler={async () => saveAndContinue(formik.values)}
//                     type="button"
//                     className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                   />
//                 )}
//               <Button
//                 label={`Next`}
//                 type="button"
//                 isDisabled={!isChecked}
//                 onClickHandler={async () => {
//                   await formik.validateForm().then((formErrors) => {
//                     console.log('FORM ERRORSS ', formErrors);

//                     if (Object.keys(formErrors).length > 0) {
//                       setShowModal(true);
//                       setTitle('Validation Check');
//                       setDescription(
//                         'Please check all the field again and try again.',
//                       );
//                       setRoutePush('');
//                     }

//                     // else{
//                     //   formik.handleSubmit();
//                     // }
//                   });

//                   formik.handleSubmit();
//                 }}
//                 className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//               />
//             </div>
//           </div>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default ApplicationFormStatic;

// to be tested

'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setRequestRevision } from '@/redux/features/authSlice';
import {
  clearApplicants,
  setApplicants,
  setApplicationForm,
  setSoleName,
} from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { ApplicationFormSchema } from '@/validations/merchant/onBoarding/applicationForm';

import CheckboxItem from '../UI/Inputs/CheckboxItem';
import DropdownNew from '../UI/Inputs/DropDownNew';
import SuccessModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import AddApplicant from './AddApplicant';
import { buildValidationSchema } from './validations/helper';
import type { FieldsData } from './validations/types';

const ApplicationFormStatic = () => {
  const [isChecked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [childData, setChildData] = useState([]);
  const [requestRevisionAttachments, setRequestRevisionAttachments] =
    useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentTab } = useCurrentTab();
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  const applicantsStore = useAppSelector(
    (state: any) => state.onBoardingForms.addApplicants,
  );

  console.log('APP STORE ', applicantsStore);

  // const handleChildDataUpdate = (index: string | number, values: any) => {
  //   console.log("CHHHHH ", values);

  //   setChildData((prev) => {
  //     const updatedData:any = [...prev];
  //     updatedData[index] = values; // Update specific child form data
  //     return updatedData;
  //   });
  // };

  const saveApplicantParent = (index: number, values: any) => {
    console.log('Applicant VALUESSSSS PARENT issueee:', values, index);

    if (values?.id) {
      dispatch(setApplicants(values));
    } else {
      dispatch(
        setApplicants({
          ...values,
          id: index,
        }),
      );
    }
  };

  const businessData = formData?.businessNature;
  console.log(businessData, 'Business Nature');

  const corporateEntityNature = formData?.corporateEntity;
  console.log(corporateEntityNature, 'corporateEntityNature');

  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  console.log('FIELDS ', fieldData);

  const applicationFormData = useAppSelector(
    (state: any) => state.onBoardingForms.applicationForm,
  );

  const [filteredData, setFilteredData] = useState<any[]>();
  const [appInitialValuesState, setAppInitialValuesState] = useState<any>();

  const [validationSchemaState, setValidationSchemaState] = useState<any>(
    ApplicationFormSchema,
  );

  const [pageTitle, setPageTitle] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [routePush, setRoutePush] = useState('');
  const [description, setDescription] = useState('');

  const selectedProducts = [
    businessData?.corporateProducts ?? businessData?.[0],
    businessData?.selfServeProducts ?? businessData?.[1],
    businessData?.managedDisbursementProducts ?? businessData?.[2],
    businessData?.othersProducts ?? businessData?.[3],
  ];

  console.log('Selected Products', selectedProducts);

  console.log('FILLLLL ', fieldData.pages?.page?.[0]?.name);
  const [data, setData] = useState<any>();
  const getDetails = async () => {
    try {
      const response = await apiClient.get(`corporate/corporateFormReview`, {
        params: { email: userData?.email },
      });
      setData(response.data);
      console.log('GET DETAILS:', response.data);
    } catch (error) {
      console.log(error, 'error from onboarding forms');
    }
  };
  const applicationFormStatus = data?.mulipleApplicantsData?.status ?? null;

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    getDetails();
    if (userData.isrequestRevision) {
      dispatch(clearApplicants());
    }

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      const fData = fieldData.pages?.page?.filter((item) => {
        console.log(item.name, 'ITEM NAME');
        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);

      fData?.forEach((item) => {
        item.categories.forEach((category) => {
          category.fields.forEach((field) => {
            if (field?.type !== 'checkItem') {
              initialValues[field?.name] =
                applicationFormData?.[field?.name] ?? '';
              // applicationFormData[field?.name] ?? '';
            }
          });
        });
        setAppInitialValuesState(initialValues);
      });
      if (userData.isrequestRevision) {
        console.log(validationSchemaState, 'scheeemaaa');
        const validationSchema = buildValidationSchema(fData);
        setValidationSchemaState(validationSchema);
      }
    }
  }, [currentTab, userData.isrequestRevision]);

  if (!filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  const saveAndContinue = async (values: any) => {
    console.log('Save and Values:', values);
    setIsSubmitting(true);

    const endpointArray = [
      {
        tab: 'application-form',
        endpoint: `/corporate/saveApplicationFormMultipleApplicants`,
        // endpoint: `/corporate/saveApplicationForm/${userData.email}`,
      },
      {
        tab: 'live-picture',
        endpoint: `/corporate/livePicture/${userData.email}`,
      },
      {
        tab: 'checklist',
        endpoint: `/corporate/checklist/${userData.email}`,
      },
      { tab: 'attachments', endpoint: `/corporate/upload/${userData.email}` },
    ];

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      const {
        corporateEntity,
        corporateProducts,
        accountTitle,
        applicants,
        businessNtnNumber,
        requiredBusiness,
        chequeBookRequired,
        status,
        ...rest
      } = values;

      console.log(rest);

      const additionalValues = {
        applicant: [rest],
        addApplicants: applicantsStore,
        corporateEntity: businessData?.businessNature ?? corporateEntityNature,
        corporateProducts: selectedProducts,
        chequeBookRequired: businessData?.chequeBookRequired,
        accountTitle,
        businessNtnNumber,
        isRequestRevision: '0',
        username: userData?.email,
        requiredBusiness,
        status: 'Pending',
        isSaveAndContinue: '1',
      };

      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(currentEndpoint, requestBody, {
            params: { username: userData.email },
            headers: { Authorization: `Bearer ${userData?.jwt}` },
          });
          console.log(response);
          if (response.data.responseCode === '000') {
            setShowModal(true);
            setTitle('Error');
            setDescription(
              response?.data?.responseDescription ||
                response?.data?.responseMessage,
            );
          } else if (response.data.responseCode === '009') {
            dispatch(setSoleName(values.applicantFullName));
            setShowModal(true);
            setTitle('Form Saved Successfully!');
            setDescription(response?.data?.responseMessage);
            setRoutePush('/merchant/home');
          } else {
            setShowModal(true);
            setTitle('Error');
            setDescription(
              response?.data?.responseDescription ||
                response?.data?.responseMessage,
            );
          }
        }
      } catch (e) {
        console.log('Error in submitting dynamic form', e);
        setShowModal(true);
        setTitle('Form Submission Failed');
        setDescription('Network failed! Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (values: any, { setSubmitting, isValid }: any) => {
    console.log('Submitted Values:', values, isValid);
    setIsSubmitting(true);
    // if(!isValid) {
    //   setShowModal(true);
    //   setTitle('Validation Check');
    //   setDescription('Please check all the field again and try again.');
    //   setRoutePush('')

    //   return;
    // }
    dispatch(setApplicationForm({}));
    dispatch(
      setApplicationForm({
        ...values,
        status: 'Completed',
      }),
    );

    setSubmitting(false);
    // Add further submission logic here

    const endpointArray = [
      {
        tab: 'application-form',
        endpoint: `/corporate/saveApplicationFormMultipleApplicants`,
        // endpoint: `/corporate/saveApplicationForm/${userData.email}`,
      },
      {
        tab: 'live-picture',
        endpoint: `/corporate/livePicture/${userData.email}`,
      },
      {
        tab: 'checklist',
        endpoint: `/corporate/checklist/${userData.email}`,
      },
      { tab: 'attachments', endpoint: `/corporate/upload/${userData.email}` },
    ];

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    const RequestRevisionEndpointArray = [
      {
        tab: 'application-form',
        endpoint: `/corporate/saveApplicationForm/${userData.email}`,
      },
      {
        tab: 'attachments',
        endpoint: `/corporate/saveCorporateDocuments/${userData.email}`,
      },
    ];

    const requestCurrentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      const {
        corporateEntity,
        corporateProducts,
        accountTitle,
        applicants,
        businessNtnNumber,
        requiredBusiness,
        chequeBookRequired,
        status,
        ...rest
      } = values;

      console.log(rest);
      let additionalValues;
      if (userData.isrequestRevision) {
        additionalValues = {
          applicant: [rest],
          addApplicants: applicantsStore,
          corporateEntity:
            businessData?.businessNature ?? corporateEntityNature,
          // corporateProducts: selectedProducts,
          isRequestRevision: '1',
          chequeBookRequired: businessData?.chequeBookRequired,
          accountTitle,
          businessNtnNumber,
          username: userData?.email,
          requiredBusiness,
          status: 'Completed',
        };
        // dispatch(setApplicants([]));
        // dispatch(setRequestRevision(false))
      } else {
        additionalValues = {
          applicant: [rest],
          addApplicants: applicantsStore,
          corporateEntity:
            businessData?.businessNature ?? corporateEntityNature,
          corporateProducts: selectedProducts,
          isRequestRevision: '0',
          chequeBookRequired: businessData?.chequeBookRequired,
          accountTitle,
          businessNtnNumber,
          username: userData?.email,
          requiredBusiness,
          status: 'Completed',
        };
      }

      console.log('additionalValues ARRAY ', additionalValues);
      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(currentEndpoint, requestBody, {
            params: { username: userData.email },
            headers: { Authorization: `Bearer ${userData.jwt}` },
          });

          console.log(response);
          if (response.data.responseCode === '000') {
            setShowModal(true);
            setTitle('Error');
            setDescription(
              response?.data.responseDescription ||
                response?.data?.responseMessage,
            );
          } else if (response.data.responseCode === '009') {
            // Navigate to the next tab after successful submission
            const nextTab = endpointArray[currentIndex + 1]?.tab;

            const requestNextTab =
              RequestRevisionEndpointArray[requestCurrentIndex + 1]?.tab;

            if (nextTab) {
              dispatch(setSoleName(values.applicantFullName));
              dispatch(setApplicants([]));
              dispatch(setApplicants(applicantsStore));

              if (userData.isrequestRevision) {
                dispatch(setApplicants([]));

                if (
                  requestNextTab &&
                  (fieldData.pages?.page?.[0]?.name ===
                    'Corporate Sole Attachments' ||
                    fieldData.pages?.page?.[1]?.name ===
                      'Corporate Sole Attachments' ||
                    fieldData.pages?.page?.[0]?.name === 'Documents' ||
                    fieldData.pages?.page?.[1]?.name === 'Documents')
                ) {
                  // dispatch(setRequestRevision(false));

                  setRequestRevisionAttachments(true);
                  router.push(
                    `/merchant/home/business-nature/${requestNextTab}`,
                  );
                } else {
                  dispatch(setRequestRevision(false));
                  setRequestRevisionAttachments(false);
                  // router.push(`/merchant/home/business-nature/${nextTab}`);

                  setTitle('Form Saved Successfully!');
                  setDescription(response?.data?.responseMessage);
                  setShowModal(true);
                  setRoutePush('/merchant/home');
                }

                // setRoutePush(`/merchant/home`)
                // router.push(`/merchant/home`);
              } else {
                router.push(`/merchant/home/business-nature/${nextTab}`);
              }
              // router.push(`/merchant/home/business-nature/${nextTab}`);
            } else {
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
          } else {
            setShowModal(true);
            setTitle('Form Submission Failed');
            setDescription('Network failed! Please try again later.');
          }
        }
      } catch (e) {
        console.log('Error in submitting dynamic form', e);
        setShowModal(true);
        setTitle('Form Submission Failed');
        setDescription('Network failed! Please try again later.');
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={routePush}
        // routeName="/merchant/home"
      />
      <Formik
        initialValues={appInitialValuesState}
        // initialValues={ApplicationFormInfoInitialValues}

        validationSchema={validationSchemaState}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <div className="flex flex-col gap-6 pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {pageTitle}
              </div>

              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
                  {filteredData?.map(
                    (pageItem) => (
                      // pageItem.name === "Business Details" && (
                      <React.Fragment key={pageItem.name}>
                        {[...pageItem.categories]
                          .sort((a, b) => a.priority - b.priority) // Sort the categories array by item.priority
                          .map((item, itemIndex) => (
                            <FormLayoutDynamic
                              key={itemIndex}
                              heading={item.categoryName}
                            >
                              {[...item.fields]
                                .sort((a, b) => a.priority - b.priority) // Sort fields within the item by field.priority
                                .map((field, fieldIndex) => {
                                  if (field?.type === 'text') {
                                    return (
                                      <Input
                                        key={fieldIndex}
                                        asterik={field.validation.required}
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        error={field.validation.errorMessage}
                                        placeholder={field?.placeholder}
                                      />
                                    );
                                  }

                                  if (field?.type === 'dropDownList') {
                                    return (
                                      <DropdownNew
                                        key={fieldIndex}
                                        asterik={field.validation.required}
                                        label={field.label}
                                        name={field.name}
                                        options={field.validation?.options?.map(
                                          (option: string) => ({
                                            label: option,
                                            value: option
                                              .toLowerCase()
                                              .replace(/\s+/g, ''),
                                          }),
                                        )}
                                        formik={formik}
                                        error={field.validation.errorMessage}
                                      />
                                    );
                                  }

                                  if (field?.type === 'dropDown') {
                                    return (
                                      <DropdownInput
                                        key={fieldIndex}
                                        asterik={field.validation.required}
                                        label={field.label}
                                        name={field.name}
                                        options={field.validation?.options?.map(
                                          (option: string) => ({
                                            label: option,
                                            value: option
                                              .toLowerCase()
                                              .replace(/\s+/g, ''),
                                          }),
                                        )}
                                        formik={formik}
                                        error={field.validation.errorMessage}
                                      />
                                    );
                                  }

                                  if (field?.type === 'date') {
                                    return (
                                      <DateInputNew
                                        key={fieldIndex}
                                        asterik={field.validation.required}
                                        formik={formik}
                                        label={field.label}
                                        name={field.name}
                                        error={field.validation.errorMessage}
                                      />
                                    );
                                  }

                                  return (
                                    <p key={fieldIndex}>nothing to show</p>
                                  );
                                })}
                            </FormLayoutDynamic>
                          ))}
                      </React.Fragment>
                    ),
                    // )
                  )}
                </div>
              </div>
            </Form>
            {corporateEntityNature !== 'Sole-Proprietorship' &&
              !userData.isrequestRevision && (
                <>
                  <AddApplicant onDataChange={saveApplicantParent} />
                </>
              )}

            {userData?.isrequestRevision && requestRevisionAttachments ? (
              <></>
            ) : (
              <FormLayoutDynamic heading={`Declaration`}>
                <div className="flex flex-col items-start justify-center gap-4">
                  {/* <div className="text-base font-semibold leading-tight text-secondary-base">
                  Terms & Conditions
                </div> */}
                  <div className="bg-neutral-white-base p-6">
                    <div className="text-xs leading-tight text-secondary-base">
                      I hereby confirm that the information provided above is
                      true, accurate and complete. Subject to applicable local
                      laws, I hereby consent for Telenor Microfinance Bank Ltd.
                      Or any of its affiliates, subsidiaries (including
                      branches/branchless) (Collectively "the Bank") to share my
                      information with domestic or overseas regulators or tax
                      authorities where necessary to establish my tax liability
                      in any Jurisdiction. Where required by domestic or
                      overseas regulators or tax authorities consent and agree
                      that the Bank may withhold from my account(s) such amounts
                      as may be required according to applicable laws,
                      regulations and directives. I undertake to notify the Bank
                      within 30 calendar days if there is a change in any
                      information which I have provided to the Bank
                    </div>
                  </div>
                  <CheckboxItem
                    description="I agree to easypaisa Terms & Conditions"
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </FormLayoutDynamic>
            )}

            {/* <FormLayoutDynamic heading={`Declaration`}>
              <div className="flex flex-col items-start justify-center gap-4">
               
                <div className="bg-neutral-white-base p-6">
                  <div className="text-xs leading-tight text-secondary-base">
                    I hereby confirm that the information provided above is
                    true, accurate and complete. Subject to applicable local
                    laws, I hereby consent for Telenor Microfinance Bank Ltd. Or
                    any of its affiliates, subsidiaries (including
                    branches/branchless) (Collectively "the Bank") to share my
                    information with domestic or overseas regulators or tax
                    authorities where necessary to establish my tax liability in
                    any Jurisdiction. Where required by domestic or overseas
                    regulators or tax authorities consent and agree that the
                    Bank may withhold from my account(s) such amounts as may be
                    required according to applicable laws, regulations and
                    directives. I undertake to notify the Bank within 30
                    calendar days if there is a change in any information which
                    I have provided to the Bank
                  </div>
                </div>
                <CheckboxItem
                  description="I agree to easypaisa Terms & Conditions"
                  isChecked={isChecked}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </FormLayoutDynamic> */}

            <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
              {!userData.isrequestRevision &&
                applicationFormStatus !== 'Completed' && (
                  <Button
                    label={`Save & Continue Later`}
                    isDisabled={isSubmitting}
                    onClickHandler={async () => saveAndContinue(formik.values)}
                    type="button"
                    className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                )}
              <Button
                label={`Next`}
                type="button"
                isDisabled={!isChecked || isSubmitting}
                onClickHandler={async () => {
                  await formik.validateForm().then((formErrors) => {
                    console.log('FORM ERRORSS ', formErrors);

                    if (Object.keys(formErrors).length > 0) {
                      setShowModal(true);
                      setTitle('Validation Check');
                      setDescription(
                        'Please check all the field again and try again.',
                      );
                      setRoutePush('');
                    }

                    // else{
                    //   formik.handleSubmit();
                    // }
                  });

                  formik.handleSubmit();
                }}
                className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ApplicationFormStatic;
