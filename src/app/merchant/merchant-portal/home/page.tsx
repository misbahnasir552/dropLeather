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
  const [filteredGraphData, setFilteredGraphData] = useState([]);
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

  const data11: any = [
    {
      name: '2024-03-01',
      'transactions/revenue': Number('45'),
      pending: 1,
      approved: 2,
      rejected: 30,
    },
    {
      name: '2024-03-02',
      'transactions/revenue': Number('30'),
      pending: 10,
      approved: 20,
      rejected: 0,
    },
    {
      name: '2024-03-03',
      'transactions/revenue': Number('26'),
      pending: 1,
      approved: 20,
      rejected: 5,
    },
    {
      name: '2024-03-04',
      'transactions/revenue': Number('37'),
      pending: 11,
      approved: 24,
      rejected: 2,
    },
    {
      name: '2024-03-05',
      'transactions/revenue': Number('12'),
      pending: 1,
      approved: 10,
      rejected: 1,
    },
    {
      name: '2024-03-06',
      'transactions/revenue': Number('70'),
      pending: 11,
      approved: 50,
      rejected: 9,
    },
    {
      name: '2024-03-07',
      'transactions/revenue': Number('16'),
      pending: 1,
      approved: 12,
      rejected: 3,
    },
    {
      name: '2024-03-08',
      'transactions/revenue': Number('28'),
      pending: 20,
      approved: 4,
      rejected: 4,
    },
    {
      name: '2024-03-09',
      'transactions/revenue': Number('60'),
      pending: 30,
      approved: 10,
      rejected: 20,
    },
    {
      name: '2024-03-10',
      'transactions/revenue': Number('20'),
      pending: 1,
      approved: 19,
      rejected: 0,
    },
    {
      name: '2024-03-11',
      'transactions/revenue': Number('40'),
      pending: 10,
      approved: 20,
      rejected: 10,
    },
    {
      name: '2024-03-12',
      'transactions/revenue': Number('80'),
      pending: 10,
      approved: 60,
      rejected: 10,
    },
    {
      name: '2024-03-13',
      'transactions/revenue': Number('13'),
      pending: 1,
      approved: 12,
      rejected: 0,
    },
    {
      name: '2024-03-14',
      'transactions/revenue': Number('33'),
      pending: 3,
      approved: 0,
      rejected: 30,
    },
    {
      name: '2024-03-15',
      'transactions/revenue': Number('9'),
      pending: 1,
      approved: 5,
      rejected: 3,
    },
  ];
  const data: any = [
    {
      name: '2024-03-01',
      'transactions/revenue': Number('12000.30'),
      pending: Number('1000.10'),
      approved: Number('9000.10'),
      rejected: Number('2000.10'),
    },
    {
      name: '2024-03-02',
      'transactions/revenue': Number('45000.45'),
      pending: Number('3000.25'),
      approved: Number('40000.10'),
      rejected: Number('2000.10'),
    },
    {
      name: '2024-03-03',
      'transactions/revenue': Number('5000.60'),
      pending: Number('500.30'),
      approved: Number('4000.20'),
      rejected: Number('500.10'),
    },
    {
      name: '2024-03-04',
      'transactions/revenue': Number('14000.90'),
      pending: Number('2000.10'),
      approved: Number('11000.40'),
      rejected: Number('1000.40'),
    },
    {
      name: '2024-03-05',
      'transactions/revenue': Number('52000.33'),
      pending: Number('4000.11'),
      approved: Number('46000.11'),
      rejected: Number('2000.11'),
    },
    {
      name: '2024-03-06',
      'transactions/revenue': Number('7000.66'),
      pending: Number('1000.11'),
      approved: Number('5000.22'),
      rejected: Number('1000.33'),
    },
    {
      name: '2024-03-07',
      'transactions/revenue': Number('13000.90'),
      pending: Number('1000.05'),
      approved: Number('11000.05'),
      rejected: Number('1000.80'),
    },
    {
      name: '2024-03-08',
      'transactions/revenue': Number('42000.50'),
      pending: Number('5000.15'),
      approved: Number('35000.15'),
      rejected: Number('2000.20'),
    },
    {
      name: '2024-03-09',
      'transactions/revenue': Number('5500.00'),
      pending: Number('1500.00'),
      approved: Number('5000.00'),
      rejected: Number('0.00'),
    },
    {
      name: '2024-03-10',
      'transactions/revenue': Number('17000.00'),
      pending: Number('1000.00'),
      approved: Number('15000.00'),
      rejected: Number('1000.00'),
    },
    {
      name: '2024-03-11',
      'transactions/revenue': Number('60000.00'),
      pending: Number('5000.00'),
      approved: Number('53000.00'),
      rejected: Number('2000.00'),
    },
    {
      name: '2024-03-12',
      'transactions/revenue': Number('7500.00'),
      pending: Number('2000.00'),
      approved: Number('5500.00'),
      rejected: Number('0.00'),
    },
    {
      name: '2024-03-13',
      'transactions/revenue': Number('11000.00'),
      pending: Number('1000.00'),
      approved: Number('9000.00'),
      rejected: Number('1000.00'),
    },
    {
      name: '2024-03-14',
      'transactions/revenue': Number('50000.00'),
      pending: Number('4000.00'),
      approved: Number('45000.00'),
      rejected: Number('1000.00'),
    },
    {
      name: '2024-03-15',
      'transactions/revenue': Number('8500.39'),
      pending: Number('1500.25'),
      approved: Number('60000.01'),
      rejected: Number('1000.13'),
    },
  ];

  // const filterWeeklyData = (data: { [key: string]: number }) => {
  //   const today = new Date();
  //   const sevenDaysAgo = new Date(today);
  //   sevenDaysAgo.setDate(today.getDate() - 7);

  //   // Filter the data for the last 7 days
  //   const filteredGraph = Object.keys(data)
  //     .filter((date) => {
  //       const currentDate = new Date(date);
  //       return currentDate >= sevenDaysAgo && currentDate <= today;
  //     })
  //     .reduce((acc: { [key: string]: number | undefined }, date) => {
  //       acc[date] = data[date];
  //       return acc;
  //     }, {});

  //   return filteredGraph;
  // };
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

  const getGraphData = (values: any) => {
    if (values?.graphType == 'byRevenue') {
      setFilteredGraphData(data);
    } else {
      setFilteredGraphData(data11);
    }
  };

  const onSubmit = (values: any) => {
    console.log('here', values);
    if (values?.graphType == 'byRevenue') {
      setFilteredGraphData(data);
    } else {
      setFilteredGraphData(data11);
    }
    //  if (values.graphType) {
    //    router.push("/login");
    //  }
    // if (values.graphDuration === 'Weekly') {
    //   const filteredGraph = filterWeeklyData(graphData);
    //   console.log('Filtered Weekly Data:', filteredGraph);
    //   const transformedData = Object.keys(filteredGraph).map((date, index) => ({
    //     name: (index + 1).toString(), // index as 'name'
    //     uv: filteredGraph[date], // the value for 'uv'
    //   }));
    //   console.log('Transformed data', transformedData);

    //   setFilteredGraphData(transformedData);
    // }
  };

  useEffect(() => {
    getGraphData({
      graphType: 'byTransaction',
      graphDuration: 'Weekly',
    });
  }, []);

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
                      options={[
                        {
                          label: 'By No.of Transactions',
                          value: 'byTransaction',
                        },
                        { label: 'By Revenue', value: 'byRevenue' },
                      ]}
                      error={'payment method is false'}
                      touched={false}
                      formik={formik}
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
