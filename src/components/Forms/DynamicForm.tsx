// "use client";

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import Input from '@/components/UI/Inputs/Input';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import type { ActivityFormInfo } from '@/interfaces/interface';
// import { setActivityForm } from '@/redux/features/formSlices/onBoardingForms';
// import { responseFields } from '@/utils/data';
// import { generateMD5Hash } from '@/utils/helper';
// import {
//   ActivityFormInfoInitialValues,
//   ActivityFormInfoSchema,
// } from '@/validations/merchant/onBoarding/activityInfo';

// import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import AddStore from './AddStore';
// import DateInputNew from '../UI/Inputs/DateInputNew';
// import CheckboxItem from '../UI/Inputs/CheckboxItem';
// import CheckboxInput from '../UI/Inputs/CheckboxInput';
// import FileInput from '../UI/Inputs/FileInput';

// function DynamicForm() {
//   // const data = responseFields;
//   const userData = useAppSelector((state: any) => state.auth);
//   const { apiSecret } = userData;
//   const data: FieldsData = useAppSelector((state: any) => state.fields);
//   // console.log(data.pages.page, "Field Data from Dynamic form");

//   // console.log(data, "DATAAAA FIELDS");

//   const formData = new FormData();

//   useEffect(() => {
//     const initialValues: { [key: string]: any } = {};
//     if (currentTab) {
//       const title = convertSlugToTitle(currentTab);
//       setPageTitle(title);
//       console.log(title, "TITLE SLUG", currentTab, "Curren Tab");
//       const fData = data.pages.page.filter((item) => {
//         console.log(item.name, "ITEM NAME");
//         return convertSlugToTitle(item.name) === title;
//       });
//       setFilteredData(fData);

//       fData?.forEach((item) => {
//         // if (item.name === "Activity Information") {
//         item.categories.forEach((category) => {
//           category.fields.forEach((field) => {
//             if (field?.type === "checkItem") {
//               return;
//             }
//             initialValues[field.name] = "";
//           });
//         });
//         setInitialValuesState(initialValues);
//         // }
//       });
//       const validationSchema = buildValidationSchema(fData);
//       console.log("Vaidation schema result", validationSchema);

//       setValidationSchemaState(validationSchema);
//     }
//   }, [currentTab]);

//   if (!initialValuesState || !validationSchemaState || !filteredData) {
//     return <div>Loading...</div>; // or a loader/spinner
//   }

//   console.log(filteredData, "filteredData", pageTitle, "PAGE TITLE STATE");

//   // console.log(
//   //   initialValuesState,
//   //   "INITIAL VALUESssssssssssssssss",
//   //   validationSchemaState,
//   //   "Validation schema state"
//   // );

//   const handleCheckboxChange = () => {
//     setChecked(!isChecked);
//   };

//   const onSubmit = async (
//     values: { [key: string]: any },
//     { setSubmitting }: any
//   ) => {
//     // if (selectedCheckValue) {
//     //   if (selectedCheckValue === 'Bank Account') {

//     //   }
//     // }

//     console.log("Dynamic Form Values after submitting:", values);
//     // if (currentTab === "activity-information") {
//     //   try {
//     //     const response = await apiClient.post(
//     //       `/merchant/activity/${userData.email}`,
//     //       values
//     //     );
//     //   } catch (e) {
//     //     console.log("Error in submitting dynamic form", e);
//     //   }
//     // } else if (currentTab === "business-details") {
//     //   try {
//     //     const response = await apiClient.post(
//     //       `/merchant/businessdetails/${userData.email}`,
//     //       values
//     //     );
//     //   } catch (e) {
//     //     console.log("Error in submitting dynamic form", e);
//     //   }
//     // } else if (currentTab === "settlement-details") {
//     //   try {
//     //     const response = await apiClient.post(
//     //       `/merchant/settlementdetails/${userData.email}`,
//     //       values
//     //     );
//     //   } catch (e) {
//     //     console.log("Error in submitting dynamic form", e);
//     //   }
//     // }
//  const endpointArray = [
//       {
//         tab: "activity-information",
//         endpoint: `/merchant/activity/${userData.email}`,
//       },
//       {
//         tab: "business-details",
//         endpoint: `/merchant/businessdetails/${userData.email}`,
//       },
//       {
//         tab: "settlement-details",
//         endpoint: `/merchant/settlementdetails/${userData.email}`,
//       },
//       {
//         tab: "integration",
//         endpoint: `/merchant/integration/${userData.email}`,
//       },
//       { tab: "attachments", endpoint: `/merchant/upload/${userData.email}` },
//     ];

//     const currentIndex = endpointArray.findIndex(
//       (item) => item.tab === currentTab
//     );

