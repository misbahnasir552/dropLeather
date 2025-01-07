'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// import { useSearchParams } from "next/navigation";
import apiClient from '@/api/apiClient';
import ReviewFormData from '@/components/Forms/ReviewFormData';
import Button from '@/components/UI/Button/PrimaryButton';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { merchantSuccess } from "@/redux/features/merchantSlice/merchantDetails";
import { useAppSelector } from '@/hooks/redux';

const ViewDetail = () => {
  const merchantData = useAppSelector((state: any) => state.merchantDetails);
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  // const searchParams = useSearchParams();
  // const email = searchParams.get("email");
  // const status = searchParams.get("status");
  // console.log("email and status is", email, status);

  const email = merchantData.emailAddress;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`merchant/getdetails/${email}`);
        console.log(response, 'view/get details RESPONSE');
        setData(response?.data);

        // console.log(data, "view/get details Data");
      } catch (e) {
        console.log(e, 'error fetching');
      }
    };

    fetchData();
  }, []);

  const routeMe = () => {
    // console.log("email is", email);
    router.push(`decision/integration`);
    //  router.push(`decision?email=${email}&status=${status}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Details"
        description="Lorem ipsum asdasd asdsadsad"
      />
      <div className="flex flex-col gap-9">
        <ReviewFormData data={data} isEditable={false} merchant={true} />
      </div>
      <div className="flex justify-end">
        <Button
          label="Next"
          // routeName="/not-implemented"
          onClickHandler={() => routeMe()}
          // isDisabled={!formik.isValid}
          className="button-primary h-[56px] w-[270px]"
          // className={`button-primary w-[270px] px-3 py-[19px] text-sm leading-tight transition duration-300`}
        />
      </div>
    </div>
  );
};

export default ViewDetail;
