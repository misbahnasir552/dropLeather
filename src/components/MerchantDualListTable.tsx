// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// import ArrowLeftSingle from '@/assets/icons/arrow-back-single.svg';
// import ArrowLeftAll from '@/assets/icons/arrow-left-all.svg';
// import ArrowRightAll from '@/assets/icons/arrow-right-all.svg';
// import ArrowRightSingle from '@/assets/icons/arrow-right-single.svg';
// import TickIcon from '@/assets/icons/tick-icon-table-checkbox.svg';

// import B2 from './UI/Body/B2';
// import H7 from './UI/Headings/H7';

// export interface IInitialDataMerchant {
//   // id: number;
//   fieldName: string;
//   fieldCategory: string;
// }

// interface IDualListTable {
//   initialData: IInitialDataMerchant[];
//   headingLeft: string;
//   headingRight: string;
//   title?: string;
//   setSelectedItems?: React.Dispatch<React.SetStateAction<IInitialDataMerchant[]>>
//   selectedItems?: any;
// }

// const MerchantDualListTable = ({
//   initialData,
//   headingLeft,
//   headingRight, //  title
//   setSelectedItems,
//   selectedItems
// }: IDualListTable) => {
//   // const [initialData, setInitialData] = useState<IInitialDataMerchant[]>([]);

//   // useEffect(() => {
//   //   const getForms = async () => {
//   //     try {
//   //       const response = await apiClient.get(
//   //         `merchant/getPageInfo/soleProprietor`,
//   //       );
//   //       console.log('Get Forms', response);
//   //       const responseData = response?.data?.page;
//   //       const initialItems = responseData?.flatMap((item: any) =>
//   //         item.categories.flatMap((category: any) =>
//   //           category.fields.map((field: any) => ({
//   //             name: category.categoryName,
//   //             category: field.label,
//   //           })),
//   //         ),
//   //       );

//   //       if (initialItems) {
//   //         setInitialData(initialItems);
//   //       }
//   //       console.log('Initial items:', initialItems);
//   //       console.log('initial data', initialData);
//   //     } catch (e) {
//   //       console.log(e, 'error fetching');
//   //     }
//   //   };
//   //   getForms();
//   // }, []);

//   const [availableItems, setAvailableItems] =
//     useState<IInitialDataMerchant[]>(initialData);
//     const [checkedSelectedItems, setCheckedSelectedItems] = useState<
//       IInitialDataMerchant[]
//     >([]);

//   useEffect(() => {
//     setAvailableItems(initialData);
//   }, [initialData]);

//   // const [selectedItems, setSelectedItems] = useState<IInitialDataMerchant[]>([]);
//   const [checkedAvailableItems, setCheckedAvailableItems] = useState<
//     IInitialDataMerchant[]
//   >([]);

//   //  const [selectedRole, setSelectedRole] = useState();

//   const handleSelectAllAvailable = () => {
//     if (checkedAvailableItems.length === availableItems.length) {
//       setCheckedAvailableItems([]);
//     } else {
//       setCheckedAvailableItems(availableItems);
//     }
//   };

//   const handleSelectAllSelected = () => {
//     if (checkedSelectedItems.length === selectedItems.length) {
//       setCheckedSelectedItems([]);
//     } else {
//       setCheckedSelectedItems(selectedItems);
//     }
//   };

//   const handleAddSelectedItems = () => {
//     setSelectedItems([...selectedItems, ...checkedAvailableItems]);
//     setAvailableItems(
//       availableItems.filter((i) => !checkedAvailableItems.includes(i)),
//     );
//     setCheckedAvailableItems([]);
//   };

//   const handleRemoveSelectedItems = () => {
//     setAvailableItems([...availableItems, ...checkedSelectedItems]);
//     setSelectedItems(
//       selectedItems.filter((i) => !checkedSelectedItems.includes(i)),
//     );
//     setCheckedSelectedItems([]);
//   };

//   const handleAddAllItems = () => {
//     setSelectedItems([...selectedItems, ...availableItems]);
//     setAvailableItems([]);
//     setCheckedAvailableItems([]);
//   };

//   const handleRemoveAllItems = () => {
//     setAvailableItems([...availableItems, ...selectedItems]);
//     setSelectedItems([]);
//     setCheckedSelectedItems([]);
//   };

