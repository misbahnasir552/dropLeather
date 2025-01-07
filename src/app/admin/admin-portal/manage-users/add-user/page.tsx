'use client';

import { Form, Formik } from 'formik';
// import router from 'next/router';
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import H6 from '@/components/UI/Headings/H6';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  addUserInitialValues,
  addUserSchema,
} from '@/validations/admin/userManagement/addUser';
// import DualListTable from '@/components/DualListTable';
// import { useRouter} from 'next/navigation';

function AddUser() {
  const [roles, setRoles] = useState([]);
  const [apierror, setApierror] = useState('');
  const adminData = useAppSelector((state: any) => state.adminAuth);
  // const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log('admin data is', adminData, setDescription);

  // const name=adminData.name
  const { adminRole } = adminData;
  const { managerMobile } = adminData;
  const { apiSecret } = adminData;
  const { jwt } = adminData;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get('admin/getProfileNames');
        console.log('response of getProfileNames', response);
        //  if(response?.data.length?){
        if (response?.data) {
          const formattedRoles = response.data.profiles.map((profile: any) => ({
            value: profile.profileName, // Assign profileName to the value
            label: profile.profileName, // Assign profileName to the label
          }));
          setRoles(formattedRoles);
        }

        console.log('roles are', roles);
        //  }
      } catch (e) {
        console.log(e, 'error fetching');
      }
    };

    fetchProfiles();
  }, []);

  const onSubmit = async (values: any) => {
    console.log('I am on add users');
    console.log('I am on add users values', values);

    const req = {
      managerMobile,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      category: values.category,
      profileName: values.profileName,
      userRole: values.userRole,
      mobileNumber: values.mobileNumber,
      adminRole,
      status: 'pending',
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response: any = await apiClient.post(
        'admin/addUser',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );
      console.log('response is', response);
      if (response?.data?.responseCode === '009') {
        setTitle(response?.data?.responseMessage);
        setShowModal(true);
        console.log('hereeeeee');
        // router.push('/admin/admin-portal/manage-users/search-user/');
      } else {
        console.log('Failure');
        setApierror(response?.data?.responseMessage);
        throw new Error('Error fetching');
      }
    } catch {
      console.log('hiiiii');
    }
  };

  const handleNavigation = () => {
    // router.push("/admin/admin-portal/manage-users/add-user");
    // admin/admin-portal/manage-users/search-user/
  };
  return (
    <>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={'/admin/admin-portal/manage-users/search-user'}
      />
      <div className="flex flex-col gap-10 px-[150px] pt-12">
        <div className="flex flex-col gap-4">
          <H1>Add User</H1>
          <Formik
            initialValues={addUserInitialValues}
            validationSchema={addUserSchema}
            onSubmit={onSubmit}
          >
            {(formik: any) => (
              <Form>
                <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
                  <div className="w-full gap-5 px-[290px]">
                    <div className="flex flex-col gap-4">
                      <H6>User Category:</H6>

                      <DropdownInput
                        label="Category"
                        name="category"
                        options={[
                          { value: 'admin', label: 'admin' },
                          { value: 'merchant', label: 'merchant' },
                        ]}
                        formik={formik}
                        error={formik.errors.category}
                        touched={formik.touched.category}
                      />

                      {formik.values.category == 'admin' ? (
                        <DropdownInput
                          label="User Role"
                          name="userRole"
                          options={[
                            { value: 'maker', label: 'maker' },
                            { value: 'checker', label: 'checker' },
                          ]}
                          formik={formik}
                          error={formik.errors.userRole}
                          touched={formik.touched.userRole}
                        />
                      ) : null}

                      {/* <div className='flex flex-col gap-4'> */}

                      <H6>User Details:</H6>
                      {/* <Input
                    label={'Login ID'}
                    type={'text'}
                    name={'profileName'}
                     error={formik.errors.profileName}
                    touched={formik.touched.profileName}
                    /> */}
                      <Input
                        label={'Email'}
                        type={'text'}
                        name={'email'}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                      />
                      <Input
                        label={'First Name'}
                        type={'text'}
                        name={'firstName'}
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                      />
                      <Input
                        label={'Last Name'}
                        type={'text'}
                        name={'lastName'}
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
                      />
                      <Input
                        label={'Mobile Number'}
                        type={'text'}
                        name={'mobileNumber'}
                        error={formik.errors.mobileNumber}
                        touched={formik.touched.mobileNumber}
                      />
                      <H6>User Profile</H6>
                      <div className="flex flex-col">
                        <DropdownInput
                          label="Profile Name"
                          name="profileName"
                          options={roles}
                          formik={formik}
                          error={formik.errors.profileName}
                          touched={formik.touched.profileName}
                        />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="flex w-full justify-start px-[290px] pt-[8px] text-xs text-danger-base">
                    {apierror}
                  </div>

                  <div className="flex w-full items-end justify-end gap-9">
                    <Button
                      label="Cancel"
                      className="button-secondary w-[270px] px-2 py-[19px] text-xs leading-tight transition duration-300"
                      onClickHandler={handleNavigation}
                    />
                    <Button
                      label="Save"
                      type="submit"
                      className="button-primary w-[270px] px-2 py-[19px] text-xs leading-tight transition duration-300"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default AddUser;
