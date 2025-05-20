// import type { FormikProps } from 'formik';
// import Image from 'next/image';
// import React from 'react';

// import AttachmentsIcon from '@/assets/icons/Attachments.svg';
// import CrossIcon from '@/assets/icons/Cross.svg';
// import B3 from '@/components/UI//Body/B3';
// import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
// import H6 from '@/components/UI/Headings/H6';

// export interface IFileInput {
//   index?: any;
//   className?: string;
//   item?: any;
//   selectedFiles: Array<File | null>;
//   formik?: FormikProps<any>;
//   setSelectedFiles: React.Dispatch<React.SetStateAction<(File | null)[]>>;
// }

// function CorporateFileInput({
//   index,
//   item,
//   selectedFiles,
//   setSelectedFiles,
//   formik,
// }: IFileInput) {
//   const handleFileChange = (index: number, e: any) => {
//     const files = Array.from(e.target.files || []);
//     console.log(index, 'Selected files:', files);

//     // Update the Formik field with all selected files
//     formik?.setFieldValue(item.name, files);

//     // Update state with all selected files
//     setSelectedFiles((prevFiles) => {
//       const newFiles = [...prevFiles];
//       newFiles[index] = files; // Store multiple files at the given index
//       return newFiles;
//     });
//   };

//   const removeFile = (fileIndex: number) => {
//     setSelectedFiles((prevFiles) => {
//       const newFiles = [...prevFiles];
//       if (newFiles[index]) {
//         newFiles[index] = newFiles[index]?.filter(
//           (_: any, idx: number) => idx !== fileIndex
//         );
//       }
//       return newFiles;
//     });

//     // Update Formik field value
//     const updatedFiles = selectedFiles?.[index]?.filter(
//       (_: any, idx: number) => idx !== fileIndex
//     );
//     formik?.setFieldValue(item.name, updatedFiles);
//   };

//   return (
//     <div className="flex flex-col gap-[6px]">
//       <div
//         className="flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
//         key={index}
//       >
//         {item.file ? <B3>{item.label}</B3> : <M7>{item.label}</M7>}

//         <div className="flex align-middle">
//           <label>
//             <input
//               className="hidden w-full bg-primary-300 text-warning-300"
//               type="file"
//               multiple // Allow multiple files
//               name={item.name}
//               onChange={(e: any) => handleFileChange(index, e)}
//             />
//             <Image src={AttachmentsIcon} alt="Upload Files" />
//           </label>
//         </div>
//       </div>

//       <div>
//         {selectedFiles?.[index]?.map((file: File, fileIndex: number) => (

//           <div
//             key={fileIndex}
//             className="flex items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
//           >
//             <H6 medium={true}>{file.name}</H6>
//             <Image
//               src={CrossIcon}
//               alt="Remove file"
//               onClick={() => removeFile(fileIndex)}
//               className="cursor-pointer"
//             />
//           </div>
//         ))}
//         {/* </div> */}
//       </div>
//       <FormikErrorMessage name={item.name} />
//     </div>
//   );
// }

// export default CorporateFileInput;

import type { FormikProps } from 'formik';
import Image from 'next/image';
import React from 'react';

import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import B3 from '@/components/UI/Body/B3';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
import H6 from '@/components/UI/Headings/H6';
import M7 from '@/components/UI/Headings/M7';

export interface IFileInput {
  asterik?: boolean;
  index: number | any;
  className?: string;
  item: {
    name: string;
    label: string;
    file?: boolean;
  };
  selectedFiles: Array<File[] | null>; // Updated type to handle multiple files per index
  formik: FormikProps<any>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<(File[] | null)[]>>;
}

function CorporateFileInput({
  index,
  item,
  selectedFiles,
  setSelectedFiles,
  formik,
  asterik = false,
}: IFileInput) {
  const handleFileChange = (
    fieldIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    console.log(`Index: ${fieldIndex}, Selected files:`, files);

    const updatedFiles = [...(selectedFiles[fieldIndex] || []), ...files];

    formik.setFieldValue(item.name, updatedFiles);

    // Update local state
    setSelectedFiles((prevFiles) => {
      const updatedState = [...prevFiles];
      updatedState[fieldIndex] = updatedFiles;
      return updatedState;
    });

    // // Update Formik state with new files
    // formik.setFieldValue(item.name, files);

    // // Update local state
    // setSelectedFiles((prevFiles) => {
    //   const updatedFiles = [...prevFiles];
    //   updatedFiles[fieldIndex] = files; // Replace files at the specified index
    //   return updatedFiles;
    // });
  };

  const removeFile = (fileIndex: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] =
        updatedFiles[index]?.filter((_, idx) => idx !== fileIndex) || null;

      return updatedFiles;
    });

    // Update Formik state
    const updatedFormikFiles =
      selectedFiles[index]?.filter((_, idx) => idx !== fileIndex) || [];
    formik.setFieldValue(item.name, updatedFormikFiles);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <div
        className="flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
        key={index}
      >
        {item.file ? (
          <div className="flex gap-2">
            <B3>{item.label}</B3>
            {asterik && <B3 textColor="text-danger-base">*</B3>}
          </div>
        ) : (
          <div className="flex gap-2">
            {/* <B3>{item.label}</B3> */}
            <M7>{item.label}</M7>
            {asterik && <H6 textColor="text-danger-base">*</H6>}
          </div>
        )}

        <div className="flex align-middle">
          <label>
            <input
              className="hidden w-full bg-primary-300 text-warning-300"
              type="file"
              multiple // Allow multiple files
              name={item.name}
              onChange={(e) => handleFileChange(index, e)}
            />
            <Image src={AttachmentsIcon} alt="Upload Files" />
          </label>
        </div>
      </div>

      {/* Render selected files */}
      <div>
        {selectedFiles?.[index]?.map((file, fileIndex) => (
          <div
            key={fileIndex}
            className="flex items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
          >
            <H6 medium={true}>{file.name}</H6>
            <Image
              src={CrossIcon}
              alt="Remove file"
              onClick={() => removeFile(fileIndex)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Formik error message */}
      <FormikErrorMessage name={item.name} />
    </div>
  );
}

export default CorporateFileInput;