//   const toggleAvailableItem = (item: IInitialDataMerchant) => {
//     if (checkedAvailableItems.includes(item)) {
//       setCheckedAvailableItems(checkedAvailableItems.filter((i) => i !== item));
//     } else {
//       setCheckedAvailableItems([...checkedAvailableItems, item]);
//     }
//   };

//   //   const toggleAvailableItem2 = (item: any) => {
//   //   if (checkedAvailableItems.includes(item)) {
//   //     setCheckedAvailableItems(checkedAvailableItems.filter((i) => i !== item));
//   //   } else {
//   //     setCheckedAvailableItems([...checkedAvailableItems, item]);
//   //   }
//   //   setSelectedRole(item)
//   //   console
//   // };

//   const toggleSelectedItem = (item: IInitialDataMerchant) => {
//     if (checkedSelectedItems.includes(item)) {
//       setCheckedSelectedItems(checkedSelectedItems.filter((i) => i !== item));
//     } else {
//       setCheckedSelectedItems([...checkedSelectedItems, item]);
//     }
//   };

//   return (
//     <>
//       {/* <div className="flex gap-9 bg-screen-grey"> */}
//       <div className="flex gap-9 bg-screen-grey">
//         <div className="flex w-1/2 flex-col gap-3">
//           <H7>{headingLeft}</H7>

//           <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
//             <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
//               <div className="w-1/6">
//                 <div
//                   onClick={handleSelectAllAvailable}
//                   className={`h-4 w-4 rounded-sm border border-border-dark ${checkedAvailableItems.length === availableItems.length &&
//                     availableItems.length > 0 &&
//                     'bg-primary-base'
//                     }`}
//                 >
//                   {checkedAvailableItems.length === availableItems.length &&
//                     availableItems.length > 0 && (
//                       <div className="flex h-4 w-4 items-center justify-center">
//                         <Image
//                           src={TickIcon}
//                           alt="tick"
//                           height={10}
//                           width={10}
//                         />
//                       </div>
//                     )}
//                 </div>
//               </div>
//               <div className="w-5/6">
//                 <H7>Field Category</H7>
//               </div>
//               <div className="w-5/6">
//                 <H7>Field Names</H7>
//               </div>
//             </div>
//             <div className="flex min-h-[250px] max-h-[250px] flex-col gap-2 px-6 overflow-y-auto">
//               {availableItems.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="w-1/6">
//                     <div
//                       onClick={() => toggleAvailableItem(item)}
//                       className={`h-4 w-4 rounded-sm border border-border-dark ${checkedAvailableItems.includes(item) &&
//                         'bg-primary-base'
//                         } `}
//                     >
//                       {checkedAvailableItems.includes(item) && (
//                         <div className="flex h-4 w-4 items-center justify-center">
//                           <Image
//                             src={TickIcon}
//                             alt="tick"
//                             height={10}
//                             width={10}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="border-gray-300 w-5/6">
//                     <B2 textColor="text-secondary-base">{item.fieldCategory}</B2>
//                   </div>
//                   <div className="border-gray-300 w-5/6">
//                     <B2 textColor="text-secondary-base">{item.fieldName}</B2>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-4">
//           <Image
//             src={ArrowRightAll}
//             width={24}
//             height={24}
//             alt="arrow-right-all"
//             onClick={handleAddAllItems}
//           />
//           <Image
//             src={ArrowRightSingle}
//             width={24}
//             height={24}
//             alt="arrow-right-single"
//             onClick={handleAddSelectedItems}
//           />
//           <Image
//             src={ArrowLeftSingle}
//             width={24}
//             height={24}
//             alt="arrow-left-single"
//             onClick={handleRemoveSelectedItems}
//           />
//           <Image
//             src={ArrowLeftAll}
//             width={24}
//             height={24}
//             alt="arrow-left-all"
//             onClick={handleRemoveAllItems}
//           />
//         </div>
//         <div className="flex w-1/2 flex-col gap-3">
//           <H7>{headingRight}</H7>

