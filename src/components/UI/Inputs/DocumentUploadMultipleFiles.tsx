// Import FormikProps from formik
import type { FormikProps } from 'formik';
// import { useEffect, useState } from 'react';s
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import B3 from '@/components/UI/Body/B3';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
import H6 from '@/components/UI/Headings/H6';
import M7 from '@/components/UI/Headings/M7';

export interface IDocumentUploadInput {
  formik?: FormikProps<any>; // Define formik as optional if not always required
  uploads: Array<File | null>;
  setUploads: Dispatch<SetStateAction<Array<File | null>>>;
}

function DocumentUploadMultipleFiles({
  formik,
  uploads,
  setUploads,
}: IDocumentUploadInput) {
  // const [uploads, setUploads] = useState<Array<File | null>>([null]); // Start with one empty field

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null;
    console.log('file is', file);
    setUploads((prev) => {
      const newUploads = [...prev];
      newUploads[index] = file;
      return newUploads;
    });
    if (file) {
      formik?.setFieldValue(`file${index}`, file);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploads((prev) => {
      const newUploads = [...prev];
      newUploads[index] = null;
      return newUploads;
    });
    formik?.setFieldValue(`file${index}`, null);

    console.log('uploadsss', uploads);
  };

  const addNewUploadField = () => {
    setUploads((prev) => [...prev, null]);
  };

  return (
    <div>
      {uploads.map((file, index) => (
        <div className="mt-4 flex w-full flex-row gap-[6px]" key={index}>
          <div className="flex h-[60px] w-full items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5">
            <div>
              {file ? <B3>Upload File</B3> : <M7>Upload File</M7>}
              <H6 medium={true}>{file ? file.name : ''}</H6>
            </div>
            <div className="flex align-middle">
              {file ? (
                <Image
                  src={CrossIcon}
                  alt="cross-Icon"
                  onClick={() => handleRemoveFile(index)}
                />
              ) : (
                <label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                  <Image src={AttachmentsIcon} alt="attachments-Icon" />
                </label>
              )}
            </div>
          </div>

          {index === uploads.length - 1 && file && (
            <button onClick={addNewUploadField} className="plus-icon">
              +
            </button>
          )}
          <FormikErrorMessage name={`file${index}`} />
        </div>
      ))}
    </div>
  );
}

export default DocumentUploadMultipleFiles;
