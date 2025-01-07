'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import MerchantRecordTable from '@/components/Table/MerchantRecordTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H1 from '@/components/UI/Headings/H1';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  searchProfileInitialValues,
  searchProfileSchema,
} from '@/validations/admin/profile/searchProfile';

const Profile = () => {
  // const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const adminData = useAppSelector((state: any) => state.adminAuth);

  const { managerMobile } = adminData;

  const fetchProfiles = async (pageNumber: any) => {
    try {
      const response = await apiClient.get(
        `admin/getAllProfilesWithPagination?page=${pageNumber}&size=10`,
      );
      console.log('response of getProfileNames', response);

      if (response?.data.responseCode === '009') {
        console.log('response is response', response, setDescription);
        setResponse(response?.data?.profiles);
        setTotalPages(response?.data.totalPages);
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };

  useEffect(() => {
    fetchProfiles(pageNumber);
  }, []);

  const handleApproveProfile = (responseMessage: string) => {
    console.group('i am triggered');
    setTitle(responseMessage);
    // setDescription(`Profile "${profileName}" has been approved successfully.`);
    setShowModal(true);
  };

  const handleProfileSearch = async (values: any) => {
    console.log('values is', values);
    const req = {
      managerMobile,
      profileName: values.profileName,
      profileType: values.profileType,
      status: values.status,
    };

    const mdRequest = {
      ...req,
      apisecret: adminData.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const updatedFilteredData = await apiClient.post(
        `admin/searchProfileWithPagination?page=${pageNumber}&size=10`,
        {
          request: req,
          signature: md5Hash,
        },
        {
          headers: { Authorization: `Bearer ${adminData.jwt}` },
        },
      );
      console.log('updatedFilteredData', updatedFilteredData);
      setFilteredData(updatedFilteredData.data?.response);
      console.log('Filtered response data', updatedFilteredData);
      console.log('Filtered data', filteredData);
      setResponse(updatedFilteredData.data?.response);
      setTotalPages(updatedFilteredData.data.totalPages);
      console.log('Response data', response);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  const onSubmit = () => {
    console.log('hellew');
  };

  const handleReset = (formik: any) => {
    formik.resetForm();
    fetchProfiles(0);
  };

  const showNextPage = () => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + 1;
      fetchProfiles(newPageNumber);
      return newPageNumber;
    });
  };

  const showPrevPage = () => {
    console.log('i am on previous page');

    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber - 1;
      fetchProfiles(newPageNumber);
      return newPageNumber;
    });
  };

  return (
    <>
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}

        // routeName={'/admin/admin-portal/manage-users/search-user'}
      />
      <div className="flex flex-col gap-10 px-[150px] pt-12">
        <div className="flex flex-col gap-4">
          <H1>Manage Profiles</H1>
          <Formik
            onSubmit={onSubmit}
            initialValues={searchProfileInitialValues}
            validationSchema={searchProfileSchema}
          >
            {(formik: any) => (
              <Form>
                <div className="border-px w-full rounded-lg border-screen-grey bg-screen-grey py-6">
                  <div className="grid w-full grid-cols-3 gap-5 p-9 pl-6">
                    <Input
                      label={'Profile Name'}
                      type={'text'}
                      name="profileName"
                      formik={formik}
                      error={formik.errors.firstName}
                      touched={formik.touched.firstName}
                    />
                    <DropdownInput
                      label="Profile Type"
                      name="profileType"
                      options={[
                        { value: 'admin', label: 'Admin' },
                        { value: 'merchant', label: 'Merchant' },
                      ]}
                      formik={formik}
                      error={formik.errors.businessMode}
                      touched={formik.touched.businessMode}
                    />
                    <DropdownInput
                      label="Status"
                      name="status"
                      options={[
                        { value: 'Pending', label: 'Pending' },
                        { value: 'Approved', label: 'Approved' },
                        { value: 'Rejected', label: 'Rejected' },
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
                      onClickHandler={() => handleProfileSearch(formik.values)}
                      // type="submit"
                      className="button-primary w-[120px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                    />

                    <Button
                      label="Reset"
                      //  onClickHandler={() => setResponseData(originalData)}
                      className="button-secondary w-[180px] px-2 py-[11px] text-xs leading-tight transition duration-300"
                      onClickHandler={() => handleReset(formik)}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="table">
          <div className="overflow-x-auto">
            {response ? (
              <MerchantRecordTable
                title="manageProfiles"
                response={response}
                onApprove={handleApproveProfile}
              />
            ) : null}
            {response ? (
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
    </>
  );
};

export default Profile;