//           <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
//             <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
//               <div className="w-1/6">
//                 <div
//                   onClick={handleSelectAllSelected}
//                   className={`h-4 w-4 rounded-sm border border-border-dark ${checkedSelectedItems.length === selectedItems.length &&
//                     selectedItems.length > 0 &&
//                     'bg-primary-base'
//                     }`}
//                 >
//                   {checkedSelectedItems.length === selectedItems.length &&
//                     selectedItems.length > 0 && (
//                       <div className="flex h-4 w-4 items-center justify-center">
//                         <Image
//                           src={TickIcon}
//                           alt="tick"
//                           height={10}
//                           width={10}
//                         />
//                       </div>
//                     )}
//                 </div>
//               </div>
//               <div className="w-5/6">
//                 <H7>Field Category</H7>
//               </div>
//               <div className="w-5/6">
//                 <H7>Field Names</H7>
//               </div>
//             </div>
//             <div className="flex min-h-[250px] max-h-[250px] flex-col gap-2 px-6 overflow-y-auto">
//               {selectedItems.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="border-gray-300 w-1/6">
//                     <div
//                       onClick={() => toggleSelectedItem(item)}
//                       className={`h-4 w-4 rounded-sm border border-border-dark ${checkedSelectedItems.includes(item) && 'bg-primary-base'
//                         } `}
//                     >
//                       {checkedSelectedItems.includes(item) && (
//                         <div className="flex h-4 w-4 items-center justify-center">
//                           <Image
//                             src={TickIcon}
//                             alt="tick"
//                             height={10}
//                             width={10}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="border-gray-300 w-5/6">
//                     <B2 textColor="text-secondary-base">{item.fieldCategory}</B2>
//                   </div>
//                   <div className="border-gray-300 w-5/6">
//                     <B2 textColor="text-secondary-base">{item.fieldName}</B2>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MerchantDualListTable;

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ArrowLeftSingle from '@/assets/icons/arrow-back-single.svg';
import ArrowLeftAll from '@/assets/icons/arrow-left-all.svg';
import ArrowRightAll from '@/assets/icons/arrow-right-all.svg';
import ArrowRightSingle from '@/assets/icons/arrow-right-single.svg';
import TickIcon from '@/assets/icons/tick-icon-table-checkbox.svg';

import B2 from './UI/Body/B2';
import H7 from './UI/Headings/H7';

export interface IInitialDataMerchant {
  fieldName: string;
  fieldCategory: string;
}

interface IDualListTable {
  initialData: IInitialDataMerchant[];
  headingLeft: string;
  headingRight: string;
  title?: string;
  setSelectedItems?: React.Dispatch<
    React.SetStateAction<IInitialDataMerchant[]>
  >;
  selectedItems: IInitialDataMerchant[];
}

