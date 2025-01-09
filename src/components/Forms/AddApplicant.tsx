import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import AddIcon from '@/assets/icons/Add.svg';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setApplicants } from '@/redux/features/formSlices/onBoardingForms';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
import {
  addApplicantFormSchema,
  addApplicantInitialValues,
} from '@/validations/merchant/onBoarding/addApplicant';

import H6 from '../UI/Headings/H6';
import CheckboxInput from '../UI/Inputs/CheckboxInput';
import CheckboxItem from '../UI/Inputs/CheckboxItem';
import DateInputNew from '../UI/Inputs/DateInputNew';
// import apiClient from '@/api/apiClient';
import DropdownNew from '../UI/Inputs/DropDownNew';
import FormLayoutDynamic from '../UI/Wrappers/FormLayoutDynamic';

// const AddApplicant = () => {
const AddApplicant = (onDataChange: any) => {
  // console.log("VALUES ADD APP ", addApplicant);
  const dispatch = useAppDispatch();

  const [applicantForms, setApplicantForms] = useState<any[]>([]);

  const [filteredFields, setFilteredFields] = useState<any[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  const fieldData = useAppSelector((state: any) => state.fields);
  const applicantsStore = useAppSelector(
    (state: any) => state.onBoardingForms.addApplicants,
  );
  console.log(
    'Component, add redux applicants',
    applicantsStore,
    selectedCheckValue,
  );

  const combinedData = applicantsStore.flat();
  // .slice(1);
  console.log('com length ', combinedData, combinedData.length);

  useEffect(() => {
    if (
      combinedData.length >= 1 &&
      combinedData.length !== applicantForms.length
    ) {
      const newForms =
        applicantForms.length > combinedData.length
          ? applicantForms
          : combinedData.map((applicant: any, index: number) => ({
              id: index + 1,
              initialValues: applicant,
            }));

      setApplicantForms(newForms);
    }

    console.log('HERE ELSE ', applicantsStore, applicantForms);

    if (fieldData?.pages) {
      const formData = fieldData.pages?.page?.find(
        (item: { name: string }) =>
          convertSlugToTitle(item.name) === 'Application Form',
      );

      if (formData) {
        const selectedCategories = formData.categories.filter((category: any) =>
          ['Applicant Details'].includes(category.categoryName),
        );
        setFilteredFields(selectedCategories);
      }
    }
  }, [applicantForms.length, applicantsStore.length, fieldData]);

  const handleAddNewApplicant = () => {
    const newIndex = applicantForms.length + 1;
    console.log('APP ADD FORM ', applicantForms, newIndex);

    setApplicantForms((prev) => [
      ...prev,
      { id: newIndex, initialValues: addApplicantInitialValues },
    ]);
  };
  const saveApplicant = (index: number, values: any) => {
    console.log('Applicant VALUESSSSS issueee:', values, index);

    if (values?.id) {
      dispatch(setApplicants(values));
    } else {
      console.log('IN ELSE ', index);

      dispatch(
        setApplicants({
          ...values,
          id: index,
        }),
      );
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  console.log('addApplicantInitialValues >>> ', addApplicantInitialValues);

  return (
    <div key={'id'} className="flex flex-col justify-end gap-9">
      {applicantForms.map((form, index) => (
        <>
          <Formik
            initialValues={form.initialValues}
            validationSchema={addApplicantFormSchema}
            onSubmit={() => {}} // No submit button here
            validate={(values) => {
              saveApplicant(index, values);
            }}
          >
            {(formik) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col justify-end gap-9">
                  {filteredFields.map((category, categoryIndex) => (
                    <React.Fragment key={`${categoryIndex}-${form.id}`}>
                      <FormLayoutDynamic
                        heading={`${category.categoryName} (${index + 1})`}
                      >
                        {[...category.fields]
                          .sort((a, b) => a.priority - b.priority)
                          .map((field, fieldIndex) => {
                            switch (field.type) {
                              case 'text':
                                return (
                                  <Input
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    type="text"
                                    error={field.validation?.errorMessage}
                                    placeholder={field?.placeholder}
                                    onBlur={(e: any) => {
                                      formik.handleChange(e);
                                      onDataChange(index, formik.values);
                                    }}
                                  />
                                );
                              case 'dropDown':
                                return (
                                  <DropdownInput
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    options={field.validation?.options?.map(
                                      (option: any) => ({
                                        label: option,
                                        value: option
                                          .toLowerCase()
                                          .replace(/\s+/g, ''),
                                      }),
                                    )}
                                    formik={formik}
                                    error={field.validation?.errorMessage}
                                    onClick={(e: any) => {
                                      formik.handleChange(e);
                                      onDataChange(index, formik.values);
                                    }}
                                  />
                                );
                              case 'dropDownList':
                                return (
                                  <DropdownNew
                                    key={fieldIndex}
                                    label={field.label}
                                    name={field.name}
                                    options={field.validation?.options?.map(
                                      (option: any) => ({
                                        label: option,
                                        value: option
                                          .toLowerCase()
                                          .replace(/\s+/g, ''),
                                      }),
                                    )}
                                    formik={formik}
                                    error={field.validation?.errorMessage}
                                    onClick={(e: any) => {
                                      formik.handleChange(e);
                                      onDataChange(index, formik.values); // Update parent dynamically
                                    }}
                                  />
                                );
                              case 'date':
                                return (
                                  <DateInputNew
                                    key={fieldIndex}
                                    formik={formik}
                                    label={field.label}
                                    name={field.name}
                                    error={field.validation?.errorMessage}
                                  />
                                );
                              case 'checkItem':
                                return (
                                  <CheckboxItem
                                    key={fieldIndex}
                                    description={field.label}
                                    isChecked={isChecked}
                                    handleCheckboxChange={handleCheckboxChange}
                                  />
                                );
                              case 'checkBoxInput':
                                return (
                                  <CheckboxInput
                                    key={fieldIndex}
                                    name={field.name}
                                    error={field.validation?.errorMessage}
                                    options={field.validation?.options}
                                    form={formik}
                                    setSelectedCheckValue={
                                      setSelectedCheckValue
                                    }
                                  />
                                );
                              default:
                                return (
                                  <p key={fieldIndex}>Unsupported field type</p>
                                );
                            }
                          })}
                      </FormLayoutDynamic>
                    </React.Fragment>
                  ))}
                </div>
              </Form>
            )}
          </Formik>
        </>
      ))}

      <div className="rounded-lg border-[1px] border-border-light bg-screen-grey sm:px-5 sm:py-6 md:px-[5px] md:py-[21px]">
        <div className="flex items-center">
          <Image
            src={AddIcon}
            alt="plus-icon"
            className="cursor-pointer"
            onClick={handleAddNewApplicant}
          />
          <H6>Add New Applicant</H6>
        </div>
      </div>
    </div>
  );
};

export default AddApplicant;
