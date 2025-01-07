'use client';

import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
import React from 'react';

import LineChartGraph from '@/components/Charts/LineChartGraph';
// import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
// import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import {
  merchantHomeInitialValues,
  merchantHomeSchema,
} from '@/validations/merchant/home/merchantHome';
// import type { MerchantPortalHomePage } from "@/interfaces/interface";

const MerchantPortalHome = () => {
  const onSubmit = (values: any) => {
    console.log('hellewwwwwwwww', values);
    //  if (values.graphType) {
    //    router.push("/login");
    //  }
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Welcome to Merchant Portal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <div className="flex flex-col gap-9 rounded-lg border-[0.5px] border-border-light bg-screen-grey px-6 pb-[24px] pt-[60px]">
          <Formik
            initialValues={merchantHomeInitialValues}
            validationSchema={merchantHomeSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-2 gap-5">
                  <DropdownInput
                    name="graphType"
                    label="Graph Type"
                    options={[{ label: 'option1', value: 'option1' }]}
                    error={'payment method is false'}
                    touched={false}
                  />
                  <DropdownInput
                    name="graphDuration"
                    label="Graph Duration"
                    options={[{ label: 'option1', value: 'option1' }]}
                    error={'payment method is false'}
                    touched={false}
                    formik={formik}
                  />
                </div>
              </Form>
            )}
          </Formik>

          <Button
            label="Generate"
            className="button-primary h-9 w-[120px] text-xs"
          />
        </div>
        {/* <TableComponent /> */}
        <LineChartGraph />
      </div>
      {/* <div className="flex pt-[40px]">
        <SearchTransactionTable
          tableHeadings={tableHeadings}
          tableData={tableData}
        />
      </div> */}
    </>
  );
};

export default MerchantPortalHome;

// {/* <div className="flex flex-col gap-6">
//   <HeaderWrapper
//     heading="Welcome to Merchant Portal"
//     description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
//   />
//   <div className="flex flex-col gap-9 rounded-lg border-[0.5px] border-border-light bg-screen-grey px-6 pb-[24px] pt-[60px]">
//     <div className="grid grid-cols-2 gap-5">
//       <DropdownInput
//         name="graphType"
//         label="Graph Type"
//         options={[{ text: "option1", value: "option1" }]}
//       />
//       <DropdownInput
//         name="graphType2"
//         label="Graph Duration"
//         options={[{ text: "option1", value: "option1" }]}
//       />
//     </div>
//     <Button
//       label="Generate"
//       className="button-primary h-9 w-[120px] text-xs"
//     />
//   </div>
// </div> */}
