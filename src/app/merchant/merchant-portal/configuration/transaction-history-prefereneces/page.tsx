'use client';

import { useState } from 'react';

import DualListTable from '@/components/DualListTable';
// import H7 from "@/components/UI/Headings/H7";
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';

export default function TransactionHistoryPreferences() {
  const [selectedItems, setSelectedItems] = useState<IInitialData[]>([]);

  interface IInitialData {
    // id: number;
    name: string;
    category: string;
  }
  const handleSelectedItemsChange = (items: IInitialData[]) => {
    console.log('items are', items);
    setSelectedItems(items); // Update state in the parent
    // const fieldsForRevision = selectedItems.map(item => item.name);
  };
  // const initialItems = [
  //   { name: 'Item 1', category: 'Category 1' },
  //   { name: 'Item 2', category: 'Category 2' },
  //   { name: 'Item 3', category: 'Category 3' },
  //   { name: 'Item 4', category: 'Category 4' },
  // ];
  // const [availableItems, setAvailableItems] = useState(initialItems);
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [checkedAvailableItems, setCheckedAvailableItems] = useState([]);
  // const [checkedSelectedItems, setCheckedSelectedItems] = useState([]);

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Transaction History Preferences"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <div className="flex flex-col rounded-lg border-[0.5px] border-border-light bg-screen-grey p-[60px]">
        <DualListTable
          // initialData={initialItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleSelectedItemsChange}
          headingLeft="Available Filters"
          headingRight="Selected Filters"
        />
      </div>
    </div>
  );
}

// <div className="border-[0.5px] border-border-light rounded-lg bg-screen-grey p-[60px]">
//   <div className="flex space-x-5">
//     {/* Available Items */}
//     <div className="w-1/2 flex flex-col gap-3">
//       <H7>Available Filters</H7>
//       <ul className=" bg-screen-white rounded-2xl border border-border-light">
//         <div className="flex px-6 py-4 items-center border-b border-border-light">
//           <div className="w-1/6">s</div>
//           <div className="w-full">
//             <H7>Field Category</H7>
//           </div>
//           <div className="w-full">
//             <H7>Field Names</H7>
//           </div>
//         </div>
//         {availableItems.map((item) => (
//           <li
//             key={item}
//             className="flex justify-between items-center bg-gray-200 px-4 rounded"
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={checkedAvailableItems.includes(item)}
//                 onChange={() => toggleAvailableItem(item)}
//                 className="mr-2"
//               />
//               {item}
//             </div>
//             <button
//               onClick={() => handleAddItem(item)}
//               className="bg-primary-base text-white px-2 py-1 rounded"
//             >
//               Add
//             </button>
//           </li>
//         ))}
//       </ul>
//       {checkedAvailableItems.length > 0 && (
//         <button
//           onClick={handleAddSelectedItems}
//           className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Selected
//         </button>
//       )}
//     </div>

//     {/* Selected Items */}
//     <div className="w-1/2 bg-white p-5 rounded shadow">
//       <H7>Selected Filters</H7>
//       <ul className="space-y-2">
//         {selectedItems.map((item) => (
//           <li
//             key={item}
//             className="flex justify-between items-center bg-gray-200 p-2 rounded"
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={checkedSelectedItems.includes(item)}
//                 onChange={() => toggleSelectedItem(item)}
//                 className="mr-2"
//               />
//               {item}
//             </div>
//             <button
//               onClick={() => handleRemoveItem(item)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       {checkedSelectedItems.length > 0 && (
//         <button
//           onClick={handleRemoveSelectedItems}
//           className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Remove Selected
//         </button>
//       )}
//     </div>
//   </div>
// </div>
