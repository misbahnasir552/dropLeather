// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from '@/components/UI/Headings/H6';
// import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from '@/components/UI/Wrappers/FormLayout';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type { BusinessFormInfo } from '@/interfaces/interface';
// import { setBusinessForm } from '@/redux/features/formSlices/onBoardingForms';
// import { generateMD5Hash } from '@/utils/helper';
// import {
//   businessInfoSchema,
//   GetBusinessDetails,
// } from '@/validations/merchant/onBoarding/businessInfo';

// const checkboxData: any = [
//   {
//     label: 'Mobile Account',
//     value: 'Mobile Account',
//   },
//   {
//     label: 'Debit/Credit Card',
//     value: 'Debit/Credit Card',
//   },
//   {
//     label: 'Easypaisa shop',
//     value: 'Easypaisa shop',
//   },
//   {
//     label: 'QR',
//     value: 'QR',
//   },
//   {
//     label: 'TILL',
//     value: 'TILL',
//   },
//   {
//     label: 'Direct Debit',
//     value: 'Direct Debit',
//   },
// ];

// const BusinessDetailsStatic = () => {
//   const [selectedCheckValue, setSelectedCheckValue] = useState()
//   const userData = useAppSelector((state: any) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { apiSecret } = userData;

//   const BusinessInfoInitialValues = GetBusinessDetails();
//   const onSubmit = async (values: BusinessFormInfo, { setSubmitting }: any) => {
//     console.log(values, 'Business Form Information');
//     try {
//       const req = {
//         managerMobile: userData.managerMobile,
//         businessDocumentationType: values.businessDocumentationType,
//         merchantCategory: values.merchantCategory,
//         businessMode: values.businessMode,
//         establishedSince: values.establishedSince,
//         paymentModes: values.paymentModesRequired,
//         businessType: values.businessType,
//         isBusinessRegistered: values.isBusinessRegistered,
//         specialCustomer: values.isSpecialCustomer,
//         natureOfActivity: values.natureOfActivity,
//         incomeFromSalary: values.isIncomeFromSalary,
//         currentDailyTransactions: values.currentDailyTransactionsInPkr,
//         associationToHighRiskBusiness: values.associationToHighRiskBusiness,
//         sourceOfFunds: values.sourceOfFunds,
//         currentMonthlyTransactions: values.currentMonthlyTransactionsInPkr,
//         expectedNoOfTransactionMonth: values.expectedNumberOfTransactions,
//         expectedSalesVolumeMonth: values.expectedSalesVolume,
//         status: 'Completed',
//       };
//       const mdRequest = {
//         ...req,
//         apisecret: apiSecret,
//       };
//       const md5Hash = generateMD5Hash(mdRequest);

