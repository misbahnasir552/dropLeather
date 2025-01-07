// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// import apiClient from '@/api/apiClient';
// import B1 from '@/components/UI/Body/B1';
// import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from '@/components/UI/Headings/H6';
// import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
// import Input from '@/components/UI/Inputs/Input';
// import FormWrapper from '@/components/UI/Wrappers/FormLayout';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type { ICheckboxData } from '@/interfaces/interface';
// import { setSettlementForm } from '@/redux/features/formSlices/onBoardingForms';
// import { generateMD5Hash } from '@/utils/helper';
// import {
//   SettlementFormInfoInitialValues,
//   SettlementFormInfoSchema,
// } from '@/validations/merchant/onBoarding/settlementInfo';

// const checkboxData: ICheckboxData[] = [
//   {
//     label: 'Telenor Microfinance Bank',
//     value: 'telenorMicrofinanceBank',
//   },
//   {
//     label: 'Bank Account',
//     value: 'bankAccount',
//   },
// ];
// const SettlementDetailsStatic = () => {
//   const userData = useAppSelector((state: any) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   // const [showFields, setShowFields] = useState<boolean>(false);
//   // const apiSecret =
//   //   '2715885d7239fb6fca0ea95134175dbb85262739d28345449dde2d9d33b2ff70';

//   const onSubmit = async (values: any, { setSubmitting }: any) => {
//     console.log(values, "Settlement Form Information");
//     const req = {
//       managerMobile: userData.managerMobile,
//       account: values.accounts,
//       bankName: values.bankName,
//       accountNumber: values.accountNumber,
//       accountTitle: values.accountTitle,
//       status: "Completed",
//     };

//     const mdRequest = {
//       ...req,
//       apisecret: userData.apiSecret,
//     };

//     const md5Hash = generateMD5Hash(mdRequest);
//     try {
//       const response: any = await apiClient.post(
//         `merchant/settlementdetails/${userData.email}`,
//         {
//           request: req,
//           signature: md5Hash,
//           // account: values.accounts,
//           // status: 'Completed',
//         },
//         { headers: { Authorization: `Bearer ${userData.jwt}` } }
//       );
//       if (response.data.responseCode === "009") {
//         console.log(response, "Settlement Information successfully hit");
//         dispatch(setSettlementForm(values));
//         router.push("?activeTab=integration-information");

//         // setActiveStep((prev: any) => prev + 1);
//       } else {
//         console.log("Data submission failure");
//       }
//     } catch (e) {
//       // router.push("/login");
//       console.log(e, "Error");
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={SettlementFormInfoInitialValues}
//         validationSchema={SettlementFormInfoSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <div className="flex flex-col">
//             <Form className="flex flex-col gap-5">
//               <div className="hidden px-[24px] pb-[4px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//                 {" "}
//                 SETTLEMENT DETAILS{" "}
//               </div>
//               <div className="flex flex-col gap-9">
//                 <div className="flex flex-col gap-6">
//                   <FormWrapper>
//                     <H6>
//                       Settlement Details
//                       <B1> (Select the account you would like to have)</B1>
//                     </H6>

//                     <div className="flex flex-col gap-4">
//                       <CheckboxInput
//                         name="accounts"
//                         options={checkboxData}
//                         form={formik}
//                       />
//                       {formik.values.accounts === "bankAccount" && (
//                         <>
//                           <Input label="Bank Name" name="bankName" />
//                           <Input label="Account Number" name="accountNumber" />
//                           <Input label="Account Title" name="accountTitle" />
//                         </>
//                       )}
//                     </div>
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
// };

// export default SettlementDetailsStatic;
