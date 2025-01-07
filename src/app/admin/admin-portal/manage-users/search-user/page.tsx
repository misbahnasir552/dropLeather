'use client';

import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import apiClient from '@/api/apiClient';
import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
// import DateInputNew from "@/components/UI/Inputs/DateInputNew";
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  searchUserInitialValues,
  searchUserSchema,
} from '@/validations/admin/userManagement/searchUser';

function Admin() {
  // const userData = useAppSelector((state: any) => state.auth);
  const router = useRouter();
  // const [responseData, setResponseData] = useState<string[] | null>(null);
  // const  [filteredData, setFilteredData] = useState<string[] | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const adminData = useAppSelector((state: any) => state.adminAuth);
  const { adminRole } = adminData;
  const { managerMobile } = adminData;

  console.log('admin role is', adminRole);

  const fetchAllUsers = async (pageNumber: any) => {
    try {
      const response = await apiClient.get(
        `admin/showAllUsersWithPagination?page=${pageNumber}&size=10`,
      );
      console.log('response of get All Users', response);
      if (response?.data) {
        setResponseData(response.data.users);
        setFilteredData(response.data.users);
        setTotalPages(response.data.totalPages);
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };

  useEffect(() => {
    fetchAllUsers(pageNumber);
  }, []);

  const onSubmit = async (values: any) => {
    console.log('hellerrr', values);
  };

  const handleUserNavigation = () => {
    router.push('/admin/admin-portal/manage-users/add-user');
    // admin/admin-portal/manage-users/search-user/
  };

  const handleUserSearch = async (values: any) => {
    console.log('values is', values);
    const req = {
      managerMobile,
      email: values.email,
      firstName: values.firstName,
      status: values.status,
    };

    const mdRequest = {
      ...req,
      apisecret: adminData.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const updatedFilteredData = await apiClient.post(
        `admin/searchUsersWithPagination?page=${pageNumber}&size=10`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${adminData.jwt}` },
        },
      );
      console.log('updatedFilteredData', updatedFilteredData);
      setFilteredData(updatedFilteredData.data?.users);
      console.log('Filtered response data', updatedFilteredData);
      console.log('Filtered data', filteredData);
      setResponseData(updatedFilteredData.data?.users);
      setTotalPages(updatedFilteredData.data.totalPages);
      console.log('Response data', responseData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleReset = (formik: any) => {
    formik.resetForm();
    fetchAllUsers(0);
  };

  const handleProfileNavigation = () => {
    router.push('/admin/admin-portal/add-profile/');
  };

  const showNextPage = () => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + 1;
      fetchAllUsers(newPageNumber);
      return newPageNumber;
    });
  };

  const showPrevPage = () => {
    console.log('i am on previous page');

    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber - 1;
      fetchAllUsers(newPageNumber);
      return newPageNumber;
    });
  };
  return (
    <div className="flex flex-col gap-10 px-[150px] pt-12">
      <div className="flex flex-col gap-4">
        <H1>Manage Users</H1>
        <Formik
          initialValues={searchUserInitialValues}
          validationSchema={searchUserSchema}
          onSubmit={onSubmit}
        >
          {(formik: any) => (
            <Form>
              <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
                <div className="grid w-full grid-cols-3 gap-5 p-9 pl-6">
                  <Input
                    label={'Email'}
                    type={'text'}
                    name="email"
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    formik={formik}
                  />
                  <Input
                    label={'First Name'}
                    type={'text'}
                    name="firstName"
                    formik={formik}
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />

                  <DropdownInput
                    label="Status"
                    name="status"
                    options={[
                      { value: 'Pending', label: 'Pending' },
                      { value: 'Approved', label: 'Approved' },
                    ]}
                    formik={formik}
                    error={formik.errors.status}
                    touched={formik.touched.status}
                  />
                </div>
                <div className="flex w-full items-end justify-end gap-5 px-6">
                  <Button
                    label="Search"
                    //  onClickHandler={handleSearchItems}
                    onClickHandler={() => handleUserSearch(formik.values)}
                    // type="submit"
                    className="button-primary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                  />

                  <Button
                    label="Reset"
                    //  onClickHandler={() => setResponseData(originalData)}
                    className="button-secondary w-[180px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    onClickHandler={() => handleReset(formik)}
                  />
                  {adminRole == 'maker' || adminRole == 'super' ? (
                    responseData ? (
                      <Button
                        label="Add User"
                        className="button-secondary w-[180px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                        onClickHandler={handleUserNavigation}
                      />
                    ) : (
                      <Button
                        label="Add Profile"
                        className="button-secondary w-[180px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                        onClickHandler={handleProfileNavigation}
                      />
                    )
                  ) : null}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="table">
        <div className="overflow-x-auto">
          {/* <Table /> */}
          {responseData ? (
            <MerchantRecordTable response={filteredData} title={'admin'} />
          ) : null}
          {responseData ? (
            <div className="mt-4 flex justify-between">
              <button
                onClick={showPrevPage}
                disabled={pageNumber + 1 === 1}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
              >
                Previous
              </button>
              <span>
                Page {pageNumber + 1} of {totalPages}
              </span>
              <button
                onClick={showNextPage}
                disabled={pageNumber + 1 === totalPages}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Admin;
