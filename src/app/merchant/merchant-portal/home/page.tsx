'use client';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import LineChartGraph from '@/components/Charts/LineChartGraph';
import Button from '@/components/UI/Button/PrimaryButton';
import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import MerchantFormLayout from '@/components/UI/Wrappers/MerchantFormLayout';
import {
  merchantHomeInitialValues,
  merchantHomeSchema,
} from '@/validations/merchant/home/merchantHome';

const MerchantPortalHome = () => {
  const [graphData, setGraphData] = useState({});
  const [filteredGraphData, setFilteredGraphData] = useState({});

  const fetchGraphRecords = async () => {
    try {
      const response = await apiClient.get('/merchant/lastThirtyDays');
      console.log(response.data);
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

  const onSubmit = (values: any) => {
    console.log('hellewwwwwwwww', values);
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
      <div className="flex flex-col gap-6">
        <HeaderWrapper
          heading="Welcome to Merchant Portal"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
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

        {/* </div> */}
        {/* <TableComponent /> */}
        <LineChartGraph filteredGraphData={filteredGraphData} />
      </div>
    </>
  );
};

export default MerchantPortalHome;
