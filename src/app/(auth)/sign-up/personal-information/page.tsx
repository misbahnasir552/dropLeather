// 'use client';

// import { Form, Formik } from 'formik';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useState } from 'react';

// import apiClient from '@/api/apiClient';
// import eye from '@/assets/icons/eye.svg';
// // import Bitmap from '@/assets/images/Bitmap.svg';
// import Button from '@/components/UI/Button/PrimaryButton';
// import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
// import Input from '@/components/UI/Inputs/Input';
// import CustomModal from '@/components/UI/Modal/CustomModal';
// import FormWrapper from '@/components/UI/Wrappers/FormLayout';
// import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
// import { useAppDispatch } from '@/hooks/redux';
// import {
//   addCorporateFormData,
//   addFormData,
// } from '@/redux/features/signUpSlice';
// import {
//   corporateSignUpInitialValues,
//   corporateSignUpSchema,
//   signUpInitialValues,
//   signUpSchema,
// } from '@/validations/merchant/auth/signUpSchema';

// import TermsAndConditions from './termsAndConditions';

// const PersonalInfo = () => {
//   const [isChecked, setChecked] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [apierror, setApierror] = useState('');
//   // const [displayIcon, setDisplayIcon] = useState(Bitmap);
//   const searchParams = useSearchParams();
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const option = searchParams.get('option');

//   const showErrorModal = (title: string, description: string) => {
//     setTitle(title);
//     setDescription(description);
//     setShowModal(true);
//   };

//   const onSubmitCorporate = async (values: any, { setSubmitting }: any) => {
//     console.log(setSubmitting);
//     const inquiryResponse = await apiClient.get(`/corporate/inquire`, {
//       // params: { email: values.email },
//       params: { email: values.email, username: values.username },
//     });

//     if (inquiryResponse?.data.responseCode === '009') {
//       const response = await apiClient.post(
//         `/corporate/send-otp`,
//         {},
//         {
//           params: { email: values.email },
//         },
//       );
//       console.log('RESPONSEEEEE SENDOTP', response.data);

//       if (response.data?.success) {
//         dispatch(addCorporateFormData({ ...values }));
//         router.push(
//           `/sign-up/personal-information/otp/?expiry=${'2'}&option=${option}`,
//         );
//       } else {
//         showErrorModal(
//           response.data.responseCode,
//           response.data.responseDescription,
//         );
//       }
//     } else if (inquiryResponse.data.responseCode === '000') {
//       // showErrorModal('Failed', inquiryResponse.data.responseMessage);
//       setApierror(inquiryResponse.data.responseMessage);
//     }
//   };

//   const onSubmit = async (values: any, { setSubmitting }: any) => {
//     setIsLoading(true);
//     try {
//       // let response;

//       const response = await apiClient.post('merchant/sendotp', {
//         managerMobile: values.managerMobile,
//         email: values.email,
//       });

//       if (response?.data.responseCode === '009') {
//         dispatch(
//           addFormData({
//             ...values,
//             merchantType: searchParams.get('option') || 'optionNotDefined',
//           }),
//         );
//         router.push(
//           `/sign-up/personal-information/otp/?expiry=${response.data.expirationTime}`,
//         );
//       }
//     } catch (e: any) {
//       console.error('Error submitting form', e);
//       showErrorModal(e.code, e.message);
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };

//   const handleCheckboxChange = () => {
//     setChecked(!isChecked);
//   };

// return (
//   <>
//     {isLoading && (
//       <p className="bg-primary-600 p-4 text-screen-white">LOADING.......</p>
//     )}
//     {showModal && (
//       <CustomModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//         // image={displayIcon}
//       />
//     )}
//     {option === 'corporatePortal' ? (
//       <Formik
//         initialValues={corporateSignUpInitialValues}
//         validationSchema={corporateSignUpSchema}
//         onSubmit={onSubmitCorporate}
//       >
//         {(formik) => (
//           <Form>
//             <div className="flex w-full flex-col gap-6 sm:pb-[60px] md:pb-[76px]">
//               <HeaderWrapper
//                 heading="Please fill in the following information to get started."
//                 description="To submit your application for easypaisa corporate products, we will first create a user account for you so you can review and track your application progress."
//                 show
//               />
//               <FormWrapper>
//                 <div className="flex w-full flex-col items-start justify-between gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Personal Information
//                   </div>
//                   <Input
//                     label="First Name"
//                     name="firstName"
//                     type="text"
//                     error={formik.errors.firstName}
//                     touched={formik.touched.firstName}
//                   />
//                   <Input
//                     label="Last Name"
//                     name="lastName"
//                     type="text"
//                     error={formik.errors.lastName}
//                     touched={formik.touched.lastName}
//                   />
//                   <Input
//                     label="Email"
//                     name="email"
//                     type="email"
//                     error={formik.errors.email}
//                     touched={formik.touched.email}
//                   />
//                   <Input
//                     label="Username"
//                     name="username"
//                     type="text"
//                     error={formik.errors.username}
//                     touched={formik.touched.username}
//                   />
//                 </div>
//               </FormWrapper>
//               <FormWrapper>
//                 <div className="flex w-full flex-col gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Set your Login Password
//                   </div>
//                   <Input
//                     label="Password"
//                     name="password"
//                     type="password"
//                     error={formik.errors.password}
//                     touched={formik.touched.password}
//                     hasImage={true}
//                     image={eye}
//                   />
//                   <Input
//                     label="Confirm Password"
//                     name="confirmPassword"
//                     type="password"
//                     error={formik.errors.confirmPassword}
//                     touched={formik.touched.confirmPassword}
//                     hasImage={true}
//                     image={eye}
//                   />
//                 </div>
//               </FormWrapper>
//               <FormWrapper>
//                 <div className="flex flex-col items-start justify-center gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Terms and Conditions for easypaisa Corporate Branchless
//                     and Branch Banking Account(s)
//                   </div>
//                   {/* <div className="bg-neutral-white-base p-6">
//                     <div className="text-xs leading-tight text-secondary-base">
//                       In using this website, you are deemed to have read and
//                       agreed to the following terms and conditions.
//                     </div>
//                   </div> */}

