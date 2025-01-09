'use client';

import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import apiClient from '@/api/apiClient';
import SuccessModal from '@/components/UI/Modal/CustomModal';
import { useAppSelector } from '@/hooks/redux';

// import useCurrentTab from '@/hooks/useCurrentTab';
// import { generateMD5Hash } from '@/utils/helper';
import Button from '../UI/Button/PrimaryButton';
import H7 from '../UI/Headings/H7';

interface Applicant {
  applicantFullName: string;
}

const PhotoCapture: React.FC = () => {
  const applicants = useAppSelector(
    (state: any) => state.onBoardingForms.addApplicants,
  ) as Applicant[];
  const firstName = useAppSelector(
    (state: any) => state.onBoardingForms.soleName,
  );
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  console.log('applicants pic ', firstName, applicants);

  const [sortedApplicants, setSortedApplicants] = useState<any[]>([]);

  // const numberOfApplicants = applicants?.length !== 0 ? applicants?.length + 1 : 1;
  const numberOfApplicants =
    (applicants?.length || 0) !== 0 ? (applicants?.length || 0) + 1 : 1;
  console.log('NUMBER ', numberOfApplicants);
  const [name, setName] = useState<string[]>(
    [],
    // applicants?.[0]?.applicantFullName,
  );

  const userData = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<string[]>([]);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log('setDisabledButton ', disabledButton, setDisabledButton);

  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  const formData = useAppSelector((state: any) => state.onBoardingForms);
  const option = formData.businessNature.businessTypeNature;
  console.log('OP ', option);
  console.log('FD ', formData);

  useEffect(() => {
    console.log('USE APPL ', firstName, applicants);
    if (applicants?.length > 0) {
      const prioritizedApplicants = [
        { applicantFullName: firstName },
        ...applicants.filter(
          (applicant: Applicant) => applicant?.applicantFullName !== firstName,
        ),
      ];

      setSortedApplicants(prioritizedApplicants);
    } else {
      const prioritizedApplicants = [{ applicantFullName: firstName }];

      setSortedApplicants(prioritizedApplicants);
    }
  }, [applicants, firstName]);

  console.log('SORTED ', sortedApplicants);

  const capture = useCallback(() => {
    // Prevent capturing if the condition for `option` is met
    if (
      option === 'solePropieter' &&
      // images.length >= 1
      images.length >= applicants.length
      // ||
      // (option !== 'solePropieter' && images.length >= 2)
    ) {
      return; // Do nothing if the max limit is reached
    }
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const currentApplicantName =
        // sortedApplicantNames[images.length]
        sortedApplicants[images.length]?.applicantFullName;
      // applicants[images.length + 1]?.applicantFullName;

      setImages((prevImages) => [...prevImages, imageSrc]);
      setName((prevNames) => [...prevNames, currentApplicantName]);
      // setName((prevNames) => [...prevNames, currentApplicantName]);
    }
    if (option === 'solePropieter' && images.length >= 1) {
      setDisabledButton(false);
    } else if (images.length === 0 || images.length < numberOfApplicants) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [webcamRef, option, images]);

  console.log(
    'sortedApplicantNames[images.length]?.applicantFullName ',
    sortedApplicants,
  );

  // Send the captured photos to the backend
  const uploadPhotos = async () => {
    if (images.length === 0 || images.length < numberOfApplicants) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      const status = 'Completed';

      // Convert each base64 image data to a Blob and append to formData
      await Promise.all(
        images.map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();
          formData.append(`files`, blob, `photo${index + 1}.jpg`);
          formData.append(`labels`, sortedApplicants[index]?.applicantFullName);
        }),
      );
      formData.append(`corporateEmail`, userData?.email);
      formData.append(`status`, status);

      const res = await apiClient.post(
        '/corporate/saveLivePictureDocuments',
        formData,
      );
      if (res.data.responseCode === '009') {
        console.log('Upload successful:', res.data);
        router.push('/merchant/home/business-nature/checklist');
      } else {
        console.log('Failed saving data');
        setIsLoading(false);
      }

      console.log('Upload successful:', res.data);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImages = (index: any) => {
    console.log('INDEX DEL ', index);

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    console.log('DEL IMG ', updatedImages);

    const removedApplicant = sortedApplicants[index];
    const updatedApplicants = sortedApplicants.filter((_, i) => i !== index);
    const rearrangedApplicants = [...updatedApplicants, removedApplicant];
    setSortedApplicants(rearrangedApplicants);

    console.log('DEL SORTED NAMES22>> ', rearrangedApplicants);

    const currentApplicantIndex = updatedImages.length;
    console.log('currentApplicantIndex ', currentApplicantIndex);

    const currentApplicant = rearrangedApplicants[currentApplicantIndex];
    console.log('currentApplicant ', currentApplicant);
  };

  const onSubmit = async (
    values: any,
    // { setSubmitting }: FormikHelpers<any>,
  ) => {
    console.log('live picturee ', values);
    if (images.length === 0 || images.length < numberOfApplicants) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      const status = 'Completed';

      // Convert each base64 image data to a Blob and append to formData
      images.forEach((image, index) => {
        const blob = new Blob([image], { type: 'image/jpeg' }); // Convert directly to Blob
        formData.append('files', blob, `photo${index + 1}.jpg`); // Append file
        formData.append('labels', sortedApplicants[index]?.applicantFullName); // Append label
      });

      // Append additional fields
      formData.append('corporateEmail', userData?.email);
      formData.append('status', status);

      const res = await apiClient.post(
        '/corporate/saveLivePictureDocuments',
        formData,
      );
      if (res.data.responseCode === '009') {
        console.log('Upload successful:', res.data);
        router.push('/merchant/home/business-nature/checklist');
      } else {
        setShowModal(true);
        setTitle('Failed uploading Images');
        setDescription(res.data.responseDescription);
        console.log('Failed saving data');
      }

      console.log('Upload successful:', res.data);
    } catch (error: any) {
      setShowModal(true);
      setTitle(error.code);
      setDescription(error.message);
      console.error('Error uploading photos:', error);

      // Log additional debugging details
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log('name ', name);

  return (
    <>
      <SuccessModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        // routeName="/login"
        // routeName={route}
      />
      <Formik
        // initialValues={initialValuesState}
        // validationSchema={validationSchemaState}
        onSubmit={onSubmit}
        initialValues={undefined}
      >
        <div className="flex flex-col gap-5">
          <div className="flex min-h-screen items-center justify-center">
            <div className="border-opacity/50 order-0 box-border flex h-full w-full grow-0 flex-col items-start gap-4 self-stretch rounded-lg border border-border-light bg-screen-grey p-16">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="h-[520px] w-full rounded-md border-2 border-primary-base"
              />

              <div className="relative bottom-4 left-1/2 h-[110px] w-full -translate-x-1/2 bg-[rgba(50,44,60,0.9)]">
                <div className="relative left-1/2 top-1/2 flex h-[36px] w-[324px] -translate-x-1/2 -translate-y-1/2 flex-row items-start gap-4 p-0">
                  {images.length <
                    (option === 'soleProprietor' ? 1 : numberOfApplicants) && (
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                      <button
                        onClick={capture}
                        className="box-border flex h-[36px] w-[324px] grow flex-row items-center justify-center self-stretch rounded-lg border-[1.5px] border-border-green bg-screen-white p-[11px_8px]"
                      >
                        <span className="flex h-[14px] w-[43px] items-center justify-center text-[12px] font-semibold leading-[14px] text-secondary-base">
                          Capture
                        </span>
                      </button>

                      <H7 textColor="text-screen-white">
                        {/* Capture Photo for Applicant : {name} */}
                        Capture Photo for Applicant :{' '}
                        {sortedApplicants[images.length]?.applicantFullName}
                        {/* {firstName} */}
                      </H7>
                    </div>
                  )}
                </div>
              </div>

              {images.length > 0 && (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Captured ${index + 1}`}
                          className="h-32 w-full rounded-md border-2 border-primary-base object-cover"
                        />
                        <button
                          onClick={() =>
                            // setImages(images.filter((_, i) => i !== index))
                            deleteImages(index)
                          }
                          className="bg-red-500 text-white absolute right-1 top-1 rounded-full p-1"
                        >
                          &#x2715;
                        </button>
                        <H7>{sortedApplicants[index]?.applicantFullName}</H7>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className=" sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
            <Button
              label={`Next`}
              isDisabled={isLoading}
              type="button"
              onClickHandler={uploadPhotos}
              className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
            />
          </div>
        </div>
      </Formik>
    </>
  );
};

export default PhotoCapture;
