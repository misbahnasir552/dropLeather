'use client';

import { useRouter } from 'next/navigation';
import React, {
  useEffect,
  // useEffect,
  useState,
} from 'react';

// import { BarLoader } from 'react-spinners';
import apiClient from '@/api/apiClient';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPageData } from '@/redux/features/formSlices/fieldSlice';

interface UserData {
  email: string;
  // Add other properties if needed
}

interface MerchantData {
  activityInformation?: { status: string };
  businessDetails?: { status: string };
  settlementDetails?: { status: string };
  integration?: { status: string };
  documents?: { status: string };
  reviewForm?: { status: string };
}

const RequestRevisionPage = () => {
  const userData = useAppSelector((state: { auth: UserData }) => state.auth);
  const [data, setData] = useState<MerchantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const handleNavigation = (formName: string) => {
  //   router.push(`/merchant/home/request-revision/${formName}`);
  // };

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDetails = async () => {
      try {
        console.log('Fetching details...');
        const response = await apiClient.get(
          `/merchant/fieldsForRevision?email=${userData.email}`,
        );
        console.log('Response received:', response?.data);

        if (response?.data) {
          setData(response?.data);
          dispatch(setPageData(response.data));
          console.log('response pagedata', response);
          router.push('/merchant/home/request-revision/activity-information');
          console.log('Data set successfully.');
        } else {
          console.error('Empty response data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    console.log(data);
    console.log(isLoading);

    getDetails();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Request Revision</h1>
      {/* <p className="mb-6">Please select a form to review and revise.</p> */}

      {/* <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => handleNavigation('activity-information')}
      >
        Go to Activity Information
      </button> */}
    </div>
  );
};

export default RequestRevisionPage;