//                   <TermsAndConditions />
//                   <CheckboxItem
//                     description="I agree to easypaisa Terms & Conditions"
//                     isChecked={isChecked}
//                     handleCheckboxChange={handleCheckboxChange}
//                   />
//                 </div>
//               </FormWrapper>
//               <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
//                 {apierror}
//               </div>
//               <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
//                 <Button
//                   label="Next"
//                   type="submit"
//                   // isDisabled={!isChecked || !formik.isValid}
//                   isDisabled={!isChecked}
//                   className={`button-primary ${
//                     isLoading ? 'bg-neutral-black-300' : ''
//                   } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                 />
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     ) : (
//       <Formik
//         initialValues={signUpInitialValues}
//         validationSchema={signUpSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form>
//             <div className="flex w-full flex-col gap-6 sm:pb-[60px] md:pb-[76px]">
//               <HeaderWrapper
//                 heading="Please fill in the Information below"
//                 show
//               />
//               <FormWrapper>
//                 <div className="flex w-full flex-col items-start justify-between gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Personal Information
//                   </div>
//                   <Input
//                     label="First Name"
//                     name="firstName"
//                     type="text"
//                     error={formik.errors.firstName}
//                     touched={formik.touched.firstName}
//                   />
//                   <Input
//                     label="Last Name"
//                     name="lastName"
//                     type="text"
//                     error={formik.errors.lastName}
//                     touched={formik.touched.lastName}
//                   />
//                   <Input
//                     label="Merchant Name"
//                     name="merchantName"
//                     type="text"
//                     error={formik.errors.merchantName}
//                     touched={formik.touched.merchantName}
//                   />
//                   <Input
//                     label="Mobile Number"
//                     name="managerMobile"
//                     type="text"
//                     error={formik.errors.managerMobile}
//                     touched={formik.touched.managerMobile}
//                   />
//                   <Input
//                     label="Email"
//                     name="email"
//                     type="email"
//                     error={formik.errors.email}
//                     touched={formik.touched.email}
//                   />
//                   <Input
//                     label="Website"
//                     name="website"
//                     type="text"
//                     error={formik.errors.website}
//                     touched={formik.touched.website}
//                   />
//                 </div>
//               </FormWrapper>
//               <FormWrapper>
//                 <div className="flex w-full flex-col gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Set your Login Password
//                   </div>
//                   <Input
//                     label="Password"
//                     name="password"
//                     type="password"
//                     error={formik.errors.password}
//                     touched={formik.touched.password}
//                   />
//                   <Input
//                     label="Confirm Password"
//                     name="confirmPassword"
//                     type="password"
//                     error={formik.errors.confirmPassword}
//                     touched={formik.touched.confirmPassword}
//                   />
//                 </div>
//               </FormWrapper>
//               <FormWrapper>
//                 <div className="flex flex-col items-start justify-center gap-4">
//                   <div className="text-base font-semibold leading-tight text-secondary-base">
//                     Terms & Conditions
//                   </div>
//                   <div className="bg-neutral-white-base p-6">
//                     <div className="text-xs leading-tight text-secondary-base">
//                       In using this website, you are deemed to have read and
//                       agreed to the following terms and conditions.
//                     </div>
//                   </div>
//                   <CheckboxItem
//                     description="I agree to easypaisa Terms & Conditions"
//                     isChecked={isChecked}
//                     handleCheckboxChange={handleCheckboxChange}
//                   />
//                 </div>
//               </FormWrapper>
//               <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
//                 <Button
//                   label="Next"
//                   type="submit"
//                   isDisabled={!isChecked || !formik.isValid}
//                   className={`button-primary ${
//                     isLoading ? 'bg-neutral-black-300' : ''
//                   } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//                 />
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     )}
//   </>
// );
// };

// export default PersonalInfo;

'use client';

