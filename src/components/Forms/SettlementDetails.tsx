'use client';

import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setSettlementForm } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
import { SettlementFormInfoSchema } from '@/validations/merchant/onBoarding/settlementInfo';

import DropdownInput from '../UI/Inputs/DropdownInput';
import ImageInput from '../UI/Inputs/ImageInput';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';

interface Field {
  name: string;
  label: string;
  type: string;
  validation: {
    errorMessage: string;
    options?: string[];
  };
  image?: string;
  priority: number;
}

interface Category {
  categoryName: string;
  fields: Field[];
}

interface PageItem {
  name: string;
  categories: Category[];
}

interface FieldsData {
  pages: {
    page: PageItem[];
  };
}

interface UserData {
  managerMobile: string;
  email: string;
  apiSecret: string;
  jwt: string;
}

interface InitialValues {
  [key: string]: any;
}

// interface FormValues {
//   accounts: string;
//   bankName?: string;
//   accountNumber: string;
//   accountTitle?: string;
// }

const SettlementDetails = () => {
  const fieldsData = useAppSelector(
    (state: { fields: FieldsData }) => state.fields,
  );
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const dispatch = useAppDispatch();
  const { currentTab } = useCurrentTab();
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<string | undefined>();
  const [filteredData, setFilteredData] = useState<PageItem[] | undefined>();
  const [initialValuesState, setInitialValuesState] = useState<InitialValues>();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const initialValues: InitialValues = {};
    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);

      let updatedFData = fieldsData.pages.page.filter(
        (item) => convertSlugToTitle(item.name) === title,
      );

      updatedFData = updatedFData?.map((item) => {
        return {
          ...item,
          categories: item.categories.map((category) => {
            let updatedFields = category.fields;

            if (
              selectedCheckValue === 'easypaisabanklimited' ||
              selectedCheckValue === '' ||
              selectedCheckValue === undefined
            ) {
              updatedFields = category.fields.filter(
                (field) => field.name !== 'bankName',
              );
            }

            return {
              ...category,
              fields: updatedFields,
            };
          }),
        };
      });

      setFilteredData(updatedFData);

      updatedFData?.forEach((item) => {
        item.categories.forEach((category) => {
          category.fields.forEach((field) => {
            initialValues[field.name] = '';
          });
        });
        setInitialValuesState(initialValues);
      });
    }
  }, [currentTab, fieldsData.pages.page, selectedCheckValue]);

  if (!initialValuesState || !filteredData) {
    setTimeout(() => {}, 12000);
    return (
      <div className="flex w-full flex-col justify-center">
        <BarLoader color="#21B25F" />
      </div>
    );
  }

  const onSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    const req = {
      managerMobile: userData.managerMobile,
      account: values.accounts,
      bankName:
        values?.bankName !== '' ? values?.bankName : 'Easypaisa Bank Limited',
      accountNumber: values.accountNumber,
      accountTitle: values.accountTitle,
      status: 'Completed',
    };

    const mdRequest = {
      ...req,
      apisecret: userData.apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response: any = await apiClient.post(
        `merchant/settlementdetails`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          params: {
            username: userData?.email,
          },
          headers: { Authorization: `Bearer ${userData?.jwt}` },
        },
      );
      if (response.data.responseCode === '009') {
        dispatch(setSettlementForm(values));
        router.push('/merchant/home/business-nature/integration');
      } else if (response?.data?.responseCode === '000') {
        setTitle('Error Occured');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      } else {
        setTitle('Error Occured');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      }
    } catch (e) {
      console.log(e, 'Error');
    }
    setSubmitting(false);
  };
  console.log('asdads', filteredData, selectedCheckValue);

  return (
    <div>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={attachRoute}
        // routeName="/merchant/home"
      />
      <Formik
        initialValues={initialValuesState}
        validationSchema={SettlementFormInfoSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="flex flex-col">
            <Form className="flex flex-col gap-5">
              <div className="hidden px-[24px] pb-[4px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
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
                              if (field?.type === 'text') {
                                return (
                                  <Input
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    error={field.validation.errorMessage}
                                  />
                                );
                              }
                              if (field?.type === 'checkBoxInput') {
                                return (
                                  <CheckboxInput
                                    // isMulti
                                    key={fieldIndex}
                                    name={field.name}
                                    options={field.validation.options?.map(
                                      (option) => ({
                                        label: option,
                                        value: option
                                          .toLowerCase()
                                          .replace(/\s+/g, ''),
                                      }),
                                    )}
                                    form={formik}
                                    setSelectedCheckValue={
                                      setSelectedCheckValue
                                    }
                                  />
                                );
                              }
                              if (
                                field?.type === 'dropDown'
                                //  &&
                                // selectedCheckValue?.includes('bankaccount')
                              ) {
                                return (
                                  <DropdownInput
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    options={field.validation?.options?.map(
                                      (option: string) => ({
                                        label: option,
                                        value: option
                                          .toLowerCase()
                                          .replace(/\s+/g, ''),
                                      }),
                                    )}
                                    formik={formik}
                                    error={field.validation.errorMessage}
                                  />
                                );
                              }
                              if (field?.type === 'imageInput') {
                                return (
                                  <ImageInput
                                    key={fieldIndex}
                                    name={field.name}
                                    label={field.label}
                                    type={field.type}
                                    hasImage
                                    image={field.image}
                                    data={{
                                      accNumber: formik?.values?.accountNumber,
                                      bankName: formik?.values?.bankName,
                                    }}
                                    formik={formik}
                                    selectedCheckValue={selectedCheckValue}
                                  />
                                  // <Input
                                  //   label={field.label}
                                  //   name={field.name}
                                  //   type={field.type}
                                  //   value={formik.values.accountTitle}
                                  //   // error={formik.errors.accountTitle}
                                  //   // touched={formik.touched.accountTitle}
                                  //   isDisabled
                                  // />
                                );
                              }
                              return null;
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
};

export default SettlementDetails;
