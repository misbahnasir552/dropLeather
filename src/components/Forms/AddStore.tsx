import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

import { categories } from '@/app/merchant/merchant-portal/qr-payments/utils/utils';
import AddIcon from '@/assets/icons/Add.svg';
import Button from '@/components/UI/Button/PrimaryButton';
// import H6 from "@/components/UI/Headings/H6";
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import type { AddStoreInfo } from '@/interfaces/interface';
import {
  addStoreInitialValues,
  addStoreSchema,
} from '@/validations/merchant/onBoarding/addStore';

import DisabledInput from '../StaticFields/DisabledInput';
import H6 from '../UI/Headings/H6';
import M7 from '../UI/Headings/M7';

const AddStore = ({ addStoresValues, setAddStoresValues }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const removeStore = (index: number) => {
    setAddStoresValues((prevStores: any) =>
      prevStores.filter((_: any, i: number) => i !== index),
    );
  };
  const onSubmit = (values: AddStoreInfo, { resetForm }: any) => {
    console.log('i am add store component', values);
    const { category, ...rest } = values;
    const categoryNum: any = categories.find((category: any) => {
      console.log('array val', category.label, 'value simple', category);

      return category.label === values.category;
    });
    console.log(categoryNum, 'category number');

    const finalStore = {
      ...rest,
      category: categoryNum.categoryCode,
    };
    console.log('final store:', finalStore);

    setAddStoresValues((prevStores: any) => [...prevStores, finalStore]);
    resetForm();
  };

  console.log('stores are', addStoresValues);
  return (
    <div className="flex flex-col gap-4 bg-screen-grey px-[290px] py-[60px]">
      <H6>Add Store</H6>
      <div className="rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[21px]">
        <div className="flex items-center">
          <M7>Add Store</M7>
          <Image
            src={AddIcon}
            alt="plus-icon"
            className="cursor-pointer"
            onClick={() => setShowAddForm(true)}
          />
        </div>
      </div>
      <Formik
        initialValues={addStoreInitialValues}
        validationSchema={addStoreSchema}
        onSubmit={onSubmit}
      >
        {(formik: any) => (
          <>
            <div className="flex flex-col gap-4">
              {showAddForm && (
                <>
                  <div className="mt-4 h-[1px] w-full bg-border-light"></div>
                  <div className="flex w-full items-center justify-between">
                    <H6>Add Store Information</H6>
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowAddForm(false)}
                    >
                      <H6 textColor="text-danger-base">Cancel</H6>
                    </div>
                  </div>
                  <Form className="grid grid-cols-2 gap-6">
                    <DropdownInput
                      label="Store Type"
                      name="storeType"
                      options={[
                        { value: 'Online Payments', label: 'Online Payments' },
                        { value: 'Retail', label: 'Retail' },
                      ]}
                      formik={formik}
                      error={formik.errors.storeType}
                      touched={formik.touched.storeType}
                    />
                    <Input
                      label="Website Name"
                      name="websiteName"
                      type="text"
                      error={formik.errors.websiteName}
                      touched={formik.touched.websiteName}
                    />
                    <Input
                      label="Website URL"
                      name="websiteURL"
                      type="text"
                      error={formik.errors.websiteURL}
                      touched={formik.touched.websiteURL}
                    />
                    <DropdownInput
                      label="Category"
                      name="category"
                      options={categories}
                      formik={formik}
                      error={formik.errors.category}
                      touched={formik.touched.category}
                    />
                    <DropdownInput
                      label="City"
                      name="city"
                      options={[
                        { value: 'Pakistan', label: 'Pakistan' },
                        { value: 'India', label: 'India' },
                      ]}
                      formik={formik}
                      error={formik.errors.city}
                      touched={formik.touched.city}
                    />
                    <Input
                      label="Street Address"
                      name="streetAddress"
                      type="text"
                      error={formik.errors.streetAddress}
                      touched={formik.touched.streetAddress}
                    />
                    <Input
                      label="Country Code"
                      name="countryCode"
                      type="text"
                      error={formik.errors.countryCode}
                      touched={formik.touched.countryCode}
                    />
                    <Input
                      label="State"
                      name="state"
                      type="text"
                      error={formik.errors.state}
                      touched={formik.touched.state}
                    />
                    <Input
                      label="POS Country Code"
                      name="posCountryCode"
                      type="text"
                      error={formik.errors.posCountryCode}
                      touched={formik.touched.posCountryCode}
                    />
                    <Button
                      label={`Save`}
                      type="submit"
                      className={`button-primary w-full px-4 py-[19px] text-sm leading-tight transition duration-300`}
                    />
                  </Form>
                </>
              )}
            </div>
          </>
        )}
      </Formik>

      {addStoresValues.length > 0 ? (
        <DisabledInput data={addStoresValues} removeStore={removeStore} />
      ) : null}
    </div>
  );
};

