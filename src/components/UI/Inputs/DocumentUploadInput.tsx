// // Import FormikProps from formik
// import type { FormikProps } from 'formik';
// import { useEffect, useState } from 'react';s
import Image from 'next/image';

// import type { Dispatch, SetStateAction } from 'react';
import AttachmentsIcon from '@/assets/icons/Attachments.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import B3 from '@/components/UI/Body/B3';
import FormikErrorMessage from '@/components/UI/Formik/ErrorHandling/FormikErrorMessage';

// import H6 from '@/components/UI/Headings/H6';
import M7 from '../Headings/M7';
import type { IDocumentUploadInput } from './DocumentUploadMultipleFiles';
// import { error } from 'console';

// export interface IDocumentUploadInput {
//   formik?: FormikProps<any>; // Define formik as optional if not always required
//   uploads: Array<File | null>;
//   setUploads: Dispatch<SetStateAction<Array<File | null>>>;
// }

// function DocumentUploadInput({
//   formik,
//   uploads,
//   setUploads,
// }: IDocumentUploadInput) {
//   console.log(formik, 'formikk');
//   const handleFileChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = e.target.files?.[0] || null;

//     // Update the uploads array
//     setUploads((prev) => {
//       const newUploads = [...prev];
//       newUploads[index] = file;
//       return newUploads;
//     });

//     // Update Formik's state
//     if (file) {
//       formik?.setFieldValue(`uploads[${index}]`, file);
//     }
//   };

//   const handleRemoveFile = (index: number) => {
//     setUploads((prev) => {
//       const newUploads = [...prev];
//       newUploads[index] = null;
//       return newUploads;
//     });
//     formik?.setFieldValue(`uploads[${index}]`, null);
//   };

//   const addNewUploadField = () => {
//     setUploads((prev) => [...prev, null]);
//     formik?.setFieldValue('uploads', [...uploads, null]);
//   };

//   return (
//     <div className="flex w-full flex-row justify-between">
//       <div className="w-full">
//         {uploads.map((file, index) => (
//           <div className={`mt-4 flex w-full flex-col gap-[6px]`} key={index}>
//             <div
//               className={`flex h-[60px] w-full items-center justify-between rounded-lg border border-border-light  bg-screen-white px-5 ${
//                 formik?.touched && formik?.errors.uploads
//                   ? 'border-border-light'
//                   : ''
//               }`}
//             >
//               <div>{file ? <B3>{file.name}</B3> : <M7>Upload File</M7>}</div>
//               <div className="flex align-middle">
//                 {file ? (
//                   <Image
//                     src={CrossIcon}
//                     alt="Remove File"
//                     onClick={() => handleRemoveFile(index)}
//                   />
//                 ) : (
//                   <label>
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleFileChange(index, e)}
//                     />
//                     <Image src={AttachmentsIcon} alt="Upload File" />
//                   </label>
//                 )}
//               </div>
//             </div>
//             <FormikErrorMessage name={`uploads[${index}]`} />
//           </div>
//         ))}
//       </div>
//       <div className="py-10">
//         <button type="button" onClick={addNewUploadField}>
//           +
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DocumentUploadInput;

// old-pgt
// function DocumentUploadInput({
//   formik,
//   uploads,
//   setUploads,
// }: IDocumentUploadInput) {
//   console.log(formik, 'formikk');

//   const handleFileChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = e.target.files?.[0] || null;

//     // Update the uploads array
//     setUploads((prev) => {
//       const newUploads = [...prev];
//       newUploads[index] = file;
//       return newUploads;
//     });

//     // Update Formik's state
//     if (file) {
//       formik?.setFieldValue(`uploads[${index}]`, file);
//     }
//   };

//   const handleRemoveField = (index: number) => {
//     setUploads((prev) => {
//       const newUploads = prev.filter((_, i) => i !== index);
//       return newUploads;
//     });

//     // Update Formik's state
//     formik?.setFieldValue(
//       'uploads',
//       uploads.filter((_, i) => i !== index),
//     );
//   };

//   const addNewUploadField = () => {
//     setUploads((prev) => [...prev, null]);
//     formik?.setFieldValue('uploads', [...uploads, null]);
//   };

//   return (
//     <div className="flex w-full flex-row justify-between">
//       <div className="w-full">
//         {uploads.map((file, index) => (
//           <div className={`mt-4 flex w-full flex-col gap-[6px]`} key={index}>
//             <div
//               className={`flex h-[60px] w-full items-center justify-between rounded-lg border border-border-light bg-screen-white px-5 ${
//                 formik?.touched && formik?.errors.uploads
//                   ? 'border-border-light'
//                   : ''
//               }`}
//             >
//               <div>{file ? <B3>{file.name}</B3> : <M7>Upload File</M7>}</div>
//               <div className="flex align-middle">
//                 {file ? (
//                   <Image
//                     src={CrossIcon}
//                     alt="Remove File"
//                     onClick={() => handleRemoveField(index)}
//                     className="cursor-pointer"
//                   />
//                 ) : (
//                   <label>
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleFileChange(index, e)}
//                     />
//                     <Image src={AttachmentsIcon} alt="Upload File" />
//                   </label>
//                 )}
//               </div>
//             </div>
//             <FormikErrorMessage name={`uploads[${index}]`} />
//           </div>
//         ))}
//       </div>
//       <div className="py-10">
//         <button type="button" onClick={addNewUploadField}>
//           +
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DocumentUploadInput;

