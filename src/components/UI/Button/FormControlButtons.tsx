// import React from 'react';

// import Button from './PrimaryButton';
// import type { ActivityFormInfo } from "@/interfaces/interface";

// interface SaveAndContinueProps {
//   saveAndContinue: (
//     values: ActivityFormInfo,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
//   ) => Promise<void>;
// }

// const FormControlButtons = ({ saveAndContinue }: SaveAndContinueProps) => {
//   return (
//     <div className="sm:max-md:[24px] sm:max-md:flex-col-reverse sm:max-md:gap-4 flex w-full items-center justify-end gap-9">
//       <Button
//         label={`Save & Continue Later`}
//         type="submit"
//         onClickHandler={saveAndContinue}
//         className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//       />
//       <Button
//         label={`Next`}
//         type="submit"
//         // isDisabled={formik.isValid}
//         className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
//       />
//     </div>
//   );
// };

// export default FormControlButtons;