export default AddStore;

// import { Form, Formik } from "formik";
// import Image from "next/image";
// import React, { useState } from "react";

// import AddIcon from "@/assets/icons/Add.svg";
// import Button from "@/components/UI/Button/PrimaryButton";
// // import H6 from "@/components/UI/Headings/H6";
// import DropdownInput from "@/components/UI/Inputs/DropdownInput";
// import Input from "@/components/UI/Inputs/Input";
// import type { AddStoreInfo } from "@/interfaces/interface";
// import {
//   addStoreInitialValues,
//   addStoreSchema,
// } from "@/validations/merchant/onBoarding/addStore";

// import DisabledInput from "../StaticFields/DisabledInput";
// import M7 from "../UI/Headings/M7";

// const AddStore = (formik) => {
//   const [addstores, setAddstores] = useState<AddStoreInfo[]>([]);

//   const onSubmit = (values: AddStoreInfo, resetForm: any) => {
//     console.log("i am add store component", values);
//     setAddstores((prevStores) => [...prevStores, values]);
//     console.log("stores are", addstores);
//     // resetForm();
//   };

//   return (
//     <div className="bg-screen-grey px-[290px] py-[60px]">
//       <div className="rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[21px]">
//         <div className="flex items-center">
//           <M7>Add Store</M7>
//           <Image src={AddIcon} alt="plus-icon" />
//         </div>
//       </div>
//             <DropdownInput
//               label="Store Type"
//               name="storeType"
//               options={[
//                 { value: "Online", text: "Online" },
//                 { value: "Retail", text: "Retail" },
//               ]}
//               formik={formik}
//               error={formik.errors.storeType}
//               touched={formik.touched.storeType}
//             />
//             <Input
//               label="Website Name"
//               name="websiteName"
//               type="text"
//               error={formik.errors.websiteName}
//               touched={formik.touched.websiteName}
//             />
//             <Input
//               label="Website URL"
//               name="websiteURL"
//               type="text"
//               error={formik.errors.websiteURL}
//               touched={formik.touched.websiteURL}
//             />
//             <DropdownInput
//               label="Category"
//               name="category"
//               options={[
//                 { value: "Male", text: "M" },
//                 { value: "Female", text: "F" },
//               ]}
//               formik={formik}
//               error={formik.errors.category}
//               touched={formik.touched.category}
//             />
//             <DropdownInput
//               label="City"
//               name="city"
//               options={[
//                 { value: "Male", text: "M" },
//                 { value: "Female", text: "F" },
//               ]}
//               formik={formik}
//               error={formik.errors.city}
//               touched={formik.touched.city}
//             />
//             <Input
//               label="Street Address"
//               name="streetAddress"
//               type="text"
//               error={formik.errors.streetAddress}
//               touched={formik.touched.streetAddress}
//             />
//             <Input
//               label="Country Code"
//               name="countryCode"
//               type="text"
//               error={formik.errors.countryCode}
//               touched={formik.touched.countryCode}
//             />
//             <Input
//               label="State"
//               name="state"
//               type="text"
//               error={formik.errors.state}
//               touched={formik.touched.state}
//             />
//             <Input
//               label="POS Country Code"
//               name="posCountryCode"
//               type="text"
//               error={formik.errors.posCountryCode}
//               touched={formik.touched.posCountryCode}
//             />
//             <Button
//               label={`Save`}
//               type="submit"
//               className={`button-primary w-full px-4 py-[19px] text-sm leading-tight transition duration-300`}
//             />
//       {addstores.length > 0 ? <DisabledInput data={addstores} /> : null}
//     </div>
//   );
// };

// export default AddStore;
