'use client';

import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

import apiClient from '@/api/apiClient';
import DualListTable from '@/components/DualListTable';
import Button from '@/components/UI/Button/PrimaryButton';
import CustomModal from '@/components/UI/Modal/CustomModal';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppSelector } from '@/hooks/redux';
import { generateMD5Hash } from '@/utils/helper';

export default function TransactionHistoryPreferences() {
  const [selectedItems, setSelectedItems] = useState<IInitialData[]>([]);
  // const [previousItems, setPreviousItems] = useState<IInitialData[]>([]);
  const [intialData, setIntialData] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<IInitialData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
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

  const getForms = async () => {
    try {
      setIsLoading(true);
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

      // setPreviousItems(previousLabels);

      setIntialData(formattedLabels);
      setAvailableItems(formattedLabels);
      setSelectedItems(previousLabels);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e, 'error fetching');
    }
  };

  useEffect(() => {
    getForms();
  }, []);

  const handleSaveTransactionsPref = async (customSelectedItems?: any[]) => {
    const itemsToUse = customSelectedItems ?? selectedItems;
    const selectedFIleds = itemsToUse?.map((item: any) => item?.key);

    const transactionHistoryValues = {
      merchantEmail: userData?.email,
      selectedFields: selectedFIleds,
      managerMobile: userData?.managerMobile,
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
      setButtonLoader(true);
      const response = await apiClient.post(
        'qrcode/saveTransactionPreferences',
        requestBody,
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        },
      );
      // setShowModal(true);
      if (response.data.responseCode === '009') {
        await getForms();
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
      setButtonLoader(false);
      setShowModal(true);
    }
  };

  const handleReset = async () => {
    setSelectedItems([]);
    await handleSaveTransactionsPref([]);
  };

  return (
    <>
      {isLoading ? (
        <BarLoader />
      ) : (
        <div className="flex flex-col gap-6">
          <CustomModal
            title={title}
            description={description}
            show={showModal}
            setShowModal={setShowModal}
          />

          <HeaderWrapper heading="Transaction History Preferences" />

          <div className="flex flex-col rounded-lg border-[0.5px] border-border-light bg-screen-grey p-[60px]">
            <DualListTable
              initialData={intialData}
              selectedItems={selectedItems}
              onSelectedItemsChange={handleSelectedItemsChange}
              headingLeft="Available Filters"
              headingRight="Selected Filters"
              availableItems={availableItems}
              setAvailableItems={setAvailableItems}
            />
          </div>

          <div className="flex w-full justify-end gap-6">
            <Button
              label="Reset"
              className="button-secondary w-[270px] py-[19px] text-xs leading-tight"
              onClickHandler={handleReset}
            />
            <Button
              label="Save"
              type="submit"
              className="button-primary w-[270px] py-[19px] text-sm leading-tight"
              onClickHandler={handleSaveTransactionsPref}
              isDisabled={buttonLoader}
            />
          </div>
        </div>
      )}
    </>
  );
}