const MerchantDualListTable = ({
  initialData,
  headingLeft,
  headingRight,
  setSelectedItems,
  selectedItems,
}: IDualListTable) => {
  const [availableItems, setAvailableItems] =
    useState<IInitialDataMerchant[]>(initialData);
  const [checkedAvailableItems, setCheckedAvailableItems] = useState<
    IInitialDataMerchant[]
  >([]);
  const [checkedSelectedItems, setCheckedSelectedItems] = useState<
    IInitialDataMerchant[]
  >([]);

  useEffect(() => {
    setAvailableItems(initialData);
  }, [initialData]);

  const handleSelectAllAvailable = () => {
    if (checkedAvailableItems.length === availableItems.length) {
      setCheckedAvailableItems([]);
    } else {
      setCheckedAvailableItems(availableItems);
    }
  };

  const handleSelectAllSelected = () => {
    if (checkedSelectedItems.length === selectedItems.length) {
      setCheckedSelectedItems([]);
    } else {
      setCheckedSelectedItems(selectedItems);
    }
  };

  const handleAddSelectedItems = () => {
    if (setSelectedItems) {
      setSelectedItems([...selectedItems, ...checkedAvailableItems]);
    }
    setAvailableItems(
      availableItems.filter((i) => !checkedAvailableItems.includes(i)),
    );
    setCheckedAvailableItems([]);
  };

  const handleRemoveSelectedItems = () => {
    setAvailableItems([...availableItems, ...checkedSelectedItems]);
    if (setSelectedItems) {
      setSelectedItems(
        selectedItems.filter((i) => !checkedSelectedItems.includes(i)),
      );
    }
    setCheckedSelectedItems([]);
  };

  const handleAddAllItems = () => {
    if (setSelectedItems) {
      setSelectedItems([...selectedItems, ...availableItems]);
    }
    setAvailableItems([]);
    setCheckedAvailableItems([]);
  };

  const handleRemoveAllItems = () => {
    setAvailableItems([...availableItems, ...selectedItems]);
    if (setSelectedItems) {
      setSelectedItems([]);
    }
    setCheckedSelectedItems([]);
  };

  const toggleAvailableItem = (item: IInitialDataMerchant) => {
    if (checkedAvailableItems.includes(item)) {
      setCheckedAvailableItems(checkedAvailableItems.filter((i) => i !== item));
    } else {
      setCheckedAvailableItems([...checkedAvailableItems, item]);
    }
  };

  const toggleSelectedItem = (item: IInitialDataMerchant) => {
    if (checkedSelectedItems.includes(item)) {
      setCheckedSelectedItems(checkedSelectedItems.filter((i) => i !== item));
    } else {
      setCheckedSelectedItems([...checkedSelectedItems, item]);
    }
  };

  return (
    <>
      <div className="flex gap-9 bg-screen-grey">
        <div className="flex w-1/2 flex-col gap-3">
          <H7>{headingLeft}</H7>

          <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
            <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
              <div className="w-1/6">
                <div
                  onClick={handleSelectAllAvailable}
                  className={`h-4 w-4 rounded-sm border border-border-dark ${
                    checkedAvailableItems.length === availableItems.length &&
                    availableItems.length > 0 &&
                    'bg-primary-base'
                  }`}
                >
                  {checkedAvailableItems.length === availableItems.length &&
                    availableItems.length > 0 && (
                      <div className="flex h-4 w-4 items-center justify-center">
                        <Image
                          src={TickIcon}
                          alt="tick"
                          height={10}
                          width={10}
                        />
                      </div>
                    )}
                </div>
              </div>
              <div className="w-5/6">
                <H7>Field Category</H7>
              </div>
              <div className="w-5/6">
                <H7>Field Names</H7>
              </div>
            </div>
            <div className="flex max-h-[250px] min-h-[250px] flex-col gap-2 overflow-y-auto px-6">
              {availableItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/6">
                    <div
                      onClick={() => toggleAvailableItem(item)}
                      className={`h-4 w-4 rounded-sm border border-border-dark ${
                        checkedAvailableItems.includes(item) &&
                        'bg-primary-base'
                      }`}
                    >
                      {checkedAvailableItems.includes(item) && (
                        <div className="flex h-4 w-4 items-center justify-center">
                          <Image
                            src={TickIcon}
                            alt="tick"
                            height={10}
                            width={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">
                      {item.fieldCategory}
                    </B2>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item.fieldName}</B2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={ArrowRightAll}
            width={24}
            height={24}
            alt="arrow-right-all"
            onClick={handleAddAllItems}
          />
          <Image
            src={ArrowRightSingle}
            width={24}
            height={24}
            alt="arrow-right-single"
            onClick={handleAddSelectedItems}
          />
          <Image
            src={ArrowLeftSingle}
            width={24}
            height={24}
            alt="arrow-left-single"
            onClick={handleRemoveSelectedItems}
          />
          <Image
            src={ArrowLeftAll}
            width={24}
            height={24}
            alt="arrow-left-all"
            onClick={handleRemoveAllItems}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <H7>{headingRight}</H7>

          <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
            <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
              <div className="w-1/6">
                <div
                  onClick={handleSelectAllSelected}
                  className={`h-4 w-4 rounded-sm border border-border-dark ${
                    checkedSelectedItems.length === selectedItems.length &&
                    selectedItems.length > 0 &&
                    'bg-primary-base'
                  }`}
                >
                  {checkedSelectedItems.length === selectedItems.length &&
                    selectedItems.length > 0 && (
                      <div className="flex h-4 w-4 items-center justify-center">
                        <Image
                          src={TickIcon}
                          alt="tick"
                          height={10}
                          width={10}
                        />
                      </div>
                    )}
                </div>
              </div>
              <div className="w-5/6">
                <H7>Field Category</H7>
              </div>
              <div className="w-5/6">
                <H7>Field Names</H7>
              </div>
            </div>
            <div className="flex max-h-[250px] min-h-[250px] flex-col gap-2 overflow-y-auto px-6">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="border-gray-300 w-1/6">
                    <div
                      onClick={() => toggleSelectedItem(item)}
                      className={`h-4 w-4 rounded-sm border border-border-dark ${
                        checkedSelectedItems.includes(item) && 'bg-primary-base'
                      }`}
                    >
                      {checkedSelectedItems.includes(item) && (
                        <div className="flex h-4 w-4 items-center justify-center">
                          <Image
                            src={TickIcon}
                            alt="tick"
                            height={10}
                            width={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">
                      {item.fieldCategory}
                    </B2>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item.fieldName}</B2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantDualListTable;
