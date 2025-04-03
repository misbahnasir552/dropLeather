'use client';

import { useEffect, useState } from 'react';

import apiClient from '@/api/apiClient';
import DualListTable from '@/components/DualListTable';
import Button from '@/components/UI/Button/PrimaryButton';
import SuccessModal from '@/components/UI/Modal/SuccessModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

export default function TransactionHistoryPreferences() {
  const [selectedItems, setSelectedItems] = useState<IInitialData[]>([]);
  const [previousItems, setPreviousItems] = useState<IInitialData[]>([]);
  const [intialData, setIntialData] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<IInitialData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state: any) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  interface IInitialData {
    name: string;
    category: string;
  }
  const handleSelectedItemsChange = (items: IInitialData[]) => {
    setSelectedItems(items);
  };

  function convertToLabelObject(camelCaseString: any) {
    let label = camelCaseString
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str: string) => str.toUpperCase()) // Capitalize first letter
      .trim()
      .replace(/\bId\b/gi, 'ID') // Ensure 'Id' is 'ID'
      .replace(/\bPkr\b/gi, 'PKR') // Ensure 'Pkr' is 'PKR'
      .replace(/\bMsisdn\b/gi, 'MSISDN'); // Ensure 'Msisdn' is 'MSISDN'

    // Skip modifications for 'TTC' and 'CNIC'
    if (camelCaseString === 'TTC' || camelCaseString === 'CNIC') {
      label = camelCaseString;
    }

    return { key: camelCaseString, label };
  }

  useEffect(() => {
    const getForms = async () => {
      try {
        const response = await apiClient.get(`qrcode/transactionsFields`);
        const responseData = response?.data;

        const merchantResponse = await apiClient.get(
          'qrcode/getTransactionPreferences',
          {
            params: { merchantEmail: userData?.email },
          },
        );

        const previousData = merchantResponse?.data?.selectedFields;

        const filteredArray = responseData?.filter(
          (key: any) => !previousData?.includes(key),
        );

        const formattedLabels = filteredArray?.map(convertToLabelObject);

        const previousLabels = previousData?.map(convertToLabelObject);

        setPreviousItems(previousLabels);

        setIntialData(formattedLabels);
        setAvailableItems(formattedLabels);
        setSelectedItems(previousLabels);
      } catch (e) {
        console.log(e, 'error fetching');
      }
    };
    getForms();
  }, []);

  const handleVerify = async () => {
    const selectedFIleds = selectedItems?.map((item: any) => item?.key);

    const transactionHistoryValues = {
      merchantEmail: userData?.email,
      selectedFields: selectedFIleds,
    };
    const mdRequest = {
      ...transactionHistoryValues,
      apisecret: userData?.apiSecret,
    };
    const md5Hash = generateMD5Hash(mdRequest);
    const requestBody = {
      request: transactionHistoryValues,
      signature: md5Hash,
    };

    try {
      // merchant verify otp
      setIsLoading(true);
      const response = await apiClient.post(
        'qrcode/saveTransactionPreferences',
        requestBody,
      );
      // setShowModal(true);
      if (response.data.responseCode === '009') {
        setShowModal(true);
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        // setRoute('/login');
      } else {
        // // merchant verify otp failure
        setShowModal(true);
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
      }
    } catch (e: any) {
      // merchant verify otp request failure
      setTitle('Network Failed');
      setDescription(e?.responseDescription);
      // console.log(e, 'Merchant verification Failed');
    } finally {
      // console.log('finall ma ah gya');
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName={route}
      />
      <HeaderWrapper
        heading="Transaction History Preferences"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <div className="flex flex-col rounded-lg border-[0.5px] border-border-light bg-screen-grey p-[60px]">
        <DualListTable
          initialData={intialData}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleSelectedItemsChange}
          headingLeft="Available Filters"
          headingRight="Selected Filters"
          availableItems={availableItems}
          setAvailableItems={setAvailableItems}
          // previousItems={previousItems}
        />
      </div>
      <div className="flex w-full justify-end gap-6">
        <Button
          label="Reset"
          // routeName="/login"
          className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
          onClickHandler={() => {
            setSelectedItems(previousItems);
            setAvailableItems(intialData);
          }}
        />
        <Button
          label="Save"
          type="submit"
          className="button-primary w-[270px] py-[19px] text-sm leading-tight"
          onClickHandler={handleVerify}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
}
