'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import LineChartGraph from '@/components/Charts/LineChartGraph';
import MPPriceBar from '@/components/MPPriceBar';
import Button from '@/components/UI/Button/PrimaryButton';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import { useAppSelector } from '@/hooks/redux';
import {
  graphDurationOptions,
  monthOptions,
  transactionOptions,
  yearOptions,
} from '@/utils/dropdown-list/helper';
import { generateMD5Hash } from '@/utils/helper';
import {
  merchantHomeInitialValues,
  merchantHomeSchema,
} from '@/validations/merchant/home/merchantHome';

const MerchantPortalHome = () => {
  const userData = useAppSelector((state: any) => state.auth);
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apierror, setApierror] = useState('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState(false);

  const fetchGraphRecords = async (values: any) => {
    setButtonLoader(true);
    setApierror('');
    try {
      const graphResponse: any = await apiClient.get('qrcode/graph', {
        params: {
          fromDate: values?.fromDate,
          toDate:
            values?.graphDuration == 'daily'
              ? values?.fromDate
              : values?.toDate,
          // fromDate: '2025-03-24',
          // toDate: '2025-03-24',
          duration: values?.graphDuration,
          graphType: values?.graphType,
        },
        headers: {
          // merchantEmail: userData?.email,
          merchantEmail: 'misbah55@yopmail.com',
        },
      });
      // get success reponse and now transform data according to type
      if (graphResponse?.data?.responseCode === '009') {
        const transformedData = graphResponse?.data?.transactionGraphData.map(
          (item: any) => ({
            name:
              values.graphDuration == 'monthly'
                ? item.name.split('-')[2].padStart(2, '0')
                : item.name,
            type: item.type,
            total:
              item.type === 'revenue' ? item.total : parseInt(item.total, 10),
            success:
              item.type === 'revenue'
                ? item.success
                : parseInt(item.success, 10),
            failed:
              item.type === 'revenue' ? item.failed : parseInt(item.failed, 10),
          }),
        );

        if (values?.graphDuration === 'daily') {
          transformedData.sort((a: any, b: any) => {
            const convertTo24Hour = (time: string | undefined) => {
              if (!time || !/(AM|PM)$/.test(time)) return NaN; // Ensure valid time format

              let hour = parseInt(time.slice(0, -2), 10); // Extract hour
              const period = time.slice(-2); // Extract AM/PM

              if (period === 'AM' && hour === 12) hour = 0; // 12AM -> 00
              if (period === 'PM' && hour !== 12) hour += 12; // Convert PM hours (except 12PM)

              return hour;
            };

            const hourA = convertTo24Hour(a?.name);
            const hourB = convertTo24Hour(b?.name);

            // eslint-disable-next-line no-restricted-globals
            if (isNaN(hourA) || isNaN(hourB)) return 0; // Skip sorting if invalid time

            return hourA - hourB;
          });
        }

        if (values?.graphDuration === 'monthly') {
          transformedData.sort(
            (a: any, b: any) => parseInt(a.name, 10) - parseInt(b.name, 10),
          );
        }
        setGraphData(transformedData);
        setButtonLoader(false);
      } else {
        setButtonLoader(false);
        setApierror(graphResponse?.data?.responseDescription);
      }
    } catch (e: any) {
      setApierror(e?.message);
      setButtonLoader(false);
      console.log(e);
    }
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
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (values: any) => {
    // for case of yearly setting to and from dates
    if (values?.graphDuration == 'yearly') {
      values.fromDate = `${values?.year}-01-01`; // Set fromDate to January 1st of that year
      values.toDate = `${values?.year}-12-31`;
    }

    // for case of montly setting to and from dates
    if (values?.graphDuration == 'monthly') {
      const year = values?.year;
      const month = values?.month; // This will be in 'MM' format (e.g., '02' for February)

      // Get the number of days in the month
      const daysInMonth = new Date(year, month, 0).getDate();

      values.fromDate = `${values?.year}-${values?.month}-01`; // Set fromDate to January 1st of that year
      values.toDate = `${values?.year}-${values?.month}-${daysInMonth}`;
    }

    fetchGraphRecords(values);
  };

  useEffect(() => {
    fetchGraphRecords({
      graphType: 'transaction',
      graphDuration: 'daily',
      toDate: new Date().toISOString().split('T')[0],
      fromDate: new Date().toISOString().split('T')[0],
    });
    getAccountBalance();
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
          <HeaderWrapper heading="Welcome to Merchant Portal" />

          <Formik
            initialValues={merchantHomeInitialValues}
            validationSchema={merchantHomeSchema}
            onSubmit={onSubmit}
          >
            {(formik: any) => {
              const { graphDuration } = formik.values;

              const durationInputs: Record<string, JSX.Element> = {
                daily: (
                  <DateInputNew
                    formik={formik}
                    label="Select Date"
                    name="fromDate"
                    error={formik.errors.fromDate}
                    touched={formik.touched.fromDate}
                  />
                ),
                weekly: (
                  <>
                    <DateInputNew
                      formik={formik}
                      label="Select Start Date"
                      name="fromDate"
                      error={formik.errors.fromDate}
                      touched={formik.touched.fromDate}
                    />
                    <DateInputNew
                      formik={formik}
                      label="Select End Date"
                      name="toDate"
                      error={formik.errors.toDate}
                      touched={formik.touched.toDate}
                    />
                  </>
                ),
                monthly: (
                  <>
                    <DropdownInput
                      name="month"
                      label="Select Month"
                      options={monthOptions}
                      error={formik.errors.month}
                      touched={formik.touched.month}
                      formik={formik}
                    />
                    <DropdownInput
                      name="year"
                      label="Select Year"
                      options={yearOptions}
                      error={formik.errors.year}
                      touched={formik.touched.year}
                      formik={formik}
                    />
                  </>
                ),
                yearly: (
                  <DropdownInput
                    name="year"
                    label="Select Year"
                    options={yearOptions}
                    error={formik.errors.year}
                    touched={formik.touched.year}
                    formik={formik}
                  />
                ),
              };

              return (
                <Form>
                  <MerchantFormLayout>
                    <div className="grid grid-cols-2 gap-5">
                      <DropdownInput
                        name="graphType"
                        label="Graph Type"
                        options={transactionOptions}
                        error={formik.errors.graphType}
                        touched={formik.touched.graphType}
                        formik={formik}
                      />
                      <DropdownInput
                        name="graphDuration"
                        label="Graph Duration"
                        options={graphDurationOptions}
                        error={formik.errors.graphDuration}
                        touched={formik.touched.graphDuration}
                        formik={formik}
                      />
                    </div>

                    {graphDuration && (
                      <div className="grid grid-cols-2 gap-5">
                        {durationInputs[graphDuration]}
                      </div>
                    )}

                    <Button
                      label="Generate"
                      type="submit"
                      className="button-primary h-9 w-[120px] text-xs"
                      isDisabled={buttonLoader}
                    />
                  </MerchantFormLayout>
                </Form>
              );
            }}
          </Formik>

          {apierror && (
            <div className="flex w-full justify-start px-3 pt-[8px] text-xs text-danger-base">
              {apierror}
            </div>
          )}

          <LineChartGraph filteredGraphData={graphData} />
        </div>
      )}
    </>
  );
};

export default MerchantPortalHome;
