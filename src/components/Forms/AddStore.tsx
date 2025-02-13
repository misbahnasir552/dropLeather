import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';

import { generalCities } from '@/app/merchant/merchant-portal/configuration/add-outlet/utils/data';
import { categories } from '@/app/merchant/merchant-portal/qr-payments/utils/utils';
import AddIcon from '@/assets/icons/Add.svg';
import Button from '@/components/UI/Button/PrimaryButton';
import DisabledField from '@/components/UI/Inputs/DisabledField';
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
// import FormLayout from '../UI/Wrappers/FormLayout';
import H7 from '../UI/Headings/H7';
import M7 from '../UI/Headings/M7';
import CheckboxInput from '../UI/Inputs/CheckboxInput';
import DropdownNew from '../UI/Inputs/DropDownNew';

const AddStore = ({ addStoresValues, setAddStoresValues }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const removeStore = (index: number) => {
    setAddStoresValues((prevStores: any) =>
      prevStores.filter((_: any, i: number) => i !== index),
    );
  };
  const [selectedCheckValue, setSelectedCheckValue] = useState<any>(undefined);
  console.log('ADD STORE SELECTED VALUE', selectedCheckValue);

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
      category: categoryNum,
    };
    console.log('final store:', finalStore);

    setAddStoresValues((prevStores: any) => [...prevStores, finalStore]);
    resetForm();
  };

  console.log('stores are', addStoresValues);

  const disabledFieldData = [
    {
      value: '92',
      label: 'Country Code',
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-screen-grey sm:px-[40px] sm:py-[20px] md:px-[290px] md:py-[60px]">
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
                  <Form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <H7>Store Type</H7>
                      <CheckboxInput
                        isMulti
                        name="storeType"
                        options={[
                          {
                            value: 'Online Payments',
                            label: 'Online Payments',
                          },
                          { value: 'Retail', label: 'Retail' },
                        ]}
                        form={formik}
                        setSelectedCheckValue={setSelectedCheckValue}
                        error={formik.errors.storeType}
                      />
                    </div>
                    <div className="sm:grid sm:grid-cols-1 sm:gap-6 md:grid md:grid-cols-2 md:gap-6">
                      {(() => {
                        const isOnline =
                          selectedCheckValue?.includes('Online Payments');
                        const isRetail = selectedCheckValue?.includes('Retail');

                        return (
                          <>
                            {isRetail && (
                              <Input
                                asterik
                                label="Store Name"
                                name="storeName"
                                type="text"
                                error={formik.errors.storeName}
                                touched={formik.touched.storeName}
                              />
                            )}
                            {isOnline && (
                              <>
                                <Input
                                  asterik
                                  label="Website Name"
                                  name="websiteName"
                                  type="text"
                                  error={formik.errors.websiteName}
                                  touched={formik.touched.websiteName}
                                />
                                <Input
                                  asterik
                                  label="Website URL"
                                  name="websiteURL"
                                  type="text"
                                  error={formik.errors.websiteURL}
                                  touched={formik.touched.websiteURL}
                                />
                              </>
                            )}
                          </>
                        );
                      })()}
                      <DropdownInput
                        asterik
                        label="Category"
                        name="category"
                        options={categories}
                        formik={formik}
                        error={formik.errors.category}
                        touched={formik.touched.category}
                      />
                      <DropdownNew
                        asterik
                        label="City"
                        name="city"
                        options={generalCities}
                        formik={formik}
                        error={formik.errors.city}
                        touched={formik.touched.city}
                      />
                      <Input
                        asterik
                        label="Street Address"
                        name="streetAddress"
                        type="text"
                        error={formik.errors.streetAddress}
                        touched={formik.touched.streetAddress}
                      />
                      {/* <Input
                        label="Country Code"
                        name="countryCode"
                        type="text"
                        error={formik.errors.countryCode}
                        touched={formik.touched.countryCode}
                      /> */}

                      <DisabledField data={disabledFieldData} />
                      <Input
                        asterik
                        label="State"
                        name="state"
                        type="text"
                        error={formik.errors.state}
                        touched={formik.touched.state}
                      />
                      <Input
                        asterik
                        label="POS Country Code"
                        name="posCountryCode"
                        type="text"
                        error={formik.errors.posCountryCode}
                        touched={formik.touched.posCountryCode}
                      />
                      <Button
                        label={`Save`}
                        type="submit"
                        className={`button-primary w-full px-4 py-[18px] text-sm leading-tight transition duration-300`}
                      />
                    </div>
                  </Form>
                  {addStoresValues.length > 0 ? (
                    <DisabledInput
                      data={addStoresValues}
                      removeStore={removeStore}
                    />
                  ) : null}
                </>
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default AddStore;