function DocumentUploadInput({
  formik,
  uploads,
  setUploads,
}: IDocumentUploadInput) {
  console.log(formik, 'formikk');

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null;

    // Update the uploads array
    setUploads((prev) => {
      const newUploads = [...prev];
      newUploads[index] = file;
      return newUploads;
    });

    // Update Formik's state
    if (file) {
      formik?.setFieldValue(`uploads[${index}]`, file);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploads((prev) => {
      const newUploads = [...prev];
      newUploads[index] = null; // Clear the file at the specified index
      return newUploads;
    });

    // Clear the file in Formik's state
    formik?.setFieldValue(`uploads[${index}]`, null);
  };

  const handleRemoveField = (index: number) => {
    setUploads((prev) => {
      const newUploads = prev.filter((_, i) => i !== index); // Remove the entire field
      return newUploads;
    });

    // Update Formik's state
    formik?.setFieldValue(
      'uploads',
      uploads.filter((_, i) => i !== index),
    );
  };

  const addNewUploadField = () => {
    setUploads((prev) => [...prev, null]);
    formik?.setFieldValue('uploads', [...uploads, null]);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {uploads.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border border-border-light bg-screen-white p-4"
        >
          <div className="flex-1">
            <div
              className={`flex h-[60px] w-full items-center justify-between rounded-lg px-4 ${
                formik?.touched && formik?.errors.uploads
                  ? 'border-red-500 border'
                  : ''
              }`}
            >
              <div>{file ? <B3>{file.name}</B3> : <M7>Upload File</M7>}</div>
              <div className="flex align-middle">
                {file ? (
                  <Image
                    src={CrossIcon}
                    alt="Remove File"
                    onClick={() => handleRemoveFile(index)} // Remove only the file
                    className="cursor-pointer"
                  />
                ) : (
                  <label>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                    <Image src={AttachmentsIcon} alt="Upload File" />
                  </label>
                )}
              </div>
            </div>
            <FormikErrorMessage name={`uploads[${index}]`} />
          </div>
          {/* Close Icon to remove the entire field */}
          <div
            onClick={() => handleRemoveField(index)}
            className="cursor-pointer"
          >
            <Image src={CrossIcon} alt="Remove Input Field" />
          </div>
        </div>
      ))}
      {/* Add Button */}
      <button
        type="button"
        onClick={addNewUploadField}
        className="bg-blue-500 text-white mt-4 rounded px-4 py-2"
      >
        +
      </button>
    </div>
  );
}

export default DocumentUploadInput;

// function DocumentUploadInput({
//   formik,
//   uploads,
//   setUploads,
// }: IDocumentUploadInput) {
//   console.log(formik, 'formikk');

//   const handleFileChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = e.target.files?.[0] || null;

//     // Update the uploads array
//     setUploads((prev) => {
//       const newUploads = [...prev];
//       newUploads[index] = file;
//       return newUploads;
//     });

//     // Update Formik's state
//     if (file) {
//       formik?.setFieldValue(`uploads[${index}]`, file);
//     }
//   };

//   const handleRemoveField = (index: number) => {
//     setUploads((prev) => {
//       const newUploads = prev.filter((_, i) => i !== index);
//       return newUploads;
//     });

//     // Update Formik's state
//     formik?.setFieldValue(
//       'uploads',
//       uploads.filter((_, i) => i !== index),
//     );
//   };

//   const addNewUploadField = () => {
//     setUploads((prev) => [...prev, null]);
//     formik?.setFieldValue('uploads', [...uploads, null]);
//   };

//   return (
//     <div className="flex w-full flex-row justify-between">
//       <div className="w-full">
//         {uploads.map((file, index) => (
//           <div className={`mt-4 flex w-full flex-col gap-[6px]`} key={index}>
//             <div
//               className={`flex h-[60px] w-full items-center justify-between rounded-lg border border-border-light bg-screen-white px-5 ${formik?.touched && formik?.errors.uploads
//                   ? 'border-border-light'
//                   : ''
//                 }`}
//             >
//               <div>{file ? <B3>{file.name}</B3> : <M7>Upload File</M7>}</div>
//               <div className="flex align-middle">
//                 {file ? (
//                   <Image
//                     src={CrossIcon}
//                     alt="Remove File"
//                     onClick={() => handleRemoveField(index)}
//                     className="cursor-pointer"
//                   />
//                 ) : (
//                   <label>
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={(e) => handleFileChange(index, e)}
//                     />
//                     <Image src={AttachmentsIcon} alt="Upload File" />
//                   </label>
//                 )}
//               </div>
//             </div>
//             <FormikErrorMessage name={`uploads[${index}]`} />
//           </div>
//         ))}
//       </div>
//       <div className="py-10">
//         <button type="button" onClick={addNewUploadField}>
//           +
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DocumentUploadInput;