//     if (currentIndex !== -1) {
//       console.log(currentIndex, "TESTTTTT CURRENT INDEX");
//       if (currentIndex === 4) {
//         const arrayValues = [values];
//         console.log(arrayValues, "Array values");

//         Object.keys(values).forEach((key) => {
//           if (values[key]) {
//             formData.append("files", values[key]);
//           }
//         });

//         // Add additional data to formData
//         formData.append("status", "Completed");
//         // formData.append("status", "Completed");

//         const response: any = await apiClient.post(
//           `merchant/upload/${userData.email}`,
//           formData,
//           {
//             headers: { Authorization: `Bearer ${userData.jwt}` },
//           }
//         );
//         return;
//       }
//       const currentEndpoint = endpointArray[currentIndex].endpoint;
//       const additionalValues = {
//         ...values,
//         managerMobile: userData?.managerMobile,
//         businessNature: "partnership",
//         status: "Completed",
//       };
//       const mdRequest = {
//         ...additionalValues,
//         apisecret: apiSecret,
//       };

//       const md5Hash = generateMD5Hash(mdRequest);
//       try {
//         const response = await apiClient.post(
//           currentEndpoint,
//           {
//             request: additionalValues,
//             signature: md5Hash,
//           },
//           {
//             headers: { Authorization: `Bearer ${userData.jwt}` },
//           }
//         );

//         // Navigate to the next tab after successful submission
//         const nextTab = endpointArray[currentIndex + 1]?.tab;
//         if (nextTab) {
//           router.push(`/merchant/home/business-nature/${nextTab}`);
//         } else {
//           console.log("Form submission completed, no more tabs to navigate.");
//         }
//       } catch (e) {
//         console.log("Error in submitting dynamic form", e);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//     // setSubmitting(false);
//   };

//   return (
//     <div>
//       <AddStore />
//       <Formik
//         initialValues={initialValuesState}
//         // validationSchema={validationSchemaState}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form className="flex flex-col gap-5">
//             <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
//               {pageTitle}
//             </div>

//             <div className="flex flex-col justify-end gap-9">
//               <div className="flex flex-col gap-6">
//                 {filteredData?.map(
//                   (pageItem) => (
//                     // pageItem.name === "Business Details" && (
//                     <React.Fragment key={pageItem.name}>
//                       {pageItem.categories.map((item, itemIndex) => (
//                         <FormLayoutDynamic
//                           key={itemIndex}
//                           heading={item.categoryName}
//                         >
//                           {item?.fields
//                             .sort((a, b) => a.priority - b.priority)
//                             .map((field, fieldIndex) => {
//                               console.log(
//                                 "FILEDDDD TYPEEE ERRROOORRRRR",
//                                 field
//                               );

//                               return field?.type === "text" ? (
//                                 <Input
//                                   key={fieldIndex}
//                                   label={field.label}
//                                   name={field.name}
//                                   type={field.type}
//                                   error={field.validation.errorMessage}
//                                 />
//                               ) : field?.type === "dropDown" ? (
//                                 <DropdownInput
//                                   key={fieldIndex} // Add a key prop to DropdownInput as well
//                                   label={field.label}
//                                   name={field.name}
//                                   options={field.validation?.options}
//                                   formik={formik}
//                                   error={field.validation.errorMessage}
//                                 />
//                               ) : field?.type === "date" ? (
//                                 <DateInputNew
//                                   label={field.label}
//                                   name={field.name}
//                                 />
//                               ) : field?.type === "checkItem" ? (
//                                 <CheckboxItem
//                                   description={field.label}
//                                   isChecked={isChecked}
//                                   handleCheckboxChange={handleCheckboxChange}
//                                 />
//                               ) : field?.type === "checkBoxInput" ? (
//                                 <CheckboxInput
//                                   name={field.name}
//                                   options={field.validation.options}
//                                   form={formik}
//                                   setSelectedCheckValue={setSelectedCheckValue}
//                                 />
//                               ) : field?.type === "file" ? (
//                                 <FileInput
//                                   key={field.name}
//                                   selectedFiles={selectedFiles}
//                                   setSelectedFiles={setSelectedFiles}
//                                   index={fieldIndex}
//                                   formik={formik}
//                                   item={field}
//                                 />
//                               ) : (
//                                 <p key={fieldIndex}>nothing to show</p>
//                               );
//                             })}
//                         </FormLayoutDynamic>
//                       ))}
//                     </React.Fragment>
//                   )
//                   // )
//                 )}
//               </div>
//               <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
//                 <Button
//                   label="Save & Continue Later"
//                   type="button"
//                   className="button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300"
//                 />
//                 <Button
//                   label="Next"
//                   type="submit"
//                   className="button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300"
//                 />
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default DynamicForm;
