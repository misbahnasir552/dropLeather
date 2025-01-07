'use client';

// import { Form, Formik } from 'formik';
import React from 'react';

// import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
// import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
// import Button from '@/components/UI/Button/PrimaryButton';
// import DateInputNew from '@/components/UI/Inputs/DateInputNew';
// import Input from '@/components/UI/Inputs/Input';
// import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
// import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
// import type { IQrPayments } from '@/interfaces/interface';
// import {
//   qrPaymentsInitialValues,
//   qrPaymentsSchema,
// } from '@/validations/merchant/merchant-portal/qr-payments/view-qr/qr-payments';

function page() {
  // const qrPaymentsTableHeadings: string[] = [
  //   'Transaction Point',
  //   'Store ID',
  //   'Store Name',
  //   'QR Generation Date/Time',
  //   'SMS Notification Number',
  //   'Actions',
  // ];
  // const qrPaymentsTableData: any =
  //   // : TableData[]
  //   [
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: 'CC',
  //       actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: 'CC',
  //       actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: 'CC',
  //       actions: 'Images',
  //     },
  //     {
  //       transactionPointNumber: '001123',
  //       storeId: '03345674415',
  //       storeName: 'momin',
  //       qrDateBetween: '02/05/2024',
  //       smsNotificationNumber: 'CC',
  //       actions: 'Images',
  //     },
  //   ];

  return <div>hi</div>;
}

export default page;

// const onSubmit = (values: IQrPayments) => {
//     console.log('i am outlet page', values);
//   };

// {/* <>
//   <div className="flex flex-col gap-6">
//     <HeaderWrapper
//       heading="View QR"
//       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
//     />
//     <MerchantFormLayout>
//       <Formik
//         initialValues={qrPaymentsInitialValues}
//         validationSchema={qrPaymentsSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form className=" bg-screen-grey">
//             <div className="mb-9 grid grid-cols-3 gap-5 bg-screen-grey ">
//               {/* <div className="mb-9 grid grid-cols-1 gap-5  bg-screen-grey md:grid-cols-3"></div> */}
//               <DateInputNew
//                 label="QR Generation Date Between"
//                 name="qrDateBetween"
//                 error={formik.errors.qrDateBetween}
//                 touched={formik.touched.qrDateBetween}
//               />
//               <Input
//                 label="Store Name"
//                 name="storeName"
//                 type="text"
//                 // error={"hi"}
//                 // formik={formik}
//                 // touched={formik.touched.CardNumber}
//               />
//               <Input
//                 label="Transaction Point Number"
//                 name="transactionPointNumber"
//                 type="text"
//                 error={"hi"}
//                 touched={false}
//               />
//               <Input
//                 label="Store ID"
//                 name="storeId"
//                 type="text"
//                 // error={"hi"}
//                 // formik={formik}
//                 // touched={formik.touched.CardNumber}
//               />
//             </div>
//             <div className="flex w-full justify-start gap-6">
//               <Button
//                 label="Search"
//                 type="submit"
//                 className="button-primary h-9 w-[120px] px-3 py-[19px] text-sm"
//               />
//               <Button
//                 label="Reset"
//                 routeName="/login"
//                 className="button-secondary h-9 w-[120px] px-2 py-[11px] text-xs leading-tight"
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//       {/* <Input name="asd" label="ASD" formik='xyz'/> */}
//     </MerchantFormLayout>
//     {/* <div className="flex flex-col p-[60px] bg-screen-grey border-[0.5px] border-border-light rounded-lg"></div> */}
//   </div>
//   <div className="flex pt-[40px]">
//     <IconTable
//       tableHeadings={qrPaymentsTableHeadings}
//       tableData={qrPaymentsTableData}
//       hasEdit
//       hasShare
//     />
//   </div>
// </>; */}
