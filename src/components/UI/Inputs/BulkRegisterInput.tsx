import type { FormikProps } from 'formik';
// import type { StaticImageData } from "next/image";
import Image from 'next/image';
import React, { useState } from 'react';

import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import B3 from '@/components/UI//Body/B3';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
import H6 from '@/components/UI/Headings/H6';

import M7 from '../Headings/M7';

export interface IFileInput {
  index?: any;
  className?: string;
  item?: any;
  // {
  //   label: string;
  //   file: File | null | undefined | any;
  //   name: string;
  //   icon: StaticImageData | string;
  // };
  selectedFiles: Array<File | null>;
  formik?: FormikProps<any>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<(File | null)[]>>;
}

function BulkRegisterInput({
  index,
  item,
  selectedFiles,
  setSelectedFiles,

  formik,
}: IFileInput) {
  const [file, setFile] = useState<any>();
  const handleUpload = async () => {
    if (selectedFiles) {
      console.log('Uploading file...');
      // const formData = new FormData();
      // formData.append("selectedFiles", selectedFiles);
    }
  };

  const handleFileChange = (index: number, e: any) => {
    const f = e.target.files?.[0];
    setFile(f);
    console.log(index, 'FILEEEEEE form input file:', f);

    if (f) {
      formik?.setFieldValue(item.name, f);
      setSelectedFiles((prevFiles: any) => {
        const newFiles = [...prevFiles];
        newFiles[index] = f;
        return newFiles;
      });
    } else {
      formik?.setFieldValue(item.name, null);
      setSelectedFiles((prevFiles: any) => {
        const newFiles = [...prevFiles];
        newFiles[index] = null;
        return newFiles;
      });
    }
  };
  return (
    <div className="flex flex-col gap-[6px]">
      <div
        className="flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
        key={index}
      >
        <div>
          {/* <B3>{item.label}hi</B3> */}
          {item.file ? <B3>{item.label}</B3> : <M7>{item.label}</M7>}

          <H6 medium={true}>{file ? file?.name : ''}</H6>
        </div>
        <div className="flex align-middle">
          {file ? (
            <Image
              src={CrossIcon}
              alt="cross-Icon"
              onClick={(e) => handleFileChange(index, e)}
            />
          ) : (
            <label>
              <input
                className="hidden w-full bg-primary-300 text-warning-300 "
                type="file"
                multiple
                name={item.name}
                onChange={(e: any) => handleFileChange(index, e)}
              />
              <Image
                src={AttachmentsIcon}
                alt="attachments-Icon"
                onClick={handleUpload}
              />
            </label>
          )}
        </div>
      </div>
      <FormikErrorMessage name={item.name} />
    </div>
  );
}

export default BulkRegisterInput;
