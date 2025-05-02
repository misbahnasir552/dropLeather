'use client';

import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';

function ManageBeneficiary() {
  const userData = useAppSelector((state) => state.auth);
  const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [apierror, setApierror] = useState('');
  // const [filteredParams, setFilteredParams] = useState();
  const fetchRecords = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const response = await apiClient.get('/merchant/getAllBeneficiaries', {
        headers: { merchantEmail: userData?.email },
      });
      if (response?.data.responseCode === '009') {
        const filteredValues = response?.data?.beneficiaryList.map(
          ({ ...rest }) => rest,
        );
        setBeneficiaryFilteredData(filteredValues);
      } else {
        setApierror(response.data.responseDescription);
      }
    } catch (e: any) {
      setApierror(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    console.log('Delete row with id:', id);
    try {
      const response = await apiClient.get('/merchant/removeBeneficiary', {
        params: { beneficiaryId: id },
      });
      console.log(response, 'Deleted response');
      if (response?.data?.responseCode === '009') {
        setTitle('Successfully Deleted');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
        fetchRecords();
      } else {
        setTitle('Failure');
        setDescription(response?.data?.responseDescription);
        setShowModal(true);
      }
    } catch (e: any) {
      console.log('Error in fetching dynamic QR list', e);
      setTitle('Network Failure');
      setDescription(e.message);
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const tableHeadings = [
    'Account Number',
    'Bank name',
    'Account Title',
    'Beneficiary Name',
    'Actions',
  ];
  return (
    <div className="flex flex-col gap-6">
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
      />
      <HeaderWrapper
        heading="Manage Beneficiary"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      {loading ? (
        <BarLoader color="#21B25F" />
      ) : (
        <>
          {apierror ? (
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
          ) : beneficiaryFilteredData?.length > 0 ? (
            <IconTable
              tableData={beneficiaryFilteredData}
              tableHeadings={tableHeadings}
              hasDelete
              handleDelete={handleDelete}
            />
          ) : (
            <H4>No Records Found</H4>
          )}
          <div className="flex w-full justify-end gap-9 pb-[120px]">
            <Button
              label={`Back`}
              type="button"
              className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
              routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-funds-transfer"
            />
            <Button
              label={`Add Beneficiary`}
              // type="submit"
              routeName="/merchant/merchant-portal/merchant-funds-transfer/manage-beneficiary/add-beneficiary"
              className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ManageBeneficiary;
