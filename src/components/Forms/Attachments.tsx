'use client';

import { Form, Formik } from 'formik';
// import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import { useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { endpointArray } from '@/utils/merchantForms/helper';
// import { buildValidationSchema } from './validationsOLD/helper';
import {
  partnershipAttachmentsFormData,
  soleProprietorAttachmentsFormData,
} from '@/utils/onboardingForms/attachments';

import CorporateFileInput from '../UI/Inputs/CorporateFileInput';
// import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';
// import DropdownInput from '../UI/Inputs/DropdownInput';
// import ImageInput from "../UI/Inputs/ImageInput";
// import Input from '../UI/Inputs/Input';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
import partnershipAttachmentsFormSchema, {
  partnershipAttachmentsFormInitialValues,
} from './validations/attachmentForm/partnershipAttachmentsForm';
import soleAttachmentFormSchema, {
  soleAttachmentFormInitialValues,
} from './validations/attachmentForm/soleAttachmentsForm';

const Attachments = () => {
  // const fieldsData = useAppSelector((state: any) => state.fields);
  const { currentTab } = useCurrentTab();
  const [filteredData, setFilteredData] = useState<any>();
  const [pageTitle, setPageTitle] = useState<any>();
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const [apierror, setApierror] = useState('');
  const businessNature = useAppSelector(
    (state: any) => state.onBoardingForms.businessNature,
  );

  // const userData = useAppSelector((state: any) => state.auth);
  const [selectedFiles, setSelectedFiles] = useState<Array<File[] | null>>(
    Array(5).fill(null),
  );

  console.log(
    'businessNature',
    businessNature.businessNature,
    // apierror,
    setFilteredData,
  );
  const router = useRouter();
  const [attachmentData, setAttachmentData] = useState<any[]>();
  // const dispatch = useAppDispatch();
  const userData = useAppSelector((state: any) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const formData = new FormData();
  console.log(filteredData, 'filtered data from attachmentsssssssssss');

  useEffect(() => {
    console.log(initialValuesState, 'initial values');
    console.log(validationSchemaState, 'validationSchemaState');
  }, [initialValuesState, validationSchemaState]);

  useEffect(() => {
    if (businessNature?.businessNature === 'soleProprietor') {
      setInitialValuesState(soleAttachmentFormInitialValues);
      setValidationSchemaState(soleAttachmentFormSchema);
      setAttachmentData(soleProprietorAttachmentsFormData.categories);
    } else if (businessNature?.businessNature === 'partnership') {
      setInitialValuesState(partnershipAttachmentsFormInitialValues);
      setValidationSchemaState(partnershipAttachmentsFormSchema);
      setAttachmentData(partnershipAttachmentsFormData.categories);
    } else {
      setAttachmentData([]); // Set a default empty state to avoid undefined errors
    }

    console.log(attachmentData, 'attachments');

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
    }
  }, [currentTab, businessNature]);

  const onSubmit = async (
    // values: AttachmentFormInfo,
    values: any,
    { setSubmitting }: any,
  ) => {
    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'TESTTTTT CURRENT INDEX');
      if (currentIndex === 4) {
        // tested running code without labels
        // Object.keys(values).forEach((key) => {
        //   if (values[key]) {
        //     formData.append('files', values[key]);
        //   }
        // });
        Object.entries(values).forEach(([key, value]) => {
          console.log('OB VAL ', value, key);

          // Find the corresponding label from filteredData
          console.log('filtered data is', filteredData);
          // let label: string | undefined;
          // filteredData?.forEach((item: any) => {
          //   item.categories.forEach((category: any) => {
          //     category.fields.forEach((field: any) => {
          //       if (field?.name === key) {
          //         label = field?.label; // Match the key with the field's name
          //       }
          //     });
          //   });
          // });
          const label = attachmentData
            ?.flatMap((category: any) => category.fields)
            ?.find((field: any) => field?.name === key)?.label;
          if (label && Array.isArray(value)) {
            console.log('LABEL ', label);

            value.forEach((file: any) => {
              console.log('file is', file);
              formData.append(label!, file); // Use the label here
            });
          }
        });

        // formData.append('status', 'Completed');
        console.log('FORM DATAA', formData);

        try {
          const response: any = await apiClient.post(
            `merchant/saveMerchantDocuments`,
            formData,
            {
              params: {
                merchantEmail: userData?.email,
                status: 'Completed',
                resetFiles: false,
              },
              headers: { Authorization: `Bearer ${userData.jwt}` },
            },
          );
          console.log(response, 'Attachments');
          if (response?.data?.responseCode === '009') {
            // Navigate to the next tab after successful submission
            const nextTab = endpointArray[currentIndex + 1]?.tab;
            if (nextTab) {
              router.push(`/merchant/home/business-nature/${nextTab}`);
            } else {
              console.log(
                'Form submission completed, no more tabs to navigate.',
              );
            }
          } else if (response?.data?.responseCode === '000') {
            console.log('no');
            setApierror(response?.data?.responseMessage);
          }
          // else {
          //   setTitle('Error Occured');
          //   setDescription(response?.data?.responseDescription);
          //   setShowModal(true);
          // }
          // return;
        } catch (e: any) {
          console.log('Error in submitting dynamic form', e);
          setTitle('Network Failed');
          setDescription('Network failed! Please try again later.');
          setShowModal(true);
        } finally {
          setSubmitting(false);
        }
      }
    }
  };

  return (
    <div>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
      {initialValuesState && validationSchemaState ? (
        <Formik
          // {...formikConfig}
          initialValues={initialValuesState}
          validationSchema={validationSchemaState}
          // initialValues={soleAttachmentFormInitialValues}
          // validationSchema={soleAttachmentFormSchema}
          onSubmit={onSubmit}
          // // {...formikConfig}
          //   initialValues={businessNature === "soleProprietor"
          //     ? soleAttachmentFormInitialValues
          //     : businessNature === "partnership"
          //       ? partnershipAttachmentsFormInitialValues
          //       : null}
          //   validationSchema={businessNature === "soleProprietor"
          //     ? soleAttachmentFormSchema
          //     : businessNature === "partnership"
          //       ? partnershipAttachmentsFormSchema
          //       : null}
          //   // initialValues={soleAttachmentFormInitialValues}
          //   // validationSchema={soleAttachmentFormSchema}
          //   onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="flex flex-col pb-[120px]">
              <Form className="flex flex-col gap-5">
                <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
                  {pageTitle}
                </div>
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-6">
                    {/* <H6>
                      Upload Documents{" "}
                      <span className="font-normal leading-tight text-secondary-500">
                        (What would you like to integrate)
                      </span>
                    </H6> */}

                    {attachmentData?.map((item: any, index: any) => (
                      <React.Fragment key={index}>
                        {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                        <FormLayoutDynamic
                          key={index}
                          heading={item.categoryName}
                        >
                          {/* <FormLayoutDynamic key={item} heading={item.categoryName}> */}
                          {item.fields.map((field: any, fieldIndex: any) => {
                            return field?.type === 'file' ? (
                              <CorporateFileInput
                                asterik={field.required}
                                key={field.name}
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                                index={fieldIndex}
                                formik={formik}
                                item={field}
                              />
                            ) : (
                              <p key={fieldIndex}>nothing to show</p>
                            );
                          })}
                        </FormLayoutDynamic>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                    {apierror}
                  </div>
                  <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                    {/* <Button
                      label={`Save & Continue Later`}
                      type="button"
                      className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                    /> */}
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
      ) : null}
    </div>
  );
};

export default Attachments;

// 'use client';

// import { Form, Formik } from 'formik';
// import type { StaticImageData } from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { BarLoader } from 'react-spinners';

// import apiClient from '@/api/apiClient';
// // import AttachmentsIcon from "@/assets/icons/Attachments.svg";
// import Button from '@/components/UI/Button/PrimaryButton';
// // import FileInput from '@/components/UI/Inputs/FileInput';
// import { useAppSelector } from '@/hooks/redux';
// import useCurrentTab from '@/hooks/useCurrentTab';
// // import { setAttachmentForm } from "@/redux/features/formSlices/onBoardingForms";
// // import {
// //   AttachmentFormInfoInitialValues,
// //   AttachmentFormInfoSchema,
// // } from "@/validations/merchant/onBoarding/attachmentInfo";
// import { convertSlugToTitle } from '@/services/urlService/slugServices';
// // import { generateMD5Hash } from '@/utils/helper';
// import { endpointArray } from '@/utils/merchantForms/helper';

// import CorporateFileInput from '../UI/Inputs/CorporateFileInput';
// // import BulkRegisterInput from '../UI/Inputs/BulkRegisterInput';
// import DropdownInput from '../UI/Inputs/DropdownInput';
// // import ImageInput from "../UI/Inputs/ImageInput";
// import Input from '../UI/Inputs/Input';
// import CustomModal from '../UI/Modal/CustomModal';
// import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import { buildValidationSchema } from './validationsOLD/helper';

// const Attachments = () => {
//   const fieldsData = useAppSelector((state: any) => state.fields);
//   const { currentTab } = useCurrentTab();
//   const [filteredData, setFilteredData] = useState<any>();
//   const [pageTitle, setPageTitle] = useState<any>();
//   const [initialValuesState, setInitialValuesState] = useState<any>();
//   const [validationSchemaState, setValidationSchemaState] = useState<any>();
//   const [apierror, setApierror] = useState('');

//   // const userData = useAppSelector((state: any) => state.auth);
//   const [selectedFiles, setSelectedFiles] = useState<Array<File[] | null>>(
//     Array(5).fill(null),
//   );

//   const router = useRouter();
//   // const dispatch = useAppDispatch();
//   const userData = useAppSelector((state: any) => state.auth);

//   const [showModal, setShowModal] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const formData = new FormData();
//   console.log(filteredData, 'filtered data from attachmentsssssssssss');

//   useEffect(() => {
//     const initialValues: { [key: string]: any } = {};
//     if (currentTab) {
//       const title = convertSlugToTitle(currentTab);
//       setPageTitle(title);
//       console.log(title, 'TITLE SLUG', currentTab, 'Curren Tab');
//       const fData = fieldsData?.pages?.page?.filter((item: any) => {
//         // console.log(item.name, "ITEM NAME");
//         return convertSlugToTitle(item.name) === title;
//       });
//       setFilteredData(fData);
//       // console.log("FDATAAA", fData);

//       fData?.forEach((item: any) => {
//         // if (item.name === "Activity Information") {
//         item.categories.forEach((category: any) => {
//           category.fields.forEach((field: any) => {
//             initialValues[field.name] = '';
//           });
//         });
//         setInitialValuesState(initialValues);
//         // }
//       });
//       const validationSchema = buildValidationSchema(fData);
//       console.log('Vaidation schema result', validationSchema);

//       setValidationSchemaState(validationSchema);
//     }
//   }, [currentTab]);

//   // if (!initialValuesState || !filteredData) {
//   //   return (
//   //     <div className="flex w-full flex-col justify-center">
//   //       <BarLoader color="#21B25F" />
//   //     </div>
//   //   );
//   // }

//   const onSubmit = async (
//     // values: AttachmentFormInfo,
//     values: any,
//     { setSubmitting }: any,
//   ) => {
//     const currentIndex = endpointArray.findIndex(
//       (item) => item.tab === currentTab,
//     );

//     if (currentIndex !== -1) {
//       console.log(currentIndex, 'TESTTTTT CURRENT INDEX');
//       if (currentIndex === 5) {
//         // tested running code without labels
//         // Object.keys(values).forEach((key) => {
//         //   if (values[key]) {
//         //     formData.append('files', values[key]);
//         //   }
//         // });
//         Object.entries(values).forEach(([key, value]) => {
//           console.log('OB VAL ', value, key);

//           // Find the corresponding label from filteredData
//           let label: string | undefined;
//           filteredData?.forEach((item: any) => {
//             item.categories.forEach((category: any) => {
//               category.fields.forEach((field: any) => {
//                 if (field?.name === key) {
//                   label = field?.label; // Match the key with the field's name
//                 }
//               });
//             });
//           });
//           if (label && Array.isArray(value)) {
//             console.log('LABEL ', label);

//             value.forEach((file: any) => {
//               formData.append(label!, file); // Use the label here
//             });
//           }
//         });

//         // formData.append('status', 'Completed');
//         console.log('FORM DATAA', formData);

//         try {
//           const response: any = await apiClient.post(
//             `merchant/saveMerchantDocuments`,
//             formData,
//             {
//               params: {
//                 merchantEmail: userData?.email,
//                 status: 'Completed',
//                 resetFiles: false,
//               },
//               headers: { Authorization: `Bearer ${userData.jwt}` },
//             },
//           );
//           console.log(response, 'Attachments');
//           if (response?.data?.responseCode === '009') {
//             // Navigate to the next tab after successful submission
//             const nextTab = endpointArray[currentIndex + 1]?.tab;
//             if (nextTab) {
//               router.push(`/merchant/home/business-nature/${nextTab}`);
//             } else {
//               console.log(
//                 'Form submission completed, no more tabs to navigate.',
//               );
//             }
//           } else if (response?.data?.responseCode === '000') {
//             setApierror(response?.data?.responseMessage);
//           } else {
//             setTitle('Error Occured');
//             setDescription(response?.data?.responseDescription);
//             setShowModal(true);
//           }
//           // return;
//         } catch (e: any) {
//           console.log('Error in submitting dynamic form', e);
//           setTitle('Network Failed');
//           setDescription('Network failed! Please try again later.');
//           setShowModal(true);
//         } finally {
//           setSubmitting(false);
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       <CustomModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//         // routeName={attachRoute}
//         // routeName="/merchant/home"
//       />
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
//                   {/* <H6>
//                       Upload Documents{" "}
//                       <span className="font-normal leading-tight text-secondary-500">
//                         (What would you like to integrate)
//                       </span>
//                     </H6> */}
//                   {filteredData?.map(
//                     (pageItem: {
//                       name: React.Key | null | undefined;
//                       categories: any[];
//                     }) => (
//                       <React.Fragment key={pageItem.name}>
//                         {pageItem.categories
//                           .slice()
//                           .sort(
//                             (a: any, b: any) =>
//                               Number(a.priority) - Number(b.priority),
//                           )
//                           .map(
//                             (
//                               item: { categoryName: any; fields: any[] },
//                               itemIndex: any,
//                             ) => (
//                               <FormLayoutDynamic
//                                 key={itemIndex}
//                                 heading={item.categoryName}
//                               >
//                                 {[...item.fields]

//                                   .map(
//                                     (
//                                       field: {
//                                         type?: any;
//                                         label: any;
//                                         name: any;
//                                         validation?: any;
//                                         file?: any;
//                                         icon?: string | StaticImageData;
//                                       },
//                                       fieldIndex: React.Key | null | undefined,
//                                     ) => {

//                                       if (field?.type === 'file') {
//                                         return (

//                                           <CorporateFileInput
//                                             asterik={field.validation.required}
//                                             key={field.name}
//                                             selectedFiles={selectedFiles}
//                                             setSelectedFiles={setSelectedFiles}
//                                             index={fieldIndex}
//                                             formik={formik}
//                                             item={field}
//                                           />
//                                         );
//                                       }
//                                       return null;
//                                     },
//                                   )}
//                                 <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
//                                   {apierror}
//                                 </div>
//                               </FormLayoutDynamic>
//                             ),
//                           )}
//                       </React.Fragment>
//                     ),
//                   )}
//                 </div>

//                 <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
//                   <Button
//                     label={`Save & Continue Later`}
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

// export default Attachments;
