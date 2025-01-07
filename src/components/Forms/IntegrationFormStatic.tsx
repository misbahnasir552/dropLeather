// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from '@/components/UI/Headings/H6';
// import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
// import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from '@/components/UI/Wrappers/FormLayout';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type {
//   ICheckboxData,
//   IntegrationFormInfo,
// } from '@/interfaces/interface';
// import { setIntegrationForm } from '@/redux/features/formSlices/onBoardingForms';
// import { generateMD5Hash } from '@/utils/helper';
// import {
//   IntegrationFormInfoInitialValues,
//   IntegrationFormInfoSchema,
// } from '@/validations/merchant/onBoarding/integrationInfo';

// const methodCheckboxData: ICheckboxData[] = [
//   {
//     value: 'plugin',
//     label: 'Plugin',
//   },
//   {
//     value: 'api',
//     label: 'API',
//   },
// ];

// const checkboxData: any = [
//   {
//     value: 'website',
//     label: 'Your Website',
//   },
//   {
//     value: 'fbPage',
//     label: 'Your Facebook Page',
//   },
// ];

// function IntegrationFormStatic() {
//   const userData = useAppSelector((state: any) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const onSubmit = async (
//     values: IntegrationFormInfo,
//     { setSubmitting }: any,
//   ) => {
//     const req = {
//       managerMobile: userData.managerMobile,
//       integrationMethod: values.integrationPlatform,
//       integrationMode: values.integrationMethod,
//       fullName: values.fullName,
//       emailAddress: values.emailAddress,
//       mobileNumber: values.mobileNumber,
//       status: 'Completed',
//     };

//     const mdRequest = {
//       ...req,
//       apisecret: userData.apiSecret,
//     };

//     const md5Hash = generateMD5Hash(mdRequest);
//     console.log('values', values);
//     try {
//       const response: any = await apiClient.post(
//         `merchant/integration/${userData.email}`,
//         {
//           request: req,
//           signature: md5Hash,
//         },
//         {
//           headers: { Authorization: `Bearer ${userData.jwt}` },
//         },
//       );
//       if (response.data.responseCode === '009') {
//         console.log(response, 'Integration Information successfully hit');
//         dispatch(setIntegrationForm(values));
//         // setActiveStep((prev: any) => prev + 1);
//         router.push('?activeTab=attachments-information');
//       } else {
//         console.log('Data submission failure');
//       }
//     } catch (e) {
//       console.log(e, 'Error in submitting Integration Form');
//     }
//     setSubmitting(false);
//   };
//   return (
//     <div>
//       <Formik
//         initialValues={IntegrationFormInfoInitialValues}
//         validationSchema={IntegrationFormInfoSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <div className="flex flex-col pb-[120px]">
//             <Form className="flex flex-col gap-5">
//               <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//                 {' '}
//                 INTEGRATION{' '}
//               </div>
//               <div className="flex flex-col gap-9">
//                 <div className="flex flex-col gap-6">
//                   <FormWrapper>
//                     <H6>
//                       Integration Methods{' '}
//                       <span className="font-normal leading-tight text-secondary-500">
//                         (What would you like to integrate)
//                       </span>
//                     </H6>
//                     <CheckboxInput
//                       name="integrationPlatform"
//                       options={checkboxData}
//                       form={formik}
//                       // isMulti={true}
//                     />
//                   </FormWrapper>
//                   <FormWrapper>
//                     <H6>
//                       Integration Methods{' '}
//                       <span className="font-normal leading-tight text-secondary-500">
//                         (Select your mode of integration)
//                       </span>
//                     </H6>
//                     <CheckboxInput
//                       name="integrationMethod"
//                       options={methodCheckboxData}
//                       form={formik}
//                       // isMulti={true}
//                     />
//                     {/* {checkboxDataMethods.map((checkBox, index) => (
//                   <CheckboxInput {...checkBox} key={index} />
//                 ))} */}
//                   </FormWrapper>

//                   <FormWrapper>
//                     <H6>Developer’s Details</H6>
//                     <Input
//                       label="Full Name"
//                       name="fullName"
//                       type="text"
//                       error={formik.errors.fullName}
//                       touched={formik.touched.fullName}
//                     />
//                     <Input
//                       label="Email"
//                       name="emailAddress"
//                       type="text"
//                       error={formik.errors.emailAddress}
//                       touched={formik.touched.emailAddress}
//                     />
//                     <Input
//                       label="Mobile Number"
//                       name="mobileNumber"
//                       type="text"
//                       error={formik.errors.mobileNumber}
//                       touched={formik.touched.mobileNumber}
//                     />
//                   </FormWrapper>
//                 </div>
//                 {/* <FormControlButtons /> */}
//                 <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
//                   <Button
//                     label={`Save & Continue Later`}
//                     // onClickHandler={() =>
//                     //   saveAndContinue(
//                     //     formik.values,
//                     //     formik.setSubmitting,
//                     //     formik.validateForm,
//                     //   )
//                     // }
//                     type="button"
//                     className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                   />
//                   <Button
//                     label={`Next`}
//                     type="submit"
//                     className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                   />
//                 </div>
//               </div>
//             </Form>
//           </div>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default IntegrationFormStatic;
