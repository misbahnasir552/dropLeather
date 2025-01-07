'use client';

import { Form, Formik } from 'formik';
// import router from 'next/route';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import H6 from '@/components/UI/Headings/H6';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
// import SuccessModal from '@/components/UI/Modal/SuccessModal';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  GetUserInfoDetails,
  updateUserSchema,
} from '@/validations/admin/userManagement/updateUser';
// import { title } from 'process';

function UpdateUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roles, setRoles] = useState([]);
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  console.log('admin data is', adminData);
  const UserInfoInitialValues = GetUserInfoDetails();
  console.log('userinfordetailscbvc', UserInfoInitialValues);
  // const name=adminData.name
  // const { adminRole } = adminData;
  const { managerMobile } = adminData;
  const { apiSecret } = adminData;
  const { jwt } = adminData;
  const email = searchParams.get('email');
  console.log('email is', email, setDescription);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get('admin/getProfileNames');
        console.log('response of getProfileNames', response);
        //  if(response?.data.length?){
        if (response?.data) {
          const formattedRoles = response.data.map((role: string) => ({
            value: role,
            label: role,
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
      // email: values.email,
      email,
      firstName: values.firstName,
      lastName: values.lastName,
      category: values.category,
      profileName: values.profileName,
      userRole: values.role,
      // userRole: values.userRole,
      // adminRole,
      // status: 'pending',
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response: any = await apiClient.put(
        'admin/updateUser',
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      if (response?.data?.responseCode === '009') {
        console.log('i am in if');
        setTitle(response?.data?.responseMessage);
        setShowModal(true);
        // router.push('/admin/admin-portal/manage-users/search-user');
      }
      console.log('response is', response);
    } catch {
      console.log('hiiiii');
    }
  };

  const handleNavigation = () => {
    // router.push("/admin/admin-portal/manage-users/add-user");
    router.push('/admin/admin-portal/manage-users/search-user/');
  };
  return (
    <>
      {/* <div> */}

      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={'/admin/admin-portal/manage-users/search-user'}
      />
      {/* </div> */}
      <div className="flex flex-col gap-10 px-[150px] pt-12">
        <div className="flex flex-col gap-4">
          <H1>Update User</H1>
          <Formik
            // initialValues={updateUserInitialValues}
            initialValues={UserInfoInitialValues}
            // UserInfoInitialValues
            validationSchema={updateUserSchema}
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
                          name="role"
                          options={[
                            { value: 'maker', label: 'maker' },
                            { value: 'checker', label: 'checker' },
                          ]}
                          formik={formik}
                          error={formik.errors.role}
                          touched={formik.touched.role}
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
                      {/* <Input
                      label={'Email'}
                      type={'text'}
                      name={'email'}
                      error={formik.errors.email}
                      touched={formik.touched.email}
                    /> */}

                      <div className="h-[60px] rounded-lg bg-screen-white px-5 py-[10px]">
                        <div className="text-xs font-normal leading-tight text-secondary-200">
                          Email
                        </div>
                        <div className="text-base font-normal text-secondary-200">
                          {email}
                        </div>
                      </div>
                      <Input
                        label={'First Name'}
                        type={'text'}
                        name="firstName"
                        formik={formik}
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                      />
                      <Input
                        label={'Last Name'}
                        type={'text'}
                        name="lastName"
                        formik={formik}
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
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

export default UpdateUser;
