// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// import apiClient from '@/api/apiClient';
// import Button from '@/components/UI/Button/PrimaryButton';
// // import H6 from '@/components/UI/Headings/H6';
// import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
// import Input from '@/components/UI/Inputs/Input';
// // import FormWrapper from '@/components/UI/Wrappers/FormLayout';
// import { useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
// // import type {
// //   ICheckboxData,
// //   // IntegrationFormInfo,
// // } from '@/interfaces/interface';
// // import { setIntegrationForm } from '@/redux/features/formSlices/onBoardingForms';
// import { generateMD5Hash } from '@/utils/helper';

// import DropdownInput from '../UI/Inputs/DropdownInput';
// import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import { buildValidationSchema } from './validations/helper';
// // import {
// //   IntegrationFormInfoInitialValues,
// //   IntegrationFormInfoSchema,
// // } from '@/validations/merchant/onBoarding/integrationInfo';
// import type { FieldsData, Page } from './validations/types';

// // const methodCheckboxData: ICheckboxData[] = [
// //   {
// //     value: 'plugin',
// //     label: 'Plugin',
// //   },
// //   {
// //     value: 'api',
// //     label: 'API',
// //   },
// // ];

// // const checkboxData: any = [
// //   {
// //     value: 'website',
// //     label: 'Your Website',
// //   },
// //   {
// //     value: 'fbPage',
// //     label: 'Your Facebook Page',
// //   },
// // ];

// function IntegrationForm() {
//   const userData = useAppSelector((state: any) => state.auth);
//   const { apiSecret } = userData;
//   const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
//   // const dispatch = useAppDispatch();
//   const [filteredData, setFilteredData] = useState<Page[]>();
//   const [pageTitle, setPageTitle] = useState('');
//   //  const [selectedCheckValue, setSelectedCheckValue] = useState();
//   const [selectedCheckValue, setSelectedCheckValue] = useState<
//     string | undefined | string[]
//   >(undefined);
//   const [initialValuesState, setInitialValuesState] = useState<any>();
//   const [validationSchemaState, setValidationSchemaState] = useState<any>();
//   const router = useRouter();
//   const { currentTab } = useCurrentTab();
//   console.log('FIELDSSS DATA INTEGRATION', fieldData);
//   console.log('FILTERED INTEGRATION', filteredData);

//   console.log('selected value checkbox input', selectedCheckValue);

//   useEffect(() => {
//     const initialValues: { [key: string]: any } = {};
//     if (currentTab) {
//       const title = convertSlugToTitle(currentTab);
//       setPageTitle(title);
//       console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
//       const fData = fieldData.pages?.page.filter((item) => {
//         console.log(item.name, 'ITEM NAME');
//         return convertSlugToTitle(item.name) === title;
//       });
//       setFilteredData(fData);

//       fData?.forEach((item) => {
//         // if (item.name === "Activity Information") {
//         item.categories.forEach((category) => {
//           category.fields.forEach((field) => {
//             if (field?.type === 'checkItem') {
//               return;
//             }
//             initialValues[field.name] = '';
//           });
//         });
//         setInitialValuesState(initialValues);
//         // }
//       });
//       const validationSchema = buildValidationSchema(fData);
//       // console.log('Vaidation schema result', validationSchema);

//       setValidationSchemaState(validationSchema);
//     }
//   }, [currentTab]);

//   if (!initialValuesState || !validationSchemaState || !filteredData) {
//     return <div>Loading...</div>; // or a loader/spinner
//   }

//   const onSubmit = async (
//     values: { [key: string]: any },
//     { setSubmitting }: any,
//   ) => {
//     const endpointArray = [
//       {
//         tab: 'activity-information',
//         endpoint: `/merchant/activity/${userData.email}`,
//       },
//       {
//         tab: 'business-details',
//         endpoint: `/merchant/businessdetails/${userData.email}`,
//       },
//       {
//         tab: 'settlement-details',
//         endpoint: `/merchant/settlementdetails/${userData.email}`,
//       },
//       {
//         tab: 'integration',
//         endpoint: `/merchant/integration/${userData.email}`,
//       },
//       { tab: 'attachments', endpoint: `/merchant/upload/${userData.email}` },
//     ];