//       dispatch(setBusinessForm(values));
//       const response: any = await apiClient.post(
//         `merchant/businessdetails/${userData.email}`,
//         {
//           request: req,
//           signature: md5Hash,
//         },
//         { headers: { Authorization: `Bearer ${userData.jwt}` } },
//       );
//       if (response.data.responseCode === '009') {
//         console.log(response, 'Business Information');
//         dispatch(setBusinessForm(values));
//         // setActiveStep((prev: any) => prev + 1);
//         router.push('?activeTab=additional-information');
//       } else {
//         console.log('Data submission failure');
//       }
//     } catch (e) {
//       router.push('/login');
//       console.log(e, 'Error');
//     }
//     // setActiveStep((prev: any) => prev + 1);
//     setSubmitting(false);
//   };
//   // console.log(checkboxData);
//   return (
//     <div>
//       <Formik
//         initialValues={BusinessInfoInitialValues}
//         validationSchema={businessInfoSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <div className="flex flex-col pb-[120px]">
//             <Form className="flex flex-col gap-5">
//               <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//                 {" "}
//                 BUSINESS DETAILS{" "}
//               </div>
//               <div className="flex flex-col gap-9">
//                 <div className="flex flex-col gap-6">
//                   <FormWrapper>
//                     {/* <div className="flex w-full flex-col gap-4"> */}
//                     <H6>Business Particulars</H6>
//                     <DropdownInput
//                       label="Business Documentation Type"
//                       name="businessDocumentationType"
//                       options={[
//                         { value: "Sole Proprietor", text: "Sole Proprietor" },
//                         {
//                           value: "Public and Private Ltd",
//                           text: "Public and Private Ltd",
//                         },
//                         { value: "Partnership", text: "Partnership" },
//                         { value: "Trusts", text: "Trusts" },
//                         {
//                           value: "Clubs, Societies, Associations",
//                           text: "Clubs, Societies, Associations",
//                         },
//                         {
//                           value: "NGO, NPO, Charities",
//                           text: "NGO, NPO, Charities",
//                         },
//                         {
//                           value: "Other",
//                           text: "Other",
//                         },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.businessDocumentationType}
//                       touched={formik.touched.businessDocumentationType}
//                     />
//                     <DropdownInput
//                       label="Merchant Category"
//                       name="merchantCategory"
//                       options={[
//                         { value: "Male", text: "M" },
//                         { value: "Female", text: "F" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.merchantCategory}
//                       touched={formik.touched.merchantCategory}
//                     />
//                     <DropdownInput
//                       label="Business Mode"
//                       name="businessMode"
//                       options={[
//                         { value: "RetailPayment", text: "Retail Payment" },
//                         { value: "OnlinePayment", text: "Online Payment" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.businessMode}
//                       touched={formik.touched.businessMode}
//                     />
//                     <Input
//                       label="Established Since"
//                       name="establishedSince"
//                       type="text"
//                       error={formik.errors.establishedSince}
//                       touched={formik.touched.establishedSince}
//                     />
//                     {/* </div> */}
//                   </FormWrapper>
//                   <FormWrapper>
//                     <div className="flex w-full flex-col items-start justify-between gap-4">
//                       <H6>
//                         Payment Modes Required{" "}
//                         <span className="font-normal leading-tight text-secondary-500">
//                           (Select All that are required)
//                         </span>
//                       </H6>
//                       <CheckboxInput
//                         setSelectedCheckValue={setSelectedCheckValue}
//                         name="paymentModesRequired"
//                         options={checkboxData}
//                         form={formik}
//                         isMulti={true}
//                       />
//                     </div>
//                   </FormWrapper>
//                   <FormWrapper>
//                     <H6>
//                       Business Type{" "}
//                       <span className="font-normal leading-tight text-secondary-500">
//                         (Sole Proprietor only)
//                       </span>
//                     </H6>
//                     <DropdownInput
//                       label="Business Type"
//                       name="businessType"
//                       options={[
//                         { value: "Male", text: "M" },
//                         { value: "Female", text: "F" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.businessType}
//                       touched={formik.touched.businessType}
//                     />
//                     <DropdownInput
//                       label="Is your business registered?"
//                       name="isBusinessRegistered"
//                       options={[
//                         { value: "Yes", text: "Yes" },
//                         { value: "No", text: "No" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.isBusinessRegistered}
//                       touched={formik.touched.isBusinessRegistered}
//                     />
//                     <DropdownInput
//                       label="Special Customer?"
//                       name="isSpecialCustomer"
//                       options={[
//                         { value: "Yes", text: "Yes" },
//                         { value: "No", text: "No" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.isSpecialCustomer}
//                       touched={formik.touched.isSpecialCustomer}
//                     />
//                     <Input
//                       label="Nature of Activity"
//                       name="natureOfActivity"
//                       type="text"
//                       error={formik.errors.natureOfActivity}
//                       touched={formik.touched.natureOfActivity}
//                     />
//                   </FormWrapper>
//                   <FormWrapper>
//                     <H6>Customer Details</H6>
//                     <DropdownInput
//                       label="Do you get an income from salary?"
//                       name="isIncomeFromSalary"
//                       options={[
//                         { value: "Yes", text: "Yes" },
//                         { value: "No", text: "No" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.isIncomeFromSalary}
//                       touched={formik.touched.isIncomeFromSalary}
//                     />
//                     <Input
//                       label="Current Daily Transactions (in PKR)"
//                       name="currentDailyTransactionsInPkr"
//                       type="text"
//                       error={formik.errors.currentDailyTransactionsInPkr}
//                       touched={formik.touched.currentDailyTransactionsInPkr}
//                     />
//                     <DropdownInput
//                       label="Association to High Risk Business "
//                       name="associationToHighRiskBusiness"
//                       options={[
//                         {
//                           value: "HighRiskBusiness/Person",
//                           text: "High Risk Business / Person",
//                         },
//                         {
//                           value: "MediumRiskBusiness/Person",
//                           text: "Medium Risk Business / Person",
//                         },
//                         {
//                           value: "LowRiskBusiness/Person",
//                           text: "Low Risk Business / Person",
//                         },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.associationToHighRiskBusiness}
//                       touched={formik.touched.associationToHighRiskBusiness}
//                     />
//                     <DropdownInput
//                       label="Source of Funds"
//                       name="sourceOfFunds"
//                       options={[
//                         { value: "Male", text: "M" },
//                         { value: "Female", text: "F" },
//                       ]}
//                       formik={formik}
//                       error={formik.errors.sourceOfFunds}
//                       touched={formik.touched.sourceOfFunds}
//                     />
//                     <Input
//                       label="Current Monthly Transactions (in PKR)"
//                       name="currentMonthlyTransactionsInPkr"
//                       type="text"
//                       error={formik.errors.currentDailyTransactionsInPkr}
//                       touched={formik.touched.currentDailyTransactionsInPkr}
//                     />
//                   </FormWrapper>
//                   <FormWrapper>
//                     <H6>Transaction Activity</H6>
//                     <Input
//                       label="Expected No. of Transactions per Month"
//                       name="expectedNumberOfTransactions"
//                       type="text"
//                       error={formik.errors.currentMonthlyTransactionsInPkr}
//                       touched={formik.touched.currentMonthlyTransactionsInPkr}
//                     />
//                     <Input
//                       label="Expected Sales Volume per Month"
//                       name="expectedSalesVolume"
//                       type="text"
//                       error={formik.errors.expectedSalesVolume}
//                       touched={formik.touched.expectedSalesVolume}
//                     />
//                   </FormWrapper>
//                 </div>
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
//               {/* <FormControlButtons /> */}
//             </Form>
//           </div>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default BusinessDetailsStatic;
