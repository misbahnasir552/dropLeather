'use client';

import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import IconTable from '@/components/Table/WithoutCheckMarksTable/WithImageTable/IconTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
// import SearchTransactionTable from '@/components/Table/SearchTransactionTable';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';

function ManageBeneficiary() {
  const [beneficiaryFilteredData, setBeneficiaryFilteredData] = useState<any[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  // const [filteredParams, setFilteredParams] = useState();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const response = await apiClient.get('/merchant/getAllBeneficiaries');
      console.log(response.data.beneficiaryList, 'RESPONSE');
      const filteredValues = response?.data?.beneficiaryList.map(
        ({ ...rest }) => rest,
      );
      setBeneficiaryFilteredData(filteredValues);
      // setLoading(false);
    } catch (e) {
      console.log('Error in fetching dynamic QR list', e);
    }
  };

  const handleDelete = async (id: any) => {
    console.log('Delete row with id:', id);
    try {
      const response = await apiClient.delete('/merchant/deleteBeneficiary', {
        params: { beneficiaryId: id },
      });
      console.log(response, 'Deleted response');
      fetchRecords();
    } catch (e) {
      console.log('Error in fetching dynamic QR list', e);
    }

    // setRows(rows.filter((row) => row.id !== id));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const tableHeadings = [
    'Mobile Number',
    'Bank name',
    'Account Title',
    'Beneficiary Name',
    'Actions',
  ];
  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Manage Beneficiary"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      {loading ? (
        <>
          <BarLoader color="#21B25F" />
        </>
      ) : (
        <>
          {beneficiaryFilteredData.length > 0 ? (
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
