'use client';

import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { useSearchParams } from "next/navigation";
import apiClient from '@/api/apiClient';
import DualListTable from '@/components/DualListTable';
import CommentHistoryTable from '@/components/Table/CommentHistoryTable';
import Button from '@/components/UI/Button/PrimaryButton';
import H4 from '@/components/UI/Headings/H4';
import H6 from '@/components/UI/Headings/H6';
import CommentInput from '@/components/UI/Inputs/CommentInput';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import RadioInput from '@/components/UI/Inputs/RadioInput';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { ICheckboxData } from '@/interfaces/interface';
import { merchantIntegrationSuccess } from '@/redux/features/merchantSlice/merchantIntegration';
// import { useSearchParams } from "next/navigation";
// import { useSelector } from 'react-redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  approvalDecisionInitialValues,
  approvalDecisionSchema,
} from '@/validations/admin/registerationQueue/decision/decision';

const Decision = () => {
  const [data, setData] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);
  const [apierror, setApierror] = useState('');
  const userData = useAppSelector((state: any) => state.adminAuth);
  const merchantData = useAppSelector((state: any) => state.merchantDetails);
  const merchantIntegration = useAppSelector(
    (state: any) => state.merchantIntegration,
  );
  // const [fieldsForRevision, setFieldsForRevision] = useState<IInitialData[]>([]);
  const { dap } = merchantIntegration;
  const { employee } = merchantIntegration;
  const { cif } = merchantIntegration;
  const { apiSecret } = userData;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const status = merchantData.requestStatus;
  const email = merchantData.emailAddress;
  // console.log("email is", email);
  const previousData = useAppSelector(
    (state: any) => state.merchantIntegration,
  );

  interface IInitialData {
    // id: number;
    name: string;
    category: string;
  }

  const [selectedItems, setSelectedItems] = useState<IInitialData[]>([]);

  const handleSelectedItemsChange = (items: IInitialData[]) => {
    console.log('items are', items);
    setSelectedItems(items); // Update state in the parent
    // const fieldsForRevision = selectedItems.map(item => item.name);
  };

  const fieldsForRevision = selectedItems.map((item) => item.name);
  useEffect(() => {
    console.log('decision is', merchantIntegration, data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `merchant/commentHistory/${email}`,
        );

        setData2(response?.data?.commentHistory);
      } catch (e) {
        console.log(e, 'error fetching');
      }
    };

    fetchData();
  }, []);

  const options2 = [
    { value: 'hi', label: 'hi' },
    { value: 'Bye', label: 'Bye' },
  ];

  const checkboxData: ICheckboxData[] = [
    {
      value: 'approve',
      label: 'Approve',
    },
    {
      value: 'ApproveWithDeferral',
      label: 'approve with Deferral',
    },
    {
      value: 'reject',
      label: 'Reject',
    },
    {
      value: 'requestRevision',
      label: 'Request Revision',
    },
  ];

  const onSubmit = async (values: any) => {
    console.log('hiiiiiiiiii', userData);
    console.log('selected items are', selectedItems);
    // if approve or approve with deferral? Aml+ Wallet else, search
    const req = {
      managerMobile: userData.managerMobile,
      username: email,
      commentedBy: userData.name,
      decision: values.approvalDecision,
      // reason: ['approve', 'ApproveWithDeferral'].includes(values.approvalDecision) ? null : values.reason,
      reason: values.reason,
      comment: values.comment,
      fieldsForRevision,
    };
    const mdRequest = {
      ...req,
      apisecret: apiSecret,
    };

    // const md5Hash = generateMD5Hash(mdRequest);
    const md5Hash = generateMD5Hash(mdRequest);
    try {
      const response = await axios.post(
        `http://api-gateway-opsdev.telenorbank.pk/merchant/saveDecision`,
        { request: req, signature: md5Hash },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );
      console.log(response, 'Decision RESPONSE');
      setData(response?.data);
      if (response?.data?.responseCode === '009') {
        // dispatch and save amlCheck suspendAccountTillBvs emailNotificationToUser internalId accountTitle
        console.log('previous data i', previousData);
        dispatch(
          merchantIntegrationSuccess({
            ...previousData,
            aml: response?.data?.amlCheck,
            suspendAccount: response?.data?.suspendAccountTillBvs,
            emailStatus: response?.data?.emailNotificationToUser,
            internalId: response?.data?.internalId,
            accountTitle: response?.data?.accountTitle,
            sellerCode: response?.data?.sellerCode,
          }),
        );
        router.push(
          '/admin/home/view-detail/decision/integration/multiintegration',
        );
        if (
          ['approve', 'approveWithDeferral'].includes(values.approvalDecision)
        ) {
          if (
            (dap === null || dap === undefined || dap === '') &&
            (employee === null || employee === undefined || employee === '') &&
            (cif === null || cif === undefined || cif === '')
          ) {
            router.push('/admin/home/view-detail/decision/integration/');
          } else {
            router.push(
              '/admin/home/view-detail/decision/integration/multiintegration',
            );
          }
        } else {
          router.push('/admin/home/');
        }
      } else {
        setApierror(response?.data?.errorDescription);
      }
    } catch (e) {
      console.log(e, 'error fetching');
    }
  };

  return (
    <>
      {/* <BreadCrumb /> */}
      <Formik
        initialValues={approvalDecisionInitialValues}
        validationSchema={approvalDecisionSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col gap-6">
              <HeaderWrapper
                heading="Decision"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
                show
              />
              <div className="flex flex-col gap-9 rounded-lg border-[0.5px] border-border-light bg-screen-grey p-[60px]">
                <div className="flex flex-col gap-3">
                  <div>Status</div>
                  <div>{status}</div>
                </div>
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-3">
                    <div>Decision</div>
                    <div className="flex w-full gap-12">
                      <RadioInput
                        name="approvalDecision"
                        options={checkboxData}
                        form={formik}
                        isMulti={false}
                      />
                    </div>
                  </div>
                  {formik.values.approvalDecision === 'reject' ||
                  formik.values.approvalDecision === 'requestRevision' ? (
                    <div className="flex w-1/2 flex-col gap-3">
                      <div>Reason</div>
                      <DropdownInput
                        label="Reason"
                        name="reason"
                        formik={formik}
                        error={formik.errors.reason}
                        touched={formik.touched.reason}
                        options={options2}
                      />
                    </div>
                  ) : null}
                  {formik.values.approvalDecision === 'requestRevision' ? (
                    <div className="flex flex-col gap-3">
                      <H6>Fields for Revision</H6>
                      <DualListTable
                        headingLeft="All Fields"
                        headingRight="Field For Revision"
                        selectedItems={selectedItems}
                        onSelectedItemsChange={handleSelectedItemsChange}
                        // initialData={initialItems}
                        // onSelectedItemsChange={handleSelectedItemsChange}
                      />
                    </div>
                  ) : null}
                  <CommentInput name="comment" placeholder="Add Comment" />
                  <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
                    {apierror}
                  </div>
                </div>
                <div className="flex w-full items-end justify-end">
                  <Button
                    label="Submit"
                    // routeName="integration"
                    type="submit"
                    isDisabled={!formik.isValid}
                    className={`button-primary w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {data2?.length ? (
        <div className="flex flex-col gap-4">
          <H4>Comment History</H4>
          <CommentHistoryTable data={data2} />
        </div>
      ) : null}
    </>
  );
};

export default Decision;