import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import eye from '@/assets/icons/eye.svg';
// import Bitmap from '@/assets/images/Bitmap.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxItem from '@/components/UI/Inputs/CheckboxItem';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormWrapper from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch } from '@/hooks/redux';
import {
  // addCorporateFormData,
  addFormData,
} from '@/redux/features/signUpSlice';
import {
  signUpInitialValues,
  signUpSchema,
} from '@/validations/merchant/auth/signUpSchema';

const PersonalInfo = () => {
  const [isChecked, setChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [apierror, setApierror] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to prevent multiple submissions
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const option = searchParams.get('option');

  const showErrorModal = (title: string, description: string) => {
    setTitle(title);
    setDescription(description);
    setShowModal(true);
  };

  // const onSubmitCorporate = async (values: any, { setSubmitting }: any) => {
  //   if (isSubmitted) return; // Prevent multiple calls
  //   setIsSubmitted(true);
  //   try {
  //     const inquiryResponse = await apiClient.get(`/corporate/inquire`, {
  //       params: { email: values.email, username: values.username },
  //     });

  //     if (inquiryResponse?.data.responseCode === '009') {
  //       const response = await apiClient.post(
  //         `/corporate/send-otp`,
  //         {},
  //         { params: { email: values.email } },
  //       );

  //       if (response.data?.success) {
  //         dispatch(addCorporateFormData({ ...values }));
  //         router.push(
  //           `/sign-up/personal-information/otp/?expiry=${'2'}&option=${option}`,
  //         );
  //       } else {
  //         showErrorModal(
  //           response.data.responseCode,
  //           response.data.responseDescription,
  //         );
  //         setIsSubmitted(false); // Allow retry on failure
  //       }
  //     } else if (inquiryResponse.data.responseCode === '000') {
  //       // setApierror(inquiryResponse.data.responseMessage);
  //       setIsSubmitted(false); // Allow retry on failure
  //     }
  //   } catch (e: any) {
  //     console.error('Error during corporate submission:', e);
  //     showErrorModal(e.code, e.message);
  //     setIsSubmitted(false); // Allow retry on failure
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    if (isSubmitted) return; // Prevent multiple calls
    setIsSubmitted(true);
    setIsLoading(true);
    try {
      const response = await apiClient.post('merchant/sendotp', {
        managerMobile: values.managerMobile,
        email: values.email,
      });

      if (response?.data.responseCode === '009') {
        dispatch(
          addFormData({
            ...values,
            merchantType: searchParams.get('option') || 'optionNotDefined',
          }),
        );
        router.push(
          `/sign-up/personal-information/otp/?expiry=${response.data.expirationTime}`,
        );
      } else {
        showErrorModal('Failed', response.data.responseMessage);
        setIsSubmitted(false); // Allow retry on failure
      }
    } catch (e: any) {
      console.error('Error during submission:', e);
      showErrorModal('Network Failed', e.message);
      setIsSubmitted(false); // Allow retry on failure
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      {isLoading && (
        <p className="bg-primary-600 p-4 text-screen-white">LOADING.......</p>
      )}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // image={displayIcon}
      />
      <Formik
        initialValues={signUpInitialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex w-full flex-col gap-6 sm:pb-[60px] md:pb-[76px]">
              <HeaderWrapper
                heading="Please fill in the Information below"
                show
              />
              <FormWrapper>
                <div className="flex w-full flex-col items-start justify-between gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Personal Information
                  </div>
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    asterik
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    asterik
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                  />
                  <Input
                    label="Merchant Name"
                    name="merchantName"
                    type="text"
                    asterik
                    error={formik.errors.merchantName}
                    touched={formik.touched.merchantName}
                  />
                  <Input
                    label="Mobile Number"
                    name="managerMobile"
                    type="text"
                    asterik
                    error={formik.errors.managerMobile}
                    touched={formik.touched.managerMobile}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    asterik
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                  <Input
                    label="Website"
                    name="website"
                    type="text"
                    error={formik.errors.website}
                    touched={formik.touched.website}
                  />
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex w-full flex-col gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Set your Login Password
                  </div>
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    asterik
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    image={eye}
                  />
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    asterik
                    error={formik.errors.confirmPassword}
                    touched={formik.touched.confirmPassword}
                    image={eye}
                  />
                </div>
              </FormWrapper>
              <FormWrapper>
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="text-base font-semibold leading-tight text-secondary-base">
                    Terms & Conditions
                  </div>
                  <div className="bg-neutral-white-base p-6">
                    <div className="text-xs leading-tight text-secondary-base">
                      In using this website, you are deemed to have read and
                      agreed to the following terms and conditions.
                    </div>
                  </div>
                  <CheckboxItem
                    description="I agree to easypaisa Terms & Conditions"
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </FormWrapper>
              <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
                <Button
                  label="Next"
                  type="submit"
                  isDisabled={!isChecked || isLoading} // Disable when loading
                  // isDisabled={!isChecked || !formik.isValid || isLoading} // Disable when loading
                  className={`button-primary ${
                    isLoading ? 'cursor-not-allowed bg-neutral-black-300' : ''
                  } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalInfo;
