import type { FormikProps } from 'formik';
import Image from 'next/image';
import React from 'react';

import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';

export interface IFileInput {
  index: number;
  item: { name: string; array: File[] };
  selectedFiles: { name: string; array: File[] }[];
  formik?: FormikProps<any>;
  setSelectedFiles: React.Dispatch<
    React.SetStateAction<{ name: string; array: File[] }[]>
  >;
}

function FileInput({
  index,
  item,
  selectedFiles,
  formik,
  setSelectedFiles,
}: IFileInput) {
  // console.log('formik errors', formik);
  console.log(selectedFiles, 'selected files');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(selectedFiles);
    setSelectedFiles((prev) =>
      prev.map((fileGroup, i) =>
        i === index
          ? { ...fileGroup, array: [...fileGroup.array, ...files] }
          : fileGroup,
      ),
    );

    formik?.setFieldValue(item.name, files[0] || null);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setSelectedFiles((prev) =>
      prev.map((fileGroup, i) =>
        i === index
          ? {
              ...fileGroup,
              array: fileGroup.array.filter((_, j) => j !== fileIndex),
            }
          : fileGroup,
      ),
    );

    // if (selectedFiles[index].array.length === 1) {
    //   formik.setFieldValue(item.name, null); // Clear the Formik value if all files are removed
    // }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <div className={`flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5 ${ formik?.errors[item.name]!==null? 'border-danger-base' : 'border-border-light'}`}> */}
      <div
        className={`flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5`}
      >
        <span>{item.name}</span>
        <label>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <Image src={AttachmentsIcon} alt="Attach files" />
        </label>
      </div>
      <div>
        <div>
          {item.array.map((file, fileIndex) => (
            <div
              key={fileIndex}
              className="flex items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
            >
              <span>{file.name}</span>
              <Image
                src={CrossIcon}
                alt="Remove file"
                onClick={() => handleRemoveFile(fileIndex)}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <FormikErrorMessage name={item.name} />
    </div>
  );
}

export default FileInput;

// import React from 'react';
// import Image from 'next/image';
// import AttachmentsIcon from '@/assets/icons/Attachments.svg';
// import CrossIcon from '@/assets/icons/Cross.svg';

// export interface IFileInput {
//   index: number;
//   // bulkRegister?:string;
//   item: { name: string; array: File[] };
//   selectedFiles: { name: string; array: File[] }[];
//   setSelectedFiles: React.Dispatch<
//     React.SetStateAction<{ name: string; array: File[] }[]>
//   >;
// }

// function FileInput({
//   index,
//   item,
//   selectedFiles,
//   setSelectedFiles,
// }: IFileInput) {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);

//     setSelectedFiles((prev) =>
//       prev.map((fileGroup, i) =>
//         i === index
//           ? { ...fileGroup, array: [...fileGroup.array, ...files] }
//           : fileGroup
//       )
//     );
//   };
//   console.log(selectedFiles)
//   const handleRemoveFile = (fileIndex: number) => {
//     setSelectedFiles((prev) =>
//       prev.map((fileGroup, i) =>
//         i === index
//           ? {
//             ...fileGroup,
//             array: fileGroup.array.filter((_, j) => j !== fileIndex),
//           }
//           : fileGroup
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5">
//         <span>{item.name}</span>
//         <label>
//           <input
//             type="file"
//             multiple
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <Image src={AttachmentsIcon} alt="Attach files" />
//         </label>
//       </div>
//       <div>
//         <div className=''>

//         {item.array.map((file, fileIndex) => (
//           <div
//           key={fileIndex}
//           className="flex justify-between items-center rounded-lg border-[1px] border-border-light border-border-light bg-screen-white px-5"
//           >
//             <span>{file.name}</span>
//             <Image
//               src={CrossIcon}
//               alt="Remove file"
//               onClick={() => handleRemoveFile(fileIndex)}
//               className="cursor-pointer"
//               />
//           </div>
//         ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileInput;

// import type { FormikProps } from 'formik';
// // import type { StaticImageData } from "next/image";
// import Image from 'next/image';
// import React, { useState } from 'react';

// import AttachmentsIcon from '@/assets/icons/Attachments.svg';
// import CrossIcon from '@/assets/icons/Cross.svg';
// import B3 from '@/components/UI//Body/B3';
// import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';
// import H6 from '@/components/UI/Headings/H6';

// export interface IFileInput {
//   index?: any;
//   className?: string;
//   item?: any;
//   // {
//   //   label: string;
//   //   file: File | null | undefined | any;
//   //   name: string;
//   //   icon: StaticImageData | string;
//   // };
//   selectedFiles: Array<File | null>;
//   formik?: FormikProps<any>;
//   setSelectedFiles: React.Dispatch<React.SetStateAction<(File | null)[]>>;
// }

// function FileInput({
//   index,
//   item,
//   selectedFiles,
//   setSelectedFiles,

//   formik,
// }: IFileInput) {
//   const [file, setFile] = useState<any>();
//   const handleUpload = async () => {
//     if (selectedFiles) {
//       console.log('Uploading file...');
//       // const formData = new FormData();
//       // formData.append("selectedFiles", selectedFiles);
//     }
//   };

//   const handleFileChange = (index: number, e: any) => {
//     const f = e.target.files?.[0];
//     setFile(f);
//     console.log(index, 'FILEEEEEE form input file:', f);

//     if (f) {
//       formik?.setFieldValue(item.name, f);
//       setSelectedFiles((prevFiles: any) => {
//         const newFiles = [...prevFiles];
//         newFiles[index] = f;
//         return newFiles;
//       });
//     } else {
//       formik?.setFieldValue(item.name, null);
//       setSelectedFiles((prevFiles: any) => {
//         const newFiles = [...prevFiles];
//         newFiles[index] = null;
//         return newFiles;
//       });
//     }
//   };
//   return (
//     <div className="flex flex-col gap-[6px]">
//       <div
//         className="flex h-[60px] items-center justify-between rounded-lg border-[1px] border-border-light bg-screen-white px-5"
//         key={index}
//       >
//         <div>
//           {/* <B3>{item.label}hi</B3> */}
//           {item.file ? <B3>{item.label}</B3> : <M7>{item.label}</M7>}

//           <H6 medium={true}>{file ? file?.name : ''}</H6>
//         </div>
//         <div className="flex align-middle">
//           {file ? (
//             <Image
//               src={CrossIcon}
//               alt="cross-Icon"
//               onClick={(e) => handleFileChange(index, e)}
//             />
//           ) : (
//             <label>
//               <input
//                 className="hidden w-full bg-primary-300 text-warning-300 "
//                 type="file"
//                 name={item.name}
//                 onChange={(e: any) => handleFileChange(index, e)}
//               />
//               <Image
//                 src={AttachmentsIcon}
//                 alt="attachments-Icon"
//                 onClick={handleUpload}
//               />
//             </label>
//           )}
//         </div>
//       </div>
//       <FormikErrorMessage name={item.name} />
//     </div>
//   );
// }

// export default FileInput;
