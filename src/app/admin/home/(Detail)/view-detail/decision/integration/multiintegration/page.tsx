'use client';

// import React, { useState } from 'react';
import React from 'react';

import H4 from '@/components/UI/Headings/H4';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
// import { merchantIntegrationSuccess } from "@/redux/features/merchantSlice/merchantIntegration";

function Page() {
  // const [amlCheck, setAmlCheck] = useState(false);
  // const [amlResponse, setAmlResponse] = useState<boolean | null>(null);
  const merchantIntegration = useAppSelector(
    (state: any) => state.merchantIntegration,
  );
  // console.log("here", internalId)
  const { dap } = merchantIntegration;
  const { employee } = merchantIntegration;
  const { cif } = merchantIntegration;
  const { aml } = merchantIntegration;
  const { internalId } = merchantIntegration;
  const { suspendAccount } = merchantIntegration;
  const email = merchantIntegration.emailStatus;
  const title = merchantIntegration.accountTitle;
  const { sellerCode } = merchantIntegration;

  console.log(
    'dap is',
    merchantIntegration,
    // "employee is",employeeSuccess,
    // "cif is",cifSuccess,
    // "aml is",amlSuccess,
    // amlResponse,
    // "suspend account is", suspendAccountTillBvs,
    // "email is", email
  );

  return (
    <div>
      <div className="flex flex-col gap-12 border-b-[1px] border-border-light pb-[60px] pt-[20px]">
        <HeaderWrapper
          heading="3rd Party Integration Check"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
        />
        <div className="flex flex-col gap-6">
          <H4>KYC</H4>
          <div className="flex items-center gap-12">
            <div>
              DAP &nbsp;.&nbsp;<span className="text-primary-base">{dap}</span>
            </div>
            <div>
              Employee &nbsp;.&nbsp;
              <span className="text-primary-base">{employee}</span>
            </div>
            <div>
              CIF &nbsp;.&nbsp;<span className="text-primary-base">{cif}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 border-b-[1px] border-border-light pb-[60px] pt-[20px]">
        <div className="flex flex-col gap-6">
          <H4>Wallet Account Creation</H4>

          <div className="flex items-center gap-12">
            <div>
              AML &nbsp;.&nbsp;<span className="text-primary-base">{aml}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 border-b-[1px] border-border-light pb-[60px] pt-[20px]">
        <div className="flex flex-col gap-6">
          <H4>Settlement Options Easypaisa</H4>

          <div className="flex items-center gap-12">
            <div>
              Wallet FRI - &nbsp;.&nbsp;{internalId}&nbsp;({title}/{sellerCode})
              <span className="text-primary-base"></span>
            </div>
            <div>
              Suspend Status &nbsp;.&nbsp;
              <span className="text-primary-base">{suspendAccount}</span>
            </div>
            <div>
              Email Notification to user &nbsp;.&nbsp;
              <span className="text-primary-base">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
