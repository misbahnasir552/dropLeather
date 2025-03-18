'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import LineChartGraph from '@/components/Charts/LineChartGraph';
import MPPriceBar from '@/components/MPPriceBar';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';
import {
  merchantHomeInitialValues,
  merchantHomeSchema,
} from '@/validations/merchant/home/merchantHome';

const MerchantPortalHome = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const [graphData, setGraphData] = useState({});
  const [filteredGraphData, setFilteredGraphData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('');
  const [accountBalance, setAccountBalance] = useState<string>('');

  const fetchGraphRecords = async () => {
    try {
      const response = await apiClient.get('/merchant/lastThirtyDays');
      setGraphData(response?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGraphRecords();
  }, []);

  const filterWeeklyData = (data: { [key: string]: number }) => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Filter the data for the last 7 days
    const filteredGraph = Object.keys(data)
      .filter((date) => {
        const currentDate = new Date(date);
        return currentDate >= sevenDaysAgo && currentDate <= today;
      })
      .reduce((acc: { [key: string]: number | undefined }, date) => {
        acc[date] = data[date];
        return acc;
      }, {});

    return filteredGraph;
  };
  const getAccountBalance = async () => {
    try {
      setIsLoading(true);
      const additionalValues = {
        msisdn: userData?.managerMobile,
        managerMobile: userData?.managerMobile,
      };
      const mdRequest = {
        ...additionalValues,
        apisecret: userData?.apiSecret,
      };
      const md5Hash = generateMD5Hash(mdRequest);
      const requestBody = {
        request: additionalValues,
        signature: md5Hash,
      };
      const response = await apiClient.post(
        '/qrcode/getAccountBalance',
        requestBody,
        { headers: { Authorization: `Bearer ${userData?.jwt}` } },
      );
      if (response?.data) {
        setAccountBalance(response?.data?.amount);
      } else {
        setApierror(response?.data?.responseDescription);
      }
    } catch (e: any) {
      console.log('Fetch details failed', e);
      setApierror(e?.message);
      // setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAccountBalance();
  }, []);
  const onSubmit = (values: any) => {
    //  if (values.graphType) {
    //    router.push("/login");
    //  }
    if (values.graphDuration === 'Weekly') {
      const filteredGraph = filterWeeklyData(graphData);
      console.log('Filtered Weekly Data:', filteredGraph);
      const transformedData = Object.keys(filteredGraph).map((date, index) => ({
        name: (index + 1).toString(), // index as 'name'
        uv: filteredGraph[date], // the value for 'uv'
      }));
      console.log('Transformed data', transformedData);

      setFilteredGraphData(transformedData);
    }
  };
  return (
    <>
      {isLoading ? (
        <BarLoader />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="my-6">
            <MPPriceBar accountBalance={accountBalance} />
          </div>
          <HeaderWrapper
            heading="Welcome to Merchant Portal"
            // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
          />
          {/* <div className="flex flex-col gap-9 rounded-lg border-[0.5px] border-border-light bg-screen-grey px-6 pb-[24px] pt-[60px]"> */}
          <Formik
            initialValues={merchantHomeInitialValues}
            validationSchema={merchantHomeSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <MerchantFormLayout>
                  <div className="grid grid-cols-2 gap-5">
                    <DropdownInput
                      name="graphType"
                      label="Graph Type"
                      options={[{ label: 'option1', value: 'option1' }]}
                      error={'payment method is false'}
                      touched={false}
                    />
                    <DropdownInput
                      name="graphDuration"
                      label="Graph Duration"
                      options={[
                        { label: 'Weekly', value: 'Weekly' },
                        { label: 'Daily', value: 'Daily' },
                        { label: 'Monthly', value: 'Monthly' },
                      ]}
                      error={'payment method is false'}
                      touched={false}
                      formik={formik}
                    />
                  </div>
                  <Button
                    label="Generate"
                    type="submit"
                    className="button-primary h-9 w-[120px] text-xs"
                  />
                </MerchantFormLayout>
              </Form>
            )}
          </Formik>
          {apierror && (
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
          )}
          {/* </div> */}
          {/* <TableComponent /> */}
          <LineChartGraph filteredGraphData={filteredGraphData} />
        </div>
      )}
    </>
  );
};

export default MerchantPortalHome;
