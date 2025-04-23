'use client';

import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
import { setSettlementForm } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import { generateMD5Hash } from '@/utils/helper';
// import { BarLoader } from 'react-spinners';
import { SettlementDetailsFormData } from '@/utils/onboardingForms/settlementDetails';

import DropdownInput from '../UI/Inputs/DropdownInput';
import ImageInput from '../UI/Inputs/ImageInput';
import CustomModal from '../UI/Modal/CustomModal';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';
// import { SettlementFormInfoSchema } from '@/validations/merchant/onBoarding/settlementInfo';
import settlementDetailsSchema, {
  settlementDetailsInitialValues,
} from './validations/settlementForm';

// interface Field {
//   name: string;
//   label: string;
//   type: string;
//   validation: {
//     errorMessage: string;
//     options?: string[];
//   };
//   image?: string;
//   priority: number;
// }

// interface Category {
//   categoryName: string;
//   fields: Field[];
// }

// interface PageItem {
//   name: string;
//   categories: Category[];
// }

// interface FieldsData {
//   pages: {
//     page: PageItem[];
//   };
// }

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
  // const fieldsData = useAppSelector(
  //   (state: { fields: FieldsData }) => state.fields,
  // );
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const dispatch = useAppDispatch();
  const { currentTab } = useCurrentTab();
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<string | undefined>();
  const [filteredData, setFilteredData] = useState<any[]>();
  const [initialValuesState, setInitialValuesState] = useState<InitialValues>();
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const [formData, setFormData] = useState(
    SettlementDetailsFormData.categories,
  );
  const [apierror, setApierror] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bankName, setBankName] = useState('');

  const getBankNames = async () => {
    try {
      const response: any = await apiClient.get(`merchant/getBankNames`);
      if (response.data.responseCode === '009') {
        setBankName(
          response?.data?.bankNames?.map((item: any) => ({
            label: item.label,
            value: item.value,
          })),
        );
      } else if (response?.data?.responseCode === '000') {
        setApierror(response?.data?.responseDescription);
      } else {
        setTitle('Error Occured');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      }
    } catch (e) {
      console.log(e, 'Error', apierror);
    }
  };

  useEffect(() => {
    console.log(
      initialValuesState,
      setFormData,
      formData,
      setInitialValuesState,
      getBankNames(),
      [],
    );
    // const initialValues: InitialValues = {};

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);

      // let updatedFData = fieldsData?.pages?.page?.filter(
      //   (item) => convertSlugToTitle(item.name) === title,
      // );

      const updatedFormData = SettlementDetailsFormData.categories?.map(
        (category) => {
          let updatedFields = category.fields;

          updatedFields = updatedFields.map((field: any) => {
            if (field.name === 'bankName') {
              return {
                ...field,
                options: bankName,
              };
            }
            return field;
          });
          const hasAssociationField = category.fields.some(
            (field: any) =>
              field.name === 'bank' && field.type === 'checkBoxInput',
          );

          if (!hasAssociationField) return category;
          if (
            selectedCheckValue === 'easypaisaBankLimited' ||
            selectedCheckValue === '' ||
            selectedCheckValue === undefined
          ) {
            console.log('here i am ');
            // console.log("updated fields",updatedFields)
            updatedFields = category.fields.filter(
              (field: any) => field.name !== 'bankName',
            );
            console.log('updated fields ', updatedFields);
          }

          return {
            ...category,
            fields: updatedFields,
          };
        },
      );

      setFilteredData(updatedFormData);
    }
  }, [currentTab, selectedCheckValue]);

  // if (!initialValuesState || !filteredData) {
  //   setTimeout(() => {}, 12000);
  //   return (
  //     <div className="flex w-full flex-col justify-center">
  //       <BarLoader color="#21B25F" />
  //     </div>
  //   );
  // }

  const onSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    // const req = {
    //   managerMobile: userData.managerMobile,
    //   account: values.accounts,
    //   bankName:
    //     values?.bankName !== '' ? values?.bankName : 'Easypaisa Bank Limited',
    //   accountNumber: values.accountNumber,
    //   accountTitle: values.accountTitle,
    //   status: 'Completed',
    // };

    const transformedRequest = {
      // request: {
      managerMobile: userData.managerMobile,
      page: {
        pageName: SettlementDetailsFormData?.pageName,
        categories: SettlementDetailsFormData?.categories.map(
          (category: any) => ({
            categoryName: `Settlement Details`,
            data: category.fields.map((field: any) => ({
              label: field.label,
              // value: values[field.name] || '', // Fetching value from formik.values
              value:
                field.type === 'checkBoxInputMulti' ? '' : values[field.name], // Fetching value from formik.values
              ...(field.type === 'checkboxInput' ||
              field.type === 'checkBoxInputMulti'
                ? { options: values[field.name] || '' }
                : {}), // Add options only if it's a checkbox
            })),
          }),
        ),
        status: 'Completed',
      },
      // },
    };

    const mdRequest = {
      ...transformedRequest,
      apisecret: userData.apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response: any = await apiClient.post(
        `merchant/settlementdetails`,
        {
          request: transformedRequest,
          signature: md5Hash,
        },
        {
          params: {
            username: userData?.email,
          },
          headers: {
            Authorization: `Bearer ${userData?.jwt}`,
            username: userData.email,
          },
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
  console.log('asdads', selectedCheckValue);

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
        initialValues={settlementDetailsInitialValues}
        validationSchema={settlementDetailsSchema}
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
                  {filteredData?.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                      {/* {item?.categories?.map((category:any, categoryIndex:any) => ( */}
                      <FormLayoutDynamic key={item} heading={item.categoryName}>
                        {item.fields.map((field: any, fieldIndex: any) => {
                          return field.type === 'text' ? (
                            <Input
                              key={fieldIndex}
                              label={field.label}
                              name={field.name}
                              type={field.type}
                              formik={formik}
                              asterik={field.required}
                              error={field.validation?.errorMessage}
                            />
                          ) : field?.type === 'checkBoxInput' ? (
                            <CheckboxInput
                              key={fieldIndex}
                              isMulti={false}
                              name={field.name}
                              options={field.options}
                              form={formik}
                              error={field.validation?.errorMessage}
                              setSelectedCheckValue={setSelectedCheckValue}
                            />
                          ) : field.type === 'dropdown' ? (
                            <DropdownInput
                              key={fieldIndex}
                              label={field.label}
                              name={field.name}
                              options={field.options}
                              formik={formik}
                              // error={field.validation.errorMessage}
                            />
                          ) : field?.type === 'imageInput' ? (
                            <ImageInput
                              key={fieldIndex}
                              name={field.name}
                              label={field.label}
                              type={field.type}
                              hasImage
                              image={field.image}
                              data={{
                                accNumber: formik?.values?.accountNumber,
                                // easypaisabankLimited otherwise if otherbanks then selected
                                bankName:
                                  selectedCheckValue === 'easypaisabanklimited'
                                    ? 'easypaisabanklimited'
                                    : formik?.values?.bankName,
                              }}
                              formik={formik}
                              selectedCheckValue={selectedCheckValue}
                            />
                          ) : (
                            <p key={fieldIndex}>nothing to show</p>
                          );
                        })}
                      </FormLayoutDynamic>
                      {/* // ))} */}
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
