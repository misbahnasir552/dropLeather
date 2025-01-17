'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import FormLayout from '@/components/UI/Wrappers/FormLayout';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
// import type { BankAccountDTO } from '@/utils/dropdown-list/bankList';
// import { bankAccountsDTO } from '@/utils/dropdown-list/bankList';
import { generateMD5Hash } from '@/utils/helper';
import {
  fundsTransferInitialValues,
  fundsTransferSchema,
} from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/funds-transfer';

function FundsTranfer() {
  const userData = useAppSelector((state: any) => state.auth);
  // const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>(
  //   [],
  // );

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const fetchBeneficiariesRecords = async () => {
    try {
      const response = await apiClient.get('/merchant/getAllBeneficiaries');
      console.log(response.data.beneficiaryList, 'RESPONSE');
      if (response?.data.responseCode === '009') {
        setRecords(response.data.beneficiaryList);
      } else {
        setTitle('Failure');
        setDescription(response.data.responseDescription);
        setShowModal(true);
      }
    } catch (e: any) {
      console.log('Error in fetching dynamic QR list', e);
      setTitle('Network Failure');
      setDescription(e.message);
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchBeneficiariesRecords();
  }, []);

  const onSubmit = async (values: any, { resetForm }: any) => {
    console.log('Fund transfer values: ', values);
    const { beneficiaryAccountNumber, beneficiaryBank, ...rest } = values;
    console.log('RECORDS', records);
    // const splitStringLastPart = values.beneficiaryAccountNumber?.split('-').pop();
    const splitStringLastPart = values.beneficiaryAccountNumber
      ?.split('-')
      .pop()
      ?.trim();
    console.log('splitStringLastPart', `${splitStringLastPart}`);

    const selectedOption: any = records?.find(
      (option: any) => option.mobileNumber === splitStringLastPart,
    );
    console.log(selectedOption, 'SELECTED OPTION');

    try {
      const additionalValues = {
        ...rest,
        beneficiaryAccountNumber: selectedOption?.mobileNumber,
        beneficiaryBank: selectedOption?.bankName,
        managerMobile: userData?.managerMobile,
      };
      console.log('additional values', additionalValues);

      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      setIsLoading(true);
      const response = await apiClient.post(
        '/merchant/fundsTransfer',
        requestBody,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );
      console.log('Added Successfully', response);
      if (response?.data.responseCode === '009') {
        setTitle('Transfered Successfully!');
        setDescription(response?.data.responseDescription);
        resetForm();
      } else {
        setTitle('Failure');
        setDescription(response.data.responseDescription);
      }
    } catch (e: any) {
      setTitle('Network Failure');
      setDescription(e.message);
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
      />
      <HeaderWrapper
        heading="Funds Transfer"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <Formik
        initialValues={fundsTransferInitialValues}
        validationSchema={fundsTransferSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <FormLayout formHeading="Account Details">
              <div className="flex flex-col gap-4">
                <Input
                  // isDisabled
                  value={'923458496384'}
                  label="Transfer From"
                  name={'transferFrom'}
                  type="text"
                  error={formik.errors.transferFrom}
                  touched={formik.touched.transferFrom}
                />
                {/* <Input
                  label="Beneficiary Account Details"
                  name={'beneficiaryAccountNumber'}
                  type="text"
                  error={formik.errors.beneficiaryAccountNumber}
                  touched={formik.touched.beneficiaryAccountNumber}
                /> */}
                <DropdownInput
                  label="Beneficiary Account Details"
                  name={'beneficiaryAccountNumber'}
                  error={formik.errors.beneficiaryAccountNumber}
                  touched={formik.touched.beneficiaryAccountNumber}
                  formik={formik}
                  options={records.map((option: any) => ({
                    label: `${option.bankName} - ${option.beneficiaryName} - ${option.mobileNumber}`,
                    value: `${option.mobileNumber}`,
                  }))}
                />

                {/* <DropdownInput
                  label="Beneficiary Bank"
                  name={'beneficiaryBank'}
                  error={formik.errors.beneficiaryBank}
                  touched={formik.touched.beneficiaryBank}
                  formik={formik}
                  options={bankAccountsDTO.map((option: BankAccountDTO) => ({
                    label: option.bankName,
                    value: option.bankPrefix,
                  }))}
                /> */}

                <Input
                  label="MPIN"
                  name={'mpin'}
                  type="password"
                  error={formik.errors.mpin}
                  touched={formik.touched.mpin}
                />
                <Input
                  label="Transfer Amount"
                  name={'transferAmount'}
                  type="number"
                  error={formik.errors.transferAmount}
                  touched={formik.touched.transferAmount}
                />
                <Input
                  label="Transfer Purpose"
                  name={'transferPurpose'}
                  type="text"
                  error={formik.errors.transferPurpose}
                  touched={formik.touched.transferPurpose}
                />
              </div>
            </FormLayout>
            {isLoading && (
              <div className="flex w-full justify-center">
                <BarLoader color="#21B25F" />
              </div>
            )}
            <div className="flex w-full justify-end gap-6 pb-9">
              <Button
                label="Cancel"
                type="button"
                className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
              <Button
                label="Transfer Amount"
                type="submit"
                className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FundsTranfer;

// 'use client';

// import { Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';

// import Button from '@/components/UI/Button/PrimaryButton';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
// import Input from '@/components/UI/Inputs/Input';
// import FormLayout from '@/components/UI/Wrappers/FormLayout';
// import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
// import { fundsTransferInitialValues, fundsTransferSchema } from '@/validations/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer/funds-transfer';
// import apiClient from '@/api/apiClient';
// import { useAppSelector } from '@/hooks/redux';
// import { generateMD5Hash } from '@/utils/helper';
// import SuccessModal from '@/components/UI/Modal/CustomModal';
// import { BarLoader } from 'react-spinners';
// import { BankAccountDTO, bankAccountsDTO } from '@/utils/dropdown-list/bankList';

// function page() {
//   const userData = useAppSelector((state: any) => state.auth);
//   const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>([]);
//   const [selectedBeneficiary, setSelectedBeneficiary] = useState<any | null>(null);
//   const [bankList, setBankList] = useState<any[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchBeneficiariesRecords = async () => {
//     try {
//       const response = await apiClient.get('/merchant/getAllBeneficiaries');
//       console.log(response.data.beneficiaryList, 'RESPONSE');
//       const filteredValues = response?.data?.beneficiaryList.map(({ ...rest }) => rest);
//       setBeneficiaryFilteredData(filteredValues);
//     } catch (e) {
//       console.log('Error in fetching dynamic QR list', e);
//     }
//   };

//   useEffect(() => {
//     fetchBeneficiariesRecords();
//   }, []);

//   // Update the bank list when the selected beneficiary changes
//   useEffect(() => {
//     if (selectedBeneficiary) {
//       const filteredBanks = beneficiaryFilteredData
//         .filter((beneficiary: any) => beneficiary.name === selectedBeneficiary)
//         .map((beneficiary: any) => ({
//           bankName: beneficiary.bankName,
//           bankPrefix: beneficiary.bankPrefix,
//         }));

//       setBankList(filteredBanks);
//     }
//   }, [selectedBeneficiary, beneficiaryFilteredData]);
//   console.log("STATE BENEFICIARY", bankList);

//   const handleBeneficiaryChange = (selectedValue: string) => {
//     console.log("SELECTED VALUE DROPDOWN", selectedValue);

//     const beneficiary = beneficiaryFilteredData.find(
//       (beneficiary) => beneficiary.beneficiaryName === selectedValue
//     );
//     setSelectedBeneficiary(beneficiary);
//   };

//   const onSubmit = async (values: any, { resetForm }: any) => {
//     try {
//       const additionalValues = {
//         ...values,
//         managerMobile: userData?.managerMobile,
//       };
//       const mdRequest = {
//         ...additionalValues,
//         apisecret: userData?.apiSecret,
//       };
//       const md5Hash = generateMD5Hash(mdRequest);
//       const requestBody = {
//         request: additionalValues,
//         signature: md5Hash,
//       };
//       setIsLoading(true);
//       const response = await apiClient.post(
//         '/merchant/fundsTransfer',
//         requestBody,
//         { headers: { Authorization: `Bearer ${userData?.jwt}` } }
//       );
//       if (response?.data.responseCode === '00') {
//         setTitle(response?.data.responseCode);
//         setDescription(response?.data.responseDescription);
//         resetForm();
//       } else {
//         setTitle(response.data.errorDescription);
//         setDescription(response.data.errorDescription);
//       }
//     } catch (e: any) {
//       setTitle(e.code);
//       setDescription(e.message);
//     } finally {
//       setIsLoading(false);
//       setShowModal(true);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <SuccessModal
//         title={title}
//         description={description}
//         show={showModal}
//         setShowModal={setShowModal}
//         routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/"
//       />
//       <HeaderWrapper
//         heading="Funds Transfer"
//         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
//       />
//       <Formik
//         initialValues={fundsTransferInitialValues}
//         validationSchema={fundsTransferSchema}
//         onSubmit={onSubmit}
//       >
//         {(formik) => (
//           <Form className="flex flex-col gap-6">
//             <FormLayout formHeading="Account Details">
//               <div className="flex flex-col gap-4">
//                 <DropdownInput
//                   label="Select Beneficiary"
//                   name={'beneficiaryName'}
//                   error={formik.errors.beneficiaryName}
//                   touched={formik.touched.beneficiaryName}
//                   formik={formik}
//                   options={beneficiaryFilteredData?.map((beneficiary: any) => ({
//                     label: beneficiary.beneficiaryName,
//                     value: beneficiary.beneficiaryName,
//                   }))}
//                   // onClick={(formik)=> handleBeneficiaryChange(formik)}
//                   // onChange={(event: any) => handleBeneficiaryChange(event.target.value)}
//                 />

//                 {/* {selectedBeneficiary && ( */}
//                   <>
//                     <Input
//                       label="Beneficiary Bank"
//                       name={'beneficiaryBank'}
//                       type="text"
//                       // value={selectedBeneficiary.bankName || ''}
//                     />
//                     <Input
//                       label="Beneficiary Account Number"
//                       name={'beneficiaryAccountNumber'}
//                       type="text"
//                       // value={selectedBeneficiary.accountNumber || ''}
//                     />
//                   </>
//                 {/* )} */}

//                 <Input
//                   label="Transfer From"
//                   name={'transferFrom'}
//                   type="text"
//                   error={formik.errors.transferFrom}
//                   touched={formik.touched.transferFrom}
//                 />

//                 <Input
//                   label="Transfer Amount"
//                   name={'transferAmount'}
//                   type="number"
//                   error={formik.errors.transferAmount}
//                   touched={formik.touched.transferAmount}
//                 />

//                 <Input
//                   label="Transfer Purpose"
//                   name={'transferPurpose'}
//                   type="text"
//                   error={formik.errors.transferPurpose}
//                   touched={formik.touched.transferPurpose}
//                 />
//               </div>
//             </FormLayout>

//             {isLoading && (
//               <div className="flex w-full justify-center">
//                 <BarLoader color="#21B25F" />
//               </div>
//             )}

//             <div className="flex w-full justify-end gap-6 pb-9">
//               <Button
//                 label="Cancel"
//                 type="button"
//                 className="button-secondary h-14 w-[270px] px-3 py-[19px] text-sm"
//               />
//               <Button
//                 label="Transfer Amount"
//                 type="submit"
//                 className="button-primary h-14 w-[270px] px-3 py-[19px] text-sm"
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default page;
