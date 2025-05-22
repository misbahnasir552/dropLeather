'use client';

// import Image from 'next/image';

// import DownloadIcon from '@/assets/icons/Download-Table-Icon.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import apiClient from '@/api/apiClient';
import Button from '@/components/UI/Button/PrimaryButton';
// import FileIcon from '@/assets/icons/FileIcon.svg';
import ReviewInput from '@/components/UI/Inputs/ReviewInput';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import ReviewFormDataGrid from '@/components/UI/Wrappers/ReviewFormDataGrid';
import ReviewFormLayout from '@/components/UI/Wrappers/ReviewFormLayout';
import ReviewFormMetaData from '@/components/UI/Wrappers/ReviewFormMetaData';
import { useAppSelector } from '@/hooks/redux';
import { setLogout } from '@/redux/features/authSlice';

interface IRevieFormData {
  isEditable: boolean;
  merchant: boolean;
  onboardingData: any;
  businessNatureType?: any;
}

function ReviewFormData({
  isEditable,
  onboardingData,
  businessNatureType,
}: IRevieFormData) {
  console.log('reviewformonboardingdata', onboardingData);
  const userData = useAppSelector((state: any) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [navRoute, setNavRoute] = useState('');

  console.log('onboarding ', onboardingData);
  console.log('businessnaturetype', businessNatureType);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    // const onSubmit = async ( { resetForm }: any) => {
    // setIsSubmitting(true);
    console.log('user data ', userData);

    try {
      const response = await apiClient.get(`merchant/markApplicationForm`, {
        params: { email: userData?.email },
      });

      if (response.data.responseCode === '009') {
        // success case

        setShowModal(true);
        setTitle(response?.data?.responseMessage);
        setDescription(response?.data?.responseDescription);
        setNavRoute('/login');
        dispatch(setLogout());
      } else {
        setTitle('Failed Submission');
        setDescription(`Please, try again later!`);
      }

      console.log(response);
      // resetForm();
    } catch (e: any) {
      setTitle(e.code);
      setDescription(e.message);
      setShowModal(true);
    } finally {
      // setIsSubmitting(false);
      // setShowModal(true);
    }
  };

  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={navRoute}
        // routeName={route}
      />
      {onboardingData?.pages.map((page: any) => (
        <ReviewFormLayout key={page.pageName}>
          <ReviewFormMetaData
            heading={page.pageName}
            active={page.pageName.toLowerCase().replace(/\s+/g, '-')}
            isEditable={isEditable}
          />
          {page.categories.map((category: any, categoryIndex: number) => (
            <>
              <ReviewFormDataGrid
                key={category.categoryName}
                heading={category.categoryName}
              >
                {category?.data?.map((item: any, index: any) =>
                  item.label ===
                  'Click here if correspondence address is same as business address' ? null : Array.isArray(
                      item.value,
                    ) ? (
                    item?.value?.map((subValue: any, subIndex: any) => (
                      <ReviewInput
                        key={`${index}-${subIndex}`}
                        label={item.label}
                        value={
                          subValue !== null && subValue !== ''
                            ? subValue
                            : Array.isArray(item.options) &&
                              item.options.length > 0
                            ? item.options.join(', ')
                            : ''
                        }
                      />
                    ))
                  ) : (item.value !== null && item.value !== '') ||
                    (Array.isArray(item.options) && item.options.length > 0) ? (
                    <ReviewInput
                      key={index}
                      label={item.label}
                      value={
                        item.value !== null && item.value !== ''
                          ? item.value
                          : item.options.join(', ')
                      }
                    />
                  ) : null,
                )}
              </ReviewFormDataGrid>
              {categoryIndex !== page.categories.length - 1 && (
                <div className="border-t-px border border-border-light" />
              )}
            </>
          ))}

          {/* DO NOT REMOVE COMMENTED CODE BELOW */}
          {/* {page.categories.map((category: any, categoryIndex: number) => (
            <>
              <ReviewFormDataGrid
                key={category.categoryName}
                heading={category.categoryName}
              >
                {category?.data?.map((item: any, index: any) =>

                
                  Array.isArray(item.value) ? (
                    item?.value?.map((subValue: any, subIndex: any) => (
                      <ReviewInput
                        key={`${index}-${subIndex}`}
                        label={item.label}
                        value={subValue}

                        // value={
                        //   subValue !== null && subValue !== ""
                        //     ? subValue
                        //     : Array.isArray(item.options) && item.options.length > 0
                        //       ? item.options
                        //       : ""
                        // }
                      />
                    ))
                  ) : (
                    <ReviewInput
                      key={index}
                      label={item.label}
                      // value={item.value}
                        value={
                          item.value !== null && item.value !== ""
                            ? item.value
                            : Array.isArray(item.options) && item.options.length > 0
                              ? item.options.join(", ")
                              : ""
                        }
                    />
                  ),
                )}
              </ReviewFormDataGrid>
              {categoryIndex !== page.categories.length - 1 && (
                <div className="border-t-px border border-border-light" />
              )}
            </>
          ))} */}
        </ReviewFormLayout>
      ))}

      <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
        <Button
          label={`Submit`}
          // isDisabled={isSubmitting}
          type="submit"
          onClickHandler={onSubmit}
          className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
        />
      </div>
    </>
  );
}

export default ReviewFormData;