//     const currentIndex = endpointArray.findIndex(
//       (item) => item.tab === currentTab,
//     );

//     if (currentIndex !== -1) {
//       const currentEndpoint = endpointArray[currentIndex]?.endpoint;
//       const additionalValues = {
//         ...values,
//         managerMobile: userData?.managerMobile,
//         businessNature: 'partnership',
//         status: 'Completed',
//       };
//       const mdRequest = {
//         ...additionalValues,
//         apisecret: apiSecret,
//       };

//       const md5Hash = generateMD5Hash(mdRequest);
//       try {
//         if (currentEndpoint) {
//           const response = await apiClient.post(
//             currentEndpoint,
//             {
//               request: additionalValues,
//               signature: md5Hash,
//             },
//             {
//               headers: { Authorization: `Bearer ${userData.jwt}` },
//             },
//           );
//           console.log(response);
//         }

//         // Navigate to the next tab after successful submission
//         const nextTab = endpointArray[currentIndex + 1]?.tab;
//         if (nextTab) {
//           router.push(`/merchant/home/business-nature/${nextTab}`);
//         } else {
//           console.log('Form submission completed, no more tabs to navigate.');
//         }
//       } catch (e) {
//         console.log('Error in submitting dynamic form', e);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };
//   return (
//     <div>
//       <Formik
//         initialValues={initialValuesState}
//         validationSchema={validationSchemaState}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <div className="flex flex-col pb-[120px]">
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
//                         {pageItem.categories.map((item, itemIndex) => (
//                           <FormLayoutDynamic
//                             key={itemIndex}
//                             heading={item.categoryName}
//                           >
//                             {[...item.fields]
//                               .sort((a, b) => a.priority - b.priority)
//                               .map((field, fieldIndex) => {
//                                 return field?.type === 'text' ? (
//                                   <Input
//                                     key={fieldIndex}
//                                     label={field.label}
//                                     name={field.name}
//                                     type={field.type}
//                                     error={field.validation?.errorMessage}
//                                   />
//                                 )
//                                 : field?.type === '"checkBoxInputMulti"' ? (
//                                     <CheckboxInput
//                                       isMulti
//                                       name={field.name}
//                                       options={field.validation?.options?.map(
//                                         (option) => ({
//                                           label: option,
//                                           value: option
//                                             .toLowerCase()
//                                             .replace(/\s+/g, ''),
//                                         }),
//                                       )}
//                                       form={formik}
//                                       setSelectedCheckValue={
//                                         setSelectedCheckValue
//                                       }
//                                     />
//                                 )
//                                 : field?.type === 'checkBoxInput' ? (
//                                   <CheckboxInput
//                                     name={field.name}
//                                     options={field.validation?.options?.map(
//                                       (option) => ({
//                                         label: option,
//                                         value: option
//                                           .toLowerCase()
//                                           .replace(/\s+/g, ''),
//                                       }),
//                                     )}
//                                     form={formik}
//                                     setSelectedCheckValue={
//                                       setSelectedCheckValue
//                                     }
//                                   />
//                                 ) : (
//                                   <p key={fieldIndex}>nothing to show</p>
//                                 );
//                               })}
//                           </FormLayoutDynamic>
//                         ))}
//                       </React.Fragment>
//                     ),
//                     // )
//                   )}
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

// export default IntegrationForm;

'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';

// import DropdownInput from '../UI/Inputs/DropdownInput';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import { buildValidationSchema } from './validations/helper';
import type { FieldsData, Page } from './validations/types';

