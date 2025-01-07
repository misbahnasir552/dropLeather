'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import { RadioInputValidity } from '@/components/UI/Inputs/RadioInputValidity';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { merchantIntegrationSuccess } from '@/redux/features/merchantSlice/merchantIntegration';

function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const merchantData = useAppSelector((state: any) => state.merchantDetails);
  const merchantIntegration = useAppSelector(
    (state: any) => state.merchantIntegration,
  );

  // console.log("merchant integration dab, employee and cif", merchantIntegration.dap,merchantIntegration.employee,merchantIntegration.cif)
  // const dapSuccess = merchantIntegration.dap;
  // const employeeSuccess=merchantIntegration.employee;
  // const cifSuccess=merchantIntegration.cif;

  const [employeeResponse, setEmployeeResponse] = useState<string | null>(null);
  const [dap, setDap] = useState<string | null>(null);
  const [cif, setCif] = useState<string | null>(null);

  const cellNo = merchantData.mobileNumber;
  const { cnic } = merchantData;

  useEffect(() => {
    console.log('dap is', dap);
    console.log('cif is', cif);
  }, [dap, cif]);

  const checkEmployeeStatus = async () => {
    console.log('employee check is called');
    try {
      const response = await apiClient.post(`merchant/employeeCheck`, {
        cellNo,
        cnic,
      });
      console.log('Employee response is', response);
      if (response?.data) {
        setEmployeeResponse('Failure');
      } else {
        setEmployeeResponse('Success');
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };

  const moveIt = () => {
    // console.log('dap', dap);
    // console.log('employee', employeeResponse);
    // console.log('cif', cif);
    dispatch(
      merchantIntegrationSuccess({
        ...merchantIntegration,
        // dap: "Success",
        // employee: "Success",
        // cif: "Success",
        dap,
        employee: employeeResponse,
        cif,
      }),
    );
    setTimeout(() => {
      router.push('/admin/home/view-detail/decision');
    }, 100);
    // router.push('/admin/home/view-detail/decision');
  };

  const dapCheckHandler = () => {
    // Toggles between "Success" and "Failure"
    setDap((prevState) => {
      if (prevState === null || prevState === 'Failure') return 'Success';
      return 'Failure';
    });
  };

  const cifCheckHandler = () => {
    // Toggles between "Success" and "Failure"
    setCif((prevState) => {
      if (prevState === null || prevState === 'Failure') return 'Success';
      return 'Failure';
    });
  };

  return (
    <div className="flex flex-col gap-[60px]">
      <HeaderWrapper
        heading="3rd Party Integration Check"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <div className="flex flex-col gap-12 border-b-[1px] border-border-light pb-[60px]">
        <div className="flex flex-col gap-6">
          <H4>KYC</H4>

          <div className="flex items-center gap-12">
            <RadioInputValidity
              label="DAP"
              title="dap"
              value={dap}
              onChange={dapCheckHandler}
            />
            <RadioInputValidity
              label="Employee"
              title="employee"
              displayValue={employeeResponse}
            />
            <RadioInputValidity
              label="CIF Creation"
              title="cif"
              value={cif}
              onChange={cifCheckHandler}
            />
          </div>
        </div>
        <Button
          isDisabled={!dap || !cif}
          className="button-primary h-[56px] w-[270px]"
          label="Employee Check"
          onClickHandler={checkEmployeeStatus}
        />
        <div className="flex w-full justify-end">
          <Button
            className="button-primary h-[56px] w-[270px]"
            label="Next"
            onClickHandler={moveIt}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
