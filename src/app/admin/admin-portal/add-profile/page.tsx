'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import H6 from '@/components/UI/Headings/H6';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  addProfileInitialValues,
  addProfileSchema,
} from '@/validations/admin/profile/addProfile';

const Profile = () => {
  // const [isChecked, setChecked] = useState(false);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | string[] | undefined
  >();
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const adminData = useAppSelector((state: any) => state.adminAuth);

  // console.log('admin data is', adminData);

  const { name } = adminData;
  const { adminRole } = adminData;
  const { managerMobile } = adminData;
  const { apiSecret } = adminData;
  const { jwt } = adminData;

  const checkboxData: any[] = [
    {
      value: 'add-user',
      label: 'Add User',
    },
    {
      value: 'update-user',
      label: 'Update User',
    },
    {
      value: 'search-user',
      label: 'Search User',
    },
  ];

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('values are', values);
    console.log('i am here to reg', selectedCheckValue);

    const req = {
      managerMobile,
      profileName: values.profileName,
      profileType: values.profileType,
      // created by admin login name
      createdBy: name,
      // created by logged admin admin role
      adminRole,
      // dont send to be. modified by and approval date
      // modifiedBy: values.modifiedBy,
      // approveDate: values.approveDate,
      // status: values.status,
      pages: values.pages,
    };

    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };
    //  {

    //         },

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      // setIsLoading(true);
      const response = await apiClient.post(
        'admin/addProfile',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      if (response.data.responseCode === '009') {
        router.push('/admin/admin-portal/manage-users/add-user');
      } else {
        console.log('hi');
      }
    } catch (e: any) {
      console.log('Error submitting form', e);
    } finally {
      // setIsLoading(false);
      console.log('hi');
      // setShowModal(true);
    }
    setSubmitting(false);
  };

  // const handleCheckboxChange = () => {
  //   setChecked(!isChecked);
  // };

  return (
    <div className="flex flex-col px-[150px] ">
      <div className="flex pb-[40px] pt-[48px]">
        <H1>Add Profile</H1>
      </div>
      <Formik
        initialValues={addProfileInitialValues}
        validationSchema={addProfileSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
              <div className="flex w-full flex-col gap-5 px-[290px]">
                <H6>Profile Details</H6>
                <Input
                  label="Profile Name"
                  name="profileName"
                  type="text"
                  error={formik.errors.profileName}
                  touched={formik.touched.profileName}
                />
                <DropdownInput
                  label="Profile Type"
                  name="profileType"
                  options={[
                    { value: 'merchant', label: 'merchant' },
                    { value: 'admin', label: 'admin' },
                  ]}
                  formik={formik}
                  error={formik.errors.profileType}
                  touched={formik.touched.profileType}
                />

                {/* <Input
                    label="Created By"
                    name="createdBy"
                    type="text"
                    error={formik.errors.createdBy}
                    touched={formik.touched.createdBy}
                  /> */}
                {/* <Input
                    label="Modified By"
                    name="modifiedBy"
                    type="text"
                    error={formik.errors.modifiedBy}
                    touched={formik.touched.modifiedBy}
                  /> */}
                {/* <Input
                    label="Approval Date"
                    name="approveDate"
                    type="text"
                    error={formik.errors.approveDate}
                    touched={formik.touched.approveDate}
                  /> */}
                {/* <Input
                    label="Status"
                    name="status"
                    type="text"
                    error={formik.errors.status}
                    touched={formik.touched.status}
                  /> */}
                {/* <div> */}
                <H6>Please Select Pages</H6>

                <CheckboxInput
                  setSelectedCheckValue={setSelectedCheckValue}
                  name="pages"
                  options={checkboxData}
                  isMulti={true}
                  form={formik}
                />
                {/* </div> */}

                <div className="flex flex-col justify-center gap-9 sm:items-center md:items-end">
                  <Button
                    label={`Add Profile`}
                    type="submit"
                    // isDisabled={!isChecked}
                    //   className={`button-primary ${
                    //     isLoading && 'bg-neutral-black-300'
                    //   } w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                    // />
                    className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