function IntegrationForm() {
  const userData = useAppSelector((state: any) => state.auth);
  const { apiSecret } = userData;
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [filteredData, setFilteredData] = useState<Page[]>();
  const [pageTitle, setPageTitle] = useState('');
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const router = useRouter();
  const { currentTab } = useCurrentTab();

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      const fData = fieldData.pages?.page.filter((item) => {
        return convertSlugToTitle(item.name) === title;
      });
      setFilteredData(fData);

      fData?.forEach((item) => {
        item.categories.forEach((category) => {
          category.fields.forEach((field) => {
            if (field?.type !== 'checkItem') {
              initialValues[field.name] = '';
            }
          });
        });
        setInitialValuesState(initialValues);
      });
      const validationSchema = buildValidationSchema(fData);
      setValidationSchemaState(validationSchema);
    }
    console.log('selected check value', selectedCheckValue);
  }, [currentTab]);

  // console.log("VALIDATION SCHEMA,", validationSchemaState);
  if (!initialValuesState || !validationSchemaState || !filteredData) {
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (
    values: { [key: string]: any },
    { setSubmitting }: any,
  ) => {
    const endpointArray = [
      {
        tab: 'activity-information',
        endpoint: `/merchant/activity/${userData.email}`,
      },
      {
        tab: 'business-details',
        endpoint: `/merchant/businessdetails/${userData.email}`,
      },
      {
        tab: 'settlement-details',
        endpoint: `/merchant/settlementdetails/${userData.email}`,
      },
      {
        tab: 'integration',
        endpoint: `/merchant/integration/${userData.email}`,
      },
      { tab: 'attachments', endpoint: `/merchant/upload/${userData.email}` },
    ];

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      const currentEndpoint = endpointArray[currentIndex]?.endpoint;
      const additionalValues = {
        ...values,
        managerMobile: userData?.managerMobile,
        businessNature: 'partnership',
        status: 'Completed',
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);
      try {
        if (currentEndpoint) {
          const response = await apiClient.post(
            currentEndpoint,
            {
              request: additionalValues,
              signature: md5Hash,
            },
            {
              headers: { Authorization: `Bearer ${userData.jwt}` },
            },
          );
          console.log(response);
        }

        const nextTab = endpointArray[currentIndex + 1]?.tab;
        if (nextTab) {
          router.push(`/merchant/home/business-nature/${nextTab}`);
        } else {
          console.log('Form submission completed, no more tabs to navigate.');
        }
      } catch (e) {
        console.log('Error in submitting dynamic form', e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValuesState}
        validationSchema={validationSchemaState}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col pb-[120px]">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                {pageTitle}
              </div>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-6">
                  {filteredData?.map((pageItem) => (
                    <React.Fragment key={pageItem.name}>
                      {pageItem.categories.map((item, itemIndex) => (
                        <FormLayoutDynamic
                          key={itemIndex}
                          heading={item.categoryName}
                        >
                          {[...item.fields]
                            .sort((a, b) => a.priority - b.priority)
                            .map((field, fieldIndex) => {
                              return field.type === 'text' ? (
                                <Input
                                  key={fieldIndex}
                                  label={field.label}
                                  name={field.name}
                                  type={field.type}
                                  error={field.validation?.errorMessage}
                                />
                              ) : // <p>hi</p>
                              field?.type === 'checkBoxInputMulti' ? (
                                <CheckboxInput
                                  isMulti
                                  name={field.name}
                                  options={field.validation?.options?.map(
                                    (option) => ({
                                      label: option,
                                      value: option
                                        .toLowerCase()
                                        .replace(/\s+/g, ''),
                                    }),
                                  )}
                                  form={formik}
                                  setSelectedCheckValue={setSelectedCheckValue}
                                />
                              ) : (
                                <p key={fieldIndex}>nothing to show</p>
                              );
                            })}
                        </FormLayoutDynamic>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                  <Button
                    label={`Save & Continue Later`}
                    type="button"
                    className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                  <Button
                    label={`Next`}
                    type="submit"
                    className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default IntegrationForm;
