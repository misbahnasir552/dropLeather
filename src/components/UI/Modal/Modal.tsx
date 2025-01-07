import React, { useRef } from 'react';

import type { IModalProps } from '@/interfaces/interface';

// interface IModalProps {
//   isSuccess: boolean;
//   showModal: boolean;
//   children: React.ReactNode;
//   setShowModal: (showModal: boolean) => void;
// }

const Modal: React.FC<IModalProps> = ({
  isSuccess,
  showModal,
  children,
  setShowModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    // Perform any necessary actions to close the modal
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex place-items-center"
    >
      <div
        ref={modalRef}
        className={
          isSuccess
            ? `bg-slate-200 flex h-1/4 w-1/3 place-items-center rounded-lg border-2 p-8`
            : `bg-slate-200 flex h-1/4 w-1/3 place-items-center rounded-lg border-2 p-8`
        }
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

// <SuccessModal showModal={showModal} setShowModal={setShowModal}>
//   <div className="flex space-x-2">
//     <h1 className="text-2xl font-bold mb-4">Success Message</h1>
//     {/* <SuccessTick /> */}
//   </div>
//   <p className="text-green-500">{msg}</p>
// </SuccessModal>;
